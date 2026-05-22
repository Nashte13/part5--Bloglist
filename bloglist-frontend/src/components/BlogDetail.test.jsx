import { render, screen } from '@testing-library/react'
import {expect, test, vi} from 'vitest'
import userEvent from "@testing-library/react"
import BlogDetail from "./BlogDetail";

//helper blog
const blog = {
    id: "123",
    title: "Test Blog",
    author: "Nash",
    url: "http://example.com",
    likes: 5,
    user: {id: "creator-id", username: "creator"}
}

test('unauthenticated users see blog info but no buttons', () => {
    render(<BlogDetail blogs={[blog]} updateLikes={vi.fn()} deleteBlog={vi.fn()} />)

    expect(screen.getByText("Test Blog")).toBeDefined()
    expect(screen.getByText("Author: Nash")).toBeDefined()
    expect(screen.getByText("URL: http://example.com")).toBeDefined()
    expect(screen.getByText("Likes: 5")).toBeDefined()

    expect(screen.queryByText("Like")).toBeNull()
    expect(screen.queryByText("remove")).toBeNull()
})

test("authenticated non-creator users sees like button only", async () => {
    const updateLikes = vi.fn()
    const user = {id: "other-id", username: "other"}

    render(
        <BlogDetail
            blogs={[blog]}
            updateLikes={updateLikes}
            deleteBlog={vi.fn()}
            currentUser={user}
        />
    )

    expect(screen.getByText("Test Blog")).toBeDefined()
    expect(screen.getByText("Likes: 5")).toBeDefined()

    //like button visible
    const likeButton = screen.getByText("Like")
    expect(likeButton).toBeDefined()

    //delete button hidden
    expect(screen.quryByText("remove")).toBeNull()

    //clicking like calls handler
    const userEventInstance = userEvent.setup()
    await userEventInstance.click(likeButton)
    expect(updateLikes).toHaveBeenCalledTimes(1)
})

test("authenticated creator sees both like and delete buttons", async () => {
    const deleteBlog = vi.fn()
    const user = {id: "creator-id", username: "creator"}

    render(
        <BlogDetail
            blogs={[blog]}
            updateLikes={vi.fn()}
            deleteBlog={deleteBlog}
            currentUser={user}
        />
    )

    expect(screen.getByText("like")).toBeDefined()
    expect(screen.getByText("remove")).toBeDefined()
})