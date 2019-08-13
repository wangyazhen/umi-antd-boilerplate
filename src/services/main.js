/**
 * Created by wyz on 2017/3/11.
 */
import request from '../utils/request';

export function authorities() {
  return request('/api/auths');
}
