import React,{Component} from 'react'
import {Icon} from 'antd'
import './isloading.css'

class IsLoading extends Component{
  render(){
    return(
      <div className="loading-wrapper">
        <Icon type="loading" spin/>
      </div>
    )
  }
}

export default IsLoading
