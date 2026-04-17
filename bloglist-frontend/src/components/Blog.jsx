import { useState } from "react";
const Blog = ({ blog, updateLikes, deleteBlog }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleLike = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: typeof blog.user === "object" ? blog.user.id || blog.user._id : blog.user
    }
    updateLikes(blog.id, updatedBlog);
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  return (
    <div style={blogStyle}>
      {blog.title} by {blog.author}
      <button onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? "hide" : "view"}
      </button>
      {showDetails && (
        <div>
          <p>URL: {blog.url}</p>
          <p>
            Likes: {blog.likes}
            {""}
            <button onClick={handleLike}>like</button>
          </p>
          <p>Author: {blog.author}</p>
          <button onClick={() => deleteBlog(blog.id)}>remove</button>
        </div>
      )}
    </div>
  );
};

export default Blog;
