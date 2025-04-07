const Survey = require('../models/survey.model');
const mongoose = require('mongoose');

const surveyController = {
  /**
   * Create a new survey
   */
  createSurvey: async (req, res) => {
    try {
      const { title, description, questions, settings, tags, isTemplate, templateCategory } = req.body;

      const survey = new Survey({
        title,
        description,
        questions,
        settings,
        tags,
        isTemplate,
        templateCategory,
        creator: req.user.id
      });

      const savedSurvey = await survey.save();
      res.status(201).json({
        id: savedSurvey._id.toString(),
        title: savedSurvey.title,
        description: savedSurvey.description,
        questions: savedSurvey.questions,
        settings: savedSurvey.settings,
        status: savedSurvey.status
      });
    } catch (error) {
      console.error('Create survey error:', error);
      res.status(500).json({ message: 'Error creating survey' });
    }
  },

  /**
   * Get all surveys for the current user
   */
  getSurveys: async (req, res) => {
    try {
      const { status, isTemplate } = req.query;
      const query = { creator: req.user.id };

      if (status) query.status = status;
      if (isTemplate !== undefined) query.isTemplate = isTemplate === 'true';

      const surveys = await Survey.find(query).sort('-createdAt');
      res.json(surveys);
    } catch (error) {
      console.error('Get surveys error:', error);
      res.status(500).json({ message: 'Error getting surveys' });
    }
  },

  /**
   * Get survey by ID
   */
  getSurveyById: async (req, res) => {
    try {
      const { id } = req.params;

      // Validate if id is a valid ObjectId
      if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid survey ID' });
      }

      const survey = await Survey.findById(id);

      if (!survey) {
        return res.status(404).json({ message: 'Survey not found' });
      }

      // Check if user is creator or if survey is public
      if (survey.creator.toString() !== req.user.id && !survey.isTemplate) {
        return res.status(403).json({ message: 'Not authorized to view this survey' });
      }

      res.json(survey);
    } catch (error) {
      console.error('Get survey error:', error);
      res.status(500).json({ message: 'Error getting survey' });
    }
  },

  /**
   * Update survey
   */
  updateSurvey: async (req, res) => {
    try {
      const { title, description, questions, settings, tags } = req.body;

      const survey = await Survey.findById(req.params.id);

      if (!survey) {
        return res.status(404).json({ message: 'Survey not found' });
      }

      // Check if user is creator
      if (survey.creator.toString() !== req.user.id) {
        return res.status(403).json({ message: 'Not authorized to update this survey' });
      }

      // Update survey
      if (title) survey.title = title;
      if (description !== undefined) survey.description = description;
      if (questions) survey.questions = questions;
      if (settings) survey.settings = settings;
      if (tags) survey.tags = tags;

      await survey.save();
      res.json(survey);
    } catch (error) {
      console.error('Update survey error:', error);
      res.status(500).json({ message: 'Error updating survey' });
    }
  },

  /**
   * Delete survey
   */
  deleteSurvey: async (req, res) => {
    try {
      const survey = await Survey.findById(req.params.id);

      if (!survey) {
        return res.status(404).json({ message: 'Survey not found' });
      }

      // Check if user is creator
      if (survey.creator.toString() !== req.user.id) {
        return res.status(403).json({ message: 'Not authorized to delete this survey' });
      }

      await survey.remove();
      res.json({ message: 'Survey deleted successfully' });
    } catch (error) {
      console.error('Delete survey error:', error);
      res.status(500).json({ message: 'Error deleting survey' });
    }
  },

  /**
   * Change survey status
   */
  changeSurveyStatus: async (req, res) => {
    try {
      const { status } = req.body;

      const survey = await Survey.findById(req.params.id);

      if (!survey) {
        return res.status(404).json({ message: 'Survey not found' });
      }

      // Check if user is creator
      if (survey.creator.toString() !== req.user.id) {
        return res.status(403).json({ message: 'Not authorized to change survey status' });
      }

      survey.status = status;
      await survey.save();

      res.json(survey);
    } catch (error) {
      console.error('Change survey status error:', error);
      res.status(500).json({ message: 'Error changing survey status' });
    }
  },

  /**
   * Get survey templates
   */
  getSurveyTemplates: async (req, res) => {
    try {
      const { category } = req.query;
      const query = { isTemplate: true };

      if (category) {
        query.templateCategory = category;
      }

      const templates = await Survey.find(query).sort('-createdAt');
      res.json(templates);
    } catch (error) {
      console.error('Get templates error:', error);
      res.status(500).json({ message: 'Error getting templates' });
    }
  }
};

module.exports = surveyController; 