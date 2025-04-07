const mongoose = require('mongoose');

// Option schema for questions with choices
const optionSchema = new mongoose.Schema({
  id: String,  // Changed from ObjectId to String
  text: String,
  value: String
});

// Question schema for different question types
const questionSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: [
      'multiple_choice',
      'checkbox',
      'short_text',
      'long_text',
      'rating',
      'dropdown',
      'matrix',
      'slider',
      'date',
      'file_upload'
    ]
  },
  title: {
    type: String,
    required: true
  },
  text: String,
  description: String,
  required: {
    type: Boolean,
    default: false
  },
  options: [optionSchema],
  // For grid/matrix questions
  rows: [String],
  columns: [String],
  // For rating questions
  scalePoints: {
    type: Number,
    default: 5
  },
  // For slider questions
  min: {
    type: Number,
    default: 0
  },
  max: {
    type: Number,
    default: 100
  },
  step: {
    type: Number,
    default: 1
  },
  defaultValue: Number,
  // For file upload questions
  acceptedFileTypes: [String],
  maxFileSize: Number
}, {
  timestamps: true
});

const surveySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['draft', 'testing', 'live', 'closed'],
    default: 'draft'
  },
  questions: [questionSchema],
  settings: {
    allowAnonymous: {
      type: Boolean,
      default: false
    },
    requireAuthentication: {
      type: Boolean,
      default: false
    },
    limitToOneResponse: {
      type: Boolean,
      default: false
    },
    showProgressBar: {
      type: Boolean,
      default: true
    },
    showQuestionNumbers: {
      type: Boolean,
      default: true
    },
    theme: {
      type: String,
      default: 'default'
    },
    expirationDate: Date,
    maxResponses: Number,
    redirectUrl: String,
    customCSS: String,
    customJS: String
  },
  tags: [{
    type: String,
    trim: true
  }],
  isTemplate: {
    type: Boolean,
    default: false
  },
  templateCategory: {
    type: String,
    trim: true
  },
  responseCount: {
    type: Number,
    default: 0
  },
  lastResponseAt: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for faster queries
surveySchema.index({ creator: 1, status: 1 });
surveySchema.index({ isTemplate: 1, templateCategory: 1 });
surveySchema.index({ tags: 1 });

// Methods
surveySchema.methods.incrementResponseCount = async function() {
  this.responseCount += 1;
  this.lastResponseAt = new Date();
  await this.save();
};

// Static methods
surveySchema.statics.findByCreator = function(creatorId) {
  return this.find({ creator: creatorId }).sort('-createdAt');
};

surveySchema.statics.findTemplates = function(category) {
  const query = { isTemplate: true };
  if (category) {
    query.templateCategory = category;
  }
  return this.find(query).sort('-createdAt');
};

const Survey = mongoose.model('Survey', surveySchema);

module.exports = Survey; 