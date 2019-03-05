const express = require("express")
const ReactSSR = require("react-dom/server")
const path = require("path")
const favicon = require("serve-favicon")
const fs = require("fs")
const app = express()

const isDev = process.env.NODE_ENV === 'development'


app.use(favicon(path.join(__dirname,'../favicon.ico')))

if (!isDev) {
    const serverEntry = require('../dist/server.entry').default

//读取打包得到的html文件
    const template = fs.readFileSync(path.join(__dirname,'../dist/index.html'),'utf8')

//TODO
    /*这一块有点不是特别懂*/
// 加上/public返回的就是静态文件的内容（比如压缩打包后的JS文件），否则就返回服务端渲染的代码
    app.use('/public',express.static(path.join(__dirname,'../dist')))

    app.get('*',(req,res) => {
        const appString = ReactSSR.renderToString(serverEntry)
        //将<app>里边渲染的东西替换成后端渲染的
        res.send(template.replace('<!--<app></app>-->',123))
    })
}else{
    const devStatic = require('./util/dev.static')
    devStatic(app)
}


app.listen(3333,() => {
    console.log('server is listening on 3333');
})
