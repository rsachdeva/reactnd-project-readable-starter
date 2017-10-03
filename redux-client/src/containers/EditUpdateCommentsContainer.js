import React, { Component } from 'react'
import { connect } from 'react-redux'
import {  fetchPostDetail, fetchPostComments, updateComment } from '../actions'
import EditComment from '../controlledForms/EditComment'
import * as Helper from '../utils/helper'



class EditUpdateCommentsContainer extends Component {
  componentDidMount() {
    const exists = this.props.postDetail && this.props.commentDetail
    if (!exists) {
      const { postId } = this.props
      this.props.fnFetchPostDetail(postId)
      this.props.fnFetchPostComments(postId)
    }
  }

  render() {
    return <EditComment {...this.props} />
  }
}


const mapStateToProps = (state, ownProps) => {
  const { postId, commentId } = ownProps
  const existingCommentsByPost = state.commentsByPostMeta.commentsByPost[postId]
  return {
    postDetail: Helper.findItemFromItems(state.postsMeta.posts, postId),
    commentDetail: Helper.findItemFromItems(existingCommentsByPost, commentId)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fnFetchPostDetail: (postId) => dispatch(fetchPostDetail(postId)),
    fnFetchPostComments: (postId) => dispatch(fetchPostComments(postId)),
    fnUpdateComment: (postId, editComment) => dispatch(updateComment(postId, editComment))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditUpdateCommentsContainer)