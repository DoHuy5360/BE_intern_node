import pool from "../../database/connect.js";

async function injectAllEmployees(req, res, next) {
	pool.query("select employee_id, employee_name from employee where employee_name not like 'null' limit 50", (err, records) => {
		if (err) {
			console.log(err);
			return;
		}
		req.allEly = records.rows;
		next();
	});
}

export { injectAllEmployees };
