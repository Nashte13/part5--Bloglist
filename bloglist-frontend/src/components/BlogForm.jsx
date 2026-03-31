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
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    );
}

export default BlogForm;