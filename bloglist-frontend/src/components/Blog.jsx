import {useState} from 'react'
const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false)
  return (
    <div>
      {blog.title} by {blog.author}
      <button onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? "hide" : "view"}
      </button>

      {showDetails && (
        <div>
          <p>URL: {blog.url}</p>
          <p>Likes: {blog.likes}</p>
          <p>Author: {blog.author}</p>
        </div>
      )}
    </div>
  ); 
}

export default Blog