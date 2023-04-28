import { Router } from "express";
import { admin, login, loginPost, employee, postDashboard, getDashboard, getEmployee } from "../../controllers/view/viewC.js";
import { userAuthorization } from "../../middlewares/middlewarePort.js";
import { userAuthorizationReloadPage } from "../../middlewares/auth/authorization.js";

const viewR = Router();

viewR.get("/login", login);
viewR.post("/login", loginPost);
viewR.post("/admin", userAuthorization, admin);
viewR.get("/admin", userAuthorizationReloadPage, admin);

viewR.post("/dashboard", postDashboard);
viewR.get("/dashboard", getDashboard);
viewR.get("/employee", getEmployee);

viewR.get("/list/employee", employee);

export { viewR };
