import React,{Component} from 'react'
import {Button,Popconfirm} from 'antd'
import {withRouter} from 'react-router-dom'

@withRouter
class BlogCell extends Component{
  handleDelete(){
    this.props.deleteBlog(this.props.id)
  }
  handleUpdate(){
    this.props.getBlogDetail(this.props.id)
    this.props.history.push(`/admin/updateblog`)
  }
  handleComments(){
    this.props.history.push(`/admin/comments/${this.props.id}`)
  }
  render(){
    return (
      <tr style={this.props.isPublish?{'color':'#000'}:{'color':'red'}}>
        <th>
          <p>{this.props.blogname}</p>
          <div>
            <span className="adminblogs-subtitle">阅读数:{this.props.viewCount}</span>
          </div>
        </th>
        <th>
          <Button type="primary" onClick={this.handleUpdate.bind(this)}>编辑</Button>
          <Popconfirm title="你确认要删除吗？" onConfirm={this.handleDelete.bind(this)} okText="是" cancelText="否">
            <Button type="primary">删除</Button>
          </Popconfirm>
          {this.props.isPublish?<Button onClick={this.handleComments.bind(this)}>管理评论</Button>:null}
        </th>
      </tr>
    )
  }
}

export default BlogCell
