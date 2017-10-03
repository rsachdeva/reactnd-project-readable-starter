import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPostDetail, createComment } from '../actions'
import NewComment from '../presenters/NewComment'

class NewCreateCommentsContainer extends Component {

  componentDidMount() {
    const exists = this.props.postDetail
    if (!exists) {
      this.props.fnFetchPostDetail(this.props.postId)
    }
  }

  render() {
    return <NewComment {...this.props}/>
  }
}

const postDetailFromPosts = (posts, postId) => {
  return posts.find((post) => {
    return post.id === postId
  })
}

const mapStateToProps = (state, ownProps) => {
  return {
    postDetail: postDetailFromPosts(state.postsMeta.posts, ownProps.postId)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fnFetchPostDetail: (postId) => dispatch(fetchPostDetail(postId)),
    fnCreateComment: (postId, newComment) => dispatch(createComment(postId, newComment))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewCreateCommentsContainer)