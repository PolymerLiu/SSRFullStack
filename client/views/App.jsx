import React from 'react'
import Routes from '../config/routes'
import {
    BrowserRouter as
        Router,
    Route,
    Link
} from 'react-router-dom'

export default class App extends React.Component {
    render() {
        return [
            <Router>
                <div>
                    <Link to={'/'}>首页</Link>
                    <br/>
                    <Link to={'/detail'}>详情页</Link>
                    <Routes />
                </div>
            </Router>,

        ]
    }
}