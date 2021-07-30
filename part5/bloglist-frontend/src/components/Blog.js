import React, { useState } from 'react'
import propTypes from 'prop-types'

const Blog = ({ blog, likes, remove }) => {
  const [showBlog, setshowBlog] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  const show_blog = () => {
    return (
      <div>
        <p>{blog.url}</p>
        <p>
          {blog.likes} {' '} <button className="like-blog" onClick={() => likes(blog.id, blog.likes)}>like</button>
        </p>
        <p>{blog.author}{' '}
          <button className="remove-blog" onClick={() => remove(blog)}>Remove</button> </p>
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

Blog.propTypes = {
  update: propTypes.func,
  blog:propTypes.shape({
    title:propTypes.string.isRequired,
    author:propTypes.string.isRequired,
    url:propTypes.string.isRequired,
    likes:propTypes.string.isRequired
  })
}

export default Blog
