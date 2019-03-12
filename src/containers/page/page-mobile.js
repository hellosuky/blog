import React,{Component} from 'react'
import ArticleList from '../articleList/article-list'
import './page-mobile.css'

class PageMobile extends Component{
  render(){
    return(
    <div className="page-mobile-wrapper">
      <ArticleList history={this.props.history}/>
    </div>
    )
  }
}

export default PageMobile
