import jwt from "jsonwebtoken";
function verifyJWT(token) {
	const decoded = jwt.verify(token, process.env.JWT_KEY, { ignoreExpiration: true });
	console.log(decoded);
	const expirationTime = decoded.exp;
	const currentTime = Math.floor(Date.now() / 1000);
	const result = {
		isExpires: expirationTime && expirationTime < currentTime ? false : true,
		content: decoded,
	};
	return result;
}
function generateJWT(payload, expire) {
	const options = {
		expiresIn: expire,
	};
	return jwt.sign(payload, process.env.JWT_KEY, options);
}
export { generateJWT, verifyJWT };
