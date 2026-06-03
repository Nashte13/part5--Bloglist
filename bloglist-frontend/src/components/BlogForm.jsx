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
    <Paper>
      <Typography variant="h5" gutterBottom>
        Create new blog
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
              <TextField
                label="Title"
                value={title}
                onChange={({ target }) => setTitle(target.value)}
              />
            
              <TextField
                label="Author"
                value={author}
                onChange={({ target }) => setAuthor(target.value)}
                />
            
              <TextField
                label="URL"
                value={url}
                onChange={({ target }) => setUrl(target.value)}
                />
            
            <Button variant="contained" color="primary" type="submit">
              Create
            </Button>
      </Box>
    </Paper>
  );
};

export default BlogForm;
