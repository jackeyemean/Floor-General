import { TerminologyModel } from "../models/Terminology.js";
import { createRouter } from "../utils/routeGenerator.js";

export const terminologyRouter = createRouter(TerminologyModel, "savedTerminology");
