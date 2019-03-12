import React,{Component,Fragment} from 'react'
import {Switch,Route} from 'react-router-dom'
import MediaQuery from 'react-responsive'
import {connect} from 'react-redux'
import {message} from 'antd'
import Home from '../home/home'
import Detail from '../detail/detail'
import NotFound from '../../components/notfound/notfound'
import IsLoading from '../../components/isloading/isloading'
import NavBarPC from '../navbar/navbar-pc'
import NavBarMobile from '../navbar/navbar-mobile'
import FooterCustom from '../../components/footer/footer'
import {clearMsg} from '../../reducers/global.redux'
import {getTag} from '../../reducers/tag.redux'
import {getBlogs} from '../../reducers/blog.redux'
import {getAuth} from '../../reducers/user.redux'

@connect(
  state => ({global:state.globalMsg,tags:state.tag}),
  {clearMsg,getTag,getBlogs,getAuth}
)
class Front extends Component{
  componentWillMount(){
    //初始化标签，文章列表,检测登录状态
    this.props.getTag()
    this.props.getBlogs(1,true)
    this.props.getAuth()
  }
  componentWillReceiveProps(nextProps){
    //提示信息
    if(nextProps.global.globalMsg.content){
      message[nextProps.global.globalMsg.type === 0 ? "success":'error'](
        nextProps.global.globalMsg.content
      ).then(()=>this.props.clearMsg())
    }
  }
  render(){
    return(
      <Fragment>
        <header>
          <MediaQuery maxWidth={768}>
            <NavBarMobile  history={this.props.history} tags={this.props.tags.tags}/>
          </MediaQuery>
          <MediaQuery minWidth={768}>
            <NavBarPC history={this.props.history} tags={this.props.tags.tags}/>
          </MediaQuery>
        </header>
        <main>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/detail/:id" component={Detail}/>
            <Route component={NotFound}/>
          </Switch>
          {this.props.isLoading && <IsLoading/>}
        </main>
        <footer>
          <FooterCustom/>
        </footer>
      </Fragment>
    )
  }
}

export default Front
