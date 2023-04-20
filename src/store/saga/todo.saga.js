/**
 * 1、完成异步操作
 * 2、重新发送新的指令
 */

import { takeEvery,put} from 'redux-saga'
import axios from 'axios'
import {load_todo_success,load_todo, add_todo, add_todo_success, remove_todo,
  remove_todo_success, modify_todo,modify_todo_success, clear_todo_completed,clear_todo_completed_success,
modify_todo_edit,modify_todo_edit_success, modify_todo_name,modify_todo_name_success } from '../actions/todo.actions'



//实现 load_todo_data 获取数据同时传递指令
function* load_todo_data() {
  let todoData  = yield axios.get('http://localhost:3000/api/data.json').then(res=>res.data)
  yield put(load_todo_success(todoData))
  //用put方法将todoData里面的数据返回给load_todo_success
}

//实现add_todo_data方法
function* add_todo_data(action) {
  // 1 完成异步操作
 let taskInfo = yield axios.post('http://localhost:3000/api/todos', {taskName:action.payload}).then(res=>res.data)
 //then里面的意思就是从数据里面找到调用后data 的信息
  // 2 重新发送指令
 yield put(add_todo_success(taskInfo.task))
}
//拦截到的信息在action中 可以通过action.payload修改信息
//add_todo_success将新的信息交给taskInfo的task


//实现remove_todo   remove_todo_data是异步操作，remove——todo在异步后成以remove——todo-data传出

function* remove_todo_data(action) {
//此时id利用相应的接口传递给后端执行相应的删除操作
let res =   yield axios.delete('http://localhost:3000/api/todos',{ 
  //传参
  params:{
    id:action.payload
  }
}).then(res => res.data)
//重新发送指令
yield put(remove_todo_success(res.tasks.id))
 //指令 在异步操作执行时用remove——todo_data  ，完成后传给remove——todo——success
}


//实现modifytodo


function* modify_todo_data(action) {
  let params = action.payload
  yield axios.put('http://localhost:3000/api/todos/isCompleted',params).then(res=>res.data)
  yield put(modify_todo_success(params))
   //指令 在异步操作执行时用remove——todo_data  ，完成后传给remove——todo——success
  }
  

//实现clear——todo——data
function* clear_todo_completed_data() {
  yield axios.delete('http://localhost:3000/api/todos/clearCompleted')
  //利用axios删除后端数据

  yield put(clear_todo_completed_success())
}


function* modify_todo_edit_data(action) {
   yield axios.put('http://localhost:3000/api/todos/isEditing',action.payload)
   yield put(modify_todo_edit_success(action.payload))
}





export default function* todoSaga() {
  yield  takeEvery(load_todo,load_todo_data)
  //异步操作之前的指令是load_todo  异步操作后发出的指令其实是新指令load_todo_data
   yield takeEvery(add_todo,add_todo_data)
   yield takeEvery(remove_todo,remove_todo_data)
   yield takeEvery(modify_todo,modify_todo_data)
   yield takeEvery(clear_todo_completed,clear_todo_completed_data)
   yield takeEvery(modify_todo_edit,modify_todo_edit_data)
   yield takeEvery(modify_todo_name,modify_todo_name_data)
}

