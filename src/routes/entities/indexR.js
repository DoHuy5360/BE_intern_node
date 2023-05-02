import { Router } from "express";
import pool from "../../database/connect.js";

const indexR = Router();

indexR.get("/table/records", (req, res) => {
	pool.query(
		`
		SELECT relname as table, COALESCE(NULLIF(reltuples::bigint, -1), 0) as record
		FROM pg_class 
		WHERE relkind = 'r' 
		AND relname NOT LIKE 'pg_%' 
		AND relname NOT LIKE 'sql_%' 
		AND relname not like '%tray'
		ORDER BY record DESC
		`,
		(err, records) => {
			if (err) {
				console.log(e);
				return;
			}
			res.send(records.rows);
		}
	);
});
indexR.get("/table/headquarter/employee/count", (req, res) => {
	pool.query(
		`
		SELECT headquarter_name, COALESCE(count(employee_id)) AS employee_count
		FROM headquarter h
		LEFT JOIN employee e
		ON e.headquarter_id = H.headquarter_id
		GROUP BY headquarter_name
		ORDER BY employee_count DESC
		`,
		(err, records) => {
			if (err) {
				console.log(e);
				return;
			}
			res.send(records.rows);
		}
	);
});
export default indexR;
