const axios = require('axios')
const path = require('path')
const MemoryFs = require('memory-fs')
const ReactDomServer = require('react-dom/server')

//引入express的一个http代理
const proxy = require('http-proxy-middleware')


//引入webpack
const webpack = require('webpack')
//引入webpack配置文件
const serverConfig = require('../../build/webpack.config.server')

const getTemplate = () => {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:8888/public/index.html')
            .then(res => {
                resolve(res.data)
            })
            .catch(reject)
    })
}

const Module = module.constructor

//一个从内存中读取文件的库
const mfs = new MemoryFs()

//对webpack传入config文件，就可以得到一个serverCompiler
//此compiler可以监听其entry下依赖的文件是否发生变化，如果变化则重新打包
const serverCompiler = webpack(serverConfig)

let serverBundle
//将webpack输出的文件放在内存中，加快读写速度，替换原来node的FileSystem
serverCompiler.outputFileSystem = mfs
serverCompiler.watch({},(err,stats) => {
    if (err)  throw err
    stats = stats.toJson()
    stats.errors.forEach(err => console.error(err))
    stats.warnings.forEach(warn => console.error(warn))

    //输出bundle文件的路径
    const bundlePath = path.join(
        serverConfig.output.path,
        serverConfig.output.filename,
    )

    const bundle = mfs.readFileSync(bundlePath,'utf-8') //得到的是一个string的内容  需要将其转换成一个module

    //借助module的构造函数将一个string转换成一个module（模块）
    const m = new Module()
    m._compile(bundle,'server.entry.js')

    //最终得到的打包后的bundle
    serverBundle = m.exports.default
})

//通过获取webpack打包的结果来获取server端打包的bundle.js

module.exports = function (app) {


    //客户端的文件都是在webpack-dev-server里边存储的，，然后再通过http服务export出来
    //通过代理将静态文件代理到webpack-dev-server启动的服务上
    app.use('/public',proxy({
        target:'http://localhost:8888'
    }))
    app.get('*', function (req,res) {
        getTemplate().then(template => {
            const content = ReactDomServer.renderToString(serverBundle)
           res.send(template.replace('<!-- app -->',content))
        })

    })
}