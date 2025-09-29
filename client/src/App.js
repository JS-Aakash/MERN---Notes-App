import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify'; // Add ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Toast styles
import Home from './pages/Home';
import Auth from './pages/Auth';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;