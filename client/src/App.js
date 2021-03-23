import React, { useEffect } from 'react';
import Routes from 'Routes';
import './App.css';
import { loadUser } from 'actions/auth';
import setAuthToken from 'utils/setAuthToken';
import { createGlobalStyle, css } from 'styled-components';

import store from 'store';

const Styles = () => {
  return css`
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    background: #FAFAFA;
    font-family: 'Open Sans', Arial, sans-serif;

  `
};

const BoxStyles = () => {
  return css`
    margin: 0;
    padding: 0;
    box-sizing: inherit;
  `
}

const GlobalStyle = createGlobalStyle`
  html {
    ${Styles}
  }

  body {
    ${Styles}
  }

  .root {
    ${Styles}
  }

  * {
    ${BoxStyles}

    &:after{
      ${BoxStyles}
    }

    &:before {
      ${BoxStyles}
    }
  }
  

`;

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <>
      <GlobalStyle />
      <Routes />
    </>
  );
};

export default App;
