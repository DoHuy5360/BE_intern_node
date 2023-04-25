import pool from "../database/connect.js";
import { bcryptEncoder } from "../script/enScriptHandler.js";
import { getTimeZ } from "../script/timeProvider.js";
import { uuidPrefix } from "../script/IdProvider.js";

function logAndSkip(err) {
	if (err) {
		console.error(err);
		return;
	}
}

const showAll = (req, res) => {
	pool.query("SELECT * FROM account", (err, records) => {
		logAndSkip(err);
		res.json(records.rows);
	});
};

const showOne = (req, res) => {
	const accountId = req.params.accountId;
	pool.query(`SELECT * FROM account WHERE account_id = '${accountId}' LIMIT 1`, (err, records) => {
		logAndSkip(err);
		res.json(records.rows[0]);
	});
};

const updateOne = (req, res) => {
	const { accountEmail, accountPassword, accountRole } = req.body;
	const accountId = req.params.accountId;
	pool.query(
		`UPDATE 
			account 
		SET 
			account_email='${accountEmail}',
			account_password='${bcryptEncoder(accountPassword)}',
			account_role='${accountRole}'
		WHERE 
			account_id='${accountId}'
		`,
		(err, records) => {
			logAndSkip(err);
			res.send(records.rowCount.toString());
		}
	);
};
const deleteOne = (req, res) => {
	const accountId = req.params.accountId;
	pool.query(`DELETE FROM account WHERE account_id='${accountId}'`, (err, records) => {
		logAndSkip(err);
		res.send(records.rowCount.toString());
	});
};
const createOne = (req, res) => {
	const { accountEmail, accountPassword, accountRole } = req.body;
	pool.query(
		`INSERT INTO 
		account (
			account_id,
			account_email,
			account_password,
			account_role,
			create_at,
			update_at
		) 
		VALUES (
			'${uuidPrefix("TK")}',
			'${accountEmail}',
			'${bcryptEncoder(accountPassword)}',
			'${accountRole}',
			'${getTimeZ()}',
			'${getTimeZ()}'
			)`,
		(err, records) => {
			logAndSkip(err);
			res.send(records.rowCount.toString());
		}
	);
};
const method3 = (req, res) => {};
const method4 = (req, res) => {};

export { showAll, showOne, updateOne, deleteOne, createOne };
