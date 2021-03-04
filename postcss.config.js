module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport": {
      viewportWidth: 375, // 视窗的宽度，对应的是我们设计稿的宽度
      viewportHeight: 667, // 视窗的高度，对应的是我们设计稿的高度
      unitPrecision: 5, // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
      viewportUnit: 'vw', // 指定需要换成的视窗单位，建议使用vw
      selectorBlackList: ['ignore', 'tab_bar', 'tab_bar_item'], // 指定不需要转换的类，可以在这里设置类'ignore'，然后给不需要转换单位的元素添加上ignore类
      minPixelValue: 1, // 小于或者等于`1px`不转换为视窗单位
      mediaQuery: false, // 允许在媒体查询中转换`px`
      exclude: [/TabBar/], // 可以指定哪些文件不作转换，在数组中需要以正则表达式的形式来匹配
    },
  }
}
