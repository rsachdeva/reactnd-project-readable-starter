import React, { Component } from 'react'
import { connect } from 'react-redux'
import {  fetchCategories, createPost } from '../actions'
import NewPost from '../presenters/NewPost'



class NewCreatePostsContainer extends Component {
  componentDidMount() {
    this.props.fnFetchCategories()
  }

  render() {
    return <NewPost {...this.props}/>
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    categories: state.categoriesMeta.categories.filter((category) => category !== "")
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fnFetchCategories: () => dispatch(fetchCategories()),
    fnCreatePost: (newPost) => dispatch(createPost(newPost))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewCreatePostsContainer)