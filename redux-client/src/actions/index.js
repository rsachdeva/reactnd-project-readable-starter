import uuidv4 from 'uuid'
import * as ReadableAPIUtil from '../utils/api'
import * as ACTION_TYPES from './types'

export const HOME = ''

const requestCategories = () => {
  return {
    type: ACTION_TYPES.REQUEST_CATEGORIES
  }
}

const receiveCategories = (categories) => {
  return {
    type: ACTION_TYPES.RECEIVE_CATEGORIES,
    categories: categories
  }
}

export const fetchCategories = () => (dispatch, getState) => {
  dispatch(requestCategories())
  ReadableAPIUtil.getCategories().then(categories => {
    return dispatch(receiveCategories(categories.map(category => category.name)))
  })
}

const requestPostDetail = () => {
  return {
    type: ACTION_TYPES.REQUEST_POST_DETAIL
  }
}

const receivePostDetail = (post) => {
  return {
    type: ACTION_TYPES.RECEIVE_POST_DETAIL,
    postDetail: post
  }
}

export const fetchPostDetail = (postId) => (dispatch, getState) => {
  dispatch(requestPostDetail())
  ReadableAPIUtil.getPost(postId).then(post => {
    return dispatch(receivePostDetail(post))
  })
}


const requestPosts = () => {
  return {
    type: ACTION_TYPES.REQUEST_POSTS
  }
}

const receivePosts = (posts) => {
  return {
    type: ACTION_TYPES.RECEIVE_POSTS,
    posts: posts
  }
}

const requestUpdatePostVotes = () => {
  return {
    type: ACTION_TYPES.REQUEST_UPDATE_POST_VOTES
  }
}

const receivedUpdatePostVotes = (post) => {
  return {
    type: ACTION_TYPES.RECEIVE_UPDATE_POST_VOTES,
    post
  }
}

export const updatePostVotes = (postId, voteOption) => (dispatch, getState) => {
  dispatch(requestUpdatePostVotes(postId, voteOption))
  ReadableAPIUtil.updatePostVotes(postId, voteOption).then(post => {
    return dispatch(receivedUpdatePostVotes(post))
  })
}

const requestDeletePost = () => {
  return {
    type: ACTION_TYPES.REQUEST_DELETE_POST
  }
}

const receivedDeletePost = (currentPosts, deletedPostId) => {
  return {
    type: ACTION_TYPES.RECEIVE_DELETE_POST,
    currentPosts,
    deletedPostId
  }
}

const deleteParentPostComments = (deletedPostId) => {
  return {
    type: ACTION_TYPES.DELETE_PARENT_POST_COMMENTS,
    deletedPostId
  }
}

export const deletePost = (postId) => (dispatch, getState) => {
  dispatch(requestDeletePost(postId))
  ReadableAPIUtil.deletePost(postId).then(post => {
    dispatch(deleteParentPostComments(post.id))
    return dispatch(receivedDeletePost(getState().postsMeta.posts, post.id))
  })
}

const requestCreatePost = () => {
  return {
    type: ACTION_TYPES.REQUEST_CREATE_POST
  }
}

const receivedCreatePost = (createdPost) => {
  return {
    type: ACTION_TYPES.RECEIVE_CREATE_POST,
    createdPost
  }
}

export const createPost = (newPost) => (dispatch, getState) => {
  dispatch(requestCreatePost())
  const postWithIdAndTimestamp = {
    id: uuidv4(),
    timestamp: Date.now()
  }
  const postToCreate = {
    ...newPost,
    ...postWithIdAndTimestamp
  }
  ReadableAPIUtil.createPost(postToCreate).then(createdPost => {
    return dispatch(receivedCreatePost(createdPost))
  })
}

const requestUpdatePost = () => {
  return {
    type: ACTION_TYPES.REQUEST_UPDATE_POST
  }
}

const receivedUpdatePost = (updatedPost) => {
  return {
    type: ACTION_TYPES.RECEIVE_UPDATE_POST,
    updatedPost
  }
}

export const updatePost = (editPost) => (dispatch, getState) => {
  dispatch(requestUpdatePost())
  ReadableAPIUtil.updatePost(editPost).then(updatedPost => {
    return dispatch(receivedUpdatePost(updatedPost))
  })
}

export const postsSorting = (sortBy = ACTION_TYPES.BY_VOTES) => {
  return {
    type: ACTION_TYPES.POSTS_SORTING,
    sortBy
  }
}

const requestPostComments = () => {
  return {
    type: ACTION_TYPES.REQUEST_POST_COMMENTS
  }
}

const receivePostComments = (postId, comments) => {
  return {
    type: ACTION_TYPES.RECEIVE_POST_COMMENTS,
    postId: postId,
    comments: comments
  }
}
const postsPromise = (activatedCategory = '') => {
  if (activatedCategory === '') {
    return ReadableAPIUtil.getPosts()
  } else {
    return ReadableAPIUtil.getPostsByCategory(activatedCategory)
  }
}

export const fetchPostComments = (postId) => (dispatch, getState) => {
  dispatch(requestPostComments())
  return ReadableAPIUtil.getCommentsByPost(postId).then(comments => {
    return dispatch(receivePostComments(postId, comments))
  })
}

export const fetchPostsAndPostComments = (activatedCategory = '') => (dispatch, getState) => {
  dispatch(requestPosts())
  postsPromise(activatedCategory).then(posts => {
    dispatch(receivePosts(posts))
    const receivedPosts = getState().postsMeta.posts
    if (receivedPosts && (receivedPosts.length > 0)) {
      dispatch(requestPostComments())
      receivedPosts.map((post) => {
        return ReadableAPIUtil.getCommentsByPost(post.id).then(comments => {
          return dispatch(receivePostComments(post.id, comments))
        })
      })
    }
  })
}

const requestUpdateCommentVotes = () => {
  return {
    type: ACTION_TYPES.REQUEST_UPDATE_COMMENT_VOTES
  }
}

const receivedUpdateCommentVotes = (postId, comment) => {
  return {
    type: ACTION_TYPES.RECEIVE_UPDATE_COMMENT_VOTES,
    postId,
    comment
  }
}

export const updateCommentVotes = (postId, commentId, voteOption) => (dispatch, getState) => {
  dispatch(requestUpdateCommentVotes())
  ReadableAPIUtil.updateCommentVotes(commentId, voteOption).then(comment => {
    const actionObj = receivedUpdateCommentVotes(postId, comment)
    return dispatch(actionObj)
  })
}

const requestDeleteComment = () => {
  return {
    type: ACTION_TYPES.REQUEST_DELETE_COMMENT
  }
}

const receivedDeleteComment = (postId, deletedCommentId) => {
  return {
    type: ACTION_TYPES.RECEIVE_DELETE_COMMENT,
    postId,
    deletedCommentId
  }
}

export const deleteComment = (postId, commentId) => (dispatch, getState) => {
  dispatch(requestDeleteComment())
  ReadableAPIUtil.deleteComment(commentId).then(comment => {
    return dispatch(receivedDeleteComment(postId, comment.id))
  })
}

const requestCreateComment = () => {
  return {
    type: ACTION_TYPES.REQUEST_CREATE_COMMENT
  }
}

const receivedCreateComment = (postId, createdComment) => {
  return {
    type: ACTION_TYPES.RECEIVE_CREATE_COMMENT,
    postId,
    createdComment
  }
}

export const createComment = (postId, newComment) => (dispatch, getState) => {
  dispatch(requestCreateComment())
  const commentWithIdAndTimestamp = {
    id: uuidv4(),
    parentId: postId,
    timestamp: Date.now()
  }
  const commentToCreate = {
    ...newComment,
    ...commentWithIdAndTimestamp
  }
  ReadableAPIUtil.createComment(commentToCreate).then(createdComment => {
    return dispatch(receivedCreateComment(postId, createdComment))
  })
}


const requestUpdateComment = () => {
  return {
    type: ACTION_TYPES.REQUEST_UPDATE_COMMENT
  }
}

const receivedUpdateComment = (postId, updatedComment) => {
  return {
    type: ACTION_TYPES.RECEIVE_UPDATE_COMMENT,
    postId,
    updatedComment
  }
}

export const updateComment = (postId, editComment) => (dispatch, getState) => {
  dispatch(requestUpdateComment())
  ReadableAPIUtil.updateComment(editComment).then(updatedComment => {
    return dispatch(receivedUpdateComment(postId, updatedComment))
  })
}