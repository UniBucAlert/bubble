import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import axios from 'axios';


// atasez tokenul din local storage pe orice request facut!
// const authInterceptor = axios.interceptors.request.use((config) => {
//   return config;
// })
ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);
