import { Router } from "express";

const loginR = Router();

loginR.post("/", (req, res) => {
	res.send("Hell");
});

export default loginR;
