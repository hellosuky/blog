import React,{Component} from 'react'
import { Upload, Icon} from 'antd';
import axios from 'axios'


class UploadComp extends Component{
  constructor(){
    super()
    this.state = {
      url:''
    }
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.clear){
      this.setState({url:''},()=>{
        this.props.clearFinish()
      })
    }
    if(nextProps.cover){
      this.setState({url:nextProps.cover})
    }
  }
  handleCustomRequest(options:any){
    const data= new FormData()
			data.append('cover', options.file)
			const config= {
				"headers": {
					"content-type": 'multipart/form-data; boundary=----WebKitFormBoundaryqTqJIxvkWFYqvP5s'
				}
			}
			axios.post('/upload/cover', data, config)
      .then((res: any) => {
        this.props.getPicUrl(res.data.data.path)
        this.setState({url:res.data.data.path})
        options.onSuccess(res.data, options.file)
			}).catch((err: Error) => {
				console.log(err)
			})
  }
  render() {
    const uploadButton = (
     <div>
       <Icon type='plus' />
       <div className="ant-upload-text">Upload</div>
     </div>
   )
    return (
      <div className="clearfix">
        <Upload
          customRequest={this.handleCustomRequest.bind(this)}
          listType="picture-card"
          showUploadList={false}
        >
          {this.state.url ?<img alt="example" style={{ width: '128px' }} src={`http://localhost:9090/${this.state.url}`} />: uploadButton}
        </Upload>
      </div>
    );
  }
}

export default UploadComp
