import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, AlertCircle, AlertTriangle } from 'lucide-react';

const ResultCard = ({ result, score }) => {
  if (!result) return null;

  const getStyle = () => {
    switch (result.toUpperCase()) {
      case 'A':
      case 'B':
        return {
          bg: 'bg-emerald-500/10',
          border: 'border-emerald-500/20',
          text: 'text-emerald-400',
          gradient: 'from-emerald-400 to-teal-400',
          icon: <CheckCircle2 className="w-12 h-12 text-emerald-400 mb-4" />,
          message: 'Excellent predicted performance. Keep up the great work!'
        };
      case 'C':
        return {
          bg: 'bg-amber-500/10',
          border: 'border-amber-500/20',
          text: 'text-amber-400',
          gradient: 'from-amber-400 to-yellow-400',
          icon: <AlertTriangle className="w-12 h-12 text-amber-400 mb-4" />,
          message: 'Average predicted performance. There is room for improvement.'
        };
      case 'D':
      case 'F':
        return {
          bg: 'bg-red-500/10',
          border: 'border-red-500/20',
          text: 'text-red-400',
          gradient: 'from-red-400 to-rose-400',
          icon: <AlertCircle className="w-12 h-12 text-red-400 mb-4" />,
          message: 'AT RISK: Low predicted performance. Immediate intervention is recommended.'
        };
      default:
        return {
          bg: 'bg-indigo-500/10',
          border: 'border-indigo-500/20',
          text: 'text-indigo-400',
          gradient: 'from-indigo-400 to-cyan-400',
          icon: null,
          message: 'Prediction generated successfully.'
        };
    }
  };

  const style = getStyle();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`${style.bg} ${style.border} border rounded-2xl p-8 flex flex-col items-center text-center relative overflow-hidden`}
    >
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${style.gradient} opacity-10 rounded-bl-full`} />
      
      {style.icon}
      
      <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-400 mb-2">
        Predicted Grade
      </h3>
      
      <div className={`text-6xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r ${style.gradient}`}>
        {result.toUpperCase()}
      </div>

      {score !== undefined && score !== null && (
        <div className="text-xl font-medium text-slate-300 mb-4">
          Predicted Score: {typeof score === 'number' ? score.toFixed(2) : score}
        </div>
      )}
      
      <p className="text-slate-300 max-w-sm mt-2">
        {style.message}
      </p>
    </motion.div>
  );
};

export default ResultCard;
