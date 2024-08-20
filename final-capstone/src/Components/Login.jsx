import React, { useEffect } from 'react';
import { supabase } from '../SupabaseClient';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { Auth } from '@supabase/auth-ui-react';

const handleSession = (session) => {
  if (session?.user) {
    handleLogin(session);
  }
};

const Login = () => {

    const handleSession = (session) => {
        if (session?.user) {
          handleLogin(session);
        }
      };
  return (
    <div className="login">
      <header className="App-Header">
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="dark"
          providers={['google']}
          handleSession={handleSession}
        />
      </header>
    </div>
  );
};

export default Login;
