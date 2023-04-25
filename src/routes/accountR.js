import { Router } from "express";
import { showAll, showOne } from "../controllers/accountC.js";

const accountR = Router();

accountR.get("/", showAll);
accountR.get("/:accountId", showOne);

export default accountR;
