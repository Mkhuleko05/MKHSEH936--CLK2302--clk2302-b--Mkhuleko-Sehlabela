import { useState } from 'react';
import { Avatar,  Button,  Grid,  Paper,  TextField,  Typography } from "@mui/material";
import { pink } from '@mui/material/colors';
import Checkbox from '@mui/material/Checkbox';

const SignIn = () => {
    const PaperStyle = {
      width: '350px',
      padding: '10px',
      height:'100%',
  margin: '0px auto', 
  alignItems: 'center',
      background: 'transparent',
      
    // For Safari compatibility
      borderRadius: '10px',
  
    };

       
    const HeaderStyle = {
      margin: "0px",
    };
    const AvatarStyle = {
      backgroundColor: "green",
    };

    
    const [formData, setFormData] = useState(
      {
          name: "", 
          
          Password: "",
          remember :false,
      }
  )
  
  function handleChange(event) {
      const {name, value, type } = event.target
      setFormData(prevFormData => {
          return {
              ...prevFormData,
              [name]: type === "checkbox" ? checked : value
          }
      })
  }
  
  function handleSubmit(event) {
      event.preventDefault()
      submitToApi(formData)
     
  }
    return (
      <>
        <Paper elevation={20} style={PaperStyle} >
          <form onSubmit={handleSubmit}>
          <Grid align="center">
            <Avatar style={AvatarStyle}>
              
            </Avatar>
            <h2 style={HeaderStyle}>Sign In</h2>
            <p>Welcome Back!</p>
          </Grid>
          
            <TextField
              type="text"
              id="standardBasic"
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
              name="Password"
              value={formData.Password}
              onChange={handleChange}
            />
         
            <Button
              type="submit"
             
              sx={{ color: "white", borderColor: "white",  marginTop:"10px" }}
              fullWidth>
              Sign In
            </Button>
     
            </form>
        </Paper>
      </>
    );
  }

  export default SignIn
 
  