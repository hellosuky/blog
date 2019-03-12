import {TagActions} from '../actiontypes/tag.actions.js'

const initalState = {
  tags:[]
}

export function tag(state = initalState,action){
  switch(action.type){
    case TagActions.GET_TAG_SUCCESS:
      return {...state,tags:action.data}
    case TagActions.ADD_TAG_SUCCESS:
      return {...state,tags:action.data}
    case TagActions.SAVE_TAG_AS_FRONT_SUCCESS:
      return {...state,tags:action.data}
    case TagActions.DELETE_TAG_SUCCESS:
      return {...state,tags:action.data}
    default:
      return state
  }
}

//actions
export function saveTagAsFront(id,front){
  return ({
    type:TagActions.SAVE_TAG_AS_FRONT,
    id,
    front
  })
}

export function deleteTag(id){
  return ({
    type:TagActions.DELETE_TAG,
    id
  })
}

export function addTag(content){
  return ({
    type:TagActions.ADD_TAG,
    content
  })
}

export function getTag(){
  return ({
    type:TagActions.GET_TAG
  })
}
