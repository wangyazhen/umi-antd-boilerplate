import { resolve } from 'path'

export default {
  plugins: [
    [ 'umi-plugin-react', { 
      antd: true,
      dva: {
        immer: true,
      },
      routes: {
        exclude: [
          /model\.(j|t)sx?$/,
          /service\.(j|t)sx?$/,
          /models\//,
          /components\//,
          /services\//,
        ],
      },
    }],
  ],
  context: {
    title: 'wyz'
  },
  "proxy": {
    "/api": {
      "target": "http://localhost:3000/",
      "changeOrigin": true,
      "pathRewrite": { "^/api" : "" }
    }
  },
  alias: {
    src: resolve(__dirname, 'src'),
    components: resolve(__dirname, 'src/components'),
    layouts: resolve(__dirname, 'src/layouts'),
    models: resolve(__dirname, 'src/models'),
    services: resolve(__dirname, 'src/services'),
    utils: resolve(__dirname, 'src/utils'),
  },
}
