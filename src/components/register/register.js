import React,{Component} from 'react'
import {Form,Input,Button} from 'antd'


class Register extends Component{
  constructor(){
    super()
    this.state = {
      username:'',
      pwd:'',
      submitPwd:'',
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
    if(!this.state.username || !this.state.pwd || !this.state.submitPwd){
      this.setState({errorMessage:'用户名或密码为空'})
    }else if(this.state.pwd !== this.state.submitPwd){
      this.setState({errorMessage:'两次密码输入的不一致'})
    }else{
      this.props.register(this.state)
    }
  }
  render(){
    return(
      <Form className="auth-form">
        {this.state.errorMessage ? <p>{this.state.errorMessage}</p>:null}
        <Form.Item>
          <Input placeholder="用户名" value={this.state.username}
          onChange={(e) => this.handleChange('username',e.target.value)}/>
        </Form.Item>
        <Form.Item>
          <Input placeholder="输入密码" value={this.state.pwd}
          type="password"
          onChange={(e) => this.handleChange('pwd',e.target.value)}/>
        </Form.Item>
        <Form.Item>
          <Input placeholder="再输一次密码" value={this.state.submitPwd}
          type="password"
          onChange={(e) => this.handleChange('submitPwd',e.target.value)}/></Form.Item>
        <Button className="auth-submit" type="primary" onClick={this.handleSubmit}>确认注册</Button>
      </Form>
    )
  }
}

export default Register
