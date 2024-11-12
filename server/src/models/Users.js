import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  savedOffensiveSchemes: [{ type: mongoose.Schema.Types.ObjectId, ref: "OffensiveScheme" }],
  savedPlays: [{ type: mongoose.Schema.Types.ObjectId, ref: "Play" }],
  savedTerminology: [{ type: mongoose.Schema.Types.ObjectId, ref: "Terminology" }],
  savedDefensiveSchemes: [{ type: mongoose.Schema.Types.ObjectId, ref: "DefensiveScheme" }]
});

export const UserModel = mongoose.model("users", UserSchema)
