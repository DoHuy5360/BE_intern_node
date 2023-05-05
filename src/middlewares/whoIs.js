import { verifyJWT } from "../jwt/jwtHandler.js";

function whoIs(req, res, next) {
	try {
		const token = req.cookies.token || req.headers["authorization"].split(" ")[1];
		const { isVerify, verifyConditions, content } = verifyJWT(token);
		if (isVerify) {
			req.alias = content.accountRole;
			switch (content.accountRole) {
				case "Admin":
					req.layout = "admin";
					break;
				case "User":
					req.layout = "user";
					break;
				default:
					break;
			}
			next();
		} else {
			console.log(verifyConditions);
		}
	} catch (error) {
		console.log("whoIs.js: ", "Token Expired");
		res.send("Token Expired");
	}
}
export default whoIs;
