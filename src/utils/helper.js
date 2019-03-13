/**
 * Created by wyz on 2017/5/25.
 */
import forIn from 'lodash/forIn';
import pickBy from 'lodash/pickBy';

export const getLocalStorage = (name) => {
  return localStorage.getItem(name) && JSON.parse(localStorage.getItem(name))
};

export const setLocalStorage = (name, data) => {
  try {
    localStorage.setItem(name, JSON.stringify(data))
  } catch (e) {
    console.log('localStorage setItem[%s] has Error: %o', name, e);
  }
};

export const isEmptyObject = o => {
  for (let t in o) { return !1 } return !0
};

export function formValuesToFilter(values = {}) {
  const filters = [];
  const val = pickBy(values);
  forIn(val, (v, k) => {
    filters.push({ property: k, value: v });
  });
  return JSON.stringify(filters)
}

export function toQueryString(obj = {}) {
  let str = "";
  for (let key in obj) {
    if (str) {
      str += "&";
    }
    str += key + "=" + encodeURIComponent(obj[key]);
  }
  return str
}

export function removeNullValues(obj = {}) {
  return pickBy(obj)
}
