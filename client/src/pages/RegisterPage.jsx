import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Lock, Eye, EyeOff, ArrowRight, ArrowLeft, Loader2, User, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Avatar } from '../components/ui/Avatar';

const step1Schema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

const step2Schema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
});

const step3Schema = z.object({
  role: z.enum(['freelancer', 'client'], { required_error: 'Please select a role' }),
});

const RegisterPage = () => {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const { register: registerUser, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const form1 = useForm({ resolver: zodResolver(step1Schema) });
  const form2 = useForm({ resolver: zodResolver(step2Schema) });
  const form3 = useForm({ resolver: zodResolver(step3Schema) });

  const handleStep1 = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep(2);
  };

  const handleStep2 = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep(3);
  };

  const handleStep3 = async (data) => {
    const finalData = { ...formData, ...data };
    setIsLoading(true);
    await registerUser(finalData);
    setIsLoading(false);
  };

  const passwordStrength = (password) => {
    if (!password) return 0;
    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const getStrengthColor = (strength) => {
    if (strength <= 1) return 'bg-red-500';
    if (strength <= 2) return 'bg-orange-500';
    if (strength <= 3) return 'bg-yellow-500';
    if (strength <= 4) return 'bg-lime-500';
    return 'bg-green-500';
  };

  return (
    <div className="min-h-screen flex items-center justify-center animated-bg p-4 sm:p-6">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-400/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl animate-float-slow" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md"
      >
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center gap-2 mb-6 sm:mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-400 to-secondary-500 flex items-center justify-center shadow-lg shadow-primary-400/30">
            <span className="text-white font-bold text-xl">FX</span>
          </div>
          <span className="text-2xl font-bold gradient-text">FreelanceX</span>
        </Link>

        {/* Progress steps */}
        <div className="flex items-center justify-center gap-2 mb-6 sm:mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <motion.div
                animate={{
                  scale: step === s ? 1.2 : 1,
                  backgroundColor: step >= s ? '#6C63FF' : '#1a1a3e',
                }}
                className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium"
              >
                {step > s ? (
                  <Check className="w-5 h-5 text-white" />
                ) : (
                  <span className={step >= s ? 'text-white' : 'text-gray-500'}>{s}</span>
                )}
              </motion.div>
              {s < 3 && (
                <div className={`w-12 sm:w-16 h-1 mx-1 sm:mx-2 rounded ${step > s ? 'bg-primary-400' : 'bg-dark-200'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Form card */}
        <div className="glass-card rounded-2xl p-6 sm:p-8">
          <AnimatePresence mode="wait">
            {/* Step 1: Email & Password */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-2xl font-bold text-white mb-1">Create account</h2>
                <p className="text-gray-400 mb-6">
                  Already have an account?{' '}
                  <Link to="/login" className="text-primary-400 hover:text-primary-300">Sign in</Link>
                </p>

                <button onClick={loginWithGoogle} className="w-full btn-google mb-5">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  Continue with Google
                </button>

                <div className="flex items-center gap-4 mb-5">
                  <div className="flex-1 h-px bg-white/10" />
                  <span className="text-gray-500 text-sm">or</span>
                  <div className="flex-1 h-px bg-white/10" />
                </div>

                <form onSubmit={form1.handleSubmit(handleStep1)} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                    <div className="relative">
                      <Mail className="input-icon w-5 h-5" />
                      <input {...form1.register('email')} type="email" placeholder="you@example.com" className="input-field-icon" />
                    </div>
                    {form1.formState.errors.email && <p className="text-red-400 text-sm mt-1.5">{form1.formState.errors.email.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                    <div className="relative">
                      <Lock className="input-icon w-5 h-5" />
                      <input {...form1.register('password')} type={showPassword ? 'text' : 'password'} placeholder="Create a password" className="input-field-icon pr-12" />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white z-20">
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {form1.formState.errors.password && <p className="text-red-400 text-sm mt-1.5">{form1.formState.errors.password.message}</p>}
                    {form1.watch('password') && (
                      <div className="mt-2">
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className={`h-1.5 flex-1 rounded ${i <= passwordStrength(form1.watch('password')) ? getStrengthColor(passwordStrength(form1.watch('password'))) : 'bg-dark-200'}`} />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Confirm Password</label>
                    <div className="relative">
                      <Lock className="input-icon w-5 h-5" />
                      <input {...form1.register('confirmPassword')} type={showPassword ? 'text' : 'password'} placeholder="Confirm your password" className="input-field-icon" />
                    </div>
                    {form1.formState.errors.confirmPassword && <p className="text-red-400 text-sm mt-1.5">{form1.formState.errors.confirmPassword.message}</p>}
                  </div>

                  <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full btn-primary flex items-center justify-center gap-2 py-4 mt-2">
                    Continue <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </form>
              </motion.div>
            )}

            {/* Step 2: Name */}
            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 className="text-2xl font-bold text-white mb-1">What's your name?</h2>
                <p className="text-gray-400 mb-6">This will be displayed on your profile</p>

                <form onSubmit={form2.handleSubmit(handleStep2)} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                    <div className="relative">
                      <User className="input-icon w-5 h-5" />
                      <input {...form2.register('fullName')} type="text" placeholder="Enter your full name" className="input-field-icon" />
                    </div>
                    {form2.formState.errors.fullName && <p className="text-red-400 text-sm mt-1.5">{form2.formState.errors.fullName.message}</p>}
                  </div>

                  <div className="flex gap-3 mt-4">
                    <motion.button type="button" onClick={() => setStep(1)} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="btn-secondary flex items-center justify-center gap-2">
                      <ArrowLeft className="w-5 h-5" /> Back
                    </motion.button>
                    <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1 btn-primary flex items-center justify-center gap-2 py-4">
                      Continue <ArrowRight className="w-5 h-5" />
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* Step 3: Role Selection */}
            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 className="text-2xl font-bold text-white mb-1">I want to be a...</h2>
                <p className="text-gray-400 mb-6">Choose how you want to use FreelanceX</p>

                <form onSubmit={form3.handleSubmit(handleStep3)} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <label className="cursor-pointer">
                      <input {...form3.register('role')} type="radio" value="freelancer" className="peer hidden" />
                      <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="p-5 rounded-xl border-2 border-white/10 peer-checked:border-primary-400 peer-checked:bg-primary-400/10 transition-all text-center">
                        <div className="flex justify-center mb-3">
                          <Avatar user={{ role: 'freelancer' }} size={72} />
                        </div>
                        <div className="font-semibold text-white mb-1">Freelancer</div>
                        <p className="text-xs text-gray-400">Find work & get paid</p>
                      </motion.div>
                    </label>

                    <label className="cursor-pointer">
                      <input {...form3.register('role')} type="radio" value="client" className="peer hidden" />
                      <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="p-5 rounded-xl border-2 border-white/10 peer-checked:border-accent-500 peer-checked:bg-accent-500/10 transition-all text-center">
                        <div className="flex justify-center mb-3">
                          <Avatar user={{ role: 'client' }} size={72} />
                        </div>
                        <div className="font-semibold text-white mb-1">Client</div>
                        <p className="text-xs text-gray-400">Hire talent</p>
                      </motion.div>
                    </label>
                  </div>
                  {form3.formState.errors.role && <p className="text-red-400 text-sm">{form3.formState.errors.role.message}</p>}

                  <div className="flex gap-3 mt-4">
                    <motion.button type="button" onClick={() => setStep(2)} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="btn-secondary flex items-center justify-center gap-2">
                      <ArrowLeft className="w-5 h-5" /> Back
                    </motion.button>
                    <motion.button type="submit" disabled={isLoading} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1 btn-primary flex items-center justify-center gap-2 py-4">
                      {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Create Account <ArrowRight className="w-5 h-5" /></>}
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <p className="text-center text-xs text-gray-600 mt-6 sm:mt-8">
          © 2026 FreelanceX. Built by Aravind Ugge
        </p>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
