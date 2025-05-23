const Response = require('../models/response.model');
const Survey = require('../models/survey.model');

const responseController = {
  /**
   * Submit survey response
   */
  submitResponse: async (req, res) => {
    try {
      const { surveyId, respondentId, answers, isAnonymous } = req.body;

      // Check if survey exists
      const survey = await Survey.findById(surveyId);
      if (!survey) {
        return res.status(404).json({ message: 'Survey not found' });
      }

      // Create response object
      const response = new Response({
        survey: surveyId,
        respondent: isAnonymous ? null : req.user._id,
        respondentId: respondentId || 'default',
        answers,
        status: 'completed',
        completedAt: new Date(),
        metadata: {
          ipAddress: req.ip,
          userAgent: req.headers['user-agent'],
          deviceType: req.headers['sec-ch-ua-platform'] || 'unknown',
          browser: req.headers['sec-ch-ua'] || 'unknown',
          os: req.headers['sec-ch-ua-platform'] || 'unknown'
        }
      });

      // Save response
      await response.save();

      res.status(201).json({
        message: 'Response submitted successfully',
        responseId: response._id
      });
    } catch (error) {
      console.error('Error submitting response:', error);
      res.status(500).json({ message: 'Error submitting response' });
    }
  },

  /**
   * Get responses for a survey
   */
  getSurveyResponses: async (req, res) => {
    try {
      const { surveyId } = req.params;

      // Check if survey exists and user is creator
      const survey = await Survey.findById(surveyId);
      if (!survey) {
        return res.status(404).json({ message: 'Survey not found' });
      }

      if (survey.creator.toString() !== req.user.id) {
        return res.status(403).json({ message: 'Not authorized to view responses' });
      }

      const responses = await Response.find({ survey: surveyId })
        .populate('respondent', 'firstName lastName email')
        .sort('-createdAt');

      res.json(responses);
    } catch (error) {
      console.error('Error getting survey responses:', error);
      res.status(500).json({ message: 'Error getting survey responses' });
    }
  },

  /**
   * Get response by ID
   */
  getResponseById: async (req, res) => {
    try {
      const response = await Response.findById(req.params.id)
        .populate('survey')
        .populate('respondent', 'firstName lastName email');

      if (!response) {
        return res.status(404).json({ message: 'Response not found' });
      }

      // Check if user is survey creator
      if (response.survey.creator.toString() !== req.user.id) {
        return res.status(403).json({ message: 'Not authorized to view response' });
      }

      res.json(response);
    } catch (error) {
      console.error('Error getting response:', error);
      res.status(500).json({ message: 'Error getting response' });
    }
  },

  /**
   * Update response
   */
  updateResponse: async (req, res) => {
    try {
      const { answers, status } = req.body;
      const response = await Response.findById(req.params.id);

      if (!response) {
        return res.status(404).json({ message: 'Response not found' });
      }

      // Check if user is survey creator
      const survey = await Survey.findById(response.survey);
      if (survey.creator.toString() !== req.user.id) {
        return res.status(403).json({ message: 'Not authorized to update response' });
      }

      // Update response
      if (answers) response.answers = answers;
      if (status) response.status = status;

      await response.save();
      res.json(response);
    } catch (error) {
      console.error('Error updating response:', error);
      res.status(500).json({ message: 'Error updating response' });
    }
  },

  /**
   * Delete response
   */
  deleteResponse: async (req, res) => {
    try {
      const response = await Response.findById(req.params.id);

      if (!response) {
        return res.status(404).json({ message: 'Response not found' });
      }

      // Check if user is survey creator
      const survey = await Survey.findById(response.survey);
      if (survey.creator.toString() !== req.user.id) {
        return res.status(403).json({ message: 'Not authorized to delete response' });
      }

      await response.remove();
      res.json({ message: 'Response deleted successfully' });
    } catch (error) {
      console.error('Error deleting response:', error);
      res.status(500).json({ message: 'Error deleting response' });
    }
  }
};

module.exports = responseController; 