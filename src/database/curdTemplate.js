import pool from "./connect.js";

class CRUDTemplate {
	constructor(entityName) {
		this.name = entityName;
	}
	handler(raw, callback) {
		pool.query(raw, (err, records) => {
			if (err) {
				console.log(err);
				return;
			}
			callback(records);
		});
	}
	create(objData) {
		this.handler(
			`INSERT INTO 
            ${this.name} (
                ${formatBodyCreateQuery(Object.keys(objData))}
            ) 
            VALUES (
                ${formatBodyCreateQuery(Object.values(objData))}
                )`,
			(records) => {
				return records.rowCount.toString();
			}
		);
	}
	readAll(callback) {
		this.handler(`SELECT * FROM ${this.name}`, (records) => {
			callback(records.rows);
		});
	}
	readById(id) {
		this.handler(`SELECT * FROM ${this.name} WHERE ${this.name}_id = '${id}' LIMIT 1`, (records) => {
			return records.rows[0];
		});
	}
	updateById(id, objData) {
		this.handler(
			`UPDATE 
                ${this.name} 
            SET 
                ${formatBodyUpdateQuery(objData)}
            WHERE 
                ${this.name}_id='${id}'
            `,
			(records) => {
				return records.rowCount.toString();
			}
		);
	}
	deleteById(id) {
		this.handler(`DELETE FROM ${this.name} WHERE ${this.name}_id='${id}'`, (records) => {
			return records.rowCount.toString();
		});
	}
}
function formatBodyUpdateQuery(objData) {
	let sqlBody = "";
	for (const key in objData) {
		const val = objData[key];
		sqlBody += `${key}='${val}',`;
	}
	return sqlBody.slice(0, -1);
}
function formatBodyCreateQuery(arrayData) {
	let tray = "";
	arrayData.forEach((e) => {
		tray += e + ",";
	});
	return tray.slice(0, -1);
}

export default CRUDTemplate;
