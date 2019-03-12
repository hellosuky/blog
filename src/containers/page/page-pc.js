import React,{Component} from 'react'
import {Row,Col} from 'antd'
import {connect} from 'react-redux'
import ArticleList from '../articleList/article-list'
import NewestArticle from '../../components/newestArticle/newest-article'
import {getLatestBlog,getBlogDetail} from '../../reducers/blog.redux'
import './page-pc.css'

@connect(
  state => state.blog,
  {getLatestBlog,getBlogDetail}
)
class PagePC extends Component{
  componentWillMount(){
    this.props.getLatestBlog()
  }
  render(){
    return(
      <div className="page-pc-wrapper">
        <Row>
          <Col span={16}><ArticleList history={this.props.history}/></Col>
          <Col offset={2} span={6}><NewestArticle getBlogDetail={this.props.getBlogDetail} history={this.props.history} data={this.props.LastestBlogs}/></Col>
        </Row>
      </div>
    )
  }
}

export default PagePC
