import {fork,all} from 'redux-saga/effects'
import {tagSaga} from './tag.saga'
import {blogSaga} from './blog.saga'
import {userSaga} from './user.saga'

export default function* rootSaga(){
  yield all([
    fork(tagSaga),
    fork(blogSaga),
    fork(userSaga)
  ])
}
