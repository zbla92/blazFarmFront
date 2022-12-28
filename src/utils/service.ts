import Api from './apiClient';

export const get = async (url: string, params = {}, isExternalService = false) => {
  try {
    const response = await Api.get(url, params, isExternalService);
    return response.data;
  } catch (error) {
    throw error.response && error.response.data;
  }
};

export const post = async (url: string, postData = {}) => {
  try {
    const response = await Api.post(url, postData);
    return response.data;
  } catch (error) {
    throw error.response && error.response.data;
  }
};

export const patch = async (url: string, patchData = {}) => {
  try {
    const response = await Api.patch(url, patchData);
    return response.data;
  } catch (error) {
    throw error.response && error.response.data;
  }
};

export const put = async (url: string, putData = {}) => {
  try {
    const response = await Api.put(url, putData);
    return response.data;
  } catch (error) {
    throw error.response && error.response.data;
  }
};

export const remove = async (url: string, deleteData = {}) => {
  try {
    const response = await Api.del(url, deleteData);
    return response.data;
  } catch (error) {
    throw error.response && error.response.data;
  }
};
