/*reduxreduxreduxreduxreduxreduxreduxreduxreduxredux*/
import createStore from 'redux'

//store 创建的初始状态
const initState = {
    count: 0
}

//注册一个action
const ADD_ACTION = 'ADD'
const add = (num) => {
    return{
        type: ADD_ACTION,
        num,
    }
}

//创建一个reducer，该reducer是修改store中值的一个步骤
//该reducer就是一个方法，其接收俩参数，第一个是调用reducer之前的state，第二个参数是上方action返回的值
const reducers = (state = initState,action) => {
    switch (action.type) {
        case ADD_ACTION:
            //此处返回一个全新的对象（比较浪费资源，不那么高效），其是从源store中拷贝过来，并对数据进行修改
            return Object.assign({},state,{
                count:state.count + action.num
            })
        default:
            return state
    }
}

//创建一个store
const reduxStore = createStore(reducers)
//触发一次store，传入我们要操作的action
reduxStore.dispatch(add(1))

/*mobxmobxmobxmobxmobxmobxmobxmobxmobxmobxmobxmobxmobxmobxmobxmobxmobxmobxmobxmobx*/

import {observable,action} from 'mobx'
const mobxStore = observable({
    count: 0,
    add: action((num) => {
        this.count += num
    })
})

mobxStore.add(1)

// redux优点
// 每次都是返回一个全新的对象，每触发一个action都会导致所有的component重新渲染，，结合虚拟DOM可以高效的完成这一操作
// 每次去调一个action，调用声明式的action,可以轻易的追踪到action的调用记录，极大的方便了我们调试代码
//  对流程化要求较高，可以考虑采用redux，因为其每一个操作都是固定的（限制的比较死）


// mobx优点（采用的是一种reactive的形式，和vuex类似）
// 数据只有一份，每次修改都是在原来的基础上修改，修改后会通知用到该数据的视图，让其自动更新视图
// 相对于redux效率会高一点，写法更简洁
