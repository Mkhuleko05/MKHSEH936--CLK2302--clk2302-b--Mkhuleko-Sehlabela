import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ThreeSixtyIcon from '@mui/icons-material/ThreeSixty'



export default function RestButton() {
    const playedHistory ={
        List:0
    };

  const [open, setOpen] = React.useState(false);
  const [history, setHistory] = React.useState(false);
  //Reset history
  
  const resetHandler = ([]) => {
    setHistory({playedHistory:0})
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const RestStyles = {
    
    RestButton:{
    color:"red",
    fontSize:"20px",
    cursor:"pointer",
    border:"none",
    backgroundColor:"BLACK",
    marginTop:"10px",
    marginBottom:"20px",
    marginLeft:"0px",
  }

}
  
  return (
    <div>
      <Button 
      className="RestButton" 
      style={RestStyles.RestButton} 
      variant="outlined" 
      onClick={handleClickOpen}>
      Rest all
      <ThreeSixtyIcon />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Hey! You sure?!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Resetting will remove all your History listens, progress and likes. 
           
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} >Disagree</Button>
          {/*Rest function goes in here */}
          <Button onClick={handleClose} autoFocus> 
            Reset
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
