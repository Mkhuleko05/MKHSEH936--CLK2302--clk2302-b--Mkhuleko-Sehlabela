
import Paper from '@mui/material/Paper'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SignUp from "./SignUp"
import SignIn from "./SignIn"



const LogInOutContainer = () => {

    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
          setValue(newValue);
    };
    function TabPanel(props) {
        const { children, value, index, ...other } = props;
      
        return (
          <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
          >
            {value === index && (
              <Box>
                <Typography>{children}</Typography>
              </Box>
            )}
          </div>
        );
      }

const paperStyle = {
  width: '380px',
  margin: '0px auto', 
  alignItems: 'center',
  height:'100%',

    background: 'Transparent',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
    backdropFilter: 'blur(3px)',
    WebkitBackdropFilter: 'blur(6px)', // For Safari compatibility
    borderRadius: '10px',

  
  
}

 

    return (
    
<Paper style={paperStyle}>
    <Tabs value={value} onChange={handleChange} aria-label="disabled tabs example">
      <Tab label="Sign In" className='Labels'/>
      <Tab label="Sign Up"className='Labels' />
    </Tabs>
    <TabPanel value={value} index={0} >
    <SupabaseUI
      url={"https://rvkebmxmadjzjpthghvq.supabase.co/"}
      apiKey={"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ2a2VibXhtYWRqempwdGhnaHZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA5OTE1NDIsImV4cCI6MjAwNjU2NzU0Mn0.qMloyDpMbFZ8jEUU1ux3La-YVh6lf3S24ld9_Rpjmaw"}
    />
    <SignIn />
    </TabPanel>
    
    <TabPanel value={value} index={1}>
    <SignUp />
    </TabPanel>
  
    </Paper>
    )
}

export default LogInOutContainer