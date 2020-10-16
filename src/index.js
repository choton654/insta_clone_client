import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import {UserContextProvider} from "./context/userContext";
import App from './App';
ReactDOM.render(
  <Router>
    <React.StrictMode>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </React.StrictMode>
  </Router>,
  document.getElementById('root'),
);
