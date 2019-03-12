import {UserActions} from '../actiontypes/user.actions.js'


const initialState = {
  loginedUser:{},
  allUsers:[]
}

export function user(state = initialState,action){
  switch(action.type){
    case UserActions.AUTH_CHECK_SUCCESS:
      return {...state,loginedUser:action.data}
    case UserActions.LOGIN_SUCCESS:
      return {...state,loginedUser:action.data}
    case UserActions.REGISTER_SUCCESS:
      return {...state,loginedUser:action.data}
    case UserActions.GET_ALL_USERS_SUCCESS:
      return {...state,allUsers:action.data}
    case UserActions.DELETE_USER_SUCCESS:
      return {...state,allUsers:action.data}
    case UserActions.CHANGE_USER_TYPE_SUCCESS:
      return {...state,allUsers:action.data}
    case UserActions.LOGOUT:
      return initialState
    case UserActions.GITHUB_LOGIN:
      return {...state,loginedUser:action.user}
    default:
      return state
  }
}

export function login({username,pwd}){
  return({
    type:UserActions.LOGIN,
    username,
    pwd
  })
}

export function register({username,pwd}){
  return ({
    type:UserActions.REGISTER,
    username,
    pwd
  })
}

export function getAuth(){
  return({
    type:UserActions.AUTH_CHECK
  })
}

export function logout(){
  return ({
    type:UserActions.LOGOUT
  })
}

export function getAllUser(){
  return({
    type:UserActions.GET_ALL_USERS
  })
}

export function deleteUser(id){
  return ({
    type:UserActions.DELETE_USER,
    id
  })
}

export function changeUserType(id,usertype){
  return ({
    type:UserActions.CHANGE_USER_TYPE,
    id,
    usertype
  })
}

export function githubLogin(user){
  return ({
    type:UserActions.GITHUB_LOGIN,
    user
  })
}
