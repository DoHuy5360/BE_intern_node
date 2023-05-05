import jwt from "jsonwebtoken";
function verifyJWT(token) {
	let decoded;
	const verifyConditions = {
		isLive: false,
		isMatchSign: true,
	};
	try {
		decoded = jwt.verify(token, process.env.JWT_KEY, { ignoreExpiration: true });
	} catch (error) {
		verifyConditions.isMatchSign = false;
	}
	console.log(decoded);
	const expirationTime = decoded.exp;
	const currentTime = Math.floor(Date.now() / 1000);
	verifyConditions.isLive = expirationTime && expirationTime < currentTime ? false : true;
	return {
		isVerify: verifyConditions.isLive || verifyConditions.isMatchSign,
		verifyConditions,
		content: decoded,
	};
}
function generateJWT(payload, expire) {
	const options = {
		expiresIn: expire,
	};
	return jwt.sign(payload, process.env.JWT_KEY, options);
}
export { generateJWT, verifyJWT };
