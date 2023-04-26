import { Router } from "express";
import { showAll, showOne, updateOne, deleteOne, createOne } from "../../controllers/entities/employeeC.js";

const employeeR = Router();

employeeR.get("/", showAll);
employeeR.get("/:employeeId", showOne);
employeeR.post("/create", createOne);
employeeR.put("/:employeeId/update", updateOne);
employeeR.delete("/:employeeId/delete", deleteOne);

export default employeeR;
