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

const app = express();

// Middleware setup
// ------------------------------
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
mongoose.connect(
  "mongodb+srv://jacky33men:lne4KJz1BuxvnzeW@floorgeneralcluster.a0cod.mongodb.net/FloorGeneralCluster?retryWrites=true&w=majority&appName=FloorGeneralCluster"
);
// ------------------------------

// Start server
// ------------------------------
app.listen(3001, () => console.log("SERVER STARTED"));
// ------------------------------
