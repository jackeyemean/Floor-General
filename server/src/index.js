import express from "express"; // framework to create our APIs
import cors from "cors"; // sets up rules when communicating between frontend and server
import mongoose from "mongoose"; // queries database (mongoDB)

import { userRouter } from "./routes/users.js";

const app = express();

// middleware
app.use(express.json()); // converts data from frontend to json
app.use(cors());

app.use("/auth", userRouter);

mongoose.connect(
  "mongodb+srv://jacky33men:lne4KJz1BuxvnzeW@floorgeneralcluster.a0cod.mongodb.net/FloorGeneralCluster?retryWrites=true&w=majority&appName=FloorGeneralCluster"
);

app.listen(3001, () => console.log("SERVER STARTED")); // tells our api to start on a specified port
