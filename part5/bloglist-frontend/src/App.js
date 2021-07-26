import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from "./services/login"
import Notification from './Notifications'

const App = () => {
  const [message, setMessage] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedin_user = window.localStorage.getItem('loggedBlogappUser')
    if(loggedin_user){
      const user = JSON.parse(loggedin_user)
      setUser(user)
      blogService.set_token(user.token)
    }
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }, [message])

  const login = async(e) => {
    e.preventDefault()
    try{
      const user = await loginService.login({username, password})
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.set_token(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setMessage(`Welcome ${user.name}!`)
    }
    catch(exception){
      setMessage(`Wrong username or password`)
    }
  }
  const logout = async() => {
    window.localStorage.removeItem('loggedBlogappUser')
    setMessage(`Logout Success`)
    setUser(null)
  }

  const additionBlog = async(e) => {
    e.preventDefault()
    try {
      const res = await blogService.create({
        title, author, url
      })
      setBlogs(blogs.concat(res))
      setTitle('')
      setUrl('')
      setAuthor('')
      setMessage(`A new blog ${title} by ${author} added`)
    }
    catch(exception){
      setMessage(`A new blog ${title} by ${author} not added`)
    }
  }

  const loginForm = () => {
    <form onSubmit={login}>
      <div>
        username
        <input type='text' value={username} name='Username' onChange={(target) => setUsername(target.value)} />
      </div>
      <div>
        password
        <input type='password' value={password} name='Password' onChange={(target) => setPassword(target.value)} />
      </div>
      <button type='submit'>login</button>
    </form>
  }

  const info = () => {
    return(
      <div>
        {user.name} logged in <button onClick={logout}>Logout</button>
      </div>
    )
  }

  const blogInfo = () => {
    <div>
      <form onSubmit={additionBlog}>
        <div>
          title:<input value={title} name='title' onChange={(target) => setTitle(target.value)} />
        </div>
        <div>
          author:<input value={author} name='author' onChange={(target) => setAuthor(target.value)} />
        </div>
        <div>
          url:<input value={url} name='url' onChange={(target) => setUrl(target.value)} />
        </div>
        <button type='submit'>Add</button>
      </form>
    </div>
  }
  return (
    <div>
      <Notification message={message} />
      {user === null ?
        <div>
          <h2>Log in to application</h2>
          {loginForm()}
        </div>
        :
        <div>
          <h2>blogs</h2>
          {info()}
          {blogInfo()}
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      }
    </div>
  )
}

export default App