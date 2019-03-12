import React ,{Component} from 'react'
import { Layout, Menu, Icon ,notification} from 'antd'
import {connect} from 'react-redux'
import {Switch,Route} from 'react-router-dom'
import AdminTags from '../admintags/admintags'
import AdminBlogs from '../adminblogs/adminblogs'
import NewBlog from '../newblog/newblog'
import AdminIndex from '../../components/adminindex/adminindex'
import AdminUsers from '../adminusers/adminusers'
import AdminComments from '../admincomments/admincomments'
import IsLoading from '../../components/isloading/isloading'
import {clearMsg} from '../../reducers/global.redux'
import {getAuth} from '../../reducers/user.redux'
import {viewMost} from '../../reducers/blog.redux'
import './blogmanager.css'

const { Header, Sider, Content } = Layout

const menus = [
  {url:'/admin',name:'首页',icon:'user'},
  {url:'/admin/users',name:'管理用户',icon:'rocket'},
  {url:'/admin/newblog',name:'写新博客',icon:'edit'},
  {url:'/admin/blogs',name:'管理博客',icon:'scissor'},
  {url:'/admin/tags',name:'管理标签',icon:'radar-chart'}
]

@connect(
  state => ({global:state.globalMsg,user:state.user,blog:state.blog}),
  {clearMsg,getAuth,viewMost}
)
class BlogManager extends Component{
  constructor(){
    super()
    this.state ={
      collapsed:false,
      current:'/'
    }
    this.toggle = this.toggle.bind(this)
    this.redirect = this.redirect.bind(this)
  }
  componentWillMount(){
    this.props.getAuth()
    this.props.viewMost()
  }
  componentDidMount(){
    setTimeout(this.redirect,1500)
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.global.globalMsg.content){
      notification[nextProps.global.globalMsg.type === 0 ? 'success':'error']({
        message:nextProps.global.globalMsg.content,
        duration:2,
        onClose:() => this.props.clearMsg()
      })
    }
  }
  redirect(){
    if(!this.props.user.loginedUser.name){
        notification.error({
        message:'你没有权限登录这里',
        duration:2,
        onClose:() => this.props.history.push('/')
      })
      return
    }
    if(this.props.user.loginedUser.name && this.props.user.loginedUser.type !=='admin'){
      notification.error({
      message:'你没有权限登录这里',
      duration:2,
      onClose:() => this.props.history.push('/')
    })
    return
    }
  }
  toggle(){
    this.setState({
      collapsed:!this.state.collapsed
    })
  }
  handleChooseMenu(e){
    this.setState({current:e.key})
    this.props.history.push(`${e.key}`)
  }
  render(){
    return(
      <Layout
      id="admin-wrapper">
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div className="logo" >{this.state.collapsed ? 'suky':'suky blog'}</div>
          <Menu theme="dark" mode="inline"
          defaultSelectedKeys={['/admin']}
          selectedKeys={[this.state.current]}
          onClick={this.handleChooseMenu.bind(this)}>
            {menus.map(v=>
                <Menu.Item key={v.url}>
                  <Icon type={v.icon}/>
                  <span>{v.name}</span>
                </Menu.Item>)
            }
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content style={{
            margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280,
          }}
          >
            {this.props.isLoading && <IsLoading />}
            <Switch>
              <Route path="/admin/users" component={AdminUsers}/>
              <Route path="/admin/tags" component={AdminTags}/>
              <Route path="/admin/blogs" component={AdminBlogs}/>
              <Route path="/admin/newblog" component={NewBlog}/>
              <Route path="/admin/updateblog" component={NewBlog}/>
              <Route path="/admin/comments/:id" component={AdminComments}/>
              <Route render={() => <AdminIndex blog={this.props.blog.blogList}/>}/>
            </Switch>
          </Content>
        </Layout>
      </Layout>
    )
  }
}

export default BlogManager
