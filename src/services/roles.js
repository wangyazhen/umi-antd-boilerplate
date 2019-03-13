/**
 * Created by wyz on 2017/6/4.
 */

import request from '../utils/request';

const roleApi = '/api/roles';

export function fetch() {
  return request(roleApi);
}

export function rightAuthorities(roleId) {
  return request(`/api/privileges/${roleId}/rightAuthorities`);
}

export function leftAuthorities(roleId) {
  return request(`/api/privileges/${roleId}/leftAuthorities`);
}

export function addAuthorities(roleId, keys) {
  return request(`/api/privileges/${roleId}/authorities`, {
    method: 'POST',
    body: keys
  });
}

export function reduceAuthorities(roleId, keys) {
  return request(`/api/privileges/${roleId}/authorities`, {
    method: 'PUT',
    body: keys
  });
}

export function deleteRole(id) {
  return request(`${roleApi}/${id}`, {
    method: 'DELETE'
  });
}


export function updateRole(user) {
  return request(`${roleApi}/${user.id}`, {
    method: 'PUT',
    body: user
  });
}


export function createRole(values) {
  return request(roleApi, {
    method: 'POST',
    body: values
  });
}

export function getRoles() {
  return request('/api/roles');
}
