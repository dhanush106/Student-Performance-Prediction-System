import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader } from 'lucide-react';

const Form = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    internals: 20,
    assignments: 20,
    viva: 10,
    lab_marks: 20,
    mid_exam: 20,
    attendance: 80,
    study_hours: 4,
    sleep_hours: 7,
    stress_level: 5,
    backlogs: 0,
    previous_cgpa: 7.5,
    branch: 'CSE',
    year: 3
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'number' ? Number(value) : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const inputClasses = "w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all hover:border-indigo-500/50";
  const labelClasses = "block text-sm font-medium text-slate-400 mb-1.5";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-surface rounded-2xl p-6 shadow-xl border border-slate-800"
    >
      <h3 className="text-xl font-semibold text-white mb-6">Student Data Input</h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Academic Marks */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-indigo-400 uppercase tracking-wider">Academic Marks</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClasses}>Internals [0-30]</label>
                <input type="number" min="0" max="30" name="internals" value={formData.internals} onChange={handleChange} className={inputClasses} required />
              </div>
              <div>
                <label className={labelClasses}>Mid Exam [0-30]</label>
                <input type="number" min="0" max="30" name="mid_exam" value={formData.mid_exam} onChange={handleChange} className={inputClasses} required />
              </div>
            </div>
            <div>
              <label className={labelClasses}>Assignments [0-20]</label>
              <input type="number" min="0" max="20" name="assignments" value={formData.assignments} onChange={handleChange} className={inputClasses} required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClasses}>Viva [0-10]</label>
                <input type="number" min="0" max="10" name="viva" value={formData.viva} onChange={handleChange} className={inputClasses} required />
              </div>
              <div>
                <label className={labelClasses}>Lab Marks [0-30]</label>
                <input type="number" min="0" max="30" name="lab_marks" value={formData.lab_marks} onChange={handleChange} className={inputClasses} required />
              </div>
            </div>
          </div>

          {/* Engagement & Wellness */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-indigo-400 uppercase tracking-wider">Engagement & Wellness</h4>
            <div>
              <label className={labelClasses}>Attendance (%) [0-100]</label>
              <input type="number" min="0" max="100" name="attendance" value={formData.attendance} onChange={handleChange} className={inputClasses} required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClasses}>Study Hours [0-24]</label>
                <input type="number" min="0" max="24" name="study_hours" value={formData.study_hours} onChange={handleChange} className={inputClasses} required />
              </div>
              <div>
                <label className={labelClasses}>Sleep Hours [0-24]</label>
                <input type="number" min="0" max="24" name="sleep_hours" value={formData.sleep_hours} onChange={handleChange} className={inputClasses} required />
              </div>
            </div>
            <div>
              <label className={labelClasses}>Stress Level [1-10]</label>
              <input type="number" min="1" max="10" name="stress_level" value={formData.stress_level} onChange={handleChange} className={inputClasses} required />
            </div>
          </div>

          {/* Academic History */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-indigo-400 uppercase tracking-wider">Academic History</h4>
            <div>
              <label className={labelClasses}>Backlogs [0-10]</label>
              <input type="number" min="0" max="10" name="backlogs" value={formData.backlogs} onChange={handleChange} className={inputClasses} required />
            </div>
            <div>
              <label className={labelClasses}>Previous CGPA [0.0-10.0]</label>
              <input type="number" step="0.1" min="0" max="10" name="previous_cgpa" value={formData.previous_cgpa} onChange={handleChange} className={inputClasses} required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClasses}>Branch</label>
                <select name="branch" value={formData.branch} onChange={handleChange} className={inputClasses} required>
                  <option value="CSE">CSE</option>
                  <option value="ECE">ECE</option>
                  <option value="MECH">MECH</option>
                </select>
              </div>
              <div>
                <label className={labelClasses}>Year [1-4]</label>
                <input type="number" min="1" max="4" name="year" value={formData.year} onChange={handleChange} className={inputClasses} required />
              </div>
            </div>
          </div>

        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-8 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white rounded-xl py-4 font-semibold text-lg flex items-center justify-center gap-2 disabled:opacity-70 transition-all shadow-lg shadow-indigo-500/25"
        >
          {loading ? <Loader className="w-6 h-6 animate-spin" /> : 'Predict Performance'}
        </button>
      </form>
    </motion.div>
  );
};

export default Form;
