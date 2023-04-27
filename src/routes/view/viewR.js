import { Router } from "express";
import { admin, login, loginPost } from "../../controllers/view/viewC.js";
import { userAuthorization } from "../../middlewares/middlewarePort.js";
import { userAuthorizationReloadPage } from "../../middlewares/auth/authorization.js";

const viewR = Router();

viewR.get("/login", login);
viewR.post("/login", loginPost);
viewR.post("/admin", userAuthorization, admin);
viewR.get("/admin", userAuthorizationReloadPage, admin);

export { viewR };