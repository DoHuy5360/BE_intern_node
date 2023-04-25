import bcrypt from "bcryptjs";

function bcryptEncoder(raw) {
	const saltRounds = 10;
	const salt = bcrypt.genSaltSync(saltRounds);
	return bcrypt.hashSync(raw, salt);
}
function bcryptCompare(raw, hashed) {
	return bcrypt.compareSync(raw, hashed);
}

export { bcryptEncoder, bcryptCompare };
