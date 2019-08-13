import request from 'utils/request';

export function login(payload) {
    return request('/api/login', {
        method: 'POST',
        data: {
            ...payload,
        }
    });
}

export function getAll() {
    return request('/api/users')
}