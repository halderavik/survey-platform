const express = require('express');
const { body } = require('express-validator');
const { authenticate } = require('../middleware/auth.middleware');
const { validate } = require('../middleware/validate.middleware');
const responseController = require('../controllers/response.controller');

const router = express.Router();

// Submit response route
router.post(
  '/',
  [
    body('surveyId').notEmpty().withMessage('Survey ID is required'),
    body('answers').isArray().withMessage('Answers must be an array')
  ],
  validate,
  responseController.submitResponse
);

// Get responses for a survey route
router.get(
  '/survey/:id',
  authenticate,
  responseController.getSurveyResponses
);

// Get response by ID route
router.get(
  '/:id',
  authenticate,
  responseController.getResponseById
);

// Update response route
router.put(
  '/:id',
  authenticate,
  [
    body('answers').optional().isArray().withMessage('Answers must be an array'),
    body('status')
      .optional()
      .isIn(['in_progress', 'completed', 'abandoned'])
      .withMessage('Invalid status value')
  ],
  validate,
  responseController.updateResponse
);

// Delete response route
router.delete(
  '/:id',
  authenticate,
  responseController.deleteResponse
);

module.exports = router; 