/**
 * Created by wyz on 2017/3/9.
 */

import request from '../utils/request';

export function fetch({ page }) {
  return request(`/api/users/allUsers?_page=${page}&start=0&limit=1000`);
}

export function remove(id) {
  return request(`/api/users/${id}`, {
    method: 'DELETE'
  });
}

export function update(id, values) {
  return request(`/api/users/${id}`, {
    method: 'PUT',
    body: values
  });
}

export function updatePassword(user) {
  return request(`/api/users/${user.name}/changePassword`, {
    method: 'POST',
    body: user
  });
}

export function initializePassword(userId) {
  return request(`/api/users/${userId}/initializePassword`);
}

export function create(values) {
  // todo 设计后台优化 这里为什么要加 register
  return request('/api/users/register', {
    method: 'POST',
    body: values
  });
}

export function getRoles() {
  return request('/api/roles');
}
