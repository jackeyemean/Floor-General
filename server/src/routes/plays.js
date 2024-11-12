import { PlaysModel } from "../models/Plays.js";
import { createRouter } from "../utils/routeGenerator.js";

export const playsRouter = createRouter(PlaysModel, "savedPlays");
