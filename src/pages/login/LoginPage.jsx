import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogIn, Mail, Lock, Globe, ArrowRight, Loader2 } from 'lucide-react';
import authService from '@/services/authService/authService';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await authService.signIn(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }

  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      await authService.signInWithGoogle();
      navigate('/dashboard');
    } catch (err) {
      setError('Google sign-in failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 -left-1/4 w-[1000px] h-[1000px] bg-purple-500/5 rounded-full blur-[140px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-0 -right-1/4 w-[1000px] h-[1000px] bg-blue-500/5 rounded-full blur-[140px] pointer-events-none animate-pulse" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <h1 className="text-4xl font-black tracking-tighter bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent mb-2">
              PRISM
            </h1>
          </Link>
          <p className="text-muted-foreground">Welcome back. Enter your details to sign in.</p>
        </div>

        <div className="bg-card/30 backdrop-blur-xl border border-border/50 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mb-6 p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm text-center"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleEmailLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-white transition-colors" />
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  className="w-full bg-background/50 border border-border/50 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-foreground"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-medium text-muted-foreground">Password</label>
                <Link to="/forgot-password" title="Forgot Password Page Implementation Note" className="text-xs text-primary hover:underline">Forgot password?</Link>
              </div>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-white transition-colors" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full bg-background/50 border border-border/50 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-foreground"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full py-6 rounded-xl text-lg font-semibold group relative overflow-hidden"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <span className="flex items-center gap-2">
                  Sign In <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </Button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border/50"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground tracking-widest">Or continue with</span>
            </div>
          </div>

          <Button
            variant="outline"
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full py-6 rounded-xl border-border/50 bg-background/30 hover:bg-background/50 transition-all flex items-center justify-center gap-3 font-semibold"
          >
            <Globe className="h-5 w-5" />
            Google Account
          </Button>
        </div>

        <p className="text-center mt-8 text-muted-foreground text-sm">
          Don't have an account?{' '}
          <Link to="/signup" className="text-white font-semibold hover:underline decoration-primary underline-offset-4">
            Create an account
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
