import React, {Component} from "react";
import * as todoActions from '../store/actions/todo.actions'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
class Header extends Component {

 addTodo = (ev) => {
    if(ev.keyCode === 13){
      //01 获取当前输入框里的内容
      let taskName =ev.target.value
       if(taskName.trim().length ===0) {
         alert('plz input taskname')
         return
       }
      //02触发新增任务的指令
     this.props.add_todo(taskName)


      //03清空文本框
      ev.target.value = ''

    }
 }
//用if判断是否是回车事件，形成事件监听机制
//

   render() { 
    return( 
        
            <header className="header">
				<h1>todos</h1>
				<input onKeyUp={this.addTodo} className="new-todo" placeholder="还有什么任务没有完成?"  />
			</header>

        
    )
   }



}


//组件与store 

const mapStateToProps = (state)=> ({
   todos:state.todoReducer.todos
})

const mapDispatchToPros = (dispatch)=>({
 ...bindActionCreators(todoActions,dispatch)
})
//将todoActions指令跟 dispatch自动拼接 不需要写函数 重复操作


export default connect (mapStateToProps,mapDispatchToPros)(Header)