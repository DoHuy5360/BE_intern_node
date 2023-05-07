import { bcryptEncoder } from "../../script/enScriptHandler.js";
import { getTimeZ } from "../../script/timeProvider.js";
import { uuidPrefix } from "../../script/IdProvider.js";
import CRUDTemplate from "../../database/crudTemplate.js";
import { accountCRUDTemplate } from "./accountC.js";
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

	const accountId = uuidPrefix("TK");
	const account = await accountCRUDTemplate.create({
		account_id: accountId,
		account_role: accountRole,
		account_email: accountEmail,
		account_password: bcryptEncoder(accountPassword),
		create_at: getTimeZ(),
		update_at: getTimeZ(),
	});

	const employee = await employeeCRUDTemplate.create({
		employee_id: uuidPrefix("NV"),
		account_id: accountId,
		headquarter_id: headquarterId,
		employee_position: employeePosition,
		create_at: getTimeZ(),
		update_at: getTimeZ(),
	});

	if (employee.created === 1 && account.created === 1) {
		res.send({
			status: 200,
			created: 1,
		});
	} else {
		res.send({
			status: 400,
			employee_created: employee.created,
			account_created: account.created,
		});
	}
};
const getAllName = (req, res) => {
	pool.query(
		`
	SELECT employee_id,employee_name
	FROM employee
	WHERE employee_name NOT LIKE 'null'
	`,
		(err, records) => {
			if (err) {
				console.log(err);
				return;
			}
			res.json({
				status: 200,
				records: records.rows,
			});
		}
	);
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

export { employeeCRUDTemplate, showAll, showOne, updateOne, deleteOne, createOne, getAllName, readAllInfo };
