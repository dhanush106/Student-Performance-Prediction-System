import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Form from '../components/Form';
import ResultCard from '../components/ResultCard';
import api from '../services/api';
import { Clock, BarChart2 } from 'lucide-react';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [predictionData, setPredictionData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await api.get('/predict/history');
      setHistory(response.data);
    } catch (err) {
      console.error('Failed to fetch history', err);
    }
  };

  const handlePredict = async (formData) => {
    setLoading(true);
    setError('');
    setPredictionData(null);
    try {
      const response = await api.post('/predict', formData);
      setPredictionData({
        grade: response.data.grade,
        score: response.data.score
      });
      // Refresh history
      fetchHistory();
    } catch (err) {
      setError(err.response?.data?.message || 'Error making prediction');
    } finally {
      setLoading(false);
    }
  };

  const getGradeColor = (grade) => {
    const g = (grade || '').toUpperCase();
    if (['A', 'B'].includes(g)) return 'bg-emerald-500/20 text-emerald-400';
    if (g === 'C') return 'bg-amber-500/20 text-amber-400';
    return 'bg-red-500/20 text-red-400';
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar user={user} />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-12">
        
        <div>
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Student Performance Dashboard</h1>
            <p className="text-slate-400">Predict academic outcomes using our machine learning pipeline.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Form onSubmit={handlePredict} loading={loading} />
            </div>

            <div className="space-y-8">
              {/* Result Area */}
              {predictionData ? (
                <ResultCard result={predictionData.grade} score={predictionData.score} />
              ) : (
                <div className="bg-surface/50 border border-slate-800 rounded-2xl p-8 flex flex-col items-center justify-center text-center h-[280px]">
                  <div className="w-16 h-16 rounded-full bg-slate-800 mb-4 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-slate-700 animate-pulse" />
                  </div>
                  <p className="text-slate-400">Awaiting input to generate prediction.</p>
                </div>
              )}

              {/* History Area */}
              <div className="bg-surface rounded-2xl p-6 border border-slate-800">
                <div className="flex items-center gap-2 mb-6">
                  <Clock className="w-5 h-5 text-indigo-400" />
                  <h3 className="text-lg font-semibold text-white">Recent Predictions</h3>
                </div>
                
                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                  {history.length === 0 ? (
                    <p className="text-slate-500 text-sm">No prediction history available.</p>
                  ) : (
                    history.map((item) => (
                      <div key={item._id} className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 flex justify-between items-center">
                        <div className="text-sm">
                          <div className="text-slate-300">
                            Int: {item.inputs.internals} | Att: {item.inputs.attendance}% | CGPA: {item.inputs.previous_cgpa}
                          </div>
                          <div className="text-slate-500 text-xs mt-1">
                            {new Date(item.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-semibold ${getGradeColor(item.prediction)}`}>
                          Grade {item.prediction}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Model Analysis Section */}
        <div className="bg-surface border border-slate-800 rounded-2xl p-8 mt-12">
          <div className="flex items-center gap-3 mb-8">
            <BarChart2 className="w-8 h-8 text-indigo-400" />
            <h2 className="text-2xl font-bold text-white">Model Analytics & Insights</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-800">
              <h4 className="text-slate-300 font-medium mb-3 text-center">Feature Importance</h4>
              <img src="/ml_results/feature_importance.png" alt="Feature Importance" className="w-full h-auto rounded-lg" />
            </div>
            
            <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-800">
              <h4 className="text-slate-300 font-medium mb-3 text-center">Confusion Matrix</h4>
              <img src="/ml_results/confusion_matrix.png" alt="Confusion Matrix" className="w-full h-auto rounded-lg" />
            </div>

            <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-800">
              <h4 className="text-slate-300 font-medium mb-3 text-center">Correlation Heatmap</h4>
              <img src="/ml_results/correlation_heatmap.png" alt="Correlation Heatmap" className="w-full h-auto rounded-lg" />
            </div>

            <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-800 md:col-span-2 lg:col-span-1">
              <h4 className="text-slate-300 font-medium mb-3 text-center">Actual vs Predicted</h4>
              <img src="/ml_results/actual_vs_predicted.png" alt="Actual vs Predicted" className="w-full h-auto rounded-lg" />
            </div>

            <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-800 md:col-span-2 lg:col-span-2">
              <h4 className="text-slate-300 font-medium mb-3 text-center">Residual Plot</h4>
              <img src="/ml_results/residual_plot.png" alt="Residual Plot" className="w-full h-auto rounded-lg max-h-64 object-contain mx-auto" />
            </div>
          </div>
        </div>

      </main>
    </div>
  );
};

export default Dashboard;
