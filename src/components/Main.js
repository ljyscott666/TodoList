import React, {Component} from "react";
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux'
import * as todoActions from '../store/actions/todo.actions'
import todoSaga from "../store/saga/todo.saga";





class Main extends Component {

componentDidMount( )  {
//调用具体的指令函数，触发数据获取操作 
//load_todo指令函数来做todoaction里面
    this.props.load_todo()
}

removeTask(id) {
  //用if语句防止误删
  if(window.confirm('delete?')) {
    //触发删除操作指令（异步操作+新指令重新发给reducer）
    this.props.remove_todo(id)
  }  
}

modify_name(id,ev) {
//1、切换状态
this.props.modify_todo_edit({id:id, isEditing:false})
//2、修改数据
this.props.modify_todo_name({id:id,taskName:ev.target.value})
}



   render() { 
    return( 
      
        <section className="main">
      
        <input className="toggle-all" type="checkbox" />
        <ul className="todo-list">
            
           { 
           this.props.todos.map(item =>{
            let classes  = [] 
            if(item.isCompleted) classes.push('completed')
            if(item.isEditing) classes.push('editing')

            return(
            <li key={item.id} className={classes.join(' ')}>
                    
              
                <div className="view">
                    <input className="toggle" type="checkbox" defaultChecked={item.isCompleted}  onChange={(e)=>{this.props.modify_todo({id:item.id,isCompleted:e.target.checked})}}/>
                    <label onDoubleClick={()=>{this.props.modify_todo_edit({id:item.id, isEditing:true})}}>{item.taskName}</label>
                    <button className="destroy" onClick={this.removeTask.bind(this,item.id)}></button>
                </div>
             
                <input defaultValue={item.taskName} className="edit" onBlur={this.modify_name.bind(this,item.id)}   />
            </li>
          )}) }
        </ul>
    </section>
//   <li key={item.id} className={item.isCompleted ? 'completed' : ''}> 用三元表达式来判断，如果是完成了，就会显示完成后对应的样式，进行样式绑定


    )
   }



}

//{ this.props.todos.map(item =>(  这里面的todos是从todos:state.todoReducer.todos
//里面来的 然后用map方法将其展开并渲染

//1、获取store当中的数据
const mapStateToProps = (state) =>({
    
    todos: filterTodos(state.todoReducer.todos, state.todoReducer.filter)
})

//2 处理 dispatch函数

const mapDispatchToProps =(dispatch ) => ({
...bindActionCreators(todoActions, dispatch)})
//todoActions 里面装的是指令信息
//由于bindActionCreators（）这样是一个对象 所以用...展开


//3 定义方法依据filter筛选出需要展示的数据

function filterTodos(todos, filter) {


  // eslint-disable-next-line default-case
  switch(filter){
    case 'all':
      return todos
     case 'active': 
      return  todos.filter(todo => !todo.isCompleted)
      case 'completed' :
        return todos.filter(todo => todo.isCompleted)
      
}   
}
export default connect(mapStateToProps,mapDispatchToProps)(Main)