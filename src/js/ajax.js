import $ from 'jquery';
import CryptoJS from 'crypto-js';
import api from 'JSCommon/api';
import axios from 'axios';
import qs from 'qs';

const host = 'http://172.16.6.158:8071/';

const ajax = {
  dataProcess: {
    // 获取请求数据
    getReqData(originData, encryptionType) {
      // console.log(originData)
      if (!encryptionType) {
        const reqData = {
          data: JSON.stringify(originData),
        };

        return reqData;
      }
      const key = localStorage.userkey;
      const reqData = {
        data: this.EncryptAES(JSON.stringify(originData), key),
      };

      return reqData;
    },
    EncryptAES(data, key) {
      const keyHash256 = CryptoJS.SHA256(key);
      const iv = CryptoJS.enc.Utf8.parse('');
      const encrypted = CryptoJS.AES.encrypt(data, keyHash256, {
        iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      });

      return encrypted.toString();
    },
    DecryptAES(encryptedStr, key) {
      const keyHash256 = CryptoJS.SHA256(key);
      const iv = CryptoJS.enc.Utf8.parse('');
      const decryptedUtf8 = CryptoJS.AES.decrypt(encryptedStr, keyHash256, {
        iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      });
      const decryptedData = decryptedUtf8.toString(CryptoJS.enc.Utf8);

      return decryptedData;
    },
  },
  sendRequest(opt) {
    const optOjb = opt;

    $.ajax({
      type: opt.type || 'post',
      url: opt.url,
      data: opt.data,
      dataType: opt.dataType || 'json',
      beforeSend() {
        if (optOjb.params) {
          if (optOjb.params.vm) {
            optOjb.params.vm.loading = true;
          }
          if (optOjb.params.beforeSend) {
            optOjb.params.beforeSend();
          }
        }
      },
      complete() {
        if (optOjb.params) {
          if (optOjb.params.vm) {
            optOjb.params.vm.loading = false;
          }
          if (optOjb.params.complete) {
            optOjb.params.complete();
          }
        }
      },
      success(data, textStatus, jqXHR) {
        if (optOjb.params) {
          if (optOjb.params.success) {
            optOjb.params.success(data, textStatus, jqXHR);
          }
        }
      },
      error() {
        if (optOjb.params) {
          if (optOjb.params.error) {
            optOjb.params.error();
          }
        }
      },
      contentType: opt.params.contentType,
      processData: opt.params.processData,
      async: opt.params.async,
    });
  },
  // 请求登入
  reqLogin(opt) {
    const url = `${host}${api.login}`;

    console.log(url);
    const oriData = {
      callback: opt.callback,
    };
    const reqData = this.dataProcess.getReqData(oriData, opt.encryptionType, opt.token, true);

    this.sendRequest({
      url,
      data: reqData,
      params: {
        success: (data) => {
          if (data.errcode === 0) {
            window.location.href = data.data.url;
          } else {
            // mui.alert(data.errmsg);
          }
        },
      },
    });
  },
  // 请求用户信息
  reqUserInfo(opt) {
    const url = `${host}Api/User/info`;
    const oriData = {
      token: opt.token,
    };
    const reqData = this.dataProcess.getReqData(oriData, opt.encryptionType, opt.token, true);

    this.sendRequest({
      url,
      data: reqData,
      params: opt,
    });
  },
  // 微信分享
  reqWechatSig(opt) {
    const url = `${host}Api/Wxshare/api`;
    const oriData = {
      url: opt.url,
    };
    const reqData = this.dataProcess.getReqData(oriData, opt.encryptionType, opt.token, true);

    this.sendRequest({
      url,
      data: reqData,
      params: opt,
    });
  },
  reqSticker(opt) {
    const oriData = {
      id: opt.id,
      token: opt.token,
    };
    const reqData = this.dataProcess.getReqData(oriData, opt.encryptionType, opt.token, true);

    axios({
      method: 'post',
      baseURL: host,
      url: 'Api/user/create',
      data: qs.stringify(reqData),
      // transformResponse: [function (data) {
      //   return data;
      // }],
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  },
};

export default ajax;
