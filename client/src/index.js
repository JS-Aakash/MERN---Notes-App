import React from 'react';
import { createRoot } from 'react-dom/client'; // Updated import
import './tailwind.css';
import App from './App';

const root = createRoot(document.getElementById('root')); // Create root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);