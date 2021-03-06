import ajax from 'JS/common/ajax';
import apiConfig from 'JS/jury/config/api_config';
import serverConfig from 'JS/jury/config/server_config';

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
