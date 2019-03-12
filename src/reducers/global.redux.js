import {GlobalActions} from '../actiontypes/global.actions.js'

const initalState = {
  globalMsg:{
    type:1, //0为成功，1为失败
    content:''
  },
  isLoading:false
}

export function globalMsg(state = initalState,action){
  switch(action.type){
    case GlobalActions.FETCH_START:
      return {...state,isLoading:true}
    case GlobalActions.FETCH_END:
      return {...state,isLoading:false}
    case GlobalActions.MSG_RETURN:
      return {...state,globalMsg:{type:action.msgType,content:action.msgContent}}
    case GlobalActions.MSG_CLEAR:
      return initalState
    default:
      return state
  }
}

//clear msg
export function clearMsg() {
  return ({
    type:GlobalActions.MSG_CLEAR
  })
}
