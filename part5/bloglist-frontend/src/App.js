import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './Notifications'
import LoginForm from './components/LoginForm'
import BlogInfo from './components/BlogInfo'
import Toggle from './components/Toggle'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [update, setUpdate] = useState(null)

  const [user, setUser] = useState(null)

  const blogRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [update])

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
      setMessage(null)
    }, 5000)
  }, [message])

  const fn_login = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      blogService.set_token(user.token)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      setUser(user)
      setUsername('')
      setPassword('')
      setMessage(`Welcome ${user.name}`)
    } catch (exception) {
      setMessage('wrong username or password\'')
    }
  }

  const fn_logout = async () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setMessage('Logout success')
    setUser(null)
  }

  const add_blog = async (obj) => {
    try {
      blogRef.current.toggleVisibility()
      const response = await blogService.create(obj)
      setBlogs(blogs.concat(response))
      setMessage(`A new blog ${response.title} by ${response.author} added`)
    } catch (exception) {
      setMessage('A new blog not added')
    }
  }
  const fn_likes = async (id, likes) => {
    await blogService.update({
      id: id,
      likes: likes + 1,
    })
    setUpdate(Math.floor(Math.random() * 1000))
  }

  const fn_remove = async (blog) => {
    const result = window.confirm(`Remove ${blog.title} by ${blog.author}`)

    if (result) {
      await blogService.remove({
        id: blog.id,
      })
      setUpdate(Math.floor(Math.random() * 1000))
    }
  }

  const loginForm = () => (
    <Toggle label="log in">
      <LoginForm
        fn_submit={fn_login}
        username={username}
        password={password}
        fn_usr_change={({ target }) => setUsername(target.value)}
        fn_pass_change={({ target }) => setPassword(target.value)}
      />
    </Toggle>
  )

  const userInfo = () => (
    <div>
      {user.name} logged in <button onClick={fn_logout}>Logout</button>
    </div>
  )


  const blog_info = () => (
    <Toggle label="Create Blog" ref={blogRef}>
      <BlogInfo blog_addition={add_blog} />
    </Toggle>
  )

  return (
    <div>
      <Notification message={message} />
      {user === null ? (
        <div>
          <h2>Log in to application</h2>
          {loginForm()}
        </div>
      ) : (
        <div>
          <h2>blogs</h2>
          {userInfo()}
          {blog_info()}
          {blogs.map((blog) => <Blog key={blog.id} blog={blog} likes={fn_likes} remove={fn_remove} />)}
        </div>
      )}
    </div>
  )
}

export default App
