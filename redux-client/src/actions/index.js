import uuidv4 from 'uuid'
import * as ReadableAPIUtil from '../utils/api'


export const REQUEST_CATEGORIES = 'REQUEST_CATEGORIES'
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'
export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const REQUEST_POST_DETAIL = 'REQUEST_POST'
export const RECEIVE_POST_DETAIL = 'RECEIVE_POST'
export const REQUEST_UPDATE_POST_VOTES = 'REQUEST_UPDATE_POST_VOTES'
export const RECEIVE_UPDATE_POST_VOTES = 'RECEIVE_UPDATE_POST_VOTES'
export const REQUEST_DELETE_POST = 'REQUEST_DELETE_POST'
export const RECEIVE_DELETE_POST = 'RECEIVE_DELETE_POST'
export const REQUEST_CREATE_POST = 'REQUEST_CREATE_POST'
export const RECEIVE_CREATE_POST = 'RECEIVE_CREATE_POST'
export const REQUEST_UPDATE_POST = 'REQUEST_UPDATE_POST'
export const RECEIVE_UPDATE_POST = 'RECEIVE_UPDATE_POST'
export const DELETE_PARENT_POST_COMMENTS = 'DELETE_PARENT_POST_COMMENTS'
export const POSTS_SORTING = 'POSTS_SORTING'
export const BY_VOTES = 'by_votes'
export const BY_CREATED_AT = 'by_created_at'
export const REQUEST_POST_COMMENTS = 'REQUEST_POST_COMMENTS'
export const RECEIVE_POST_COMMENTS = 'RECEIVE_POST_COMMENTS'
export const REQUEST_UPDATE_COMMENT_VOTES = 'REQUEST_UPDATE_COMMENT_VOTES'
export const RECEIVE_UPDATE_COMMENT_VOTES = 'RECEIVE_UPDATE_COMMENT_VOTES'
export const REQUEST_DELETE_COMMENT = 'REQUEST_DELETE_COMMENT'
export const RECEIVE_DELETE_COMMENT = 'RECEIVE_DELETE_COMMENT'
export const REQUEST_CREATE_COMMENT = 'REQUEST_CREATE_COMMENT'
export const RECEIVE_CREATE_COMMENT = 'RECEIVE_CREATE_COMMENT'
export const REQUEST_UPDATE_COMMENT = 'REQUEST_UPDATE_COMMENT'
export const RECEIVE_UPDATE_COMMENT = 'RECEIVE_UPDATE_COMMENT'

export const HOME = ''

const requestCategories = () => {
  return {
    type: REQUEST_CATEGORIES
  }
}

const receiveCategories = (categories) => {
  return {
    type: RECEIVE_CATEGORIES,
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
    type: REQUEST_POST_DETAIL
  }
}

const receivePostDetail = (post) => {
  return {
    type: RECEIVE_POST_DETAIL,
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
    type: REQUEST_POSTS
  }
}

const receivePosts = (posts) => {
  return {
    type: RECEIVE_POSTS,
    posts: posts
  }
}

const requestUpdatePostVotes = () => {
  return {
    type: REQUEST_UPDATE_POST_VOTES
  }
}

const receivedUpdatePostVotes = (post) => {
  return {
    type: RECEIVE_UPDATE_POST_VOTES,
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
    type: REQUEST_DELETE_POST
  }
}

const receivedDeletePost = (currentPosts, deletedPostId) => {
  return {
    type: RECEIVE_DELETE_POST,
    currentPosts,
    deletedPostId
  }
}

const deleteParentPostComments = (deletedPostId) => {
  return {
    type: DELETE_PARENT_POST_COMMENTS,
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
    type: REQUEST_CREATE_POST
  }
}

const receivedCreatePost = (createdPost) => {
  return {
    type: RECEIVE_CREATE_POST,
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
    type: REQUEST_UPDATE_POST
  }
}

const receivedUpdatePost = (updatedPost) => {
  return {
    type: RECEIVE_UPDATE_POST,
    updatedPost
  }
}

export const updatePost = (editPost) => (dispatch, getState) => {
  dispatch(requestUpdatePost())
  ReadableAPIUtil.updatePost(editPost).then(updatedPost => {
    return dispatch(receivedUpdatePost(updatedPost))
  })
}

export const postsSorting = (sortBy = BY_VOTES) => {
  return {
    type: POSTS_SORTING,
    sortBy
  }
}

const requestPostComments = () => {
  return {
    type: REQUEST_POST_COMMENTS
  }
}

const receivePostComments = (postId, comments) => {
  return {
    type: RECEIVE_POST_COMMENTS,
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
    type: REQUEST_UPDATE_COMMENT_VOTES
  }
}

const receivedUpdateCommentVotes = (postId, comment) => {
  return {
    type: RECEIVE_UPDATE_COMMENT_VOTES,
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
    type: REQUEST_DELETE_COMMENT
  }
}

const receivedDeleteComment = (postId, deletedCommentId) => {
  return {
    type: RECEIVE_DELETE_COMMENT,
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
    type: REQUEST_CREATE_COMMENT
  }
}

const receivedCreateComment = (postId, createdComment) => {
  return {
    type: RECEIVE_CREATE_COMMENT,
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
    type: REQUEST_UPDATE_COMMENT
  }
}

const receivedUpdateComment = (postId, updatedComment) => {
  return {
    type: RECEIVE_UPDATE_COMMENT,
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