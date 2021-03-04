// 通过module.exports导出一个对象，在此对象中配置
module.exports = {
  // 配置别名需要在configureWebpack这个对象里面配置，表示配置webpack的config
  configureWebpack: {
    resolve: {
      // 使用extensions来配置一些可以省略文件后缀，在数组中配置即可，不过这里默认已经配置好了
      extensions: [],
      // 配置别名在alias中配置
      alias: {
        // 默认已经给scr配置了别名@
        // 在Vuecli2中，配置的别名路径不能使用@/assets，但是Vuecli3可以使用@/assets
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
        // router和store一般只在main.js中引入，没有在多个文件中引入，所以这里没有配置别名的需要
      }
    }
  }
}









