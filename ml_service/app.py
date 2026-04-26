from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import pandas as pd
import numpy as np
import os

app = Flask(__name__)
CORS(app)

# Load Models
base_dir = os.path.dirname(os.path.abspath(__file__))
models_dir = os.path.join(base_dir, '..', 'ml_results')

# Using random forest by default
clf_model_path = os.path.join(models_dir, 'rf_clf_model.pkl')
reg_model_path = os.path.join(models_dir, 'rf_reg_model.pkl')
le_path = os.path.join(models_dir, 'label_encoder.pkl')

import joblib

try:
    clf_model = joblib.load(clf_model_path)
except Exception as e:
    print(f"Error loading classification model: {e}")
    clf_model = None

try:
    reg_model = joblib.load(reg_model_path)
except Exception as e:
    print(f"Error loading regression model: {e}")
    reg_model = None

try:
    le = joblib.load(le_path)
except Exception as e:
    print(f"Error loading label encoder: {e}")
    le = None

@app.route('/predict-grade', methods=['POST'])
def predict_grade():
    if not clf_model:
        return jsonify({"error": "Classification model not loaded"}), 500
    
    try:
        data = request.json
        # Convert to DataFrame
        df = pd.DataFrame([data])
        
        # Preprocess: One-hot encode branch
        df['branch_ECE'] = 1 if data.get('branch') == 'ECE' else 0
        df['branch_MECH'] = 1 if data.get('branch') == 'MECH' else 0
        
        # Define exact column order as seen at fit time
        cols = ['internals', 'assignments', 'viva', 'lab_marks', 'mid_exam', 'attendance', 
                'study_hours', 'backlogs', 'sleep_hours', 'stress_level', 'previous_cgpa', 
                'year', 'branch_ECE', 'branch_MECH']
        
        # Reorder columns and handle missing ones with 0
        df_final = df.reindex(columns=cols, fill_value=0)
        
        prediction = clf_model.predict(df_final)
        grade_str = str(prediction[0])
        if le is not None:
            try:
                grade_str = le.inverse_transform([int(prediction[0])])[0]
            except Exception:
                pass
                
        return jsonify({"grade": grade_str})
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/predict-score', methods=['POST'])
def predict_score():
    if not reg_model:
        return jsonify({"error": "Regression model not loaded"}), 500
    
    try:
        data = request.json
        df = pd.DataFrame([data])
        
        # Preprocess: One-hot encode branch
        df['branch_ECE'] = 1 if data.get('branch') == 'ECE' else 0
        df['branch_MECH'] = 1 if data.get('branch') == 'MECH' else 0
        
        # Same column order for regression
        cols = ['internals', 'assignments', 'viva', 'lab_marks', 'mid_exam', 'attendance', 
                'study_hours', 'backlogs', 'sleep_hours', 'stress_level', 'previous_cgpa', 
                'year', 'branch_ECE', 'branch_MECH']
        
        df_final = df.reindex(columns=cols, fill_value=0)
        
        prediction = reg_model.predict(df_final)
        score = float(prediction[0])
        
        # Extrapolation fix: Tree-based models (RF) struggle to predict absolute max limits (100)
        # We compute a theoretical ratio based on inputs to gently push near-perfect students to 100.
        total_max_marks = 120
        user_marks = float(data.get('internals',0)) + float(data.get('assignments',0)) + float(data.get('viva',0)) + float(data.get('lab_marks',0)) + float(data.get('mid_exam',0))
        attendance = float(data.get('attendance', 0))
        
        theoretical_ratio = (user_marks / total_max_marks * 0.8) + (attendance / 100 * 0.2)
        
        # If theoretical ratio is highly optimal (>80%), linearly boost the score
        if theoretical_ratio > 0.8:
            boost = (100 - score) * ((theoretical_ratio - 0.8) / 0.2)
            score += boost
            
        # Ensure score stays strictly within 0-100 boundaries
        score = min(max(round(score, 2), 0), 100)
        
        return jsonify({"score": score})
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(port=5001, debug=True)
