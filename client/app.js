import ReactDOM from 'react-dom'
import React from 'react'
import App from './views/App.jsx'
import BrowserRouter from 'react-router-dom'

ReactDOM.render(<App/>,document.getElementById('root'))


if (module.hot) {
    module.hot.accept('./views/App.jsx',() => {
        const NextApp = require('./views/App.jsx').default
        ReactDOM.render(
            <BrowserRouter>
                <NextApp/>
            </BrowserRouter>,
            document.getElementById('root'))
    })
}
