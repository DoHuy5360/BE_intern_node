import { Router } from "express";

const indexR = Router();

indexR.get("/", (req, res) => {
	res.send("Hell");
});

export default indexR;
