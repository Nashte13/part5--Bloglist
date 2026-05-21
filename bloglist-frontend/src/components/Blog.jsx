import { useState } from "react";
const Blog = ({ blog, updateLikes, deleteBlog }) => {
  const [showDetails, setShowDetails] = useState(false);


  return (
    <div style={blogStyle} className="blog">
      {blog.title} by {blog.author}
      <button onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? "hide" : "view"}
      </button>
      {showDetails && (
        <div className="blod-details">
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
