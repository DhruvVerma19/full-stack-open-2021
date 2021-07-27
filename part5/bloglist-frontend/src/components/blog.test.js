import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import blogService from '../services/blogs'

describe('<Blog />', () => {
  let component
  let test_blog = {
    title: 'Testing an app',
    author: 'Dhruv Verma',
    url: 'https://fiction.net',
    likes: 4,
    user: '606f2ec415917a37c0b332f',
  }

  let test_handler = jest.fn()

  blogService.update = jest.fn().mockImplementation(() => {
    return Promise.resolve({ success: true })
  })

  beforeEach(() => {
    component = render(<Blog blog={test_blog} likes={test_handler} />)
  })

  test('the component is displaying blog title and author by default', () => {
    expect(component.container).toHaveTextContent(test_blog.title)
    expect(component.container).toHaveTextContent(test_blog.author)
    expect(component.container).not.toHaveTextContent(test_blog.likes)
    expect(component.container).not.toHaveTextContent(test_blog.url)
  })

  test('the component is displaying url and likes after clicking button', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(test_blog.likes)
    expect(component.container).toHaveTextContent(test_blog.url)
  })

  test('if the like button is clicked twice, the event handler should be called twice', () => {
    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)

    const fn_like_btn = component.getByText('like')

    fireEvent.click(fn_like_btn)
    fireEvent.click(fn_like_btn)

    expect(test_handler.mock.calls).toHaveLength(2)
  })
})