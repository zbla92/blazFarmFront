import axios from 'axios';
import qs from 'qs';

// const apiURL = 'http://localhost:3000';
const apiURL = 'https://blazfarmapi-production.up.railway.app';

axios.interceptors.request.use(
  async configData => {
    return configData;
  },
  error => Promise.reject(error),
);

const instance = (() => {
  const get = (url: string, params: string, isExternalService: boolean) => {
    if (params?.token) {
      return axios.get(`${apiURL}${url}?${qs.stringify(params)}`, params);
    }
    return axios.get(isExternalService ? url : `${apiURL}${url}?${qs.stringify(params)}`);
  };

  const post = (url: string, params: Object) => axios.post(`${apiURL}${url}`, params);

  const patch = (url: string, params: Object) => axios.patch(`${apiURL}${url}`, params);

  const put = (url: string, params: Object) => axios.put(`${apiURL}${url}`, params);

  const del = (url: string, params: Object) => axios.delete(`${apiURL}${url}`, { data: params });

  return {
    get,
    post,
    patch,
    put,
    del,
  };
})();

export default instance;
