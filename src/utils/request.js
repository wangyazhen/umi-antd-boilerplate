import axios from 'axios';

const fetch = (url, options) => {
  const {
    method = 'get',
    body,
  } = options;

  switch (method.toLowerCase()) {
    case 'get':
      return axios.get(url, {
        params: body,
      });
    case 'delete':
      return axios.delete(url, {
        data: body,
      });
    case 'post':
      return axios.post(url, body);
    case 'put':
      return axios.put(url, body);
    case 'patch':
      return axios.patch(url, body);
    default:
      return axios(options);
  }
};

function checkStatus(response) {
  if (response.status === 401) {
    const error = new Error(response.statusText || '未授权');
    error.code = 401;
    throw error;
  }
}

const defaultOpt = {
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  },
};

export default async function request(url, options = {}) {
  return fetch(url, { ...defaultOpt, ...options })
    .then((response) => {
      return {
        success: true,
        jsonData: response.data,
        data: response.data, // todo remove
      };
    })
    .catch((error) => {
      checkStatus(error.response);
      return {
        success: false,
        jsonData: error.response.data,
      };
    });
}
