import React, { useState } from 'react';
import AuthForm from '../components/AuthForm';
import { Link } from 'react-router-dom';
import { StickyNoteIcon } from 'lucide-react';

const Auth = () => {
  const [mode, setMode] = useState('login'); // Default to login

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))] dark:bg-grid-slate-800/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.05),rgba(255,255,255,0.1))]" />
      
      {/* Main Content */}
      <div className="relative min-h-screen flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full mx-auto">
          {/* Logo and Brand */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="p-3 bg-blue-600 rounded-xl">
                <StickyNoteIcon className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">Notes App</h1>
            </div>
            <p className="text-gray-600 text-lg">
              Organize your thoughts and ideas beautifully
            </p>
          </div>

          {/* Auth Form */}
          <AuthForm mode={mode} />

          {/* Toggle between Login/Register */}
          <div className="mt-8 text-center">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-gray-200">
              {mode === 'login' ? (
                <p className="text-gray-700">
                  Don't have an account?{' '}
                  <button
                    onClick={() => setMode('register')}
                    className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200 underline decoration-2 underline-offset-4"
                  >
                    Create one here
                  </button>
                </p>
              ) : (
                <p className="text-gray-700">
                  Already have an account?{' '}
                  <button
                    onClick={() => setMode('login')}
                    className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200 underline decoration-2 underline-offset-4"
                  >
                    Sign in here
                  </button>
                </p>
              )}
            </div>
          </div>

          {/* Additional Links */}
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>
              By continuing, you agree to our{' '}
              <Link to="#" className="text-gray-700 hover:text-gray-900 underline decoration-1 underline-offset-2">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="#" className="text-gray-700 hover:text-gray-900 underline decoration-1 underline-offset-2">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;