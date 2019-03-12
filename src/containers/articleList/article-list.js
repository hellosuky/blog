import React,{Component} from 'react'
import { List, Icon } from 'antd'
import remark from 'remark'
import strip from 'strip-markdown'
import {connect} from 'react-redux'
import {getBlogDetail} from '../../reducers/blog.redux'
import './article-list.css'

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
)


@connect(
  state => state.blog,
  {getBlogDetail}
)
class ArticleList extends Component{
  handleClick(id){
    this.props.getBlogDetail(id)
    this.props.history.push(`/detail/${id}`)
  }
  render(){
    return(
    <List
    itemLayout="vertical"
    size="large"
    className="article-list-wrapper"
    pagination={{
      onChange: (page) => {
        this.props.getBlogs(page,true)
      },
      pageSize: 10,
    }}
    dataSource={this.props.blogList}
    renderItem={item =>
      (
          <List.Item
          key={item.title}
          actions={[<IconText type="star-o" text={item.view_count} />,
            <IconText type="like-o" text={item.likes.length} />,
           <IconText type="message" text={item.comments.length} />]}
          extra={<img width={272} alt="logo" src={item.cover?`http://localhost:9090/${item.cover}`
          :require('./nocover.jpg')} />}
          onClick={this.handleClick.bind(this,item._id)}
        >
          <List.Item.Meta
            title={<span>{item.title}</span>}
            description={new Date(item.created_time).toLocaleString()}
          />
          {remark().use(strip).processSync(item.description.substr(0,100)).contents}
        </List.Item>)
    }
  />
    )
  }
}

export default ArticleList
