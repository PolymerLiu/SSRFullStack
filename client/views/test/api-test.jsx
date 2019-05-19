import React from 'react'
import axios from 'axios'

export default class TestApi extends React.Component {
    getTopics(){
        axios.get('/api/topics')
            .then(res => {
                console.log(res);
            })
            .catch(e => {
                console.log(e);
            })
    }

    login(){
        axios.get('/api/user/PolymerLiu',{
            accessToken:'30c4e4f0-eafd-48c7-9419-82bf9c61e464'
        })
            .then(res => {
                console.log(res);
            })
            .catch(e => {
                console.log(e);
            })
    }


    markAll(){
        axios.get('/api/message/count?needAccessToken=true')
            .then(res => {
                console.log(res);
            })
            .catch(e => {
                console.log(e);
            })
    }
    render() {
        return (
            <div>
                <button onClick={this.getTopics}>topics</button>
                <button onClick={this.login}>login</button>
                <button onClick={this.markAll}>markAll</button>
            </div>
        )
    }
}