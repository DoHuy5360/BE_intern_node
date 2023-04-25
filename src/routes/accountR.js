import { Router } from "express";
import { showAll, showOne, updateOne, deleteOne, createOne } from "../controllers/accountC.js";

const accountR = Router();

accountR.get("/", showAll);
accountR.get("/:accountId", showOne);
accountR.post("/create", createOne);
accountR.put("/:accountId/update", updateOne);
accountR.delete("/:accountId/delete", deleteOne);

export default accountR;
