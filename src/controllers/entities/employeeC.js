import { bcryptEncoder } from "../../script/enScriptHandler.js";
import { getTimeZ } from "../../script/timeProvider.js";
import { uuidPrefix } from "../../script/IdProvider.js";
import CRUDTemplate from "../../database/curdTemplate.js";
import { accountCURDTemplate } from "./accountC.js";
import pool from "../../database/connect.js";

const employeeCRUDTemplate = new CRUDTemplate("employee");

const showAll = async (req, res) => {
	res.json(await employeeCRUDTemplate.readAll());
};

const showOne = async (req, res) => {
	const employeeId = req.params.employeeId;
	res.json(await employeeCRUDTemplate.readById(employeeId));
};

const updateOne = async (req, res) => {
	const { headquarterId, employeeName, employeePhone, employeeAddress, employeeGender, employeePosition, employeeSalary } = req.body;
	const employeeId = req.params.employeeId;
	res.json(
		await employeeCRUDTemplate.updateById(employeeId, {
			headquarter_id: headquarterId,
			employee_name: employeeName,
			employee_phone: employeePhone,
			employee_address: employeeAddress,
			employee_gender: employeeGender,
			employee_position: employeePosition,
			employee_salary: employeeSalary + "::INTEGER",
		})
	);
};
const deleteOne = async (req, res) => {
	const employeeId = req.params.employeeId;
	res.json(await employeeCRUDTemplate.deleteById(employeeId));
};
const createOne = async (req, res) => {
	//* ::INTEGER ( Varchar -> int )
	const { accountEmail, accountPassword, accountRole, headquarterId, employeePosition } = req.body;

	await employeeCRUDTemplate.create({
		employee_id: uuidPrefix("NV"),
		employee_position: employeePosition,
		headquarter_id: headquarterId,
		create_at: getTimeZ(),
		update_at: getTimeZ(),
	});
	await accountCURDTemplate.create({
		account_id: uuidPrefix("TK"),
		account_role: accountRole,
		account_email: accountEmail,
		account_password: bcryptEncoder(accountPassword),
		create_at: getTimeZ(),
		update_at: getTimeZ(),
	});

	res.send("Success");
};
const readAllInfo = (req, res) => {
	pool.query(
		`
		SELECT employee_id, headquarter_address,
		e.account_id, e.headquarter_id, 
		employee_avatar, employee_name, 
		employee_phone, employee_address, 
		employee_gender, employee_position, 
		employee_salary, account_email, 
		account_role, headquarter_name  
		FROM employee e, account a , headquarter h 
		WHERE e.account_id = a.account_id 
		AND e.headquarter_id = h.headquarter_id
		LIMIT 30
	`,
		(err, records) => {
			if (err) {
				console.log(err);
				return;
			}

			res.json({
				status: 200,
				numbers: records.rows.length,
				records: records.rows,
			});
		}
	);
};
const method4 = (req, res) => {};

export { showAll, showOne, updateOne, deleteOne, createOne, readAllInfo };
