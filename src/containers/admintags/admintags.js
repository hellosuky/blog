import React,{Component} from 'react'
import {Button,Input,Popconfirm} from 'antd'
import {connect} from 'react-redux'
import {deleteTag,saveTagAsFront,addTag,getTag} from '../../reducers/tag.redux'
import './admintags.css'

const Search =Input.Search

@connect(
  state=> state.tag,
  {addTag,deleteTag,saveTagAsFront,getTag}
)
class AdminTags extends Component{
  constructor(){
    super()
    this.state = {
      input:''
    }
    this.handleEnter = this.handleEnter.bind(this)
  }
  componentWillMount(){
    this.props.getTag()
  }
  handleDeleteTag(id){
    this.props.deleteTag(id)
  }
  handleEnter(){
    this.setState({input:''})
    this.props.addTag(this.state.input)
  }
  handleSet(id,front){
    this.props.saveTagAsFront(id,!front)
  }
  handleChange(e){
    this.setState({
      input:e.target.value
    })
  }
  render(){
    return(
      <div id="admintags-wrapper">
      <p>新增标签</p>
      <Search
      onChange={this.handleChange.bind(this)}
      value={this.state.input}
      onSearch={this.handleEnter}
      enterButton="新增标签"/>
      <table className="admintags-table">
        <thead className="admintags-header">
          <tr>
            <th>所有标签</th>
            <th>操作</th>
            <th>设为首页分类</th>
          </tr>
        </thead>
        <tbody className="admintags-body">
          {this.props.tags.map(v=>{
          return <tr key={v._id}>
                    <th>{v.tag}</th>
                    <th><Popconfirm title="你确认要删除吗？"
                    onConfirm={this.handleDeleteTag.bind(this,v._id)} okText="是" cancelText="否">
                    <Button type="primary">删除</Button>
                    </Popconfirm></th>
                    <th><Popconfirm title="你确认要设为首页标签吗？"
                    onConfirm={this.handleSet.bind(this,v._id,v.front)} okText="是" cancelText="否">
                    <Button type={v.front?'':"primary"}>{v.front?'取消':'设置'}</Button>
                    </Popconfirm></th>
                 </tr>
          })}
        </tbody>
      </table>
      </div>
    )
  }
}

export default AdminTags
