const mongoose = require('mongoose');

const predictionSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    inputs: {
      internals: Number,
      assignments: Number,
      viva: Number,
      lab_marks: Number,
      mid_exam: Number,
      attendance: Number,
      study_hours: Number,
      sleep_hours: Number,
      stress_level: Number,
      backlogs: Number,
      previous_cgpa: Number,
      branch: String,
      year: Number
    },
    prediction: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Prediction = mongoose.model('Prediction', predictionSchema);

module.exports = Prediction;
