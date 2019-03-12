import React,{Component} from 'react'
import {connect} from 'react-redux'
import {getBlogs,deleteBlog,getBlogDetail} from '../../reducers/blog.redux'
import {Pagination} from 'antd'
import BlogCell from './components/blogcell'
import './adminblogs.css'

@connect(
  state => state.blog,
  {getBlogs,deleteBlog,getBlogDetail}
)
class AdminBlogs extends Component{
  componentWillMount(){
    this.props.getBlogs(1)
  }
  handleChange(pageNumber){
    this.props.getBlogs(pageNumber)
  }
  render(){
    return (
      <div id="adminblogs-wrapper">
        <table>
        <thead className="adminblogs-header">
          <tr>
            <th>文章名称(红色为草稿)</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody className="adminblogs-body">
          {this.props.blogList.map(v=>
            <BlogCell key={v._id}
            id={v._id}
            isPublish={v.isPublish}
            viewCount={v.view_count}
            deleteBlog={this.props.deleteBlog}
            getBlogDetail={this.props.getBlogDetail}
            blogname={v.title}
            />)}
        </tbody>
        </table>
        <Pagination showQuickJumper
        defaultCurrent={1} total={100}
        onChange={this.handleChange.bind(this)}>页</Pagination>
      </div>
    )
  }
}

export default AdminBlogs
