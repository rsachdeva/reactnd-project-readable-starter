import React from 'react'
import ArrowLeft from 'react-icons/lib/fa/arrow-left'
import serializeForm from 'form-serialize'

// title: 'Learn from Udacity!',
//   body: 'No kidding. It takes more than few days to learn technology.',
//   author: 'rs',
//   category: 'udacity',

const NewPost = (props) => {
  const { categories, history, fnCreatePost } = props


  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-1 text-right p-0">
          <div onClick={history.goBack} className="mt-10 btn btn-primary"><ArrowLeft/></div>
        </div>
        <div className="col-md-11 text-left">
          <h1>New Post</h1>
        </div>
      </div>
      <form onSubmit={(e) => {
        e.preventDefault()
        const values = serializeForm(e.target, { hash: true })
        if (values.title) {
          fnCreatePost(values)
          history.goBack()
        }
      }}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input type="text" name="title" className="form-control" id="title" aria-describedby="title" placeholder="Enter title"/>
        </div>
        <div className="form-group">
          <label htmlFor="category">Select Category</label>
          <select name="category" defaultValue={categories[0]} className="form-control" id="category">
            {categories && (categories.length > 1) && categories.map((category) => {
              return <option key={category}>{category}</option>
            })}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="body">Description</label>
          <textarea name="body" className="form-control" id="body" rows="3" placeholder="Enter post description" />
        </div>
        <div className="form-group">
          <label htmlFor="author">Author</label>
          <input type="text" name="author" className="form-control" id="author" aria-describedby="author" placeholder="Author Name"/>
        </div>
        <button type="submit" className="mt-5 btn btn-primary">Submit</button>
      </form>
    </div>
  )

}

export default NewPost