import {render, screen} from "@testing-library/react";
import BlogForm from "./BlogForm";
import { expect, vi, test } from "vitest";
import userEvent from "@testing-library/user-event";

test('<BlogForm /> calls addBlog with the right details', async () => {
    const addBlog = vi.fn()
    const user = userEvent.setup()

    render(<BlogForm addBlog={addBlog} />)

    const titleInput = screen.getByLabelText('Title')
    const authorInput = screen.getByLabelText('Author')
    const urlInput = screen.getByLabelText('url')
    const createButton = screen.getByText('Create')

    await user.type(titleInput, 'My Test Blog')
    await user.type(authorInput, 'Nash')
    await user.type(urlInput, 'http://example.com')


    //submit the form
    await user.click(createButton)

    //check thats addBlog was called once
    expect(addBlog.mock.calls).toHaveLength(1)

    //check that the right call had the right object
    expect(addBlog.mock.calls[0][0].toEqual({
        title: 'My Test Blog',
        author: 'Nash',
        url: 'http://example.com'
    }))
})