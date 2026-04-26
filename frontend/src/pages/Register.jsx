import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import StepRegister from '../components/StepRegister';
import api from '../services/api';

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (name, email, password) => {
    setLoading(true);
    setError('');
    try {
      const response = await api.post('/auth/register', { name, email, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to register');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[40%] -right-[20%] w-[70%] h-[70%] rounded-full bg-teal-500/10 blur-[120px]" />
        <div className="absolute top-[60%] -left-[20%] w-[60%] h-[60%] rounded-full bg-cyan-500/10 blur-[120px]" />
      </div>
      
      <div className="relative z-10 w-full max-w-md mx-auto mb-8 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl mb-2">
          Join EdPredict
        </h1>
        <p className="text-lg text-slate-400">
          Start predicting academic success
        </p>
      </div>

      <StepRegister onRegister={handleRegister} loading={loading} error={error} />

      <p className="mt-8 text-center text-sm text-slate-400 relative z-10">
        Already have an account?{' '}
        <Link to="/login" className="font-medium text-teal-400 hover:text-teal-300 transition-colors">
          Sign in instead
        </Link>
      </p>
    </div>
  );
};

export default Register;
