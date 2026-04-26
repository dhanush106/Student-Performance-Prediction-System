import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, ArrowRight, Loader } from 'lucide-react';

const StepLogin = ({ onLogin, loading, error }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');

  const handleNext = (e) => {
    e.preventDefault();
    if (!email.includes('@')) {
      setLocalError('Please enter a valid email address');
      return;
    }
    setLocalError('');
    setStep(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!password) {
      setLocalError('Please enter your password');
      return;
    }
    onLogin(email, password);
  };

  const variants = {
    initial: { x: 50, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -50, opacity: 0 },
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-surface rounded-2xl p-8 shadow-xl border border-slate-700/50 relative overflow-hidden">
        {/* Subtle gradient background */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-500/10 to-purple-500/10 pointer-events-none" />

        <div className="relative z-10">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              Welcome back
            </h2>
            <p className="text-slate-400 mt-2">
              Step {step} of 2
            </p>
          </div>

          {(error || localError) && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm">
              {error || localError}
            </div>
          )}

          <div className="relative h-24">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.form
                  key="step1"
                  variants={variants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  onSubmit={handleNext}
                  className="absolute w-full"
                >
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                      autoFocus
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-3 font-medium flex items-center justify-center gap-2 group transition-all"
                  >
                    Continue
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </motion.form>
              )}

              {step === 2 && (
                <motion.form
                  key="step2"
                  variants={variants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  onSubmit={handleSubmit}
                  className="absolute w-full"
                >
                  <div className="mb-4 text-sm text-slate-400 flex items-center gap-2">
                    <span className="truncate">{email}</span>
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-indigo-400 hover:text-indigo-300 text-xs underline"
                    >
                      Edit
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                      autoFocus
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl py-3 font-medium flex items-center justify-center gap-2 disabled:opacity-70 transition-all"
                  >
                    {loading ? <Loader className="w-5 h-5 animate-spin" /> : 'Login'}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepLogin;
