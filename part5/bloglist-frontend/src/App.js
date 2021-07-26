import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './Notifications'



const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errMessage, setErrMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.set_token(user.token)
    }
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setErrMessage(null)
    }, 5000)
  }, [errMessage])

  const user_login = async (e) => {
    e.preDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.set_token(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setErrMessage(`Welcome ${user.name}`)
    } catch (exception) {
      setErrMessage('wrong username or password')
    }
  }

  const user_logout = async () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setErrMessage('Logout success')
    setUser(null)
  }

  const addition_blog = async (e) => {
    e.preDefault()
    try {
      const response = await blogService.create({
        title,
        author,
        url
      })
      setBlogs(blogs.concat(response))
      setTitle('')
      setAuthor('')
      setUrl('')
      setErrMessage(`a new blog ${title} by ${author} added`)
    } catch (exception) {
      setErrMessage(`a new blog ${title} by ${author} not added`)
    }
  }

  const login_info = () => (
    <form onSubmit={user_login}>
      <div>
        username
        <input
          type='text'
          value={username}
          name='Username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type='password'
          value={password}
          name='Password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type='submit'>login</button>
    </form>
  )

  const user_info = () => (
    <div>
      {user.name} logged in <button onClick={user_logout}>Logout</button>
    </div>
  )

  const blog_info = () => (
    <div>
      <form onSubmit={addition_blog}>
        <div>
          title: <input
            value={title}
            name='title'
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author: <input
            value={author}
            name='author'
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url: <input
            value={url}
            name='url'
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type='submit'>Add</button>
      </form>
    </div>
  )
  if(user === null){
    return(<div>
            <div>
              <Notification message={errMessage} />
            </div>
            <div>
          <h2>Log in to application</h2>
          {login_info()}
        </div>
          </div>)
  }
  else{
    return(
    <div>
      <div>
        <Notification message={errMessage} />
      </div>
      <div>
          <h2>blogs</h2>
          {user_info()}
          {blog_info()}
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
        </div>
      )
  }
}

export default App