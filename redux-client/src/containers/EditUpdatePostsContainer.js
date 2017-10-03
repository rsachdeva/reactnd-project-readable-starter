import React, { Component } from 'react'
import { connect } from 'react-redux'
import {  fetchCategories, fetchPostDetail, updatePost } from '../actions'
import EditPost from '../controlledForms/EditPost'



class EditUpdatePostsContainer extends Component {
  componentDidMount() {
    const { postDetail } = this.props
    if (!postDetail) {
      this.props.fnFetchCategories()
      this.props.fnFetchPostDetail(this.props.postId)
    }
  }

  render() {
    return <EditPost {...this.props} />
  }
}

const postDetailFromPosts = (posts, postId) => {
  return posts.find((post) => {
    return post.id === postId
  })
}

const mapStateToProps = (state, ownProps) => {
  return {
    categories: state.categoriesMeta.categories.filter((category) => category !== ""),
    postDetail: postDetailFromPosts(state.postsMeta.posts, ownProps.postId),
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fnFetchCategories: () => dispatch(fetchCategories()),
    fnFetchPostDetail: (postId) => dispatch(fetchPostDetail(postId)),
    fnUpdatePost: (editPost) => dispatch(updatePost(editPost))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditUpdatePostsContainer)