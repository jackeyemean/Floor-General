import mongoose from "mongoose";

const PlaysSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  type: { type: String },
  prerequisites: [{ type: String, required: true }],
  description: { type: String },
  gif: { type: String },
  userOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

export const PlaysModel = mongoose.model("Plays", PlaysSchema);
