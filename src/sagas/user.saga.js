import {fork,all,put,call,take} from 'redux-saga/effects'
import axios from 'axios'
import {UserActions} from '../actiontypes/user.actions'
import {GlobalActions} from '../actiontypes/global.actions'


function* login(username,pwd){
  yield put({type:GlobalActions.FETCH_START})
  try{
    return yield call(axios.post,'/api/user/login',{username,pwd})
  }catch(err){
    yield put({type:GlobalActions.MSG_RETURN,msgType:1,msgContent:'客户端出错啦'})
  }finally{
    yield put({type:GlobalActions.FETCH_END})
  }
}

function* loginFlow(){
  while (true) {
    let req = yield take(UserActions.LOGIN)
    let res = yield call(login,req.username,req.pwd)
    if(res.data && res.data.code === 0 ){
      yield put({type:UserActions.LOGIN_SUCCESS,data:res.data.data})
      yield put({type:GlobalActions.MSG_RETURN,msgType:0,msgContent:res.data.msg})
    }else{
      yield put({type:GlobalActions.MSG_RETURN,msgType:1,msgContent:res.data.msg})
    }
  }
}

function* register(username,pwd){
  yield put({type:GlobalActions.FETCH_START})
  try{
    return yield call(axios.post,'/api/user/register',{username,pwd})
  }catch(err){
    yield put({type:GlobalActions.MSG_RETURN,msgType:1,msgContent:'客户端出错啦'})
  }finally{
    yield put({type:GlobalActions.FETCH_END})
  }
}

function* registerFlow(){
  while (true) {
    let req = yield take(UserActions.REGISTER)
    let res = yield call(register,req.username,req.pwd)
    if(res.data && res.data.code === 0 ){
      yield put({type:UserActions.REGISTER_SUCCESS,data:res.data.data})
      yield put({type:GlobalActions.MSG_RETURN,msgType:0,msgContent:res.data.msg})
    }else{
      yield put({type:GlobalActions.MSG_RETURN,msgType:1,msgContent:res.data.msg})
    }
  }
}

function* authCheck(){
  yield put({type:GlobalActions.FETCH_START})
  try{
    return yield call(axios.get,'/api/user/auth')
  }catch(err){
    yield put({type:GlobalActions.MSG_RETURN,msgType:1,msgContent:'客户端出错啦'})
  }finally{
    yield put({type:GlobalActions.FETCH_END})
  }
}

function* authCheckFlow(){
  while (true) {
    yield take(UserActions.AUTH_CHECK)
    let res = yield call(authCheck)
    if(res.data && res.data.code === 0 ){
        yield put({type:UserActions.AUTH_CHECK_SUCCESS,data:res.data.data})
    }else{
      yield put({type:GlobalActions.MSG_RETURN,msgType:1,msgContent:res.data.msg})
    }
  }
}

function* logout(){
  yield put({type:GlobalActions.FETCH_START})
  try{
    return yield call(axios.get,'/api/user/logout')
  }catch(err){
    yield put({type:GlobalActions.MSG_RETURN,msgType:1,msgContent:'客户端出错啦'})
  }finally{
    yield put({type:GlobalActions.FETCH_END})
  }
}

function* logoutFlow(){
  while (true) {
    yield take(UserActions.LOGOUT)
    let res = yield call(logout)
    if(res.data && res.data.code === 0 ){
        yield put({type:UserActions.LOGOUT_SUCCESS})
        yield put({type:GlobalActions.MSG_RETURN,msgType:0,msgContent:res.data.msg})
    }else{
      yield put({type:GlobalActions.MSG_RETURN,msgType:1,msgContent:res.data.msg})
    }
  }
}

function* getAllUser(){
  yield put({type:GlobalActions.FETCH_START})
  try{
    return yield call(axios.get,'/api/user/all')
  }catch(err){
    yield put({type:GlobalActions.MSG_RETURN,msgType:1,msgContent:'客户端出错啦'})
  }finally{
    yield put({type:GlobalActions.FETCH_END})
  }
}

function* getAllUserFlow(){
  while (true) {
    yield take(UserActions.GET_ALL_USERS)
    let res = yield call(getAllUser)
    if(res.data && res.data.code === 0 ){
        yield put({type:UserActions.GET_ALL_USERS_SUCCESS,data:res.data.data})
    }else{
      yield put({type:GlobalActions.MSG_RETURN,msgType:1,msgContent:res.data.msg})
    }
  }
}

function* deleteUser(id){
  yield put({type:GlobalActions.FETCH_START})
  try{
    return yield call(axios.post,'/api/user/delete',{id})
  }catch(err){
    yield put({type:GlobalActions.MSG_RETURN,msgType:1,msgContent:'客户端出错啦'})
  }finally{
    yield put({type:GlobalActions.FETCH_END})
  }
}

function* deleteUserFlow(){
  while (true) {
    let req = yield take(UserActions.DELETE_USER)
    let res = yield call(deleteUser,req.id)
    if(res.data && res.data.code === 0 ){
        yield put({type:UserActions.DELETE_USER_SUCCESS})
        yield put({type:GlobalActions.MSG_RETURN,msgType:0,msgContent:res.data.msg})
    }else{
      yield put({type:GlobalActions.MSG_RETURN,msgType:1,msgContent:res.data.msg})
    }
  }
}

function* changeUserType(id,type){
  yield put({type:GlobalActions.FETCH_START})
  try{
    return yield call(axios.post,'/api/user/type',{id,type})
  }catch(err){
    yield put({type:GlobalActions.MSG_RETURN,msgType:1,msgContent:'客户端出错啦'})
  }finally{
    yield put({type:GlobalActions.FETCH_END})
  }
}

function* changeUserTypeFlow(){
  while (true) {
    let req = yield take(UserActions.CHANGE_USER_TYPE)
    let res = yield call(changeUserType,req.id,req.usertype)
    if(res.data && res.data.code === 0 ){
        yield put({type:UserActions.CHANGE_USER_TYPE_SUCCESS,data:res.data.data})
        yield put({type:GlobalActions.MSG_RETURN,msgType:0,msgContent:res.data.msg})
    }else{
      yield put({type:GlobalActions.MSG_RETURN,msgType:1,msgContent:res.data.msg})
    }
  }
}

export function* userSaga(){
  yield all([
    fork(authCheckFlow),
    fork(loginFlow),
    fork(registerFlow),
    fork(logoutFlow),
    fork(getAllUserFlow),
    fork(deleteUserFlow),
    fork(changeUserTypeFlow)
  ])
}
