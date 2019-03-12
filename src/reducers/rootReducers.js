import {combineReducers} from 'redux'
import {user} from './user.redux'
import {tag} from './tag.redux'
import {globalMsg} from './global.redux'
import {blog} from './blog.redux.js'

export default combineReducers({
  user,
  globalMsg,
  tag,
  blog
})
