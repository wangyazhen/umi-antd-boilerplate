import request from '@utils/request';

export function login(data) {
  return request('/users/login', {
    method: 'POST',
    data,
  });
}

export function logout(payload) {
  return request('/users/logout', {
    method: 'POST',
    data: payload,
  });
}