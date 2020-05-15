const ipFile = require('./src/ip');

module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  publicPath: '/',  //vue3 解决部署到服务器白屏问题  '/'  =>  ''
  outputDir:'dist',
  devServer: {
    // 项目运行时候的端口号
    host: "118.89.143.27",
//    host: ipFile.getIp(),
    port: 8089,
    proxy: {
      '/api': {
        target: 'http://118.89.143.27:8090',//后台接口
        ws: true, //如果要代理websockets
        secure:false, // 使用的是http协议则设置为false，https协议则设置为true
        changeOrigin: true, //将选项changeOrigin设置true为基于名称的虚拟托管站点。
        pathRewrite: {  //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
          '^/api': '/api'
        }
      }
    }
  }
};
