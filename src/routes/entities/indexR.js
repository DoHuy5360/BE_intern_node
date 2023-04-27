import { Router } from "express";
import pool from "../../database/connect.js";

const indexR = Router();

indexR.get("/table/records", (req, res) => {
	pool.query(
		`
		SELECT relname as table, COALESCE(NULLIF(reltuples::bigint, -1), 0) as record
		FROM pg_class 
		WHERE relkind = 'r' AND relname NOT LIKE 'pg_%' AND relname NOT LIKE 'sql_%' 
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
		select headquarter_name, count(employee_id) as employee_count
		from headquarter h, employee e
		where e.headquarter_id = h.headquarter_id
		group by headquarter_name
		order by employee_count DESC
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
