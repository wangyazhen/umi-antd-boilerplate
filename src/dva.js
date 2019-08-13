import './index.css';
import { message } from 'antd';

// 1. Initialize
export function config() {
  return {
    initialState: { },
    onError(e, dispatch) {
      if (e.code === 401) {
        console.error('401 错误：', e.message || e);
        window.location.href = '/login';
      }
      console.error('全局捕获到错误：', e.message || e);
      message.error(e.message, /* duration */3);
    },
  }
}

