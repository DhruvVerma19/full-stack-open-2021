
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


module.exports = {
  dummy, totalLikes
}