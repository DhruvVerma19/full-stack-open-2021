import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, update }) => {
  const [showBlog, setshowBlog] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const handleLikes = async () => {
    await blogService.update({
      id: blog.id,
      likes: blog.likes + 1,
    })

    update(Math.floor(Math.random() * 1000))
  }

  const handleRemove = async () => {
    const result = window.confirm(`Remove ${blog.title} by ${blog.author}`)

    if (result) await blogService.remove({ id: blog.id })
    update(Math.floor(Math.random() * 100))
  }

  const show_blog = () => {
    return (
      <div>
        <p>{blog.url}</p>
        <p>
          {blog.likes} <button onClick={() => handleLikes()}>like</button>
        </p>
        <p>{blog.author}</p>
        <button onClick={() => handleRemove()}>Remove</button>
      </div>
    )
  }

  return (
    <div style={blogStyle}>
      <p>{blog.title}</p>
      <i>{blog.author}</i>
      <button onClick={() => setshowBlog(!showBlog)}>
        {showBlog ? 'hide' : 'view'}
      </button>
      {showBlog && show_blog()}
    </div>
  )
}

export default Blog
