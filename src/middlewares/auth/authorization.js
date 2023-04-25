import { verifyJWT } from "../../jwt/jwtHandler.js";

const authorization = (req, res, next) => {
	const bearer = req.headers["authorization"];
	if (bearer) {
		const token = bearer.split(" ")[1];
		try {
			const { isExpires, content } = verifyJWT(token);
			console.log(content);
			if (isExpires) {
				if ((content.account_role = "Manager")) {
					next();
				} else {
					console.log("Invalid Role");
				}
			} else {
				console.log("Token Expired");
			}
		} catch (err) {
			console.error(err);
		}
	} else {
		console.log("Missing Token");
	}
};

export default authorization;
