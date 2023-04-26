import { Router } from "express";
import { home, login, loginPost } from "../../controllers/view/viewC.js";
import { userAuthorization } from "../../middlewares/middlewarePort.js";
import { userAuthorizationReloadPage } from "../../middlewares/auth/authorization.js";

const viewR = Router();

viewR.get("/login", login);
viewR.post("/login", loginPost);
viewR.post("/home", userAuthorization, home);
viewR.get("/home", userAuthorizationReloadPage, home);

export { viewR };
