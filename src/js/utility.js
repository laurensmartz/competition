import $ from 'jquery';
import EXIF from 'exif-js';
import ajax from 'JSCommon/ajax';
import mui from 'Lib/mui/js/mui.min';
import Cropper from 'cropperjs';
import { strChineseFirstPY, oMultiDiff } from 'JSCommon/py';
import CryptoJS from 'crypto-js';

const utility = {
  // AES加密
  encryptAES(rawStr, key) {
    const keyHash256 = CryptoJS.SHA256(key);
    const iv = CryptoJS.enc.Utf8.parse('');
    const encrypted = CryptoJS.AES.encrypt(rawStr, keyHash256, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    return encrypted.toString();
  },
  // 图片旋转角处理
  processImg(file) {
    let orit;
    const _ajax = this;
    const def = $.Deferred();

    EXIF.getData(file, () => {
      orit = EXIF.getTag(this, 'Orientation');

      const cas = document.createElement('canvas');
      const img = document.createElement('img');
      let ctx;
      const fr = new FileReader();

      fr.readAsDataURL(file);
      fr.addEventListener(
        'load',
        () => {
          img.src = fr.result;
        },
        false,
      );

      img.addEventListener('load', () => {
        if (orit === 6) {
          cas.width = img.height;
          cas.height = img.width;
          ctx = cas.getContext('2d');
          ctx.translate(cas.width, 0);
          ctx.rotate((90 * Math.PI) / 180);
        } else {
          cas.width = img.width;
          cas.height = img.height;
          ctx = cas.getContext('2d');
        }

        ctx.drawImage(img, 0, 0, img.width, img.height);

        const dataUrl = cas.toDataURL('image/jpeg', 0.2);
        const imgFile = _ajax.dataURLtoBlob(dataUrl);

        def.resolve({
          imgFile,
        });
      });
    });
    return def;
  },
  // dataURl转Blob
  dataURLtoBlob(dataurl) {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n) {
      u8arr[n] = bstr.charCodeAt(n);
      n -= 1;
    }
    return new Blob([u8arr], {
      type: mime,
    });
  },
  // 手机号校验
  checkMobile(mobile) {
    if (!mobile) {
      mui.alert('请输入手机号码');
      return false;
    }
    if (!/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(mobile.trim()) || mobile.trim().length !== 11) {
      mui.alert('请输入正确的手机号码');
      return false;
    }
    return true;
  },
  getQueryString(name) {
    const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
    const r = window.location.search.substr(1).match(reg);

    if (r != null) return decodeURI(r[2]);
    return null;
  },
  calculate_object_name(filename, dir) {
    let suffix;
    let pos;

    function getSuffix(pathName) {
      pos = pathName.lastIndexOf('.');
      suffix = '';
      if (pos !== -1) {
        suffix = filename.substring(pos);
      }
      return suffix;
    }

    function randomString(len) {
      const length = len || 32;
      const timeStamp = new Date().getTime();
      const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
      const maxPos = chars.length;
      let pwd = '';

      for (let i = 0; i < length; i += 1) {
        pwd += chars.charAt(Math.floor(Math.random() * maxPos));
      }
      return timeStamp + pwd;
    }

    suffix = getSuffix(filename);
    return dir + randomString(10) + suffix;
  },
  // 获取汉字首字母拼音
  makePy(str) {
    // 非字符串参数抛出错误提示
    if (typeof str !== 'string') {
      throw new Error(-1, '函数makePy需要字符串类型参数!');
    }

    const arrResult = [];
    // 将字符串转码后转为数组

    function checkCh(ch) {
      const uni = ch.charCodeAt(0);
      // 如果不在汉字处理范围之内,返回原字符,也可以调用自己的处理函数

      if (uni > 40869 || uni < 19968) {
        return ch;
      } // dealWithOthers(ch);
      // 检查是否是多音字,是按多音字处理,不是就直接在strChineseFirstPY字符串中找对应的首字母
      return oMultiDiff[uni] ? oMultiDiff[uni] : strChineseFirstPY.charAt(uni - 19968);
    }

    function mkRslt(arr) {
      let arrRslt = [''];

      for (let i = 0, len = arr.length; i < len; i += 1) {
        const word = arr[i];
        const wordLen = word.length;

        if (wordLen === 1) {
          for (let k = 0; k < arrRslt.length; k += 1) {
            arrRslt[k] += word;
          }
        } else {
          const tmpArr = arrRslt.slice(0);

          arrRslt = [];
          for (let k = 0; k < wordLen; k += 1) {
            // 复制一个相同的arrRslt
            const tmp = tmpArr.slice(0);
            // 把当前字符str[k]添加到每个元素末尾

            for (let j = 0; j < tmp.length; j += 1) {
              tmp[j] += str.charAt(k);
            }
            // 把复制并修改后的数组连接到arrRslt上
            arrRslt = arrRslt.concat(tmp);
          }
        }
      }
      return arrRslt;
    }

    for (let i = 0, len = str.length; i < len; i += 1) {
      const ch = str.charAt(i);

      arrResult.push(checkCh(ch));
    }
    return mkRslt(arrResult);
  },
  uploadImage(vm, file, success, aspectRatio) {
    let fileName;
    let targetFile;
    let host;
    let dir;
    let previewImage;
    let fr;
    let cropper;
    const _this = this;

    if (!file) {
      mui.alert('未选择图片');
      return;
    }
    fileName = file.name;
    previewImage = document.getElementById('preview-image');
    fr = new FileReader();
    fr.addEventListener('load', () => {
      previewImage.setAttribute('src', fr.result);

      cropper = new Cropper(previewImage, {
        aspectRatio: aspectRatio || 1 / 1,
        viewMod: 1,
        dragMode: 'move',
        ready() {
          document.getElementById('cropBtn').addEventListener('click', () => {
            try {
              var dataURL = cropper.getCroppedCanvas().toDataURL('image/jpeg', 0.5);
            } catch (e) {
              return;
            }
            const cropFile = _this.dataURLtoBlob(dataURL);

            _this.processImg(cropFile).then((data) => {
              targetFile = data.imgFile;
              // 请求上传图片
              ajax.reqUploadImage({
                vm,
                imageFile: targetFile,
                contentType: false,
                processData: false,
                success: (data) => {
                  if (data.resultCode == 1) {
                    // cropper.destroy()
                    // 上传成功后执行参数里的success函数
                    success && success(data, cropper);
                  } else {
                    mui.alert(data.msg);
                  }
                },
              });
            });
          });
        },
      });
    });
    fr.readAsDataURL(file);
    vm.previewImg = true;
  },
  // 时间选择器
  pickDtData() {
    const def = $.Deferred();
    const dtPicker = new mui.DtPicker({
      type: 'date',
    });

    dtPicker.show((items) => {
      console.log(items);
      def.resolve(items);
    });
    return def;
  },
  // 银行选择器
  pickBankData() {
    const def = $.Deferred();
    const picker = new mui.PopPicker();
    const arr = [];

    for (let index = 0; index < bankData.length; index++) {
      const obj = {
        text: bankData[index].bank_name,
        value: {
          bank_code: bankData[index].bank_code,
          branch_no: bankData[index].branch_no,
        },
      };

      arr.push(obj);
    }

    picker.setData(arr);

    picker.show((items) => {
      def.resolve(items);
    });

    return def;
  },
  inputCheck(type, target) {
    switch (type) {
      case 'num':
        return target.replace(/[^\d]/g, '');
        break;
      case 'pwd':
        return target.replace(/[' ']/g, '');
        break;
    }
  },
};

export default utility;
