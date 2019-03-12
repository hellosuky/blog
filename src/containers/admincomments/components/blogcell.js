import React,{Component} from 'react'
import {Button,Popconfirm} from 'antd'
import {withRouter} from 'react-router-dom'

@withRouter
class BlogCell extends Component{
  handleDelete(){
    let id = this.props.match.params.id
    this.props.deleteComment(id,this.props.id)
  }
  render(){
    return (
      <tr>
        <th>
          <p>作者：{this.props.name}</p>
          <div>
            <span className="adminblogs-subtitle">{this.props.content}</span>
          </div>
        </th>
        <th>
          <Popconfirm title="你确认要删除吗？" onConfirm={this.handleDelete.bind(this)} okText="是" cancelText="否">
            <Button type="primary">删除</Button>
          </Popconfirm>
        </th>
      </tr>
    )
  }
}

export default BlogCell
