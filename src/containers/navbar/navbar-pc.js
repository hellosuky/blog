import React,{Component} from 'react'
import {Button,Input} from 'antd'
import {connect} from 'react-redux'
import AuthCheck from '../authcheck/authcheck'
import LoginedMenu from '../loginedMenu/logined-menu'
import {logout} from '../../reducers/user.redux'
import {updateSearchWord,getBlogs,updateCategory} from '../../reducers/blog.redux'
import _ from 'lodash'
import './navbar-pc.css'

const Search = Input.Search

@connect(
  state => state.user,
  {logout,updateSearchWord,getBlogs,updateCategory}
)
class NavBarPC extends Component{
  constructor(){
    super()
    this.state = {
      showAuthCheck:false
    }
  }
  handleAuthCheck(){
    this.setState({showAuthCheck:true})
  }
  closeAuthCheck(){
    this.setState({showAuthCheck:false})
  }
  handleSearch(e){
    this.props.updateSearchWord(e.target.value)
    _.debounce(()=>{
      this.props.getBlogs(1,true)
      this.props.history.push('/')
    },1000)()
  }
  handleCategory(id){
    this.props.updateCategory(id)
    this.props.getBlogs(1,true)
    this.props.history.push('/')
  }
  handleFront(){
    this.props.updateSearchWord('')
    this.props.updateCategory('')
    this.props.getBlogs(1,true)
    this.props.history.push('/')
  }
  render(){
    const {showAuthCheck} = this.state
    return(
      <div className="navbar-pc-wrapper">
        {showAuthCheck?<AuthCheck close={this.closeAuthCheck.bind(this)}/>:null}
        <ul className="navbar-pc-ul">
          {this.props.tags.filter(v=> v.front).slice(0,3).map(v=><li key={v._id} className="navbar-pc-tag"
          onClick={this.handleCategory.bind(this,v._id)}>{v.tag}</li>)}
          <li className="navbar-logo" onClick={this.handleFront.bind(this)}>suky's blog</li>
          <li>
            <Search
                placeholder="你想搜索什么"
                onChange={this.handleSearch.bind(this)}
              />
          </li>
          <li>{this.props.loginedUser.name?  <LoginedMenu history={this.props.history} logout={this.props.logout}
          avatar={this.props.loginedUser.avatar} name={this.props.loginedUser.name[0]}/>:
            <Button onClick={this.handleAuthCheck.bind(this)}>注册/登录</Button>
            }</li>
        </ul>
      </div>
    )
  }
}

export default NavBarPC
