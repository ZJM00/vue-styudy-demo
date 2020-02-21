//项目发布阶段需要用到的Babel插件
const prodplugings = [];
if(process.env.NOOE_ENV === 'production') {
  prodplugings.push('transform-remove-console')
}

module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  'plugins':  [
    // 发布时用到的插件数组
    ...prodplugings
  ]
}
