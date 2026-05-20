const LoginForm = ({handleSubmit, username, handleUsernameChange, password, handlePasswordChange}) => {
    return (
         <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            username
            <input
              type="text"
              value={username}
              onChange={handleUsernameChange}
            />
          </label>
        </div>
        <div>
          <label>
            password
            <input
              type="text"
              value={password}
              onChange={handlePasswordChange}
            />
          </label>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
    )
}

export default LoginForm;