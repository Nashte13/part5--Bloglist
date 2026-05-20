import Blog from './Blog'

const BlogList = ({ blogs, updateLikes, deleteBlog }) => {
    return (
      <div>
        <h2>Blogs</h2>
        {blogs
          .slice()
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              updateLikes={updateLikes}
              deleteBlog={deleteBlog}
            />
          ))}
      </div>
    );
}

export default BlogList;