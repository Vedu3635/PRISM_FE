import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';
import { useAuth } from '../context/useAuth';
import { authService } from '../services';
import { auth, googleProvider, ROUTES, STORAGE_KEYS } from '../config';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  // ── Email / Password login via POST /auth/token ──
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setIsLoading(true);

    try {
      const data = await authService.getToken(email, password);

      if (!data?.id_token) {
        setError('Login succeeded but no token received. Please try again.');
        setIsLoading(false);
        return;
      }

      // Temporarily set token so the interceptor can attach it for /me
      localStorage.setItem(STORAGE_KEYS.TOKEN, data.id_token);

      // Try to fetch profile, but don't block login if it fails
      let userProfile = { email: data.email || email };
      try {
        const meData = await authService.getMe();
        userProfile = meData.user || meData || userProfile;
      } catch {
        // /me failed — use email as fallback profile, login is still valid
        console.warn('Could not fetch /me profile, using email fallback');
      }

      login(userProfile, data.id_token, data.refresh_token);
      navigate(ROUTES.DASHBOARD);
    } catch (err) {
      // Clean up any partially stored token
      localStorage.removeItem(STORAGE_KEYS.TOKEN);

      const status = err.response?.status;
      const serverMsg = err.response?.data?.error;

      if (serverMsg) {
        setError(serverMsg);
      } else if (status === 400) {
        setError('Invalid email or password format.');
      } else if (status === 401) {
        setError('Invalid email or password.');
      } else if (status === 307) {
        setError('Server redirect error. Please try again.');
      } else if (err.code === 'ECONNABORTED' || err.message?.includes('timeout')) {
        setError('Request timed out. The server may be starting up — please wait a moment and try again.');
      } else if (!err.response) {
        setError('Network error. Please check your connection and try again.');
      } else {
        setError('An error occurred during login. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // ── Google Sign-In via Firebase popup → POST /auth/social-login ──
  const handleGoogleLogin = async () => {
    setError('');
    setIsGoogleLoading(true);

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();

      let userData = { email: result.user.email, displayName: result.user.displayName };
      let finalToken = idToken;

      try {
        const data = await authService.socialLogin(idToken);
        userData = data.user || userData;
        finalToken = data.token || data.id_token || idToken;
        login(userData, finalToken, data.refresh_token);
      } catch {
        // Social login backend call failed — still authenticate with Firebase token
        console.warn('Backend social-login failed, using Firebase token directly');
        login(userData, idToken);
      }

      navigate(ROUTES.DASHBOARD);
    } catch (err) {
      if (err.code === 'auth/popup-closed-by-user') {
        setError('Sign-in cancelled. Please try again.');
      } else if (err.code === 'auth/account-exists-with-different-credential') {
        setError('An account already exists with the same email. Try a different login method.');
      } else if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else if (err.code?.startsWith('auth/')) {
        setError('Firebase authentication failed. Please try again.');
      } else {
        setError('Google sign-in failed. Please try again.');
      }
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 bg-background">
      <div className="w-full max-w-[400px]">

        {/* Logo */}
        <div className="flex justify-center mb-10">
          <div className="w-10 h-10 rounded-md bg-white flex items-center justify-center shadow-sm">
            <span className="material-symbols-outlined text-black font-bold text-[20px]">hub</span>
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white tracking-tight mb-2">Welcome back</h1>
          <p className="text-on-surface-variant text-sm">Sign in to your PRISM dashboard.</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-surface-container border border-white/5 p-6 sm:p-8 rounded-xl flex flex-col gap-5 shadow-2xl"
        >
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-md text-red-500 text-sm text-center">
              {error}
            </div>
          )}

          {/* ── Google Sign-In ── */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isGoogleLoading || isLoading}
            className="w-full h-11 flex items-center justify-center gap-3 bg-white hover:bg-gray-100 active:scale-[0.98] transition-all rounded-md text-gray-700 font-semibold text-sm shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGoogleLoading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Signing in…
              </span>
            ) : (
              <>
                <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
                  <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
                  <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.997 8.997 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
                  <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </>
            )}
          </button>

          {/* ── Divider ── */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-[11px] font-medium uppercase tracking-wider text-on-surface-variant/50">or</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* ── Email ── */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant">Email</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">account_circle</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="architect@obsidian.com"
                className="w-full bg-surface h-11 rounded-md border border-white/10 text-white text-sm pl-11 pr-4 outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-on-surface-variant/50 transition-all"
              />
            </div>
          </div>

          {/* ── Password ── */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant">Password</label>
              <Link to={ROUTES.FORGOT_PASSWORD} className="text-[11px] font-medium text-primary hover:text-white transition-colors">Forgot password?</Link>
            </div>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">key</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-surface h-11 rounded-md border border-white/10 text-white text-sm pl-11 pr-4 outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-on-surface-variant/50 transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || isGoogleLoading}
            className="w-full h-11 mt-2 bg-primary hover:bg-white active:scale-[0.98] transition-all rounded-md text-black font-semibold text-sm shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Signing In…' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-sm text-on-surface-variant mt-8">
          Don't have an account?{' '}
          <Link to={ROUTES.ONBOARDING} className="text-white hover:text-primary transition-colors font-medium">Get started</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
