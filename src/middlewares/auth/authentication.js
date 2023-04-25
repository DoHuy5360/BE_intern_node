import pool from "../../database/connect.js";
import { generateJWT } from "../../jwt/jwtHandler.js";
import bcrypt from "bcryptjs";
const authentication = (req, res, next) => {
	const { email, password } = req.body;

	pool.query(
		`SELECT *
        FROM account 
        WHERE account_email='${email}'
        LIMIT 1
        `,
		(err, records) => {
			if (err) {
				console.error(err);
				return;
			}
			const record = records.rows[0];
			// const saltRounds = 10;

			// const salt = bcrypt.genSaltSync(saltRounds);
			// const hashedPassword = bcrypt.hashSync(password, salt);
			// console.log(hashedPassword);
			const { account_id, account_role, account_password } = record;
			const isMatch = bcrypt.compareSync(password, account_password);
			if (isMatch) {
				const payload = {
					employeeId: account_id,
					accountRole: account_role,
				};
				const token = generateJWT(payload, process.env.JWT_AUTH_EXPIRE_TIME);
				res.json({
					token,
				});
				next();
			} else {
				res.send("Login Fail");
			}
		}
	);
};

export default authentication;
