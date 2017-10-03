import React from 'react'
import {Route, Switch} from 'react-router-dom'
import {withRouter} from 'react-router'
import PostsContainer from '../containers/PostsContainer'
import ShowPostContainer from '../containers/ShowPostContainer'
import NewCreatePostsContainer from '../containers/NewCreatePostsContainer'
import EditUpdatePostsContainer from '../containers/EditUpdatePostsContainer'
import NewCreateCommentsContainer from '../containers/NewCreateCommentsContainer'
import EditUpdateCommentsContainer from '../containers/EditUpdateCommentsContainer'
import queryString from 'query-string'

const AppRoutes = () => {

  return (
    <div className="App">
      <Switch>
        <Route exact path="/" render={() => {
          return <PostsContainer activatedCategory=''/>
        }}/>
        <Route exact path="/:category" render={({match}) => {
          return <PostsContainer activatedCategory={match.params.category}/>
        }}/>
        <Route exact path="/posts/new" render={({history}) => {
          return <NewCreatePostsContainer history={history}/>
        }}/>
        <Route exact path="/posts/:postId/edit" render={({match, history}) => {
          return <EditUpdatePostsContainer postId={match.params.postId} history={history}/>
        }}/>
        <Route exact path="/:category/:postId" render={(props) => {
          const {match, location, history} = props
          const parsedLocation = queryString.parse(location.search)
          const activatedCategory = parsedLocation.activatedCategory ? parsedLocation.activatedCategory : ''
          return <ShowPostContainer postCategory={match.params.category} postId={match.params.postId}
                                    activatedCategory={activatedCategory} history={history}/>
        }}/>
        <Route exact path="/:category/:postId/comments/new" render={(props) => {
          const {match, history } = props
          return <NewCreateCommentsContainer postCategory={match.params.category} postId={match.params.postId} history={history}/>
        }}/>
        <Route exact path="/:category/:postId/comments/:commentId/edit" render={(props) => {
          const {match, history } = props
          return <EditUpdateCommentsContainer postCategory={match.params.category} postId={match.params.postId}
                                              history={history} commentId={match.params.commentId}/>
        }}/>
      </Switch>
    </div>
  )
}

const addRouter = withRouter(AppRoutes)

export default addRouter