import React from 'react'
import {Link, NavLink} from 'react-router-dom'
import PropTypes from 'prop-types'
import {BY_VOTES, BY_CREATED_AT} from '../actions'
import Post from './PostSummaryOrDetailed'

const Posts = (props) => {

  const { fetchedCategoriesMeta, fetchedPostsMeta, fetchedCommentsByPostMeta, fnUpdatePostVotes, fnDeletePost, fnPostsSorting, activatedCategory } = props
  const { categories } = fetchedCategoriesMeta
  const { posts, postsSortBy } = fetchedPostsMeta

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-6">
          <h1>Posts</h1>
        </div>
        <div className="col-md-6 text-right">
          <Link to='/posts/new' className="btn btn-info">Create Post</Link>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 form-group mt-3">
          <label className="mr-3" htmlFor="sortBy">Sort By:</label>
          <select value={postsSortBy} onChange={(event) => {
            fnPostsSorting(event.target.value)
          }}>
            <option value={BY_VOTES}>Votes</option>
            <option value={BY_CREATED_AT}>Created At</option>
          </select>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-12">
          <nav className="nav nav-pills">
            {categories && (categories.length > 1) && categories.map((category) => {
              let categoryName = 'all'
              if (category !== '') {
                categoryName = category
              }
              return <NavLink exact to={`/${category}`} className="nav-item nav-link"
                              key={category}>{categoryName}</NavLink>
            })}
          </nav>
        </div>
      </div>
      {(fetchedPostsMeta.isFetchingPosts || fetchedCommentsByPostMeta.isFetchingCommentsByPost) ?
        <div className="row">
          <div className="col-md-12">
            <ul className="list-group mt-3">
              Loading Posts...
            </ul>
          </div>
        </div>
        :
        <div className="row">
          <div className="col-md-12">
            <ul className="list-group mt-3">
              {posts && (posts.length > 0) && posts.map((post) => {
                const { commentsByPost } = fetchedCommentsByPostMeta
                return (
                  <Post key={post.id} post={post} commentsByPost={commentsByPost} fnUpdatePostVotes={fnUpdatePostVotes} fnDeletePost={fnDeletePost} activatedCategory={activatedCategory} />
                )
              })}
            </ul>
          </div>
        </div>
      }
    </div>
  )
}

Posts.propTypes = {
  post: PropTypes.object,
  commentsByPost: PropTypes.object,
  fnUpdatePostVotes: PropTypes.func,
  fnDeletePost: PropTypes.func
}

export default Posts