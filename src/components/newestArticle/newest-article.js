import React,{Component} from 'react'
import {List} from 'antd'
import './newest-article.css'

class NewestArticle extends Component{
  handleClick(id){
    this.props.getBlogDetail(id)
    this.props.history.push(`/detail/${id}`)
  }
  render(){
    return(
      <List
      className="latest-article-wrapper"
      header={<div>最近文章</div>}
      bordered
      dataSource={this.props.data}
      renderItem={item => (<List.Item onClick={this.handleClick.bind(this,item._id)}>{item.title}</List.Item>)}
    />
    )
  }
}

export default NewestArticle
