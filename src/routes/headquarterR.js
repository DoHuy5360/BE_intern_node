import { Router } from "express";
import { showAll, showOne, updateOne, deleteOne, createOne } from "../controllers/headquarterC.js";

const headquarterR = Router();

headquarterR.get("/", showAll);
headquarterR.get("/:headquarterId", showOne);
headquarterR.post("/create", createOne);
headquarterR.put("/:headquarterId/update", updateOne);
headquarterR.delete("/:headquarterId/delete", deleteOne);

export default headquarterR;
