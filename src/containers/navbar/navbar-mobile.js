import React,{Component,Fragment} from 'react'
import {Button,Icon,Input} from 'antd'
import {connect} from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import LoginedMenu from '../loginedMenu/logined-menu'
import AuthCheck from '../authcheck/authcheck'
import {logout} from '../../reducers/user.redux'
import {updateSearchWord,getBlogs,updateCategory} from '../../reducers/blog.redux'
import _ from 'lodash'
import './navbar-mobile.css'

@connect(
  state => state.user,
  {logout,updateSearchWord,getBlogs,updateCategory}
)
class NavBarMobile extends Component{
  constructor(){
    super()
    this.state = {
      openMenu:false,
      showAuthCheck:false
    }
    this.setNode = this.setNode.bind(this)
  }
  handleOpenMenu(){
    this.setState({openMenu:true})
  }
  handleClickOutside(event){
    if (!this.node.contains(event.target) && this.node) {
      this.setState({openMenu:false})
    }
  }
  setNode(node){
    this.node = node
  }
  handleAuth(){
    this.setState({showAuthCheck:true})
  }
  closeAuthCheck(){
    this.setState({showAuthCheck:false})
  }
  handleFront(){
    this.props.updateSearchWord('')
    this.props.updateCategory('')
    this.props.getBlogs(1,true)
    this.props.history.push('/')
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
    this.setState({openMenu:false})
    this.props.history.push('/')
  }
  render(){
    const {showAuthCheck} = this.state
    return(
      <Fragment>
        <div>
          {showAuthCheck?<AuthCheck close={this.closeAuthCheck.bind(this)}/>:null}
          <div className="navbar-mobile-wrapper">
            <ul className="navbar-mobile-ul">
              <li onClick={this.handleOpenMenu.bind(this)}>
                <Icon type="bars" style={{'fontSize':'25px'}}/>
              </li>
              <li onClick={this.handleFront.bind(this)} className="navbar-mobile-logo">suky's blog</li>
              <li>{this.props.loginedUser.name? <LoginedMenu history={this.props.history} logout={this.props.logout}
              avatar={this.props.loginedUser.avatar} name={this.props.loginedUser.name[0]}/>:
                <Button size="small" onClick={this.handleAuth.bind(this)}>注册/登录</Button>}</li>
            </ul>
            <div className="search-input"><Input placeholder="请输入你要搜索的东西" onChange={this.handleSearch.bind(this)}/></div>
          </div>
        </div>
        <nav className="navbar-menu" style={this.state.openMenu?{'display':'block'}:{'display':'none'}}
        onClick={this.handleClickOutside.bind(this)}>
        <CSSTransition in={this.state.openMenu} timeout={200} classNames="fade" unmountOnExit>
          <ul className="navbar-menu-ul" ref={this.setNode}>
            {this.props.tags.filter(v=> v.front).slice(0,5).map(v=><li key={v._id}
              onClick={this.handleCategory.bind(this,v._id)}>{v.tag}</li>)}
          </ul>
        </CSSTransition>
        </nav>
      </Fragment>
    )
  }
}

export default NavBarMobile
