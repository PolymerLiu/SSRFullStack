import React from 'react'
import { StaticRouter } from 'react-router-dom'
import {Provider,useStaticRendering} from 'mobx-react'
import App from './views/App.jsx'


import {createStoreMap} from './store/store'

//让react在服务端渲染时候不会重复数据变换
useStaticRendering(true)

export default (stores,routerContext,url) => {
    return(
        //跳转到某一个页面有可能使用多个store，直接从外面把所需要的store传进来
        <Provider {...stores}>
            <StaticRouter context = {routerContext} location={url}>
                <App/>
            </StaticRouter>
        </Provider>
    )
}

export {createStoreMap}