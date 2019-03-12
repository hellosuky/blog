import React ,{Component} from 'react'
import {Tabs} from 'antd'
import Login from '../../components/login/login'
import Register from '../../components/register/register'
import {connect} from 'react-redux'
import io from 'socket.io-client'
import OAuth from '../../components/oauth/oauth'
import {login,register,githubLogin} from '../../reducers/user.redux'
import './authcheck.css'

const socket = io('https://warm-falls-84564.herokuapp.com/')

const TabPane = Tabs.TabPane;

@connect(
  state => state.user,
  {login,register,githubLogin}
)
class AuthCheck extends Component{
  constructor(){
    super()
    this.setNode = this.setNode.bind(this)
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.loginedUser.name){
      setTimeout(()=>this.props.close(),1500)
    }
  }
  setNode(node){
    this.node = node
  }
  handleClickOutside(ev){
    if(this.node && !this.node.contains(ev.target)){
        this.props.close()
    }
  }
  render(){
    return(
      <div className="auth-wrapper" onClick={this.handleClickOutside.bind(this)}>
        <div className="auth-container" ref={this.setNode}>
          <Tabs>
            <TabPane tab="登录" key="1">
                <Login login={this.props.login}/>
            </TabPane>
            <TabPane tab="注册" key="2">
              <Register register={this.props.register}/>
            </TabPane>
          </Tabs>
          <div><OAuth socket={socket} githubLogin={this.props.githubLogin}/></div>
        </div>
      </div>
    )
  }
}

export default AuthCheck
