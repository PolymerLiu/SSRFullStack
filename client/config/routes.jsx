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

export default () => {
    return(
        <Router>
            <div>
                <Route path='/' render={() => <Redirect to={'/list'}/>} exact/>
                <Route path='/list' component={TopicList} exact/>
                <Route path='/detail' component={TopicDetail}/>
            </div>
        </Router>
    )
}