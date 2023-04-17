/* *
*  1、需要可以发送请求获取数据   load_todo
*  2、当异步操作完成之后还需要触发新的指令  load_todo_success
*
*/

//import {createAction } from "redux-actions";
//用createAction合并指令
import {createAction} from 'redux-action'

export const load_todo =createAction('load_todo');
export const load_todo_success =createAction('load_todo_success');
//等效于 export const load_todo =() => ({type:'load_todo'})，本质上就是那个dispatch
//这两个指令一个是原本该有的同步指令 load——todo ，然后当异步完成后，要做load_todo_success
//因为这里面考虑异步所有考虑两步走
//指定定义完成，指定服务于reducer
//以上为获取todos列表的相关指令


//02  新增todo 列表项的相关指令

export const  add_todo = createAction('add_todo');
export const  add_todo_success = createAction('add_todo_success');

//03 删除 指令

export const  remove_todo = createAction('remove_todo');
export const  remove_todo_success = createAction('remove_todo_success');

//04 更新指令
export const  modify_todo = createAction('remove_todo');
export const  modify_todo_success = createAction('remove_todo_success');