import { useParams, useNavigate } from "react-router-dom";
import {Card, CardContent, CardActions, Button, Box, Typography} from "@mui/material";

const BlogDetail = ({ blogs, updateLikes, deleteBlog, currentUser }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const blog = blogs.find((b) => String(b.id) === id);
  if (!blog) return <Typography>Blog not found!</Typography>

  const isCreator = currentUser && blog.user && blog.user.id === currentUser.id

  const handleLike = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user:
        typeof blog.user === "object"
          ? blog.user.id || blog.user._id
          : blog.user,
    };
    updateLikes(blog.id, updatedBlog);
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleDelete = () => {
    if (window.confirm(`Delete blog ${blog.title} by ${blog.author}?`)) {
      deleteBlog(blog.id);
      navigate("/blogs");
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {blog.title}
        </Typography>
        <Typography variant="substitle1" color="textSecondary">
          Author: {blog.author}
        </Typography>
        <Typography variant="body2" sx={{mt: 1}}>
          URL: {blog.url}
        </Typography>
        <Typography variant="body2" sx={{mt: 1}}>
          Likes: {blog.likes}
        </Typography>
      </CardContent>

      {currentUser && (
        <CardActions>
          <Button variant="contained" color="primary" onClick={handleLike}>
            Like
          </Button>
          {isCreator && (
            <Button variant="outlined" color="error" onClick={handleDelete}>
              Remove
            </Button>
          )}
          <Box sx={{flexGrow: 1}} />
          <Button variant="text" onClick={() => navigate("/blogs")}>
            Back to Blogs
          </Button>
        </CardActions>
      )}
    </Card>
  )
};

export default BlogDetail;
