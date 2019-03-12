import {fork,all,put,call,take,select} from 'redux-saga/effects'
import axios from 'axios'
import {BlogActions} from '../actiontypes/blog.actions'
import {GlobalActions} from '../actiontypes/global.actions'

function* addBlog(title,content,selectedTags,url,isPublish){
  yield put({type:GlobalActions.FETCH_START})
  try{
    return yield call(axios.post,'/api/blog/addblog',{title,content,selectedTags,url,isPublish})
  }catch(err){
    yield put({type:GlobalActions.MSG_RETURN,msgType:1,msgContent:'客户端出错啦'})
  }finally{
    yield put({type:GlobalActions.FETCH_END})
  }
}

function* addBlogFlow(){
  while (true) {
    let req = yield take(BlogActions.ADD_NEW_BLOG)
    let res = yield call(addBlog,req.title,req.content,req.selectedTags,req.url,req.isPublish)
    if(res.data && res.data.code === 0){
      yield put({type:BlogActions.ADD_NEW_BLOG_SUCCESS})
      yield put({type:GlobalActions.MSG_RETURN,msgType:0,msgContent:res.data.msg})
    }else{
      yield put({type:GlobalActions.MSG_RETURN,msgType:1,msgContent:res.data.msg})
    }
  }
}

function* updateBlog(blog_id,title,content,selectedTags,url,isPublish){
  yield put({type:GlobalActions.FETCH_START})
  try{
    return yield call(axios.post,'/api/blog/updateblog',{blog_id,title,content,selectedTags,url,isPublish})
  }catch(err){
    yield put({type:GlobalActions.MSG_RETURN,msgType:1,msgContent:'客户端出错啦'})
  }finally{
    yield put({type:GlobalActions.FETCH_END})
  }
}

function* updateBlogFlow(){
  while (true) {
    let req = yield take(BlogActions.UPDATE_BLOG_SUCCESS)
    let res = yield call(updateBlog,req.blog_id,req.title,req.content,req.selectedTags,req.url,req.isPublish)
    if(res.data && res.data.code === 0){
      yield put({type:BlogActions.UPDATE_BLOG_SUCCESS})
      yield put({type:GlobalActions.MSG_RETURN,msgType:0,msgContent:res.data.msg})
    }else{
      yield put({type:GlobalActions.MSG_RETURN,msgType:1,msgContent:res.data.msg})
    }
  }
}

function* getBlogs(searchWord,category,page,front){
  yield put({type:GlobalActions.FETCH_START})
  try{
    if(searchWord){
      return yield call(axios.get,`/api/blog/blogs?search=${searchWord}&page=${page}`)
    }else if(category){
      return yield call(axios.get,`/api/blog/blogs?&category=${category}&page=${page}`)
    }else if(searchWord && category){
      return yield call(axios.get,`/api/blog/blogs?search=${searchWord}&category=${category}&page=${page}`)
    }else if(front){
      return yield call(axios.get,`/api/blog/blogs?page=${page}&front=${front}`)
    }else{
      return yield call(axios.get,`/api/blog/blogs?page=${page}`)
    }
  }catch(err){
    yield put({type:GlobalActions.MSG_RETURN,msgType:1,msgContent:'客户端出错啦'})
  }finally{
    yield put({type:GlobalActions.FETCH_END})
  }
}

function* getBlogsFlow(){
  while (true) {
    let req = yield take(BlogActions.GET_BLOGS)
    let category = yield select(state => state.blog.category)
    let searchWord = yield select(state => state.blog.searchWord)
    let res = yield call(getBlogs,searchWord,category,req.page,req.front)
    if(res.data && res.data.code === 0){
      yield put({type:BlogActions.GET_BLOGS_SUCCESS,data:res.data.data})
    }else{
      yield put({type:GlobalActions.MSG_RETURN,msgType:1,msgContent:res.data.msg})
    }
  }
}

function* deleteBlog(blog_id){
  yield put({type:GlobalActions.FETCH_START})
  try{
    return yield call(axios.post,'/api/blog/deleteblog',{blog_id})
  }catch(err){
    yield put({type:GlobalActions.MSG_RETURN,msgType:1,msgContent:'客户端出错啦'})
  }finally{
    yield put({type:GlobalActions.FETCH_END})
  }
}

function* deleteBlogFlow(){
  while (true) {
    let req = yield take(BlogActions.DELETE_BLOG)
    let res = yield call(deleteBlog,req.blog_id)
    if(res.data && res.data.code === 0){
      let blogList = yield select(state => state.blog.blogList)
      blogList = yield blogList.filter(v=>req.blog_id!== v._id)
      yield put({type:BlogActions.DELETE_BLOG_SUCCESS,data:blogList})
      yield put({type:GlobalActions.MSG_RETURN,msgType:0,msgContent:res.data.msg})
    }else{
      yield put({type:GlobalActions.MSG_RETURN,msgType:1,msgContent:res.data.msg})
    }
  }
}

function* getBlogDetail(blog_id){
  yield put({type:GlobalActions.FETCH_START})
  try{
    return yield call(axios.get,`/api/blog/detail?id=${blog_id}`)
  }catch(err){
    yield put({type:GlobalActions.MSG_RETURN,msgType:1,msgContent:'客户端出错啦'})
  }finally{
    yield put({type:GlobalActions.FETCH_END})
  }
}

function* getBlogDetailFlow(){
  while (true) {
    let req = yield take(BlogActions.GET_BLOG_DETAIL)
    let res = yield call(getBlogDetail,req.blog_id)
    if(res.data && res.data.code === 0){
      yield put({type:BlogActions.GET_BLOG_DETAIL_SUCCESS,data:res.data.data})
    }else{
      yield put({type:GlobalActions.MSG_RETURN,msgType:1,msgContent:res.data.msg})
    }
  }
}

function* getLatestBlog(){
  yield put({type:GlobalActions.FETCH_START})
  try{
    return yield call(axios.get,`/api/blog/latest`)
  }catch(err){
    yield put({type:GlobalActions.MSG_RETURN,msgType:1,msgContent:'客户端出错啦'})
  }finally{
    yield put({type:GlobalActions.FETCH_END})
  }
}

function* getLatestBlogFlow(){
  while (true) {
    yield take(BlogActions.GET_LATEST_BLOGS)
    let res = yield call(getLatestBlog)
    if(res.data && res.data.code === 0){
      yield put({type:BlogActions.GET_LATEST_BLOGS_SUCCESS,data:res.data.data})
    }else{
      yield put({type:GlobalActions.MSG_RETURN,msgType:1,msgContent:res.data.msg})
    }
  }
}

function* addViewCount(id){
  yield put({type:GlobalActions.FETCH_START})
  try{
    return yield call(axios.get,`/api/blog/addview?id=${id}`)
  }catch(err){
    yield put({type:GlobalActions.MSG_RETURN,msgType:1,msgContent:'客户端出错啦'})
  }finally{
    yield put({type:GlobalActions.FETCH_END})
  }
}

function* addViewCountFlow(){
  while (true) {
    let req = yield take(BlogActions.ADD_VIEW_COUNT)
    let res = yield call(addViewCount,req.id)
    if(res.data && res.data.code === 0){
      yield put({type:BlogActions.ADD_VIEW_COUNT_SUCCESS,id:req.id})
    }else{
      yield put({type:GlobalActions.MSG_RETURN,msgType:1,msgContent:res.data.msg})
    }
  }
}

function* changeLikes(id,like){
  yield put({type:GlobalActions.FETCH_START})
  try{
      return yield call(axios.get,`/api/blog/changelikes?id=${id}&like=${like}`)
  }catch(err){
    yield put({type:GlobalActions.MSG_RETURN,msgType:1,msgContent:'客户端出错啦'})
  }finally{
    yield put({type:GlobalActions.FETCH_END})
  }
}

function* changeLikesFlow(){
  while (true) {
    let req = yield take(BlogActions.CHANGE_LIKES)
    let res = yield call(changeLikes,req.id,req.like)
    if(res.data && res.data.code === 0){
      yield put({type:BlogActions.CHANGE_LIKES_SUCCESS})
    }else{
      yield put({type:GlobalActions.MSG_RETURN,msgType:1,msgContent:res.data.msg})
    }
  }
}

function* changeCollects(id,collect){
  yield put({type:GlobalActions.FETCH_START})
  try{
    return yield call(axios.get,`/api/blog/changecollects?id=${id}&collect=${collect}`)
  }catch(err){
    yield put({type:GlobalActions.MSG_RETURN,msgType:1,msgContent:'客户端出错啦'})
  }finally{
    yield put({type:GlobalActions.FETCH_END})
  }
}

function* changeCollectsFlow(){
  while (true) {
    let req = yield take(BlogActions.CHANGE_COLLECTS)
    let res = yield call(changeCollects,req.id,req.collect)
    if(res.data && res.data.code === 0){
      yield put({type:BlogActions.CHANGE_COLLECTS_SUCCESS})
    }else{
      yield put({type:GlobalActions.MSG_RETURN,msgType:1,msgContent:res.data.msg})
    }
  }
}

function* addComments(blog_id,content){
  yield put({type:GlobalActions.FETCH_START})
  try{
    return yield call(axios.post,`/api/blog/addcomments`,{blog_id,content})
  }catch(err){
    yield put({type:GlobalActions.MSG_RETURN,msgType:1,msgContent:'客户端出错啦'})
  }finally{
    yield put({type:GlobalActions.FETCH_END})
  }
}

function* addCommentsFlow(){
  while (true) {
    let req = yield take(BlogActions.ADD_COMMENTS)
    let res = yield call(addComments,req.blog_id,req.content)
    if(res.data && res.data.code === 0){
      yield put({type:BlogActions.ADD_COMMENTS_SUCCESS,data:res.data.data})
      yield put({type:GlobalActions.MSG_RETURN,msgType:0,msgContent:res.data.msg})
    }else{
      yield put({type:GlobalActions.MSG_RETURN,msgType:1,msgContent:res.data.msg})
    }
  }
}

function* deleteComment(blog_id,comment_id){
  yield put({type:GlobalActions.FETCH_START})
  try{
    return yield call(axios.post,`/api/blog/deletecomments`,{blog_id,comment_id})
  }catch(err){
    yield put({type:GlobalActions.MSG_RETURN,msgType:1,msgContent:'客户端出错啦'})
  }finally{
    yield put({type:GlobalActions.FETCH_END})
  }
}

function* deleteCommentFlow(){
  while (true) {
    let req = yield take(BlogActions.DELETE_COMMENT)
    let res = yield call(deleteComment,req.blog_id,req.comment_id)
    if(res.data && res.data.code === 0){
      yield put({type:BlogActions.DELETE_COMMENT_SUCCESS,data:res.data.data})
      yield put({type:GlobalActions.MSG_RETURN,msgType:0,msgContent:res.data.msg})
    }else{
      yield put({type:GlobalActions.MSG_RETURN,msgType:1,msgContent:res.data.msg})
    }
  }
}

function* viewMost(){
  yield put({type:GlobalActions.FETCH_START})
  try{
    return yield call(axios.get,`/api/blog/viewmost`)
  }catch(err){
    yield put({type:GlobalActions.MSG_RETURN,msgType:1,msgContent:'客户端出错啦'})
  }finally{
    yield put({type:GlobalActions.FETCH_END})
  }
}

function* viewMostFlow(){
  while (true) {
    yield take(BlogActions.VIEW_MOST)
    let res = yield call(viewMost)
    if(res.data && res.data.code === 0){
      yield put({type:BlogActions.VIEW_MOST_SUCCESS,data:res.data.data})
    }else{
      yield put({type:GlobalActions.MSG_RETURN,msgType:1,msgContent:res.data.msg})
    }
  }
}
export function* blogSaga(){
  yield all([
    fork(addBlogFlow),
    fork(updateBlogFlow),
    fork(getBlogsFlow),
    fork(deleteBlogFlow),
    fork(getBlogDetailFlow),
    fork(getLatestBlogFlow),
    fork(addViewCountFlow),
    fork(changeLikesFlow),
    fork(changeCollectsFlow),
    fork(addCommentsFlow),
    fork(deleteCommentFlow),
    fork(viewMostFlow)
  ])
}
