import {BlogActions} from '../actiontypes/blog.actions'

const initialState = {
  currentBlog:{}, //当前写作文章
  blogList:[],//博客列表
  LastestBlogs:[],//最近文章
  searchWord:'',
  category:''
}


export function blog(state=initialState,action){
  switch (action.type) {
    case BlogActions.ADD_NEW_BLOG_SUCCESS:
      return state
    case BlogActions.UPDATE_BLOG_SUCCESS:
      return state
    case BlogActions.DELETE_BLOG_SUCCESS:
      return {...state,blogList:action.data}
    case BlogActions.GET_BLOG_DETAIL_SUCCESS:
      return {...state,currentBlog:action.data}
    case BlogActions.GET_BLOGS_SUCCESS:
      return {...state,blogList:action.data}
    case BlogActions.GET_LATEST_BLOGS_SUCCESS:
      return {...state,LastestBlogs:action.data}
    case BlogActions.UPDATE_SEARCH_WORD:
      return {...state,searchWord:action.searchWord}
    case BlogActions.UPDATE_CATEGORY:
      return {...state,category:action.category}
    case BlogActions.ADD_VIEW_COUNT_SUCCESS:
      let {blogList} = state
      let newItem = blogList.find(v=>action.id)
      newItem.view_count +=1
      let updateItem = [...blogList,newItem]
      return {...state,blogList:updateItem}
    case BlogActions.CHANGE_LIKES_SUCCESS:
      return state
    case BlogActions.CHANGE_COLLECTS_SUCCESS:
      return state
    case BlogActions.ADD_COMMENTS_SUCCESS:
      return {...state,currentBlog:action.data}
    case BlogActions.DELETE_COMMENT_SUCCESS:
      return {...state,currentBlog:action.data}
    case BlogActions.VIEW_MOST_SUCCESS:
      return {...state,blogList:action.data}
    default:
      return state
  }
}

//actions

export function addNewBlog(title,content,selectedTags,url,isPublish){
  return ({
    type:BlogActions.ADD_NEW_BLOG,
    title,
    content,
    selectedTags,
    url,
    isPublish
  })
}

export function getBlogs(page=1,front=false){
  return ({
    type:BlogActions.GET_BLOGS,
    page,
    front
  })
}

export function deleteBlog(blog_id){
  return ({
    type:BlogActions.DELETE_BLOG,
    blog_id
  })
}

export function editBlog(blog_id,title,content,selectedTags,url,isPublish){
  return ({
    type:BlogActions.UPDATE_BLOG,
    blog_id,
    title,
    content,
    selectedTags,
    url,
    isPublish
  })
}

export function getBlogDetail(blog_id){
  return ({
    type:BlogActions.GET_BLOG_DETAIL,
    blog_id
  })
}

export function getLatestBlog(){
  return ({
    type:BlogActions.GET_LATEST_BLOGS
  })
}

export function updateSearchWord(searchWord){
  return ({
    type:BlogActions.UPDATE_SEARCH_WORD,
    searchWord
  })
}

export function updateCategory(category){
  return({
    type:BlogActions.UPDATE_CATEGORY,
    category
  })
}

export function addViewCount(id){
  return ({
    type:BlogActions.ADD_VIEW_COUNT,
    id
  })
}

export function changeLikes(id,like){
  return ({
    type:BlogActions.CHANGE_LIKES,
    id,
    like
  })
}

export function changeCollects(id,collect){
  return ({
    type:BlogActions.CHANGE_COLLECTS,
    id,
    collect
  })
}

export function addComments(blog_id,content){
  return ({
    type:BlogActions.ADD_COMMENTS,
    blog_id,
    content
  })
}

export function deleteComment(blog_id,comment_id){
  return ({
    type:BlogActions.DELETE_COMMENT,
    blog_id,
    comment_id
  })
}

export function viewMost(){
  return ({
    type:BlogActions.VIEW_MOST
  })
}
