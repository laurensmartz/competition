import ajax from 'JSCommon/common/ajax';
import apiConfig from 'JSCommon/competitor/config/api_config';
import serverConfig from 'JSCommon/competitor/config/server_config';

const requestOptions = {
  url: null,
  baseURL: serverConfig.server,
};
const request = {
  login(requestData) {
    requestOptions.url = apiConfig.login;

    console.log(requestOptions);
    ajax.sendRequest(requestOptions, requestData);
  },
};

export default request;
