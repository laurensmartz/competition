// import $ from 'jquery';
// import EXIF from 'exif-js';
// import ajax from 'JS/common/ajax';
// import mui from 'Lib/mui/js/mui.min';
// import Cropper from 'cropperjs';
import { strChineseFirstPY, oMultiDiff } from 'JS/common/py';
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
  // 手机号校验: 返回1：手机号为空，2：手机号不正确，3、验证通过。
  checkMobile(mobile) {
    if (!mobile) {
      return 1;
    }
    if (!/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(mobile.trim()) || mobile.trim().length !== 11) {
      return 2;
    }

    return 3;
  },
  // 获取url传参的参数值。
  getQueryString(name) {
    const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
    const r = window.location.search.substr(1).match(reg);

    if (r != null) return decodeURI(r[2]);
    return null;
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
};

export default utility;
