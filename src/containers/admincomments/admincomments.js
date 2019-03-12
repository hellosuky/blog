import React,{Component} from 'react'
import {connect} from 'react-redux'
import {getBlogDetail,deleteComment} from '../../reducers/blog.redux'
import {Pagination,Empty} from 'antd'
import BlogCell from './components/blogcell'
import './adminblogs.css'

@connect(
  state => state.blog,
  {getBlogDetail,deleteComment}
)
class AdminComments extends Component{
  componentWillMount(){
    let id = this.props.match.params.id
    this.props.getBlogDetail(id)
  }
  handleChange(pageNumber){
    this.props.getBlogs(pageNumber)
  }
  render(){
    return this.props.currentBlog.title?(
      <div id="adminblogs-wrapper">
        <table>
        <thead className="adminblogs-header">
          <tr>
            <th>文章：{this.props.currentBlog.title}</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody className="adminblogs-body">
          {this.props.currentBlog.comments.map(v=>
            <BlogCell key={v._id}
            id={v._id}
            deleteComment={this.props.deleteComment}
            name={v.user_id.name}
            content={v.content}
            />)}
        </tbody>
        </table>
        <Pagination showQuickJumper
        defaultCurrent={1} total={100}
        onChange={this.handleChange.bind(this)}>页</Pagination>
      </div>
    ):<Empty/>
  }
}

export default AdminComments
