module.exports = {
    chainWebpack: config => {
        config.module.rules.delete('eslint');
        //别名
        // config.resolve.alias
        //     .set('asset',resolve('src/assets'));
    }
}