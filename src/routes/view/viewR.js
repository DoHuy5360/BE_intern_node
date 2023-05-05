import { Router } from "express";
import { admin, postEmployee, postDashboard, getDashboard, getEmployee, getSchedule, postSchedule, getHeadquarter, postHeadquarter, getAddemployee, postAddEmployee } from "../../controllers/view/viewC.js";
import { userAuthorization } from "../../middlewares/middlewarePort.js";
import { userAuthorizationReloadPage } from "../../middlewares/auth/authorize.js";
import { injectAllHeadquarters } from "../../middlewares/data/headquarterInjection.js";

const viewR = Router();

viewR.post("/admin", userAuthorization, admin);
viewR.get("/admin", userAuthorizationReloadPage, admin);

viewR.get("/dashboard", getDashboard);
viewR.get("/employee", getEmployee);
viewR.get("/add/employee", injectAllHeadquarters, getAddemployee);
viewR.get("/schedule", getSchedule);
viewR.get("/headquarter", getHeadquarter);

viewR.post("/dashboard", postDashboard);
viewR.post("/employee", postEmployee);
viewR.post("/add/employee", injectAllHeadquarters, postAddEmployee);
viewR.post("/schedule", postSchedule);
viewR.post("/headquarter", postHeadquarter);

export { viewR };
