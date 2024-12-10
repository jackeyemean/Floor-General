import express from "express";
import mongoose from "mongoose";
import { UserModel } from "../models/Users.js";
import { DefenseModel } from "../models/DefensiveSchemes.js";
import { OffenseModel } from "../models/OffensiveSchemes.js";
import { PlaysModel } from "../models/Plays.js";
import { TerminologyModel } from "../models/Terminology.js";

export const createRouter = (Model, userField) => {
  const router = express.Router();

  // Get all documents for specific model
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

  // Later route we might use
  /*
  // Get concept by ID
  router.get("/:conceptID", async (req, res) => {
    try {
      const result = await Model.findById(req.param.conceptID);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  */

  // Save a concept (play, offensiveScheme, etc.) to the user’s saved list
  // Note: should not be able to save a concept if it was created by a different user
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
  // Get IDs of saved concepts by a user
  // Get saved concepts for a specific category
  router.get(`/saved${userField}/:userID`, async (req, res) => {
    try {
      const user = await UserModel.findById(req.params.userID);
      if (!user) return res.status(404).json({ message: "User not found" });
  
      // Fetch the saved concepts dynamically based on userField
      const savedConcepts = await Model.find({
        _id: { $in: user[userField] }, // Dynamically access the correct field in the user schema
      });
  
      // Respond with the saved concepts
      res.status(200).json({ [`saved${userField}`]: savedConcepts });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  });

  // Get all saved concepts from a user across all categories
  router.get("/allSavedConcepts", async (req, res) => {
    const { userID } = req.query;
    try {
      const user = await UserModel.findById(userID);
      if (!user) return res.status(404).json({ message: "User not found" });

      const savedDefensiveSchemes = await DefenseModel.find({
        _id: { $in: user.savedDefensiveSchemes },
      });
      const savedOffensiveSchemes = await OffenseModel.find({
        _id: { $in: user.savedOffensiveSchemes },
      });
      const savedPlays = await PlaysModel.find({
        _id: { $in: user.savedPlays },
      });
      const savedTerminology = await TerminologyModel.find({
        _id: { $in: user.savedTerminology },
      });
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


  return router;
};
