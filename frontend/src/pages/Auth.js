import React, { useState } from 'react';
import AuthForm from '../components/AuthForm';
import { Link } from 'react-router-dom';

const Auth = () => {
  const [mode, setMode] = useState('login'); // Default to login

  return (
    <div>
      <AuthForm mode={mode} />
      <div className="text-center mt-4">
        {mode === 'login' ? (
          <p>
            Don't have an account?{' '}
            <Link to="/auth" onClick={() => setMode('register')} className="text-blue-500 hover:underline">
              Register
            </Link>
          </p>
        ) : (
          <p>
            Already have an account?{' '}
            <Link to="/auth" onClick={() => setMode('login')} className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default Auth;