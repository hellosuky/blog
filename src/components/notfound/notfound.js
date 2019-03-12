import React,{Component} from 'react'
import './notfound.css'

class NotFound extends Component{
  handleClick(){
    this.props.history.push('/')
  }
  render(){
    return(
      <div className="notfound-wrapper-container">
        <div className="notfound-wrapper">
          PAGE NOT FOUND
          <span className="notfound-span" onClick={this.handleClick.bind(this)}>GO BACK</span>
        </div>
      </div>
    )
  }
}

export default NotFound
