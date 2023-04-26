import pool from "../../database/connect.js";
import { generateJWT } from "../../jwt/jwtHandler.js";
import { bcryptCompare } from "../../script/enScriptHandler.js";

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

			if (record !== undefined) {
				const { account_id, account_role, account_password } = record;
				if (bcryptCompare(password, account_password)) {
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
					res.json({
						status: 400,
						message: "Login Fail",
					});
				}
			} else {
				res.json({
					status: 400,
					message: "Account not existing",
				});
			}
		}
	);
};

export default authentication;
