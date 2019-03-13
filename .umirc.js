
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
}
