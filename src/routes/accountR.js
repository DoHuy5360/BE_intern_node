import { Router } from "express";
import { showAll } from "../controllers/accountC.js";

const accountR = Router();

accountR.get("/", showAll);

export default accountR;
