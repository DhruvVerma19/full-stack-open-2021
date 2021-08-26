import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import {ADD_BOOK, ALL_BOOKS, ALL_AUTHORS} from '../queries'
import Notifications from './Notifications'

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuhtor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries:[{query:ALL_BOOKS}, {query:ALL_AUTHORS}]
  })

  if (!props.show) {
    return null
  }

  const notifications = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const submit = async (event) => {
    event.preventDefault()
    
    try {
      await addBook({
        variables: { title, author, published: parseInt(published), genres },
      })
    } catch (error) {
      notifications(error.message)
    }
    setTitle('')
    setPublished('')
    setAuhtor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <Notifications errorMessage={errorMessage} />
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuhtor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          genres: {genres.join(' ')}
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook