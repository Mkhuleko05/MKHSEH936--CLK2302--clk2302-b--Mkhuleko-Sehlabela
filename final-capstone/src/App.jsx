import React, { useState } from 'react';
import Preview from './Components/Previews';
import Navbar from './Components/Navbar';
import Login from './Components/Login';
import Carousel from './Components/Hero';
import { supabase } from "./SupabaseClient";
import SupabaseClient from "./SupabaseClient";
import './Components/App.css';



const App = () => {
  const [throwSignUp, setThrowSignUp] = useState("signUpPhase");
  React.useEffect(() => {
    const authListener = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        console.log("User signed in successfully:", session.user.email);
        setThrowSignUp("PreviewPhase");
      }
    });

    return () => {
      authListener.unsubscribe;
    };
  }, []);
  return (
    <div>
    {throwSignUp === 'signUpPhase' && <SupabaseClient />}
      {throwSignUp === 'PreviewPhase' &&
    <div>
      
      <Navbar />
      <Carousel />
      <Preview />
      
    </div>
  }
  </div>
  );
}
export default App
