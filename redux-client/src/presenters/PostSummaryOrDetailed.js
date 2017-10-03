import React from 'react'
import {Link} from 'react-router-dom'
import ThumbsOUp from 'react-icons/lib/fa/thumbs-o-up'
import ThumbsODown from 'react-icons/lib/fa/thumbs-o-down'
import MdDelete from 'react-icons/lib/md/delete'
import MdEdit from 'react-icons/lib/md/edit'

const Post = (props) => {

  const {detailed, post, fnUpdatePostVotes, fnDeletePost, activatedCategory, commentsByPost} = props

  return (
    <li className="list-group-item border-0">
      {detailed ? (
        <div className="list-group-item-info p-3">
          <p className="mb-1 font-weight-bold">{post.title}</p>
          <p className="mb-1">{post.body}</p>
          <small className="mr-3">
            {(commentsByPost[post.id] && (commentsByPost[post.id].length > 0)) ? commentsByPost[post.id].length : "No"} {(commentsByPost[post.id] && (commentsByPost[post.id].length === 1)) ? "comment" : "comments"}</small>
          <small className="mr-3">Author: {post.author}</small>
          <small className="mr-3">Created At: {`${new Date(post.timestamp)}`}</small>
          <p className="m-3">
            <small className="m-3 font-weight-bold">Votes: {post.voteScore}</small>
            <ThumbsOUp className="mr-3 up-vote" onClick={() => {
              fnUpdatePostVotes(post.id, "upVote")
            }}/>
            <ThumbsODown className="down-vote" onClick={() => {
              fnUpdatePostVotes(post.id, "downVote")
            }}/>
          </p>
          <div className="d-flex w-100 m-3">
            <span className="m-3"><Link to={`/posts/${post.id}/edit`}><MdEdit className="edit-post" size={25} /></Link></span>
            <span className="m-3"><MdDelete className="delete-post" size={25} onClick={() => {
              fnDeletePost(post.id)
            }}/></span>
          </div>
        </div>
      ) : (
        <div>
          <Link to={`/${post.category}/${post.id}?activatedCategory=${activatedCategory}`}
                className="list-group-item-info flex-column align-items-start">
            <p className="mb-1 font-weight-bold">{post.title}</p>
          </Link>
          <div>
            <small className="mr-3">
              {(commentsByPost[post.id] && (commentsByPost[post.id].length > 0)) ? commentsByPost[post.id].length : "No"} {(commentsByPost[post.id] && (commentsByPost[post.id].length === 1)) ? "comment" : "comments"}
            </small>
            <small className="mr-3">Author: {post.author}</small>
            <small className="mr-3">Created At: {`${new Date(post.timestamp)}`}</small>
            <p className="m-3">
              <small className="m-3 font-weight-bold">Votes: {post.voteScore}</small>
              <ThumbsOUp className="mr-3 up-vote" onClick={() => {
                fnUpdatePostVotes(post.id, "upVote")
              }}/>
              <ThumbsODown className="down-vote" onClick={() => {
                fnUpdatePostVotes(post.id, "downVote")
              }}/>
            </p>
            <div className="d-flex w-100 m-3">
              <span className="m-3"><Link to={`/posts/${post.id}/edit`}><MdEdit className="edit-post" size={25} /></Link></span>
              <span className="m-3"><MdDelete className="delete-post" size={25} onClick={() => {
                fnDeletePost(post.id)
              }}/></span>
            </div>
          </div>
        </div>
      )}

    </li>
  )
}

export default Post