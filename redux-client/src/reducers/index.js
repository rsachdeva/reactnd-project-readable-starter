import { combineReducers } from 'redux'
import categoriesMeta from './categoriesMeta'
import postsMeta from './postsMeta'
import commentsByPostMeta from './commentsByPostMeta'

const rootReducer = combineReducers({
  categoriesMeta,
  postsMeta,
  commentsByPostMeta
})

export default rootReducer
