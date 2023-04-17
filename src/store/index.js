/**
 * 当前模块完成store的创建和中间件的注册
 */

import  {createStore, applyMiddleware} from 'redux'
import rootReducer from './reducers/root.reducer'
//为什么叫rootReducer是因为文件名叫rootReducer

import createSagaMiddleware from 'redux-saga'
//创建saga中间件 
import todoSaga from './saga/todo.saga'
//导入todosaga ，todosaga将load——todo 经过异步后，发送load_todo_data指令
const  sagaMiddleware =  createSagaMiddleware()
//调用createSagaMiddleware方法
const store = createStore(rootReducer,applyMiddleware(sagaMiddleware))

sagaMiddleware.run(todoSaga)

export default store
