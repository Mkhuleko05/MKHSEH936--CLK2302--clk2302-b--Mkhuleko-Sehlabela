import React from 'react'
import { Auth } from '@supabase/auth-ui-react'
import {ThemeSupa,} from '@supabase/auth-ui-shared'
import { createClient } from '@supabase/supabase-js/dist/module'

export  const supabase = createClient(


// Initialize Supabase client with your Supabase project API URL and public key
'https://tsyvoegjsbdpfoxohzzt.supabase.co',
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRzeXZvZWdqc2JkcGZveG9oenp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA5NzA0ODcsImV4cCI6MjAwNjU0NjQ4N30.0-GhTKIW_se4pdqssABp71OGxcKgffV_o7kiJ8GPr9U',


)
export default function Base() {
    return (
      <>
        <Auth
         supabaseClient={supabase}
         appearance={{ theme: ThemeSupa }}
         theme="dark"
       />
      </>
    )
  }