import {useState} from 'react'
import blogs from '../services/blogs'
const Blog = ({ blog, updateLikes }) => {
  const [showDetails, setShowDetails] = useState(false)

  const handleLike = () => {
    const updatedBlog = { ...blog, likes: blogs.likes + 1, user: blog.user.id || blog.user }
    updateLikes(blog.id, updatedBlog)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
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
            Likes: {blog.likes}{""}
            <button onClick={handleLike}>like</button>
          </p>
          <p>Author: {blog.author}</p>
        </div>
      )}
    </div>
  ); 
}

export default Blog