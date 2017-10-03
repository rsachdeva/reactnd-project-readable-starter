import React from 'react'
import {Link} from 'react-router-dom'
import ArrowLeft from 'react-icons/lib/fa/arrow-left'
import serializeForm from 'form-serialize'

const NewComment = (props) => {

  const {postCategory, postId, postDetail, history, fnCreateComment } = props

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-1 text-right p-0">
          <div onClick={history.goBack} className="mt-10 btn btn-primary"><ArrowLeft/></div>
        </div>
        <div className="col-md-11 text-left">
          <h1>New Comment</h1>
        </div>
      </div>
      {postDetail && <div className="row mt-5">
        <div className="col-md-6">
          <form onSubmit={(e) => {
            e.preventDefault()
            const values = serializeForm(e.target, { hash: true })
            if (values.body) {
              fnCreateComment(postId, values)
              history.goBack()
            }
          }}>
            <div className="form-group">
              <label>For Post: <Link to={`/${postCategory}/${postId}`} className="mt-10">{postDetail.title}</Link></label>
              <textarea name="body" className="form-control" id="body" rows="3" placeholder="Enter comment"/>
            </div>
            <div className="form-group">
              <label htmlFor="author">Author</label>
              <input type="text" name="author" className="form-control" id="author" aria-describedby="author" placeholder="Author Name"/>
            </div>
            <button type="submit" className="mt-5 btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
      }
    </div>
  )

}

export default NewComment