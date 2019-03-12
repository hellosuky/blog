import React,{Component} from 'react'
import {Form,Input,Button} from 'antd'

class Login extends Component{
  constructor(){
    super()
    this.state = {
      username:'',
      pwd:'',
      errorMessage:''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(key,val){
    this.setState({
      [key]:val
    })
  }
  handleSubmit(){
    if(!this.state.username || !this.state.pwd){
      this.setState({errorMessage:'请输入账户名或密码'})
    }else{
      this.props.login(this.state)
    }
  }
  render(){
    return(
      <Form className="auth-form">
        {this.state.errorMessage ? <p>{this.state.errorMessage}</p>:null}
        <Form.Item>
            <Input placeholder="用户名"
            value={this.state.username}
            onChange={(e) => this.handleChange('username',e.target.value)}/>
        </Form.Item>
        <Form.Item>
            <Input placeholder="输入密码"
            type="password"
            value={this.state.pwd}
            onChange={(e) => this.handleChange('pwd',e.target.value)}/>
        </Form.Item>
        <Button className="auth-submit" type="primary" onClick={this.handleSubmit}>确认登录</Button>
      </Form>
    )
  }
}

export default Login
