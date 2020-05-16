
module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  publicPath: './',  //vue3 解决部署到服务器白屏问题  '/'  =>  ''
  outputDir:'dist',
  devServer: {
    // 项目运行时候的端口号
    host: "127.0.0.1",
    port: 8089,
    // proxy: {
    //   '/api': {
    //     target: 'http://118.89.143.27:8090',//后台接口
    //     ws: true, //如果要代理websockets
    //     secure:false, // 使用的是http协议则设置为false，https协议则设置为true
    //     changeOrigin: true, //将选项changeOrigin设置true为基于名称的虚拟托管站点。
    //     pathRewrite: {  //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
    //       '^/api': '/api'
    //     }
    //   }
    // }
  },
  //警告 webpack 的性能提示
  configureWebpack : {
    performance: {
      hints:'warning',
      //入口起点的最大体积 整数类型（以字节为单位）
      maxEntrypointSize: 50000000,
      //生成文件的最大体积 整数类型（以字节为单位 300k）
      maxAssetSize: 30000000,
      //只给出 js 文件的性能提示
      assetFilter: function(assetFilename) {
        return assetFilename.endsWith('.js');
      }
    }
  }
};
