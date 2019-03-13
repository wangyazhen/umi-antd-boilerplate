import dva from 'dva';
import createLoading from 'dva-loading';

const runtimeDva = window.g_plugins.mergeConfig('dva');
let app = dva({
  history: window.g_history,
  ...((require('/Users/wyz/Documents/workspace/wyz/malfunction-web/src/dva.js').config || (() => ({})))()),
  ...(runtimeDva.config || {}),
});

window.g_app = app;
app.use(createLoading());
(runtimeDva.plugins || []).forEach(plugin => {
  app.use(plugin);
});
app.use(require('/Users/wyz/Documents/workspace/wyz/malfunction-web/node_modules/dva-immer/lib/index.js').default());
app.model({ namespace: 'main', ...(require('/Users/wyz/Documents/workspace/wyz/malfunction-web/src/models/main.js').default) });
