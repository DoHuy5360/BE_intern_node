import { Router } from "express";
import { showAll, showOne, updateOne, deleteOne, createOne, getHeadquarterAndEmployee } from "../../controllers/entities/headquarterC.js";
const headquarterR = Router();

headquarterR.get("/", showAll);
headquarterR.get("/:headquarterId/show", showOne);
headquarterR.post("/create", createOne);
headquarterR.put("/:headquarterId/update", updateOne);
headquarterR.delete("/:headquarterId/delete", deleteOne);
headquarterR.get("/all-info", getHeadquarterAndEmployee);

export default headquarterR;
