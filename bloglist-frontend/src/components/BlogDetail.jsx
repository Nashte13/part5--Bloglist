import { useParams, useNavigate } from "react-router-dom";

const BlogDetail = ({ blogs, updateLikes, deleteBlog }) => {

    const { id } = useParams()
    const navigate = useNavigate()

    const blog = blogs.find(b => String(b.id) === id)
    if (!blog) return <p>Blog not found!</p>

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
            deleteBlog(blog.id)
            navigate("/blogs")
        }
    }

    return (
        <div style={blogStyle} className="blog">
            <h2>{blog.title}</h2>
            <p>Author: {blog.author}</p>
            <p>URL: {blog.url}</p>
            <p>
                Likes: {blog.likes}
                <button onClick={handleLike}>Like</button>
            </p>
            <button onClick={handleDelete}>remove</button>

            <p><button onClick={() => navigate("/blogs")}>Back to blogs</button></p>
        </div>
    )
}

export default BlogDetail;