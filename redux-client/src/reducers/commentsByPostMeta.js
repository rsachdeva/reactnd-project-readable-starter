import {
  REQUEST_POST_COMMENTS,
  RECEIVE_POST_COMMENTS,
  REQUEST_UPDATE_COMMENT_VOTES,
  RECEIVE_UPDATE_COMMENT_VOTES,
  REQUEST_DELETE_COMMENT,
  RECEIVE_DELETE_COMMENT,
  DELETE_PARENT_POST_COMMENTS,
  RECEIVE_CREATE_COMMENT,
  REQUEST_CREATE_COMMENT,
  REQUEST_UPDATE_COMMENT,
  RECEIVE_UPDATE_COMMENT
} from '../actions/types'
import * as Helper from '../utils/helper'

const initial = {
  isFetchingCommentsByPost: false,
  isUpdatingCommentVote: false,
  isDeletingComment: false,
  isCreatingComment: false,
  isUpdatingComment: false,
  commentsByPost: {}
}

export const commentsByPostMeta = (commentsByPostMetaState = initial, action) => {
  switch (action.type) {
    case REQUEST_POST_COMMENTS:
      return {
        ...commentsByPostMetaState,
        isFetchingCommentsByPost: true
      }
    case RECEIVE_POST_COMMENTS:
      const state_after_receive_post_comments =  {
        ...commentsByPostMetaState,
        isFetchingCommentsByPost: false,
        commentsByPost: {
          ...commentsByPostMetaState.commentsByPost,
          [action.postId]: action.comments
        }
      }
      return state_after_receive_post_comments
    case REQUEST_UPDATE_COMMENT_VOTES:
      return {
        ...commentsByPostMetaState,
        isUpdatingCommentVote: true
      }
    case RECEIVE_UPDATE_COMMENT_VOTES:
      const comments = commentsByPostMetaState.commentsByPost[action.postId]
      return {
        ...commentsByPostMetaState,
        isUpdatingCommentVote: false,
        commentsByPost: {
          ...commentsByPostMetaState.commentsByPost,
          [action.postId]: Helper.updateOrAddItem(comments, action.comment)
        }
      }
    case REQUEST_DELETE_COMMENT:
      return {
        ...commentsByPostMetaState,
        isDeletingComment: true
      }
    case RECEIVE_DELETE_COMMENT:
      const currentComments = commentsByPostMetaState.commentsByPost[action.postId]
      return {
        ...commentsByPostMetaState,
        isDeletingComment: false,
        commentsByPost: {
          ...commentsByPostMetaState.commentsByPost,
          [action.postId]: Helper.removeItem(currentComments, action.deletedCommentId)
        }
      }
    case DELETE_PARENT_POST_COMMENTS:
      return {
        ...commentsByPostMetaState,
        commentsByPost: Helper.removeKeyInObject({...commentsByPostMetaState.commentsByPost}, action.deletedPostId)
      }
    case REQUEST_CREATE_COMMENT:
      return {
        ...commentsByPostMetaState,
        isCreatingComment: true
      }
    case RECEIVE_CREATE_COMMENT:
      const existingComments = commentsByPostMetaState.commentsByPost[action.postId]
      return {
        ...commentsByPostMetaState,
        isCreatingComment: false,
        commentsByPost: {
          ...commentsByPostMetaState.commentsByPost,
          [action.postId]: existingComments.concat(action.createdComment)
        }
      }
    case REQUEST_UPDATE_COMMENT:
      return {
        ...commentsByPostMetaState,
        isUpdatingComment: true
      }
    case RECEIVE_UPDATE_COMMENT:
      const editableComments = commentsByPostMetaState.commentsByPost[action.postId]
      return {
        ...commentsByPostMetaState,
        isUpdatingComment: false,
        commentsByPost: {
          ...commentsByPostMetaState.commentsByPost,
          [action.postId]: Helper.updateOrAddItem(editableComments, action.updatedComment)
        }
      }
    default:
      return commentsByPostMetaState
  }
}

export default commentsByPostMeta
