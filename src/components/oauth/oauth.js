import React,{Component} from 'react'
import {message,Icon} from 'antd'
import './oauth.css'

class OAuth extends Component{
  constructor(){
    super()
    this.state = {
      disabled:'' //set the btn to prevent client to click too much time
    }
  }
  componentDidMount(){
    const {socket} = this.props

    socket.on('github',user=> {  //listen any res
      message.success('登录成功',1)
      this.props.githubLogin(user)
      this.popup.close()
    })
  }
  componentWillReceiveProps
  checkPopup(){ //set a timeout to keep tracking login btn disabled or not
    const check = setInterval(() =>{
      const {popup} = this
      if(!popup || popup.closed || popup.closed === 'undefined'){
        clearInterval(check)
        this.setState({disabled:''})
      }
    },1000)
  }
  openPopup(){ //lauches the popup by make a request and pass along the socket id to let backend send data back
    const {socket} = this.props
    const width = 600,height=600
    const left = (window.innerWidth/2) - (width/2)
    const top = (window.innerHeight / 2) - (height / 2)
    const url = `http://localhost:9090/api/user/github?socketId=${socket.id}`

    return window.open(url, '',
      `toolbar=no, location=no, directories=no, status=no, menubar=no,
      scrollbars=no, resizable=no, copyhistory=no, width=${width},
      height=${height}, top=${top}, left=${left}`
    )
  }
  startAuth(e){ //Kicks off the processes of opening the popup on the server and listening to the popup.
    if(!this.state.disabled){
      e.preventDefault()
      this.popup = this.openPopup()
      this.checkPopup()
      this.setState({disabled:'disabled'})
    }
  }
  render(){
    return(
        <span onClick={this.startAuth.bind(this)} className="oauth-wrapper">
            <Icon type="github" /><span>第三方登录</span>
        </span>
    )
  }
}

export default OAuth
