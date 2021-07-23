const ld = require('lodash')

const dummy = (blogs) => {
  return Number(blogs + 1)
}

const totalLikes = (blogs) => {
  if(!Array.isArray(blogs) || !blogs.length){
    return 0
  }

  else if(blogs.length === 1)
  { return blogs[0].likes
  }
  else{
    return blogs.reduce((total, blog) => total + blog.likes, 0)
  }
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0){ return {} }
  else{
    return blogs.reduce((last_blog, current_blog) =>
    {
      if(current_blog.likes > last_blog.likes){
        return current_blog
      }
      else{
        return last_blog
      }
    })
  }
}

const fav_author = (blog) => blog.author

const mostBlogs = (blogs) => {
  if (blogs.length === 0){
    return {}
  }

  const blogs_group = ld.groupBy(blogs, fav_author)
  const authors = ld.mapValues(blogs_group, (e) => e.length)
  const fav_blog = Object.entries(authors).reduce((a, b) => {
    if(a[1] > b[1]){
      return  a
    }
    else{
      return b
    }
  })
  return { 'author': fav_blog[0], 'blogs': fav_blog[1] }
}

const mostLikes = (blogs) => {
  if(blogs.length === 0){
    return {}
  }

  const blogs_group = ld.groupBy(blogs, fav_author)
  const blog_likes = ld.mapValues(blogs_group, totalLikes)
  const liked_author = Object.entries(blog_likes).reduce((a, b) => {
    if(a[1] > b[1]){
      return  a
    }
    else{
      return b
    }
  })
  return { 'author': liked_author[0], 'likes': liked_author[1] }
}


module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}