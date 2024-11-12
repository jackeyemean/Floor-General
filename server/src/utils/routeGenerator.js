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
      if (!concept) return res.status(404).json({ message: "Concept not found" });

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

  return router;
};
