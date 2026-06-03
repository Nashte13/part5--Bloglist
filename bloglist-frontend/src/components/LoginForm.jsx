import {TextField, Button, Paper, Typography, Box} from '@mui/material';
const LoginForm = ({ handleSubmit, username, handleUsernameChange, password, handlePasswordChange }) => {
    return (
      <div>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <Input >
              <label>
                username
                <input
                  type="text"
                  value={username}
                  onChange={handleUsernameChange}
                />
              </label>
            </Input>
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
          <Button variant="contained" color="primary" type="submit">
            Login
          </Button>
        </form>
      </div>
    );
}

export default LoginForm;