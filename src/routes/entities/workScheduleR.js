import { Router } from "express";
import { showAll, showOne, updateOne, deleteOne, createOne } from "../../controllers/entities/workScheduleC.js";

const workScheduleR = Router();

workScheduleR.get("/", showAll);
workScheduleR.get("/:workScheduleId", showOne);
workScheduleR.post("/create", createOne);
workScheduleR.put("/:workScheduleId/update", updateOne);
workScheduleR.delete("/:workScheduleId/delete", deleteOne);

export default workScheduleR;
