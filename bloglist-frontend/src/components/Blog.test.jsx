import { render, screen } from "@testing-library/react";
import Blog from "./Blog";
import { expect, vi, test } from "vitest";
import userEvent from "@testing-library/user-event";

test("renders   title and author but not url and likes by default", () => {
  const blog = {
    title: "Test Blog",
    author: "Nash",
    url: "http://example.com",
    likes: 5,
    user: { id: "123" },
  };

  render(<Blog blog={blog} updateLikes={vi.fn()} deleteBlog={vi.fn()} />);

  expect(screen.getByText("Testing React Component by Nash")).toBDefined();

  const detail = screen.queryByText("http://example.com");
  const likes = screen.queryByText("Likes: 5");

  expect(detail).toBeNull();
  expect(likes).toBeNull();
});

test("shows url and likes when view button s clicked", async () => {
  const blog = {
    title: "Test Blog",
    author: "Nash",
    url: "http://example.com",
    likes: 5,
    user: { id: "123" },
  };

  render(<Blog blog={blog} updateLikes={vi.fn()} deleteBlog={vi.fn()} />);

  const user = userEvent.setup();
  const button = screen.getByText("View");
  await user.click(button);

  expect(screen.getByText("http://example.com")).toBDefined();
  expect(screen.getByText("Likes: 5")).toBDefined();
});

test('like button is clicked twice, the event', async () => {
    const blog = {
        title: "Test Blog",
        author: "Nash",
        url: "http://example.com",
        likes: 5,
        user: { id: "123" },
    }

    const updateLikes = vi.fn()
    render(<Blog blog={blog} updateLikes={updateLikes} deleteBlog={vi.fn()} />)

    const user = userEvent.setup()
    const viewButton = screen.getByText('View')
    await user.click(viewButton)

    const likeButton = screen.getByText('Like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect (updateLikes.mock.calls).toHaveLength(2)
})
