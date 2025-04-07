const express = require('express');
const { body } = require('express-validator');
const { authenticate } = require('../middleware/auth.middleware');
const { validate } = require('../middleware/validate.middleware');
const surveyController = require('../controllers/survey.controller');

const router = express.Router();

// Create survey route
router.post(
  '/',
  authenticate,
  [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('description').optional().trim(),
    body('questions').isArray().withMessage('Questions must be an array'),
    body('settings').optional().isObject().withMessage('Settings must be an object'),
    body('tags').optional().isArray().withMessage('Tags must be an array'),
    body('isTemplate').optional().isBoolean().withMessage('isTemplate must be a boolean'),
    body('templateCategory').optional().trim()
  ],
  validate,
  surveyController.createSurvey
);

// Get all surveys route
router.get(
  '/',
  authenticate,
  surveyController.getSurveys
);

// Get survey by ID route
router.get(
  '/:id',
  authenticate,
  surveyController.getSurveyById
);

// Update survey route
router.put(
  '/:id',
  authenticate,
  [
    body('title').optional().trim().notEmpty().withMessage('Title cannot be empty'),
    body('description').optional().trim(),
    body('questions').optional().isArray().withMessage('Questions must be an array'),
    body('settings').optional().isObject().withMessage('Settings must be an object'),
    body('tags').optional().isArray().withMessage('Tags must be an array')
  ],
  validate,
  surveyController.updateSurvey
);

// Delete survey route
router.delete(
  '/:id',
  authenticate,
  surveyController.deleteSurvey
);

// Change survey status route
router.put(
  '/:id/status',
  authenticate,
  [
    body('status')
      .isIn(['draft', 'testing', 'live', 'closed'])
      .withMessage('Invalid status value')
  ],
  validate,
  surveyController.changeSurveyStatus
);

// Get survey templates route
router.get(
  '/templates',
  authenticate,
  surveyController.getSurveyTemplates
);

module.exports = router; 