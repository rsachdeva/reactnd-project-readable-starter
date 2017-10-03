import React, {Component} from 'react'
import {connect} from 'react-redux'
import { fetchPostDetail, updatePostVotes, deletePost, deleteComment, fetchPostComments, updateCommentVotes } from '../actions'
import ShowPost from '../presenters/ShowPost'

class ShowPostContainer extends Component {
  componentDidMount() {
    const { postId, postDetail } = this.props
    if (!postDetail) {
      this.props.fnFetchPostDetail(postId)
      this.props.fnFetchPostComments(postId)
    }
  }


  render() {
    return <ShowPost {...this.props}/>
  }
}

const sortedPostComments = (comments) => {
  if (comments && comments.length > 0) {
    return comments.sort((a, b) => (b.voteScore - a.voteScore))
  }
}

const postDetailFromPosts = (posts, postId) => {
  return posts.find((post) => {
    return post.id === postId
  })
}

const mapStateToProps = (state, ownProps) => {
  const postId = ownProps.postId
  const existingCommentsByPost = state.commentsByPostMeta.commentsByPost[postId]
  return {
    postDetail: postDetailFromPosts(state.postsMeta.posts, postId),
    commentsByPost: existingCommentsByPost ? { [postId] : sortedPostComments(existingCommentsByPost) } : {}
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fnUpdatePostVotes: (postId, voteOption) => dispatch(updatePostVotes(postId, voteOption)),
    fnFetchPostDetail: (postId) => dispatch(fetchPostDetail(postId)),
    fnFetchPostComments: (postId) => dispatch(fetchPostComments(postId)),
    fnUpdateCommentVotes: (postId, commentId, voteOption) => dispatch(updateCommentVotes(postId,commentId, voteOption)),
    fnDeletePost: (postId) => dispatch(deletePost(postId)),
    fnDeleteComment: (postId, commentId) => dispatch(deleteComment(postId, commentId))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowPostContainer)