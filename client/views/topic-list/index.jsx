import React from 'react'
import {
    observer,
    inject
} from 'mobx-react'

@inject('appState') @observer
export default class TopicList extends React.Component {

    constructor(){
        super()
        this.changeName = this.changeName.bind(this)
    }
    changeName(e) {
        this.props.appState.changeName(e.target.value)

    }
    render() {
        return(
            <div>
                {/*执行onChange的时候，整个上下文已经不在我们组件内部了，需要在constructor内部进行绑定*/}
                <input type="text" onChange={this.changeName}/>
                <span>{this.props.appState.msg}</span>
            </div>
        )
    }
}