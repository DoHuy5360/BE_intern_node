import { bcryptEncoder } from "../script/enScriptHandler.js";
import { getTimeZ } from "../script/timeProvider.js";
import { uuidPrefix } from "../script/IdProvider.js";
import CRUDTemplate from "../database/curdTemplate.js";
import { accountCURDTemplate } from "./accountC.js";

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

	res.json();
};
const method3 = (req, res) => {};
const method4 = (req, res) => {};

export { showAll, showOne, updateOne, deleteOne, createOne };
