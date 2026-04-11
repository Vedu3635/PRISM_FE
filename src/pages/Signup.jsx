import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/api';

const Signup = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!fullName || !username || !email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    setIsLoading(true);

    try {
      const data = await authService.signup(fullName, username, email, password);
      // Automatically log the user in after successful signup
      if (data.token && data.user) {
         login(data.user, data.token);
         navigate('/dashboard');
      } else {
         navigate('/login');
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError('An error occurred during signup. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 bg-background">
      
      <div className="w-full max-w-[400px]">
        
        {/* Logo/Brand */}
        <div className="flex justify-center mb-10">
           <div className="w-10 h-10 rounded-md bg-white flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-black font-bold text-[20px]">hub</span>
           </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white tracking-tight mb-2">Create an account</h1>
          <p className="text-on-surface-variant text-sm">Initialize your secure PRISM architecture.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-surface-container border border-white/5 p-6 sm:p-8 rounded-xl flex flex-col gap-5 shadow-2xl">
          
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-md text-red-500 text-sm text-center">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant">Full Name</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">person</span>
              <input 
                type="text" 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Marcus Thorne" 
                className="w-full bg-surface h-11 rounded-md border border-white/10 text-white text-sm pl-11 pr-4 outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-on-surface-variant/50 transition-all font-body"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant">Username</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">badge</span>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="marcusthorne" 
                className="w-full bg-surface h-11 rounded-md border border-white/10 text-white text-sm pl-11 pr-4 outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-on-surface-variant/50 transition-all font-body"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant">Email</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">alternate_email</span>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="architect@obsidian.com" 
                className="w-full bg-surface h-11 rounded-md border border-white/10 text-white text-sm pl-11 pr-4 outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-on-surface-variant/50 transition-all font-body"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant">Password <span className="text-on-surface-variant/50 lowercase normal-case">(8+ chars)</span></label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">lock</span>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                className="w-full bg-surface h-11 rounded-md border border-white/10 text-white text-sm pl-11 pr-4 outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-on-surface-variant/50 transition-all font-body font-mono"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full h-11 mt-2 bg-primary hover:bg-white active:scale-[0.98] transition-all rounded-md text-black font-semibold text-sm shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Creating...' : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-sm text-on-surface-variant mt-8">
          Already have an account? <Link to="/login" className="text-white hover:text-primary transition-colors font-medium">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
