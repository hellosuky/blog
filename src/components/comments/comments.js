import React,{Component} from 'react'
import {
  Comment, Avatar, Form, Button, List, Input,message
} from 'antd'

const TextArea = Input.TextArea

const CommentList = ( comments ) => (
  <List
    dataSource={comments.comments}
    header={`${comments.comments.length} ${comments.comments.length > 1 ? 'replies' : 'reply'}`}
    itemLayout="horizontal"
    renderItem={item =>
      <Comment author={item.user_id.name} content={item.content}
      avatar={(<Avatar>{item.user_id.name[0]}</Avatar>)}
      datetime={new Date(item.created_time).toLocaleString()}/>
}
  />
)

const Editor = ({
  onChange, onSubmit, submitting, value,
}) => (
  <div>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        新增评论
      </Button>
    </Form.Item>
  </div>
)


class Comments extends Component{
  constructor(){
    super()
    this.state = {
      submitting: false,
      value: '',
    }
  }

  handleSubmit(){
    if (!this.state.value) {
      return;
    }

    if(!this.props.user._id){
      message.error('请先登录')
      return
    }
    this.setState({submitting: true})
    setTimeout(() => {
      this.props.addComments(this.props.blog._id,this.state.value)
      this.setState({submitting: false,value:''})
    }, 1000)

  }

  handleChange(e){
    this.setState({value: e.target.value})
  }

  render() {
    const {  submitting, value } = this.state
    return (
      <div>
        {this.props.blog.comments.length >0 && <CommentList comments={this.props.blog.comments} />}
        <Comment
          content={(
            <Editor
              onChange={this.handleChange.bind(this)}
              onSubmit={this.handleSubmit.bind(this)}
              submitting={submitting}
              value={value}
            />
          )}
        />
      </div>
    )
  }
}

export default Comments
