/**
 * 接受到指令后对数据进行相应的处理
 * 
 * 
 */

import {handleActions as createReducer } from 'redux-action'
//handleActions用来合并reducers
import { load_todo_success ,add_todo_success,remove_todo_success,modify_todo_success} from "../actions/todo.actions"
import todoSaga from '../saga/todo.saga'


const intialState = {
    todos:[]
}

export default createReducer({ 
[load_todo_success]:(state,action)=>({
    todos: action.payload
    //不做追加只做覆盖，将获取的到数据给到todos
    //payload在异步操作做完后，会被手动传递过来
}),
[add_todo_success]:(state,action) => ({todos:[...state.todos,action.payload]}),
//这里是将state里面的todos展开再通过数组的形式进行拼接

//createReducer({},) 第一个是一个对象函数，第二是个一个初始值 
//由于load_todo_success是个对象 不能给一个对象赋予另一个对象函数所以这里用【】

[remove_todo_success]:(state,action) => {
    //需要获取被删除项的id
    let id = action.payload
    
    let index = state.todos.findIndex(todo=>todo.id === id)
    //找到对应id

    let todos = JSON.parse(JSON.stringify(state.todos))
    //深拷贝里面的浅拷贝 解析出state里面的todos数组

    todos.splice(index ,1)
    //将index对应的项提出

    return { 
        todos:todos
    }
    //重新渲染新数组
},

[modify_todo_success]:(state,action) => {
    //拿出信息 
    let params = action.payload 
   //基本思路
   /**
    * 1、后续需要先找到对应选项
    * 2、将对应项里面的item。id和isCompleted属性修改
    */
    let index = state.todos.findIndex(todo => todo.id ===id)

    let todos = JSON.parse(JSON.stringify(state.todos))

    todos[index].isComoleted = params.isComoleted
    //将对应的项跟点击到的项 里面的isCompleted保持一致
    return {
        todos:todos
    }
},












},intialState)