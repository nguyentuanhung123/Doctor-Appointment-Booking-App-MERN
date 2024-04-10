import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContextProvider } from './context/AuthContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <AuthContextProvider>
        <ToastContainer
          theme='dark'
          position='top-right'
          autoClose={3200}
          closeOnClick
          pauseOnHover={false}
        />
        <App />
      </AuthContextProvider>
    </Router>
  </React.StrictMode>,
)
