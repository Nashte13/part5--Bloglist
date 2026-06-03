import {TextField, Button, Paper, Typography, Box} from '@mui/material';
const LoginForm = ({ handleSubmit, username, handleUsernameChange, password, handlePasswordChange }) => {
  return (
    <Paper
      elevation={3}
      sx={{ padding: 4, maxWidth: 400, margin: "20px auto" }}
    >
      <Typography variant="h5" component="h2" gutterBottom>
        Login
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            variant="outlined"
            value={username}
            onChange={handleUsernameChange}
          />

          <TextField
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={handlePasswordChange}
            fullWidth
            required
          />
          <Button variant="contained" color="primary" type="submit">
            Login
          </Button>
        </form>
      </Box>
    </Paper>
  );
}

export default LoginForm;