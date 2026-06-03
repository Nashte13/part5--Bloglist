import { useState } from "react";
import {TextField, Button, Typography, Paper, Box} from "@mui/material";

const BlogForm = ({ addBlog }) => {
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
    <div>
      <Typography variant="h5" gutterBottom>
        Create new blog
      </Typography>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            label="Title"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
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
    </div>
  );
};

export default BlogForm;
