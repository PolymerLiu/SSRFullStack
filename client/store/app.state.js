import {
    observable,
    computed,
    autorun,
    action,
} from 'mobx'


//为什么要定义一个class,方便组织我们的store，每一个store就是class的一个实例
//
export default  class AppState{
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
