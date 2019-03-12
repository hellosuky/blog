import {fork,all,put,call,take} from 'redux-saga/effects'
import axios from 'axios'
import {TagActions} from '../actiontypes/tag.actions'
import {GlobalActions} from '../actiontypes/global.actions'

function* getTag(){
  yield put({type:GlobalActions.FETCH_START})
  try{
    return yield call(axios.get,'/api/tag/tags')
  }catch(err){
    yield put({type:GlobalActions.MSG_RETURN,msgType:1,msgContent:'客户端出错啦'})
  }finally{
    yield put({type:GlobalActions.FETCH_END})
  }
}

function* getTagFlow(){
  while (true) {
    yield take(TagActions.GET_TAG)
    let res = yield call(getTag)
    if(res.data && res.data.code === 0 ){
      yield put({type:TagActions.GET_TAG_SUCCESS,data:res.data.data})
    }else{
      yield put({type:GlobalActions.MSG_RETURN,msgType:1,msgContent:res.data.msg})
    }
  }
}

function* addTag(content){
  yield put({type:GlobalActions.FETCH_START})
  try{
    return yield call(axios.post,'/api/tag/addtag',{content})
  }catch(err){
    yield put({type:GlobalActions.MSG_RETURN,msgType:1,msgContent:'客户端出错啦'})
  }finally{
    yield put({type:GlobalActions.FETCH_END})
  }
}

function* addTagFlow(){
  while (true) {
    let req = yield take(TagActions.ADD_TAG)
    let res = yield call(addTag,req.content)
    if(res.data && res.data.code === 0 ){
      yield put({type:TagActions.ADD_TAG_SUCCESS,data:res.data.data})
      yield put({type:GlobalActions.MSG_RETURN,msgType:0,msgContent:res.data.msg})
    }else{
      yield put({type:GlobalActions.MSG_RETURN,msgType:1,msgContent:res.data.msg})
    }
  }
}

function* deleteTag(id){
  yield put({type:GlobalActions.FETCH_START})
  try{
    return yield call(axios.post,'/api/tag/deletetag',{id})
  }catch(err){
    yield put({type:GlobalActions.MSG_RETURN,msgType:1,msgContent:'客户端出错啦'})
  }finally{
    yield put({type:GlobalActions.FETCH_END})
  }
}

function* deleteTagFlow(){
  while (true) {
    let req = yield take(TagActions.DELETE_TAG)
    let res = yield call(deleteTag,req.id)
    if(res.data && res.data.code === 0 ){
      yield put({type:TagActions.DELETE_TAG_SUCCESS,data:res.data.data})
      yield put({type:GlobalActions.MSG_RETURN,msgType:0,msgContent:res.data.msg})
    }else{
      yield put({type:GlobalActions.MSG_RETURN,msgType:1,msgContent:res.data.msg})
    }
  }
}

function* saveTagAsFront(id,front){
  yield put({type:GlobalActions.FETCH_START})
  try{
    return yield call(axios.post,'/api/tag/settag',{id,front})
  }catch(err){
    yield put({type:GlobalActions.MSG_RETURN,msgType:1,msgContent:'客户端出错啦'})
  }finally{
    yield put({type:GlobalActions.FETCH_END})
  }
}

function* saveTagAsFrontFlow(){
  while (true) {
    let req = yield take(TagActions.SAVE_TAG_AS_FRONT)
    let res = yield call(saveTagAsFront,req.id,req.front)
    if(res.data && res.data.code === 0 ){
      yield put({type:TagActions.SAVE_TAG_AS_FRONT_SUCCESS,data:res.data.data})
      yield put({type:GlobalActions.MSG_RETURN,msgType:0,msgContent:res.data.msg})
    }else{
      yield put({type:GlobalActions.MSG_RETURN,msgType:1,msgContent:res.data.msg})
    }
  }
}

export function* tagSaga(){
  yield all([
    fork(getTagFlow),
    fork(addTagFlow),
    fork(saveTagAsFrontFlow),
    fork(deleteTagFlow)
  ])
}
