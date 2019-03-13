
import * as mainService from '../services/main';


export default {
  namespace: 'main',
  state: {
    user: '',
  },
  reducers: {
    setUser(state, { payload }) {
      state.user = payload
    },
  },
  effects: {
    *getList(action, { call, put, select }) {
      const { jsonData, success } = yield call(mainService.authorities);
      const { user, authorities, engName } = yield jsonData;
      if (success) {
        // console.log('response ok--user', user);
        yield put({
          type: 'saveList',
          payload: {
            authorities,
            user: { ...user, engName }
          }
        });
      }
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/') {
          console.log('main model pathname： ', pathname);
          // 打开首页的时候清楚panes
          // dispatch({ type: 'clearPanes' })
        }
      });
    }
  }
};
