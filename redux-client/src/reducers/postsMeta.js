import {
  REQUEST_POSTS,
  RECEIVE_POSTS,
  REQUEST_UPDATE_POST_VOTES,
  RECEIVE_UPDATE_POST_VOTES,
  REQUEST_DELETE_POST,
  RECEIVE_DELETE_POST,
  REQUEST_CREATE_POST,
  RECEIVE_CREATE_POST,
  REQUEST_UPDATE_POST,
  RECEIVE_UPDATE_POST,
  POSTS_SORTING,
  BY_VOTES
} from '../actions'
import {RECEIVE_POST_DETAIL, REQUEST_POST_DETAIL} from "../actions/index"
import * as Helper from '../utils/helper'

const initial = {
  isFetchingPosts: false,
  isUpdatingPostVote: false,
  isFetchingPostDetail: false,
  isDeletingPost: false,
  isCreatingPost: false,
  isUpdatingPost: false,
  postsSortBy: BY_VOTES,
  posts: []
}

const postsMeta = (postsMetaState = initial, action) => {
  switch (action.type) {
    case REQUEST_POSTS:
      return {
        ...postsMetaState,
        isFetchingPosts: true
      }
    case RECEIVE_POSTS:
      const state_after_receive_posts =  {
        ...postsMetaState,
        isFetchingPosts: false,
        posts: action.posts
      }
      return state_after_receive_posts
    case REQUEST_UPDATE_POST_VOTES:
      return {
        ...postsMetaState,
        isUpdatingPostVote: true
      }
    case RECEIVE_UPDATE_POST_VOTES:
      const updatedPosts = Helper.updateOrAddItem(postsMetaState.posts, action.post)
      return {
        ...postsMetaState,
        isUpdatingPostVote: false,
        posts: updatedPosts
      }
    case POSTS_SORTING:
      return {
        ...postsMetaState,
        postsSortBy: action.sortBy
      }
    case REQUEST_POST_DETAIL:
      return {
        ...postsMetaState,
        isFetchingPostDetail: true
      }
    case RECEIVE_POST_DETAIL:
      const postsWithPostDetail = Helper.updateOrAddItem(postsMetaState.posts, action.postDetail)
      return {
        ...postsMetaState,
        isFetchingPostDetail: false,
        posts: postsWithPostDetail
      }
    case REQUEST_DELETE_POST:
      return {
        ...postsMetaState,
        isDeletingPost: true
      }
    case RECEIVE_DELETE_POST:
      return {
        ...postsMetaState,
        isDeletingPost: false,
        posts: Helper.removeItem(action.currentPosts, action.deletedPostId)
      }
    case REQUEST_CREATE_POST:
      return {
        ...postsMetaState,
        isCreatingPost: true
      }
    case RECEIVE_CREATE_POST:
      return {
        ...postsMetaState,
        isCreatingPost: false,
        posts: postsMetaState.posts.concat(action.createdPost)
      }
    case REQUEST_UPDATE_POST:
      return {
        ...postsMetaState,
        isUpdatingPost: true
      }
    case RECEIVE_UPDATE_POST:
      const postsWithUpdatedPost = Helper.updateOrAddItem(postsMetaState.posts, action.updatedPost)
      return {
        ...postsMetaState,
        isUpdatingPost: false,
        posts: postsWithUpdatedPost
      }
    default:
      return postsMetaState
  }
}

export default postsMeta