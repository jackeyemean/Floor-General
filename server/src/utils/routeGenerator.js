import express from "express";
import mongoose from "mongoose";
import { UserModel } from "../models/Users.js";

export const createRouter = (Model, userField) => {
  const router = express.Router();

  // Get all documents
  router.get("/", async (req, res) => {
    try {
      const response = await Model.find({});
      res.json(response);
    } catch (err) {
      res.json(err);
    }
  });

  // Create a new document
  router.post("/", async (req, res) => {
    const document = new Model(req.body);
    try {
      const response = await document.save();
      res.json(response);
    } catch (err) {
      res.json(err);
    }
  });

  // Save a concept (play, offensiveScheme, etc.) to the user’s saved list
  router.put("/", async (req, res) => {
    const { userID, conceptID } = req.body;
    try {
      // Find the concept by ID
      const concept = await Model.findById(conceptID);
      if (!concept)
        return res.status(404).json({ message: "Concept not found" });

      // Find the user by ID
      const user = await UserModel.findById(userID);
      if (!user) return res.status(404).json({ message: "User not found" });

      // Add the concept ID to the specified field in the user's document
      if (!user[userField].includes(concept._id)) {
        user[userField].push(concept._id);
        await user.save();
      }

      res.json({ [userField]: user[userField] });
    } catch (err) {
      res.json(err);
    }
  });

/*
  // Get IDs saved by user given a user ID
  router.get("/savedConcepts", async (req, res) => {
    try {
      const user = await UserModel.findById(req.body.userID);
      const savedConcepts = await Model.find({
        _id: { $in: user.savedConcepts },
      });
      res.json({ savedConcepts: user?.savedConcepts });
    } catch (err) {
      res.json(err);
    }
  });
*/

/*
  // Get all saved concepts from a user across all categories
  router.get("/allSavedConcepts", async (req, res) => {
    const { userID } = req.query;
    try {
      const user = await UserModel.findById(userID);
      if (!user) return res.status(404).json({ message: "User not found" });

      // Aggregate saved concepts across all categories
      const savedDefensiveSchemes = await DefensiveSchemesModel.find({ _id: { $in: user.savedDefensiveSchemes } });
      const savedOffensiveSchemes = await OffensiveSchemesModel.find({ _id: { $in: user.savedOffensiveSchemes } });
      const savedPlays = await PlaysModel.find({ _id: { $in: user.savedPlays } });
      const savedTerminology = await TerminologyModel.find({ _id: { $in: user.savedTerminology } });

      res.json({
        defensiveSchemes: savedDefensiveSchemes,
        offensiveSchemes: savedOffensiveSchemes,
        plays: savedPlays,
        terminology: savedTerminology,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
*/

/*
  // Get saved concepts by category for a user
  router.get("/savedConceptsByCategory", async (req, res) => {
    const { userID, category } = req.query;

    const models = {
      DefensiveSchemes: { model: DefensiveSchemesModel, field: "savedDefensiveSchemes" },
      OffensiveSchemes: { model: OffensiveSchemesModel, field: "savedOffensiveSchemes" },
      Plays: { model: PlaysModel, field: "savedPlays" },
      Terminology: { model: TerminologyModel, field: "savedTerminology" },
    };

    try {
      const user = await UserModel.findById(userID);
      if (!user) return res.status(404).json({ message: "User not found" });

      const { model, field } = models[category] || {};
      if (!model || !field) return res.status(400).json({ message: "Invalid category specified" });

      const savedConcepts = await model.find({ _id: { $in: user[field] } });
      res.json({ savedConcepts });
    } catch (err) {
      res.status(500).json(err);
    }
  });
*/
  return router;
};
