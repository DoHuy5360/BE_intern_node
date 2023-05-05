import { verifyJWT } from "../../jwt/jwtHandler.js";

const adminAuthorization = (req, res, next) => {
	const roles = ["Admin"];
	handleRequest(req, next, res, roles);
};
const userAuthorization = (req, res, next) => {
	const roles = ["Admin", "User"];
	handleRequest(req, next, res, roles);
};
const userAuthorizationReloadPage = (req, res, next) => {
	const roles = ["Admin", "User"];
	const { token } = req.cookies;
	req.headers.authorization = `Bearer ${token}`;
	//todo: create multiple middleware
	handleRequest(req, next, res, roles);
};

function handleRequest(req, next, res, roles) {
	const bearer = req.headers["authorization"];
	if (bearer) {
		const token = bearer.split(" ")[1];
		try {
			const { isExpires, content } = verifyJWT(token);
			if (isExpires) {
				if (roles.includes(content.accountRole)) {
					// req.headers["Authorization"] = `Bearer ${token}`;
					next();
				} else {
					res.send("Invalid Role");
				}
			} else {
				res.send("Token Expired");
			}
		} catch (err) {
			res.send(err.toString());
		}
	} else {
		res.send("Missing Token");
	}
}

function adminAuthorize(req, res, next) {
	if (req.alias === "Admin") {
		next();
	}
}
function userAuthorize(req, res, next) {
	if (req.alias === "User") {
		next();
	}
}

export { adminAuthorization, userAuthorization, userAuthorizationReloadPage, adminAuthorize, userAuthorize };
