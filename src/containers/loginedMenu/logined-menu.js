import React,{Component} from 'react'
import {Avatar,Icon} from 'antd'
import './logined-menu.css'

//make subMenu

class LoginedMenu extends Component{
  constructor(){
    super()
    this.state = {
      showMenu:false
    }
  }
  handleOver(){
    this.setState({showMenu:true})
  }
  handleLeave(){
    this.setState({showMenu:false})
  }
  handleLogout(){
    this.props.logout()
  }
  render(){
    return(
      <div className='hover-menu' onMouseLeave={this.handleLeave.bind(this)} onMouseEnter={this.handleOver.bind(this)}>
        <Avatar>{this.props.name[0]}</Avatar>
          {this.state.showMenu &&
          <ul className="hover-menu-dropper">
            <li onClick={this.handleLogout.bind(this)}><Icon type="export" />退出登录</li>
          </ul>}
      </div>
    )
  }
}

export default LoginedMenu
