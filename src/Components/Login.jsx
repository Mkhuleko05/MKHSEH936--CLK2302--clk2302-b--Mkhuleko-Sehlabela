import { supabase } from '../SupabaseClient';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { Auth } from '@supabase/auth-ui-react';

const handleSession = (session) => {
  if (session?.user) {
    // Assuming handleLogin is defined elsewhere in your code
    // eslint-disable-next-line no-undef
    handleLogin(session);
  }
};

const Login = () => {
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