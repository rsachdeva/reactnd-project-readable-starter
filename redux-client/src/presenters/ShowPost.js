import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import ArrowLeft from 'react-icons/lib/fa/arrow-left'
import ThumbsOUp from 'react-icons/lib/fa/thumbs-o-up'
import ThumbsODown from 'react-icons/lib/fa/thumbs-o-down'
import MdDelete from 'react-icons/lib/md/delete'
import MdEdit from 'react-icons/lib/md/edit'
import Post from './PostSummaryOrDetailed'

const ShowPost = (props) => {

  const { history, activatedCategory, postDetail, commentsByPost, fnUpdatePostVotes, fnDeletePost, fnUpdateCommentVotes, fnDeleteComment } = props
  const postComments = postDetail && commentsByPost && commentsByPost[postDetail.id]


  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-1 text-right p-0">
          <div onClick={history.goBack} className="mt-10 btn btn-primary"><ArrowLeft/></div>
        </div>
        <div className="col-md-11 text-left">
          <h1>Post Details</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <ul className="list-group mt-3">
            {postDetail && commentsByPost &&
              <Post detailed={true} post={postDetail} commentsByPost={commentsByPost} fnUpdatePostVotes={fnUpdatePostVotes}
                    fnDeletePost={fnDeletePost} activatedCategory={activatedCategory} />
            }
          </ul>
        </div>
      </div>
      <div className="row">
        <div className="col-md-3">
          <ul className="list-group mt-3">
            <div><h5>Comments</h5></div>
          </ul>
        </div>
        {postDetail && <div className="col-md-9">
          <ul className="list-group mt-3">
            <Link to={`/${postDetail.category}/${postDetail.id}/comments/new`} className="mt-10"><div className="btn btn-info"><small>Add Comment</small></div></Link>
          </ul>
        </div>}
      </div>
      <div className="row">
        <div className="col-md-12">
          <ul className="list-group mt-3">
            {postComments && (postComments.length > 0) && postComments.map((comment) => {
              return <li className="list-group-item flex-column align-items-start" key={comment.id}>
                <p className="mb-1">{comment.body}</p>
                <small>Author: {comment.author}</small>
                <p className="m-3">
                  <small className="m-3 font-weight-bold">Votes: {comment.voteScore}</small>
                  <ThumbsOUp className="mr-3 up-vote" onClick={() => {
                    fnUpdateCommentVotes(postDetail.id, comment.id, "upVote")
                  }}/>
                  <ThumbsODown className="down-vote" onClick={() => {
                    fnUpdateCommentVotes(postDetail.id, comment.id, "downVote")
                  }}/>
                </p>
                <div className="d-flex w-100 m-3">
                  <span className="ml-3"><Link to={`/${postDetail.category}/${postDetail.id}/comments/${comment.id}/edit`}><MdEdit className="edit-post" size={25} /></Link></span>
                  <span className="ml-3"><MdDelete size={20} className="delete-comment" onClick={() => {
                    fnDeleteComment(postDetail.id, comment.id)
                  }}/></span>
                </div>
              </li>
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

ShowPost.propTypes = {
  postDetail: PropTypes.object,
  commentsByPost: PropTypes.object,
  fnUpdatePostVotes: PropTypes.func,
  fnDeletePost: PropTypes.func,
  fnDeleteComment: PropTypes.func
}

export default ShowPost