import { Router } from "express";
import { showAll, showOne, updateOne, deleteOne, createOne, updateUserAccount } from "../../controllers/entities/accountC.js";

const accountR = Router();

accountR.get("/", showAll);
accountR.get("/:accountId/show", showOne);
accountR.post("/create", createOne);
accountR.put("/:accountId/update", updateOne);
accountR.delete("/:accountId/delete", deleteOne);
accountR.put("/:accountId/update/user", updateUserAccount);

export default accountR;
