import { Router } from "express";
import { admin, login, loginPost, postEmployee, postDashboard, getDashboard, getEmployee, getSchedule, postSchedule, getHeadquarter, postHeadquarter, getAddmployee, postAddEmployee } from "../../controllers/view/viewC.js";
import { userAuthorization } from "../../middlewares/middlewarePort.js";
import { userAuthorizationReloadPage } from "../../middlewares/auth/authorize.js";

const viewR = Router();

viewR.post("/admin", userAuthorization, admin);
viewR.get("/admin", userAuthorizationReloadPage, admin);

viewR.get("/dashboard", getDashboard);
viewR.get("/employee", getEmployee);
viewR.get("/add/employee", getAddmployee);
viewR.get("/schedule", getSchedule);
viewR.get("/headquarter", getHeadquarter);

viewR.post("/dashboard", postDashboard);
viewR.post("/employee", postEmployee);
viewR.post("/add/employee", postAddEmployee);
viewR.post("/schedule", postSchedule);
viewR.post("/headquarter", postHeadquarter);

export { viewR };
