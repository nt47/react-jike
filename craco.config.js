// 添加自定义对于webpack的配置

const path = require('path')
const { whenProd } = require('@craco/craco')

module.exports = {
    // webpack 配置
    webpack: {
        // 配置别名
        alias: {
            // 约定：使用 @ 表示 src 文件所在路径
            '@': path.resolve(__dirname, 'src')
        },
        // 配置webpack
        // 配置CDN
        configure: (webpackConfig) => {

            whenProd(() => {
                // key: 不参与打包的包(由dependencies依赖项中的key决定)
                // value: cdn文件中 挂载于全局的变量名称 为了替换之前在开发环境下
                webpackConfig.externals = {
                    react: 'React',
                    'react-dom': 'ReactDOM'
                }
                //htmlWebpackPlugin插件动态注入有坑，果断放弃，直接选择手动导入
            })

            return webpackConfig
        }
    }
}