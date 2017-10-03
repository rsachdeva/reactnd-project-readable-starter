import React from 'react'
import ReactDOM from 'react-dom'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import AppRoutes from './presenters/AppRoutes'
import registerServiceWorker from './registerServiceWorker'
import { BrowserRouter } from 'react-router-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
//import { createLogger } from 'redux-logger'
import reducer from './reducers'
import { Provider } from 'react-redux'


const middleware = [ thunk ]
if (process.env.NODE_ENV !== 'production') {
  //middleware.push(createLogger())
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(...middleware)
  )
)

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <AppRoutes/>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'))
registerServiceWorker()
