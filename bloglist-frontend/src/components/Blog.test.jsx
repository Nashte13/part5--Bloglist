import { render, screen } form '@testing-library/react'
import Blog from './Blog'
import {vi} from 'vitest'

test('renders title and author but not url and likes by default', () => {
    const blog = {
        title: 'Test Blog',
        author: 'Nash',
        url: 'http://example.com',
        likes: 5,
        user: {id: '123'}
    }


    render(<Blog blog={blog} updateLikes={vi.fn()} deleteBlog={vi.fn()} />)

    expect(screen.getByText('Testing React Component by Nash')).toBDefined()

    const detail = screen.queryByText('http://example.com')
    const likes = screen.queryByText('Likes: 5')

    expect(detail).toBeNull()
    expect(likes).toBeNull()
})