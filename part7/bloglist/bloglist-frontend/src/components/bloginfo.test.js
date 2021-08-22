import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogInfo from './BlogInfo'

test('test for new blog form', () => {
  const add_blog = jest.fn()

  const component = render(<BlogInfo blog_addition={add_blog} />)

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const likes = component.container.querySelector('#likes')
  const form = component.container.querySelector('form')

  fireEvent.change(title, {
    target: { value: 'Testing an app' },
  })

  fireEvent.change(author, {
    target: { value: 'Dhruv Verma' },
  })

  fireEvent.change(url, {
    target: { value: 'https://fiction.net' },
  })

  fireEvent.change(likes, {
    target: { value: 4 },
  })

  fireEvent.submit(form)

  expect(add_blog.mock.calls).toHaveLength(1)
  expect(add_blog.mock.calls[0][0].title).toBe('Testing an app')
  expect(add_blog.mock.calls[0][0].author).toBe('Dhruv Verma')
  expect(add_blog.mock.calls[0][0].url).toBe('https://fiction.net')
  expect(add_blog.mock.calls[0][0].likes).toBe('4')
})