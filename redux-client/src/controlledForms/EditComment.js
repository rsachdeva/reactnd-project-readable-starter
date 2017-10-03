import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import ArrowLeft from 'react-icons/lib/fa/arrow-left'
import serializeForm from 'form-serialize'


class EditComment extends Component {
  state = {
    body: ''
  }

  componentDidMount() {
    const { postDetail, commentDetail } = this.props

    postDetail && this.setState({body: commentDetail.body})
  }

  handleBodyChange = (event) => {
    this.setState( {body: event.target.value})
  }


  render() {
    const { history, postCategory,  fnUpdateComment, postDetail, commentDetail } = this.props

    return (
      <div className="container">
        <div className="row mt-5">
          <div className="col-md-1 text-right p-0">
            <div onClick={history.goBack} className="mt-10 btn btn-primary"><ArrowLeft/></div>
          </div>
          <div className="col-md-11 text-left">
            <h1>Edit Comment</h1>
          </div>
        </div>
        {commentDetail && <div className="row mt-5">
          <div className="col-md-6">
            <form onSubmit={(e) => {
              e.preventDefault()
              const values = serializeForm(e.target, {hash: true})
              const existingValues = {id: commentDetail.id}
              if (values.body) {
                const toUpdateValues = {
                  ...values,
                  ...existingValues
                }
                fnUpdateComment(postDetail.id, toUpdateValues)
                history.goBack()
              }
            }}>
              <div className="form-group">
                <label>For Post: <Link to={`/${postCategory}/${postDetail.id}`} className="mt-10">{postDetail.title}</Link></label>
                <textarea name="body" className="form-control" id="body" rows="3"
                          placeholder="Enter comment" value={this.state.body} onChange={this.handleBodyChange}/>
              </div>
              <button type="submit" className="mt-5 btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
        }
      </div>
    )
  }
}

export default EditComment