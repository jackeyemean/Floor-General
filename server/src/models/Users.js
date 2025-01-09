import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  savedOffensiveSchemes: [{ type: mongoose.Schema.Types.ObjectId, ref: "offensiveschemes" }],
  savedPlays: [{ type: mongoose.Schema.Types.ObjectId, ref: "plays" }],
  savedTerminology: [{ type: mongoose.Schema.Types.ObjectId, ref: "terminologies" }],
  savedDefensiveSchemes: [{ type: mongoose.Schema.Types.ObjectId, ref: "defensiveschemes" }]
});

export const UserModel = mongoose.model("users", UserSchema)
