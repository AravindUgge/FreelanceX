import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2, Copy, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Avatar } from '../components/ui/Avatar';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(1, 'Password is required'),
});

const testUsers = [
  { id: '1', email: 'freelancer@demo.com', password: 'demo123', role: 'freelancer', full_name: 'Sarah Chen', bio: 'Full-stack developer specializing in React & Node.js', is_online: true },
  { id: '2', email: 'client@demo.com', password: 'demo123', role: 'client', full_name: 'Michael Torres', bio: 'Tech startup founder looking for talented developers', is_online: true },
  { id: '3', email: 'designer@demo.com', password: 'demo123', role: 'freelancer', full_name: 'Aria Nakamura', bio: 'UI/UX Designer with 8+ years of experience', is_online: false },
];

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(null);
  const { login, loginWithGoogle } = useAuth();

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    await login(data.email, data.password);
    setIsLoading(false);
  };

  const handleTestLogin = async (user) => {
    setIsLoading(true);
    await login(user.email, user.password);
    setIsLoading(false);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedEmail(text);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  return (
    <div className="min-h-screen flex animated-bg">
      {/* Left side */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden items-center justify-center">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary-400/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary-500/20 rounded-full blur-3xl animate-float-slow" />
        </div>
        <div className="relative z-10 text-center px-12">
          <div className="flex justify-center gap-6 mb-8">
            {testUsers.slice(0, 2).map((user, index) => (
              <motion.div key={user.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + index * 0.2 }}>
                <Avatar user={user} size={100} />
              </motion.div>
            ))}
          </div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="text-4xl font-bold text-white mb-4">
            Welcome to <span className="gradient-text">FreelanceX</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="text-gray-400 text-lg mb-8">
            Where talent meets opportunity
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="flex justify-center gap-8">
            {[{ value: '10K+', label: 'Freelancers' }, { value: '5K+', label: 'Projects' }, { value: '$2M+', label: 'Paid Out' }].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Right side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8">
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="w-full max-w-md">
          <Link to="/" className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-400 to-secondary-500 flex items-center justify-center">
              <span className="text-white font-bold text-lg">FX</span>
            </div>
            <span className="text-xl font-bold gradient-text">FreelanceX</span>
          </Link>

          <h2 className="text-3xl font-bold text-white mb-2">Sign in</h2>
          <p className="text-gray-400 mb-8">
            Don't have an account? <Link to="/register" className="text-primary-400 hover:text-primary-300 font-medium">Create one</Link>
          </p>

          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={loginWithGoogle} className="w-full btn-google mb-6">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
          </motion.button>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-gray-500 text-sm">or sign in with email</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <div className="relative">
                <Mail className="input-icon w-5 h-5" />
                <input {...register('email')} type="email" placeholder="you@example.com" className="input-field-icon" />
              </div>
              {errors.email && <p className="text-red-400 text-sm mt-1.5">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <div className="relative">
                <Lock className="input-icon w-5 h-5" />
                <input {...register('password')} type={showPassword ? 'text' : 'password'} placeholder="Enter your password" className="input-field-icon pr-12" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors z-20">
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <p className="text-red-400 text-sm mt-1.5">{errors.password.message}</p>}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-600 bg-dark-200 text-primary-400 focus:ring-primary-400" />
                <span className="text-sm text-gray-400">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-sm text-primary-400 hover:text-primary-300">Forgot password?</Link>
            </div>

            <motion.button type="submit" disabled={isLoading} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full btn-primary flex items-center justify-center gap-2 py-4">
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Sign In <ArrowRight className="w-5 h-5" /></>}
            </motion.button>
          </form>

          {/* Test Credentials */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="mt-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-xs text-gray-500 uppercase tracking-wider">Test Credentials</span>
              <div className="h-px flex-1 bg-white/10" />
            </div>
            <div className="space-y-3">
              {testUsers.map((user) => (
                <motion.div key={user.id} whileHover={{ scale: 1.01, x: 4 }} className="glass-card rounded-xl p-4 cursor-pointer" onClick={() => handleTestLogin(user)}>
                  <div className="flex items-center gap-3">
                    <Avatar user={user} size={48} showStatus />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-white truncate">{user.full_name}</span>
                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${user.role === 'freelancer' ? 'bg-primary-400/20 text-primary-400' : 'bg-accent-500/20 text-accent-500'}`}>{user.role}</span>
                      </div>
                      <p className="text-xs text-gray-400 truncate">{user.bio}</p>
                    </div>
                    <button onClick={(e) => { e.stopPropagation(); copyToClipboard(user.email); }} className="p-2 rounded-lg hover:bg-white/10 transition-colors" title="Copy email">
                      {copiedEmail === user.email ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-gray-400" />}
                    </button>
                  </div>
                  <div className="mt-2 flex items-center gap-4 text-xs text-gray-500">
                    <span>{user.email}</span>
                    <span>•</span>
                    <span>Password: {user.password}</span>
                  </div>
                </motion.div>
              ))}
            </div>
            <p className="text-center text-xs text-gray-500 mt-4">Click any card to auto-fill and sign in</p>
          </motion.div>

          <p className="text-center text-xs text-gray-600 mt-8">© 2026 FreelanceX. Built by Aravind Ugge</p>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
