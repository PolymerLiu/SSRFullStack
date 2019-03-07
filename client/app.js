import ReactDOM from 'react-dom'
import React from 'react'
import App from './views/App.jsx'
import BrowserRouter from 'react-router-dom'
import {Provider} from 'mobx-react'

import appState from './store/app.state'
const root = document.getElementById('root')


if (module.hot) {
    module.hot.accept('./views/App.jsx',() => {
        const NextApp = require('./views/App.jsx').default
        ReactDOM.render(
            <Provider appState={appState}>
                <BrowserRouter >
                    <NextApp/>
                </BrowserRouter>
            </Provider>,
            root
            )
    })
}
