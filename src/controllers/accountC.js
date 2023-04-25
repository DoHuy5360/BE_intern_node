import pool from "../database/connect.js";
const showAll = (req, res) => {
	pool.query("SELECT * FROM account", (err, records) => {
		if (err) {
			console.error(err);
			return;
		}
		res.json(records.rows);
	});
};

export { showAll };
