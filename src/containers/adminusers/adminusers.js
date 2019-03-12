import React ,{Component} from 'react'
import {connect} from 'react-redux'
import AdminCell from './components/admincell'
import {getAllUser,deleteUser,changeUserType} from '../../reducers/user.redux'
import './adminusers.css'

@connect(
  state => state.user,
  {getAllUser,deleteUser,changeUserType}
)
class AdminUsers extends Component{
  componentDidMount(){
    this.props.getAllUser()
  }
  render(){
    return(
      <table id="AdminUsers-wrapper">
        <thead className="AdminUsers-header">
          <tr>
            <th>用户名</th>
            <th>用户类型</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody  className="AdminUsers-body">
        {this.props.allUsers.map(v=>
        <AdminCell key={v._id} id={v._id} name={v.name} type={v.type}
         deleteUser={this.props.deleteUser}
        changeUserType={this.props.changeUserType}/>)}
        </tbody>
      </table>
    )
  }
}

export default AdminUsers
