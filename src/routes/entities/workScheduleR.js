import { Router } from "express";
import { showAll, showOne, updateOne, deleteOne, createOne, getAllWorkSchedule, getAllWorkScheduleByTimeProvided } from "../../controllers/entities/workScheduleC.js";

const workScheduleR = Router();

workScheduleR.get("/", showAll);
workScheduleR.get("/:workScheduleId/show", showOne);
workScheduleR.post("/create", createOne);
workScheduleR.put("/:workScheduleId/update", updateOne);
workScheduleR.delete("/:workScheduleId/delete", deleteOne);
workScheduleR.get("/all-workschedule", getAllWorkSchedule);
workScheduleR.get("/:year/:month/all-workschedule", getAllWorkScheduleByTimeProvided);

export default workScheduleR;
