// Covers login and registration

import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../models/Users.js";

const router = express.Router();

// Register new user
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  // Checking if username already exists
  const user = await UserModel.findOne({ username: username });
  if (user) {
    return res.json({ message: "User already exists!" });
  }

  // Otherwise add new user
  const hashedPassword = await bcrypt.hash(password, 10);

  // this is how you add something to database with mongoose
  const newUser = new UserModel({ username, password: hashedPassword });
  await newUser.save();

  res.json({ message: "User Registered Sucessfully!" });
});

// Login existing user
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // Checking if user exists
  const user = await UserModel.findOne({ username: username });
  if (!user) {
    return res.json({ message: "User Doesn't Exist!" });
  }

  // Checking if password is correct
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.json({ message: "Incorrect Username or Password!" });
  }

  // Return token if successful login
  const token = jwt.sign({ id: user._id }, "secret");
  res.json({ token, userID: user._id });
});

export { router as userRouter };
