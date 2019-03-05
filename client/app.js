import ReactDOM from 'react-dom'
import React from 'react'
import App from './views/App.jsx'

ReactDOM.render(<App/>,document.getElementById('root'))


if (module.hot) {
    module.hot.accept('./App.jsx',() => {
        const NextApp = require('./views/App.jsx').default
        ReactDOM.render(<NextApp/>,document.getElementById('root'))
    })
}
