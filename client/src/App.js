import React, { useEffect } from 'react';
import Routes from './Routes';
import './App.css';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import store from './store';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Routes />
  );
};

export default App;
