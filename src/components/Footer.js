import React, {Component} from "react";
import * as todoActions from '../store/actions/todo.actions'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class Footer extends Component {

   clear_todo = () => {
   if(window.confirm('deleteCompleted')) {
	this.props.clear_todo_complete()
   }
   }
  


   render() { 
    //此时可以过滤出未选择的任务，然后统计数据，做为具体值使用
   let taskLength =  this.props.todos.filter(todo=>!todo.isCompleted).length

     console.log(this.props.filter)
    return( 
       
            <footer className="footer">
			
				<span className="todo-count">
					<strong>{taskLength}</strong> item left
				</span>
			
				<ul className="filters">
					<li>
						<span onClick={()=>{this.props.modify_todo_filter('all')}}>All</span>
					</li>
					<li>
						<span onClick={()=>{this.props.modify_todo_filter('active')}}>Active</span>
					</li>
					<li>
						<span onClick={()=>{this.props.modify_todo_filter('completed')}}>Completed</span>
					</li>
				</ul>
			
				<button className="clear-completed" onClick={this.clear_todo}>Clear completed</button>
			</footer>

    )
   }



}
const mapStateToProps = (state)=> ({
	todos:state.todoReducer.todos,
	filter:state.todoReducer.filter
 })
 
 const mapDispatchToPros = (dispatch)=>({
  ...bindActionCreators(todoActions,dispatch)
 })
 //将todoActions指令跟 dispatch自动拼接 不需要写函数 重复操作
 
 
 export default connect (mapStateToProps,mapDispatchToPros)(Footer)