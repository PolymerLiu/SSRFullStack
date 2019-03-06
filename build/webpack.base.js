const path = require('path')

const config = {
    output: {
        path:path.join(__dirname,'../dist'),
        publicPath:'/public',
    },
    resolve: {
        extensions: ['.js','.jsx']
    },
    module:{
        rules:[
            //babel-loader既能处理ES6同样也能处理JSX文件（将其转换为ES5）
            {
                test:/.jsx$/,
                loader:'babel-loader'
            },
            //app.js 采用了JSX语法，同样需要babel-loader来进行转换处理
            {
                test:/.js$/,
                loader:'babel-loader',
                //不需要对node_modules下边的文件进行编译
                exclude:[
                    path.join(__dirname,'../node_modules')
                ]
            }
        ]
    },
}
module.exports  = config