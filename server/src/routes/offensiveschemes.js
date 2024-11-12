import { OffenseModel } from "../models/OffensiveSchemes.js";
import { createRouter } from "../utils/routeGenerator.js";

export const offenseRouter = createRouter(OffenseModel, "savedOffensiveSchemes");
