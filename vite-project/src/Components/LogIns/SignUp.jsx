
import { useState } from "react";
import { Avatar,  Button,  Grid,  Paper,  TextField,  Typography } from "@mui/material";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


const SignUp = () => {
  const [formData, setFormData] = useState(
    {
      Name: "", 
      email: "", 
      Password:"", 
      confirmPassword: "",
      Accept: false,
          
  });


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

  function handleChange(event) {
    const {name, value, type, checked} = event.target
    setFormData(prevFormData => ({
       
            ...prevFormData,
            [name]: type === "checkbox" ? checked : value
        
    }));
}

function handleSubmit(event) {
    event.preventDefault()
    submitToApi(formData)
    
}

const SignUp = async() => {
  await supabase.auth.SignUp({
    provider:"google"
  })
}


  return (
    <Grid>
      <Paper elevation={20} style={PaperStyle}>
        
        <Grid align="center">
          <Avatar style={AvatarStyle}>
            {/*<img src=".src/Images/Logo.png" alt="Logo" />*/}
          </Avatar>
          <h2 style={HeaderStyle}>Sign Up</h2>
          <Typography variant="caption" gutterBottom>
            Please fill this to create an account
          </Typography>
        </Grid>
        <form onSubmit={handleSubmit}>
          <TextField
            type="text"
            id="standardBasic"
            label="Name"
            variant="standard"
            placeholder="Enter your Name"
            fullWidth
            name="Name"
            value={formData.Name}
            onChange={handleChange}
          />
          <TextField
            type="email"
            id="standard-basic"
            label="Email"
            variant="standard"
            placeholder="Enter your Email"
            fullWidth
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          
          
          <TextField
          type="Password"
            id="standard-basic"
            label="Create Password"
            variant="standard"
            placeholder="Create Password"
            fullWidth
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
      
           <Button
            type="submit"
            
            sx={{ color: "white", borderColor: "white", marginTop:"10px" }}
          fullWidth
          
          onclick={SignUp}>
            Sign Up
          </Button >

          <FormGroup>
           <FormControlLabel required control={<Checkbox />} 
           label="I accept the T's & C's"
           name="Accept"
           onChange={handleChange} />
          </FormGroup>
        </form>
      </Paper>
    </Grid>
  );
}


export default SignUp
