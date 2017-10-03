import React, {Component} from 'react'
import ArrowLeft from 'react-icons/lib/fa/arrow-left'
import serializeForm from 'form-serialize'

// title: 'Learn from Udacity!',
//   body: 'No kidding. It takes more than few days to learn technology.',
//   author: 'rs',
//   category: 'udacity',

class EditPost extends Component {
  state = {
    title: '',
    body: ''
  }

  componentDidMount() {
    const { postDetail } = this.props

    postDetail && this.setState({title:  postDetail.title, body: postDetail.body})
  }

  handleTitleChange = (event) => {
    this.setState({title: event.target.value})
  }

  handleBodyChange = (event) => {
    this.setState( {body: event.target.value})
  }


  render() {
    const {history, fnUpdatePost, postDetail} = this.props

    return (
      <div className="container">
        <div className="row mt-5">
          <div className="col-md-1 text-right p-0">
            <div onClick={history.goBack} className="mt-10 btn btn-primary"><ArrowLeft/></div>
          </div>
          <div className="col-md-11 text-left">
            <h1>Edit Post</h1>
          </div>
        </div>
        {postDetail && <form onSubmit={(e) => {
          e.preventDefault()
          const values = serializeForm(e.target, {hash: true})
          const existingValues = {id: postDetail.id}
          if (values.title) {
            fnUpdatePost({
              ...values,
              ...existingValues
            })
            history.goBack()
          }
        }}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input type="text" name="title" className="form-control" id="title" aria-describedby="title"
                   placeholder="Enter title" value={this.state.title} onChange={this.handleTitleChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="body">Description</label>
            <textarea name="body" className="form-control" id="body" rows="3"
                      placeholder="Enter post description" value={this.state.body}
                      onChange={this.handleBodyChange}/>
          </div>
          <button type="submit" className="mt-5 btn btn-primary">Submit</button>
        </form>}
      </div>
    )
  }
}

export default EditPost