const path = require('path')

const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.base')

module.exports = webpackMerge( baseConfig,{
    target: "node",
    mode: "production",
    entry: {
        app:path.join(__dirname,'../client/server.entry.js')
    },
    output:{
        filename:'server.entry.js',
        libraryTarget: "commonjs2"
    },
})