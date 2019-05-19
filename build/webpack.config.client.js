const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.base')


const isDev = process.env.NODE_ENV === 'development'


const config = webpackMerge(baseConfig,{
    entry: {
        app:path.join(__dirname,'../client/app.js')
    },
    output:{
        filename:'[name].[hash].js',
    },
    plugins:[
        new HTMLPlugin({
            //template 传入你要渲染的html文件，并以此为模板，不传就生成一个新的html文件
            template:path.join(__dirname,'../client/template.html')
        })
    ]
})


if (isDev) {
    config.devServer = {
        host: '0.0.0.0',
        port: '8888',
        contentBase: path.join(__dirname,'../dist'),
        hot:true,
        overlay:{
            errors:true
        },
        //将dev-server的输出路径指定为/public
        publicPath:'/public',
        //让所以404的请求返回index.html
        historyApiFallback:{
            index: '/public/index.html'
        },
        proxy:{
            '/api': 'http://localhost:3333'
        }
    }
}
module.exports  = config