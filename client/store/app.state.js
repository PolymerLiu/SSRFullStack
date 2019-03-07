import {
    observable,
    computed,
    autorun,
    action,
} from 'mobx'


//为什么要定义一个class,方便组织我们的store，每一个store就是class的一个实例
//
class AppState{
    //装饰器修饰以后，其值改变就会自动更新相应的视图层
    @observable count = 0
    @observable name = 'Jeffrey'


    @computed
    get msg() {
        return `${this.name} say count is ${this.count}`
    }

    @action
    changeName(name) {
        this.name = name
    }


    @action
    add() {
        this.count += 1
    }
}

const appState = new AppState()

//当appState更新了，下方autorun会自动执行
autorun(() => {
    console.log(appState.msg);
})


//每间隔一秒钟更新我们的counter
setInterval(() => {
    appState.add()
},1000)

export default appState