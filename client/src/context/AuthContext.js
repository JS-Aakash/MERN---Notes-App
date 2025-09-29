import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.id) {
          setUser({ id: decoded.id, email: decoded.email || 'Unknown' });
        } else {
          console.error('Invalid token: missing id');
          localStorage.removeItem('token');
        }
      } catch (error) {
        console.error('Token decoding failed:', error.message);
        localStorage.removeItem('token');
      }
    }
  }, []);

  const login = async (email, password) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, { email, password });
    localStorage.setItem('token', res.data.token);
    setUser({ id: res.data._id, email: res.data.email });
    return res.data;
  };

  const register = async (email, password) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/register`, { email, password });
    localStorage.setItem('token', res.data.token);
    setUser({ id: res.data._id, email: res.data.email });
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};