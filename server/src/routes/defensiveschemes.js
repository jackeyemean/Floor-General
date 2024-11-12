import { DefenseModel } from "../models/DefensiveSchemes.js";
import { createRouter } from "../utils/routeGenerator.js";

export const defenseRouter = createRouter(DefenseModel, "savedDefensiveSchemes");
