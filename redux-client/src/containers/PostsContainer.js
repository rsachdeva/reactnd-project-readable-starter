import React, { Component } from 'react'
import { connect } from 'react-redux'
import {  fetchCategories, fetchPostsAndPostComments, updatePostVotes, deletePost, postsSorting, BY_VOTES, BY_CREATED_AT } from '../actions'
import Posts from '../presenters/Posts'

class PostsContainer extends Component {
  componentDidMount() {
    this.props.fnFetchCategories()
    this.props.fnFetchPostsAndPostComments(this.props.activatedCategory)
  }

  componentWillReceiveProps(nextProps) {
    //since App Routes passes updated activated category
    const nextActivatedCategory = nextProps.activatedCategory
    const currentActivatedCategory = this.props.activatedCategory
    if (nextActivatedCategory !== currentActivatedCategory) {
      this.props.fnFetchPostsAndPostComments(nextActivatedCategory)
    }
  }

  render() {
    return <Posts {...this.props}/>
  }
}

const stateWithSortedPosts = (state) => {
  const { posts, postsSortBy } = state.postsMeta
  const postsCopy = posts.slice()
  let sortedPosts = []
  if (postsSortBy === BY_VOTES) {
    sortedPosts = postsCopy.sort((a, b) => (b.voteScore - a.voteScore))
  } else if (postsSortBy === BY_CREATED_AT) {
    sortedPosts = postsCopy.sort((a, b) => (b.timestamp - a.timestamp))
  } else {
    sortedPosts = postsCopy
  }
  const updatedForSorting = {
    ...state,
    postsMeta: {
      ...state.postsMeta,
      posts: sortedPosts
    }
  }
  return updatedForSorting
}

const mapStateToProps = (state, ownProps) => {
  return {
    fetchedCategoriesMeta: state.categoriesMeta,
    fetchedPostsMeta: stateWithSortedPosts(state).postsMeta,
    fetchedCommentsByPostMeta: state.commentsByPostMeta
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fnFetchCategories: () => dispatch(fetchCategories()),
    fnFetchPostsAndPostComments: (activatedCategory) => dispatch(fetchPostsAndPostComments(activatedCategory)),
    fnUpdatePostVotes: (postId, voteOption) => dispatch(updatePostVotes(postId, voteOption)),
    fnPostsSorting: (sortBy) => dispatch(postsSorting(sortBy)),
    fnDeletePost: (postId) => dispatch(deletePost(postId))
}}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostsContainer)