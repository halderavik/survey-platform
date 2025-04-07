const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  value: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  text: String,
  files: [{
    filename: String,
    path: String,
    size: Number,
    type: String
  }]
});

const responseSchema = new mongoose.Schema({
  survey: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Survey',
    required: true
  },
  respondent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  answers: [answerSchema],
  status: {
    type: String,
    enum: ['in_progress', 'completed', 'abandoned'],
    default: 'in_progress'
  },
  metadata: {
    ipAddress: String,
    userAgent: String,
    deviceType: String,
    browser: String,
    os: String,
    location: {
      country: String,
      region: String,
      city: String
    }
  },
  startedAt: {
    type: Date,
    default: Date.now
  },
  completedAt: Date,
  timeSpent: Number // in seconds
}, {
  timestamps: true
});

// Indexes
responseSchema.index({ survey: 1, respondent: 1 });
responseSchema.index({ 'metadata.ipAddress': 1 });
responseSchema.index({ status: 1 });

// Methods
responseSchema.methods.complete = async function() {
  this.status = 'completed';
  this.completedAt = new Date();
  this.timeSpent = Math.floor((this.completedAt - this.startedAt) / 1000);
  await this.save();
};

responseSchema.methods.abandon = async function() {
  this.status = 'abandoned';
  this.timeSpent = Math.floor((new Date() - this.startedAt) / 1000);
  await this.save();
};

// Static methods
responseSchema.statics.findBySurvey = function(surveyId) {
  return this.find({ survey: surveyId }).sort('-createdAt');
};

responseSchema.statics.findByRespondent = function(respondentId) {
  return this.find({ respondent: respondentId }).sort('-createdAt');
};

const Response = mongoose.model('Response', responseSchema);

module.exports = Response; 