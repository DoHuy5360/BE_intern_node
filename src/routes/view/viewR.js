import { Router } from "express";
import { admin, login, loginPost, postEmployee, postDashboard, getDashboard, getEmployee, getSchedule, postSchedule } from "../../controllers/view/viewC.js";
import { userAuthorization } from "../../middlewares/middlewarePort.js";
import { userAuthorizationReloadPage } from "../../middlewares/auth/authorization.js";

const viewR = Router();

viewR.get("/login", login);
viewR.post("/login", loginPost);
viewR.post("/admin", userAuthorization, admin);
viewR.get("/admin", userAuthorizationReloadPage, admin);

viewR.get("/dashboard", getDashboard);
viewR.get("/employee", getEmployee);
viewR.get("/schedule", getSchedule);

viewR.post("/dashboard", postDashboard);
viewR.post("/employee", postEmployee);
viewR.post("/schedule", postSchedule);

export { viewR };
