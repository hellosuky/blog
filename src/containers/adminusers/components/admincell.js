import React,{Component} from 'react'
import {Select,Button,Popconfirm} from 'antd'

const Option = Select.Option

class AdminCell extends Component{
  constructor(){
    super()
    this.state = {
      editorState:false,
      usertype:''
    }
  }
  componentDidMount(){
    this.setState({usertype:this.props.type})
  }
  handleRevise(){
    this.setState({editorState:true})
  }
  handleSave(){
    this.props.changeUserType(this.props.id,this.state.usertype)
    setTimeout(()=>{
      this.setState({
        editorState:false
      })
    },1000)
  }
  handleChange(e){
    this.setState({usertype:e})
  }
  handleDelete(){
    this.props.deleteUser(this.props.id)
  }
  render(){
    return(
      <tr id="adminusers-wrapper">
        <th><span className="adminusers-name">{this.props.name}</span></th>
        <th>{this.state.editorState ?
          <Select defaultValue={this.props.type} className="adminusers-type" onChange={this.handleChange.bind(this)}>
            <Option value="client">游客</Option>
            <Option value="admin">管理员</Option>
          </Select> :<span className="adminusers-type">{this.props.type}</span>}</th>
        <th>{this.state.editorState ?
        <Button type="primary" onClick={this.handleSave.bind(this)} className="adminusers-btn">保存</Button>:
        <Button className="adminusers-btn" type="primary" onClick={this.handleRevise.bind(this)}>修改</Button>}
        <Popconfirm title="你确认要删除吗？" onConfirm={this.handleDelete.bind(this)} okText="是" cancelText="否">
          <Button type="primary" className="adminusers-delete">删除</Button>
        </Popconfirm>
        </th>
      </tr>
    )
  }
}

export default AdminCell
