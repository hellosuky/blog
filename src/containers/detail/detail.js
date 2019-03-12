import React,{Component} from 'react'
import {connect} from 'react-redux'
import remark from 'remark'
import remark2react from 'remark-react'
import {getBlogDetail,addViewCount,changeLikes,changeCollects,addComments} from '../../reducers/blog.redux'
import Comments from '../../components/comments/comments'
import {Icon,Button,message} from 'antd'
import './detail.css'


@connect(
  state => ({blog:state.blog,user:state.user}),
  {getBlogDetail,addViewCount,changeLikes,changeCollects,addComments}
)
class Detail extends Component{
  constructor(){
    super()
    this.state = {
      likes:false,
      collects:false
    }
  }
  componentWillMount(){
    let id = this.props.match.params.id
    if(!this.props.blog.currentBlog.title){
      this.props.getBlogDetail(id)
    }
  }
  componentDidMount(){
    let id = this.props.match.params.id
    this.props.addViewCount(id)
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.user.loginedUser._id && nextProps.blog.currentBlog.likes){
      let likes = nextProps.blog.currentBlog.likes.indexOf(nextProps.user.loginedUser._id) >-1
      let collects = nextProps.blog.currentBlog.collects.indexOf(nextProps.user.loginedUser._id) >-1
      this.setState({likes,collects})
    }
  }
  componentWillUnmount(){
    let id = this.props.match.params.id
    if(this.props.user.loginedUser._id){
      let likes = this.props.blog.currentBlog.likes.indexOf(this.props.user.loginedUser._id) >-1
      let collects = this.props.blog.currentBlog.collects.indexOf(this.props.user.loginedUser._id) >-1
      if(likes !== this.state.likes){
          this.props.changeLikes(id,this.state.likes)
      }
      if(collects !==this.state.collects){
        this.props.changeCollects(id,this.state.collects)
      }
    }
  }
  handleLike(){
    if(!this.props.user.loginedUser._id ){
      message.error('请先登录')
      return
    }
    this.setState({likes:!this.state.likes})
  }
  handleCollect(){
    if(!this.props.user.loginedUser._id ){
      message.error('请先登录')
      return
    }
    this.setState({collects:!this.state.collects})
  }
  render(){
    const {title,created_time,description} = this.props.blog.currentBlog
    return this.props.blog.currentBlog.likes?(
      <div className="detail-wrapper">
        <p className="detail-title">{title}</p>
        <p className="detail-time">{new Date(created_time).toLocaleString()}</p>
        <div className="detail-content">
          {remark().use(remark2react).processSync(description).contents}
        </div>
        <div className="detail-btn-pc">
          <Button type="circle" size="large"
           onClick={this.handleLike.bind(this)}>
             <Icon type="heart" theme={this.state.likes?'filled':'outlined'}/>
          </Button>
          <Button type="circle" size="large"
          onClick={this.handleCollect.bind(this)}>
            <Icon type="star" theme={this.state.collects?'filled':'outlined'}/>
          </Button>
        </div>
        <div className="detail-btn-mobile">
          <span  onClick={this.handleLike.bind(this)}>
            <Icon type="heart" theme={this.state.likes?'filled':'outlined'}/>
          </span>
          <span onClick={this.handleCollect.bind(this)}>
            <Icon type="star" theme={this.state.collects?'filled':'outlined'}/>
          </span>
          <span>喜欢:{this.props.blog.currentBlog.likes.length}</span>
          <span>评论:{this.props.blog.currentBlog.collects.length}</span>
        </div>
        <Comments blog={this.props.blog.currentBlog} user={this.props.user.loginedUser} addComments={this.props.addComments}/>
      </div>
    ):null
  }
}

export default Detail
