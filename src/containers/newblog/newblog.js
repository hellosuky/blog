import React,{Component} from 'react'
import {connect} from 'react-redux'
import remark from 'remark'
import remark2react from 'remark-react'
import UploadComp from '../../components/uploadComp/upload-comp'
import {Input,Button,Tag,message} from 'antd'
import {addNewBlog,editBlog} from '../../reducers/blog.redux'
import {getTag} from '../../reducers/tag.redux'
import './newblog.css'

const CheckableTag = Tag.CheckableTag

@connect(
  state => ({tag:state.tag,blog:state.blog}),
  {addNewBlog,editBlog,getTag}
)
class NewBlog extends Component{
  constructor(){
    super()
    this.state = {
      title:'',
      selectedTags:[],
      content:'',
      cover:'',
      clear:false
    }
    this.onChange = this.onChange.bind(this)
    this.checkBlog = this.checkBlog.bind(this)
    this.handleTags= this.handleTags.bind(this)
    this.clearFinish = this.clearFinish.bind(this)
  }
  componentWillMount(){
    this.props.getTag()
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.match.path==='/admin/updateblog' && nextProps.blog.currentBlog.title){
      const {title,tags,description,cover} = nextProps.blog.currentBlog
      this.setState({title,selectedTags:tags,content:description,cover})
    }
    if(nextProps.match.path==='/admin/newblog'){
      this.setState({title:'',selectedTags:[],content:'',cover:'',clear:true})
    }
  }
  checkBlog(){
    if(!this.state.title){
      message.error('请输入标题')
      return false
    }
    if(!this.state.selectedTags){
      message.error('请选择至少一个标签')
      return false
    }
    if(!this.state.content){
      message.error('你的博客内容为空')
      return false
    }
    return true
  }
  onChange(key,e){
    this.setState({[key]:e.target.value})
  }
  getPicUrl(path){
    this.setState({'cover':path})
  }
  handleTags(tag, checked) {
    const { selectedTags } = this.state
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter(t => t !== tag)
    this.setState({ selectedTags: nextSelectedTags })
  }
  handleDraft(){
    if(this.checkBlog()){
      const {title,content,selectedTags,cover} = this.state
      let isPublish = false
      if(this.props.match.path==='/admin/newblog'){
        this.props.addNewBlog(title,content,selectedTags,cover,isPublish)
      }else{
        this.props.editBlog(this.props.blog.currentBlog._id,title,content,selectedTags,cover,isPublish)
      }

      setTimeout(() =>
      this.setState({title:'',selectedTags:[],content:'',cover:'',clear:true}),2500)
    }
  }
  handlePublish(){
    if(this.checkBlog()){
      const {title,content,selectedTags,cover} = this.state
      let isPublish = true
      if(this.props.match.path==='/admin/newblog'){
        this.props.addNewBlog(title,content,selectedTags,cover,isPublish)
      }else{
        this.props.editBlog(this.props.blog.currentBlog._id,title,content,selectedTags,cover,isPublish)
      }
      setTimeout(() =>
      this.setState({title:'',selectedTags:[],content:'',cover:'',clear:true}),2500)
    }
  }
  clearFinish(){
    this.setState({clear:false})
  }
  render(){
    return(
      <div className="newblog-wrapper">
        <p className="newblog-p">请输入文章标题：</p>
        <Input className="newblog-title" value={this.state.title} onChange={e => this.onChange('title',e)}/>
        <p className="newblog-p">请选择文章分类：</p>
        {this.props.tag.tags.map(tag => (
          <CheckableTag
            key={tag._id}
            checked={this.state.selectedTags.indexOf(tag._id) > -1}
            onChange={checked => this.handleTags(tag._id, checked)}
          >
            {tag.tag}
          </CheckableTag>
        ))}
        <p className="newblog-p">请选择文章封面图片：</p>
        <UploadComp cover={this.state.cover} clear={this.state.clear} clearFinish={this.clearFinish} getPicUrl={this.getPicUrl.bind(this)}/>
        <p className="newblog-p">请输入你的正文：</p>
        <div className="markdown-editor">
          <textarea className="markdown-editor-textarea" placeholder="请输入你的博客正文" value={this.state.content} onChange={e => this.onChange('content',e)}/>
          <div className="markdown-editor-preview">
            {remark().use(remark2react).processSync(this.state.content).contents}
          </div>
        </div>
        <div className="newblog-btn">
          <Button onClick={this.handleDraft.bind(this)}>存为草稿</Button>
          <Button type="primary" onClick={this.handlePublish.bind(this)}>发布</Button>
        </div>
      </div>
    )
  }
}

export default NewBlog
