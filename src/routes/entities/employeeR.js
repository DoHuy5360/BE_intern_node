import { Router } from "express";
import { showAll, showOne, updateOne, deleteOne, createOne, readAllInfo, getAllName } from "../../controllers/entities/employeeC.js";

const employeeR = Router();

employeeR.get("/", showAll);
employeeR.get("/:employeeId/show", showOne);
employeeR.post("/create", createOne);
employeeR.put("/:employeeId/update", updateOne);
employeeR.delete("/:employeeId/delete", deleteOne);
employeeR.get("/all-information", readAllInfo);
employeeR.get("/all-name", getAllName);
export default employeeR;
