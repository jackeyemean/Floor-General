import express from "express"; // framework to create our APIs
import cors from "cors"; // sets up rules when communicating between frontend and server
import mongoose from "mongoose"; // queries database (mongoDB)

const app = express();

// middleware
app.use(express.json()); // converts data from frontend to json
app.use(cors());

app.listen(3001, () => console.log("SERVER STARTED")) // tells our api to start on a specified port

