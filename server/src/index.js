import express from "express"; // framework to create our APIs
import cors from "cors"; // sets up rules when communicating between frontend and server
import mongoose from "mongoose"; // queries database (mongoDB)


// Import routers
// ------------------------------
import { userRouter } from "./routes/users.js";
import { defenseRouter } from "./routes/defensiveschemes.js";
import { offenseRouter } from "./routes/offensiveschemes.js";
import { terminologyRouter } from "./routes/terminology.js";
import { playsRouter } from "./routes/plays.js";
// ------------------------------
import dotenv from "dotenv";
dotenv.config();

const app = express();
const mongoUri = process.env.MONGO_URI;

// Middleware setup
// ----------------------a--------
app.use(express.json()); // converts data from frontend to JSON
app.use(cors());
// ------------------------------

// Route setup
// ------------------------------
app.use("/auth", userRouter);
app.use("/defensive-schemes", defenseRouter);
app.use("/offensive-schemes", offenseRouter);
app.use("/terminology", terminologyRouter);
app.use("/plays", playsRouter);
// ------------------------------

// Database connection
// ------------------------------
mongoose
  .connect(mongoUri)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));
// ------------------------------

// Start server
// ------------------------------
app.listen(3001, () => console.log("SERVER STARTED"));
// ------------------------------
