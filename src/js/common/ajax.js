// import $ from 'jquery';
import CryptoJS from 'crypto-js';
import axios from 'axios';
// import qs from 'qs';

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
  // 发送ajax请求。
  sendRequest(options, reqData) {
    const requestOptions = options || {};
    const requestData = reqData || {};

    console.log(options);
    axios({
      baseURL: options.baseURL,
      url: requestOptions.url,
      method: requestOptions.method || 'post',
      params: requestData.params || {},
      data: requestData.data || {},
      transformRequest: [
        (data) => {
          let count = 0;
          let ret = '';
          const formData = new FormData();

          for (const key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
              if (typeof data[key] === 'object') {
                count += 1;
              }

              formData.append(key, data[key]);
              ret += `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}&`;
            }
          }

          if (count > 0) {
            return formData;
          }

          return ret.substring(0, ret.length - 1);
        },
      ],
      headers: requestOptions.headers || {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      responseType: requestOptions.responseType || 'json',
    })
      .then((response) => {
        const { successFun } = requestData;

        if (successFun) {
          successFun(response);
        }
      })
      .catch((error) => {
        const { errorFun } = requestData;

        if (errorFun) {
          errorFun(error);
        }
      })
      .then(() => {});
  },
};

export default ajax;
