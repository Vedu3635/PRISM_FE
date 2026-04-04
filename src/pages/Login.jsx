import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

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
          <h1 className="text-2xl font-bold text-white tracking-tight mb-2">Welcome back</h1>
          <p className="text-on-surface-variant text-sm">Sign in to your PRISM dashboard.</p>
        </div>

        <form className="bg-surface-container border border-white/5 p-6 sm:p-8 rounded-xl flex flex-col gap-5 shadow-2xl">
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant">Email</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">account_circle</span>
              <input 
                type="email" 
                placeholder="architect@obsidian.com" 
                className="w-full bg-surface h-11 rounded-md border border-white/10 text-white text-sm pl-11 pr-4 outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-on-surface-variant/50 transition-all font-body"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant">Password</label>
              <Link to="/forgot" className="text-[11px] font-medium text-primary hover:text-white transition-colors">Forgot password?</Link>
            </div>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">key</span>
              <input 
                type="password" 
                placeholder="••••••••" 
                className="w-full bg-surface h-11 rounded-md border border-white/10 text-white text-sm pl-11 pr-4 outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-on-surface-variant/50 transition-all font-body font-mono"
              />
            </div>
          </div>

          <button 
            type="button" 
            onClick={() => navigate('/dashboard')}
            className="w-full h-11 mt-2 bg-primary hover:bg-white active:scale-[0.98] transition-all rounded-md text-black font-semibold text-sm shadow-sm"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-sm text-on-surface-variant mt-8">
          Don't have an account? <Link to="/onboarding" className="text-white hover:text-primary transition-colors font-medium">Get started</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
