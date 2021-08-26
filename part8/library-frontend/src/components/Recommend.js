import React, { useState, useEffect, useDebugValue } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { ME, ALL_BOOKS } from '../queries'
import BookList from './BookList'

const Recommend = (props) => {
  const [user, setUser] = useState(null)
  const [userBooks, setUserBooks] = useState([])
  const person = useQuery(ME)
  const [getBooks, result] = useLazyQuery(ALL_BOOKS,{
      fetchPolicy: 'no-cache'
  })


  useEffect(() => {
      if(person.data){
          setUser(person.data.me)
          getBooks({variables:{genre:person.data.me.favoriteGenre}})
      }
  }, [person, user, getBooks])

  useEffect(() => {
      if(result.data){
          setUserBooks(result.data.allBooks)
      }
  }, [result])
  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favorite genre patterns:{' '}
        <strong>{user.favoriteGenre}</strong>
      </p>
        <BookList books={userBooks} />
    </div>
  )
}

export default Recommend