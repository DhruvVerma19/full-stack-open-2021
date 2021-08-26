import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { ME } from '../queries'
import BookList from './BookList'

const Recommend = (props) => {
  const books = props.books
  const [user, setUser] = useState(null)
  const [userBooks, setUserBooks] = useState([])

  useQuery(ME, {
    onCompleted: ({ me }) => {
      setUser(me)
    },
  })

  useEffect(() => {
    setUserBooks(books.filter((book) => book.genres.includes(user.favoriteGenre)))
  }, [user, books])

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre patterns</p>
      <BookList books={userBooks} />
    </div>
  )
}

export default Recommend