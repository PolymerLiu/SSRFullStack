import React from 'react'
import {
    BrowserRouter as
        Router,
    Route,
    Link,
    Redirect,
} from 'react-router-dom'

import TopicList from '../views/topic-list'
import TopicDetail from '../views/topic-detail'
import Test from '../views/test/api-test'

export default () => {
    return(
        <Router>
            <div>
                <Route path='/' render={() => <Redirect to={'/list'}/>} exact key={'first'}/>
                <Route path='/list' component={TopicList} key={'list'}/>
                <Route path='/detail' component={TopicDetail} key={'detail'}/>
                <Route path='/test' component={Test} key={'test'}/>
            </div>
        </Router>
    )
}