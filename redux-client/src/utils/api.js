const api = process.env.REACT_APP_READABLE_API_URL || 'http://localhost:3001'

const token = 'us.drinnovations'

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const getCategories = () =>
  fetch(`${api}/categories`, {headers})
    .then(res => res.json())
    .then(data => data.categories)

export const getPost = (postId) =>
  fetch(`${api}/posts/${postId}`, {headers})
    .then(res => res.json())
    .then(data => data)

export const getPosts = () =>
  fetch(`${api}/posts`, {headers})
    .then(res => res.json())
    .then(data => data)


export const getPostsByCategory = (category) =>
  fetch(`${api}/${category}/posts`, {headers})
    .then(res => res.json())
    .then(data => data)

export const createPost = (newPost) => {
  return fetch(`${api}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json' //content type is different from Accept, so need to specify
    },
    body: JSON.stringify(newPost)
  }).then(res => {
    return res.json()
  }).then(data => {
    return data
  })
}

export const updatePost = (editPost) => {
  return fetch(`${api}/posts/${editPost.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json' //content type is different from Accept, so need to specify
    },
    body: JSON.stringify(editPost)
  }).then(res => {
    return res.json()
  }).then(data => {
    return data
  })
}

export const updatePostVotes = (postId, voteOption) => {
  return fetch(`${api}/posts/${postId}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json' //content type is different from Accept, so need to specify
    },
    body: JSON.stringify({option: voteOption})
  }).then(res => {
    return res.json()
  }).then(data => {
    return data
  })
}

export const deletePost = (postId) => {
  return fetch(`${api}/posts/${postId}`, {
    method: 'DELETE',
    headers: {
      ...headers,
      'Content-Type': 'application/json' //content type is different from Accept, so need to specify
    }
  }).then(res => {
    return res.json()
  }).then(data => {
    return data
  })
}

export const createComment = (newComment) => {
  return fetch(`${api}/comments`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json' //content type is different from Accept, so need to specify
    },
    body: JSON.stringify(newComment)
  }).then(res => {
    return res.json()
  }).then(data => {
    return data
  })
}

export const updateComment = (editComment) => {
  return fetch(`${api}/comments/${editComment.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json' //content type is different from Accept, so need to specify
    },
    body: JSON.stringify(editComment)
  }).then(res => {
    return res.json()
  }).then(data => {
    return data
  })
}

export const updateCommentVotes = (commentId, voteOption) => {
  return fetch(`${api}/comments/${commentId}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json' //content type is different from Accept, so need to specify
    },
    body: JSON.stringify({option: voteOption})
  }).then(res => {
    return res.json()
  }).then(data => {
    return data
  })
}

export const deleteComment = (commentId) => {
  return fetch(`${api}/comments/${commentId}`, {
    method: 'DELETE',
    headers: {
      ...headers,
      'Content-Type': 'application/json' //content type is different from Accept, so need to specify
    }
  }).then(res => {
    return res.json()
  }).then(data => {
    return data
  })
}

export const getCommentsByPost = (postId) => {
  return fetch(`${api}/posts/${postId}/comments`, {headers})
    .then(res => res.json())
    .then(data => {
      return data
    })
}