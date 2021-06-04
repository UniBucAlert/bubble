import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css'
import App from './App'
import { store } from './redux'
import { Provider } from 'react-redux'

// atasez tokenul din local storage pe orice request facut!
// const authInterceptor = axios.interceptors.request.use((config) => {
//   return config;
// })
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'),
)
