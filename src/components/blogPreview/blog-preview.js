import React,{Component} from 'react'
import {Modal} from 'antd'
import {stateToHTML} from 'draft-js-export-html'
import {convertFromRaw} from 'draft-js'
import './blog-preview.css'

class BlogPreview extends Component{
  handleOk(){
    this.props.close()
  }
  handleCancel(){
    this.props.close()
  }
  render(){
    return (
      <Modal
      title="博文预览"
      visible={this.props.visible}
      onOk={this.handleOk.bind(this)}
      onCancel={this.handleCancel.bind(this)}>
        <div className="modal-wrapper" dangerouslySetInnerHTML={{__html: stateToHTML(convertFromRaw(JSON.parse(window.localStorage.getItem('content'))))}}/>
      </Modal>
    )
  }
}

export default BlogPreview
