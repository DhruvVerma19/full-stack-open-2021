
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

module.exports = {
  dummy, totalLikes, favoriteBlog
}