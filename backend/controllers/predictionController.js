const Prediction = require('../models/Prediction');
const axios = require('axios');

// @desc    Make a prediction
// @route   POST /api/predict
// @access  Private
const makePrediction = async (req, res) => {
  try {
    const inputs = req.body;
    
    // Call Python ML service for grade prediction
    const mlServiceUrl = process.env.ML_SERVICE_URL || 'http://127.0.0.1:5001';
    
    const gradeResponse = await axios.post(`${mlServiceUrl}/predict-grade`, inputs);
    
    // Optional: Call for score prediction
    let score = null;
    try {
      const scoreResponse = await axios.post(`${mlServiceUrl}/predict-score`, inputs);
      score = scoreResponse.data.score;
    } catch (scoreError) {
      console.warn("Could not fetch score prediction, proceeding without it.");
    }

    const predictionValue = gradeResponse.data.grade;

    // Determine grade strictly based on the numeric score
    let finalGrade = 'FAIL';
    if (score !== null) {
      if (score >= 95) finalGrade = 'O';
      else if (score >= 90) finalGrade = 'A+';
      else if (score >= 80) finalGrade = 'A';
      else if (score >= 70) finalGrade = 'B';
      else if (score >= 60) finalGrade = 'C';
      else if (score >= 50) finalGrade = 'D';
      else finalGrade = 'FAIL';
    } else {
      finalGrade = predictionValue;
    }

    // Attempt to save to database but don't crash if it fails
    let predictionRecord = { _doc: { inputs, prediction: finalGrade, score } };
    try {
      if (require('mongoose').connection.readyState === 1) {
        const userId = req.user ? req.user._id : null; 
        predictionRecord = await Prediction.create({
          userId: userId,
          inputs: inputs,
          prediction: finalGrade,
          score: score
        });
      } else {
        console.warn("Database offline, skipping save.");
      }
    } catch (dbError) {
      console.error("Failed to save prediction to DB:", dbError.message);
    }

    res.status(201).json({
      ...(predictionRecord._doc || predictionRecord),
      grade: finalGrade,
      score: score
    });

  } catch (error) {
    console.error("Prediction Error:", error.message);
    if (error.response) {
      res.status(500).json({ message: error.response.data.error || 'Error from ML service' });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

// @desc    Get user predictions
// @route   GET /api/predict/history
// @access  Private
const getPredictionHistory = async (req, res) => {
  try {
    const userId = req.user ? req.user._id : null;
    if (!userId) {
       return res.status(401).json({ message: "Not authorized" });
    }
    const predictions = await Prediction.find({ userId }).sort({ createdAt: -1 });
    res.json(predictions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  makePrediction,
  getPredictionHistory,
};
