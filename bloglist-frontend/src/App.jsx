import { useState, useEffect } from "react";
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
  const [user, setUser] = useState("");
  const [notification, setNotification] = useState({
    message: null,
    type: null,
  });

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

  const loginForm = () => {

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
    const blogForm = () => {
      <Togglable buttonLabel="Create new blog">
        <BlogForm addBlog={addBlog} />
      </Togglable>;
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

        {blogForm()}
          {user && (
            <div>
              <div>
                <p>{user.username} logged in</p>
                <button onClick={handleLogout}>Logout</button>
            </div>
            <Togglable buttonLabel="Create new blog">
              {blogForm()}
            </Togglable>

            <Togglable buttonLabel="All blogs">
              {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} />
              ))}
            </Togglable>
            
            </div>
          )}
      </div>
    );
  };
};

export default App;
