import pool from "../database/connect.js";

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

export { showAll, showOne };
