import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import userReducer from './reducers/userReducer'
import blogReducer from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'
import allUsersReducer from './reducers/allUsersReducer'

const reducer = combineReducers({
  blogs: blogReducer,
  notification: notificationReducer,
  user:userReducer,
  allUsers:allUsersReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store
