import { useState } from "react";

const BlogForm = ({addBlog}) => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [url, setUrl] = useState("");

    const handleSubmit = (event) => {
      event.preventDefault();
      addBlog({ title, author, url });
      setTitle("");
      setAuthor("");
      setUrl("");
    };

    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Title
            <input
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Author
            <input
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            url
            <input
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
          </label>
        </div>
        <button type="submit">Create</button>
      </form>
    );
}

export default BlogForm;