import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, ChefHat, Loader2, ArrowRight } from 'lucide-react';

const LoginPage = () => {
  const { user, login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [googleSubmitting, setGoogleSubmitting] = useState(false);

  // Redirect to dashboard if already authenticated
  React.useEffect(() => {
    if (user) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setError(null);
    setSubmitting(true);

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      console.error('Login form error:', err);
      setError(err.response?.data?.error || 'Invalid email or password');
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    setGoogleSubmitting(true);
    try {
      await loginWithGoogle();
      // Redirection will happen automatically via Supabase
    } catch (err) {
      console.error('Google OAuth error:', err);
      setError(err.message || 'Failed to initialize Google login');
      setGoogleSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 relative overflow-hidden font-sans">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-40" style={{backgroundImage:'linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)',backgroundSize:'48px 48px'}} />
      {/* Radial Orange Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full opacity-40 pointer-events-none" style={{background:'radial-gradient(ellipse at center,rgba(249,115,22,0.08) 0%,transparent 70%)'}} />

      {/* Card container */}
      <div className="bg-[#0a0a0a] border border-white/[0.08] rounded-xl overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.8)] max-w-md w-full p-8 relative z-10">
        
        {/* Logo Branding */}
        <Link to="/" className="flex items-center justify-center gap-2 mb-6">
          <div className="w-[24px] h-[24px] rounded-[6px] bg-orange-500 flex items-center justify-center">
            <ChefHat size={13} className="text-black" strokeWidth={2.5} />
          </div>
          <span className="text-white text-[16px] font-semibold tracking-tight">DishBoard</span>
        </Link>

        {/* Heading */}
        <h2 className="text-white text-2xl font-bold tracking-tight text-center mb-1">
          Welcome back
        </h2>
        <p className="text-neutral-400 text-[13.5px] text-center mb-6">
          Enter your credentials to access your menu dashboard.
        </p>

        {/* Error message */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-[13px] rounded-lg p-3 mb-4 text-center">
            {error}
          </div>
        )}

        {/* Google OAuth Button */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={googleSubmitting || submitting}
          className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-full border border-white/[0.1] bg-white/[0.03] text-neutral-200 text-[13.5px] font-medium hover:bg-white/[0.07] hover:text-white transition-colors cursor-pointer disabled:opacity-50"
        >
          {googleSubmitting ? (
            <Loader2 className="w-4 h-4 animate-spin text-neutral-400" />
          ) : (
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
          )}
          <span>Continue with Google</span>
        </button>

        {/* Separator */}
        <div className="flex items-center my-5 w-full">
          <div className="flex-grow border-t border-white/[0.06]" />
          <span className="mx-3 text-[11px] uppercase tracking-wider text-neutral-600 font-semibold select-none">
            or continue with email
          </span>
          <div className="flex-grow border-t border-white/[0.06]" />
        </div>

        {/* Email/Password Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600 w-4 h-4" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              required
              className="w-full bg-white/[0.03] border border-white/[0.08] text-white text-[13.5px] rounded-full py-2.5 pl-11 pr-4 placeholder:text-neutral-600 focus:outline-none focus:border-orange-500/50 focus:bg-white/[0.05] transition-all"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600 w-4 h-4" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full bg-white/[0.03] border border-white/[0.08] text-white text-[13.5px] rounded-full py-2.5 pl-11 pr-4 placeholder:text-neutral-600 focus:outline-none focus:border-orange-500/50 focus:bg-white/[0.05] transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={submitting || googleSubmitting}
            className="w-full py-2.5 px-4 bg-orange-500 hover:bg-orange-600 text-black font-semibold rounded-full text-[13.5px] transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-500/10 cursor-pointer disabled:opacity-50"
          >
            {submitting ? (
              <Loader2 className="w-4 h-4 animate-spin text-black" />
            ) : (
              <>
                Sign In <ArrowRight size={13} strokeWidth={2.5} />
              </>
            )}
          </button>
        </form>

        {/* Signup Link */}
        <p className="mt-6 text-center text-[13px] text-neutral-500">
          Don't have an account?
          <Link to="/signup" className="text-orange-500 hover:text-orange-400 font-medium transition-colors ml-1.5">
            Sign up
          </Link>
        </p>

      </div>
    </div>
  );
};

export default LoginPage;
