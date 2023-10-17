import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import Auth from './Auth';
import Account from './Account';
import Game from './Game';

import './App.css';

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <div className="App">
      <div className="container" style={{ padding: '50px 0 100px 0' }}>
        {!session ? <Auth /> : <Account key={session.user.id} session={session} />}
      </div>
      {session && session.user.id && <Game />}
    </div>
  );
}

export default App;
