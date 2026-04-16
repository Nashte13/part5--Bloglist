import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginServices from "./services/login";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState({
    message: null,
    type: null,
  });
  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginServices.login({ username, password });
      window.localStorage.setItem("loggedBogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch {
      setNotification({
        message: "Wrong username or password",
        type: "error",
      });
      setTimeout(() => {
        setNotification({ message: null, type: null });
      }, 3000);
    }
  };

  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility();
      const newBlog = await blogService.create(blogObject);
      setBlogs(blogs.concat(newBlog));
      setNotification({
        message: `A new blog ${newBlog.title} by ${newBlog.author} added`,
        type: "success",
      });
      setTimeout(() => {
        setNotification({ message: null, type: null });
      }, 3000);
    } catch {
      setNotification({ message: "Blog creation failed", type: "error" });
      setTimeout(() => {
        setNotification({ message: null, type: null });
      }, 3000);
    }
  };
  const blogForm = () => (
    <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
      <BlogForm addBlog={addBlog} />
    </Togglable>
  );

  const updateLikes = async (id, updatedBlog) => {
    try {
      const returnedBlog = await blogService.update(id, updatedBlog);
      setBlogs(blogs.map((blog) => (blog.id === id ? returnedBlog : blog)));
    } catch {
      setNotification({ message: "Failed to update likes", type: "error" });
      setTimeout(() => {
        setNotification({ message: null, type: null });
      }, 3000);
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBogappUser");
    setUser(null);
  };

  return (
    <div>
      <Notification message={notification.message} type={notification.type} />
      <h1>Blogs</h1>

      {!user && (
        <Togglable buttonLabel="Login">
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>
      )}

      {user && (
        <div>
          <div>
            <p>
              {user.username} logged in
              <button onClick={handleLogout}>Logout</button>
            </p>
          </div>

          {blogForm()}

          <div>
            {blogs.map((blog) => (
              <Blog key={blog.id} blog={blog} updateLikes={updateLikes} />
            ))}
            
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
