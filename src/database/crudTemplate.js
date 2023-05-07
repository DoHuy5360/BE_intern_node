import pool from "./connect.js";

class CRUDTemplate {
	constructor(entityName) {
		this.name = entityName;
	}
	handler(raw) {
		return new Promise((resolve, reject) => {
			pool.query(raw, (err, records) => {
				err ? console.log(err) : resolve(records);
			});
		});
	}
	async create(objData) {
		const result = await this.handler(
			`INSERT INTO 
            ${this.name} (
                ${formatKeyBodyCreateQuery(Object.keys(objData))}
            ) 
            VALUES (
                ${formatValueBodyCreateQuery(Object.values(objData))}
                )`,
			(records) => {
				return records.rowCount.toString();
			}
		);
		return {
			status: 200,
			created: result.rowCount,
		};
	}
	async readAll() {
		const result = await this.handler(`SELECT * FROM ${this.name} limit 10`);
		return {
			status: 200,
			numbers: result.rows.length,
			records: result.rows,
		};
	}
	async readById(id) {
		const result = await this.handler(`SELECT * FROM ${this.name} WHERE ${this.name}_id = '${id}' LIMIT 1`);
		return {
			status: 200,
			records: result.rows,
		};
	}
	async updateById(id, objData) {
		const result = await this.handler(
			`UPDATE 
                ${this.name} 
            SET 
                ${formatBodyUpdateQuery(objData)}
            WHERE 
                ${this.name}_id='${id}'
            `
		);
		return {
			status: 200,
			updated: result.rowCount,
		};
	}
	async deleteById(id) {
		const result = await this.handler(`DELETE FROM ${this.name} WHERE ${this.name}_id='${id}'`);
		return {
			status: 200,
			deleted: result.rowCount,
		};
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
function formatKeyBodyCreateQuery(arrayData) {
	let tray = "";
	arrayData.forEach((e) => {
		tray += e + ",";
	});
	return tray.slice(0, -1);
}
function formatValueBodyCreateQuery(arrayData) {
	let tray = "";
	arrayData.forEach((e) => {
		tray += `'${e}',`;
	});
	return tray.slice(0, -1);
}

export default CRUDTemplate;
