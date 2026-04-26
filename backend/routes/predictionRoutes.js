const express = require('express');
const router = express.Router();
const { makePrediction, getPredictionHistory } = require('../controllers/predictionController');
const { protect } = require('../middleware/authMiddleware');

// Made public for testing
router.route('/').post(makePrediction);
router.route('/history').get(protect, getPredictionHistory);

module.exports = router;
