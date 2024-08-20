import { useState } from 'react';
import { Avatar, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';

const SignIn = () => {
  const paperStyle = {
    width: '350px',
    padding: '10px',
    height: '100%',
    margin: '0px auto',
    alignItems: 'center',
    background: 'transparent',
    borderRadius: '10px',
  };

  const headerStyle = {
    margin: "0px",
  };

  const avatarStyle = {
    backgroundColor: "green",
  };

  const [formData, setFormData] = useState({
    name: "",
    password: "",
    remember: false,
  });

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    submitToApi(formData);
  }

  return (
    <>
      <Paper elevation={20} style={paperStyle}>
        <form onSubmit={handleSubmit}>
          <Grid align="center">
            <Avatar style={avatarStyle}></Avatar>
            <h2 style={headerStyle}>Sign In</h2>
            <p>Welcome Back!</p>
          </Grid>

          <TextField
            type="text"
            id="standard-basic"
            label="Name"
            variant="standard"
            placeholder="Name"
            fullWidth
            name="name"
            value={formData.name}
            onChange={handleChange}
          />

          <TextField
            type="password"
            id="standard-basic"
            label="Password"
            variant="standard"
            placeholder="Enter Password"
            fullWidth
            name="password"
            value={formData.password}
            onChange={handleChange}
          />

          <Checkbox
            name="remember"
            checked={formData.remember}
            onChange={handleChange}
          />
          <label>Remember me</label>

          <Button
            type="submit"
            sx={{ color: "white", borderColor: "white", marginTop: "10px" }}
            fullWidth
          >
            Sign In
          </Button>
        </form>
      </Paper>
    </>
  );
};

export default SignIn;