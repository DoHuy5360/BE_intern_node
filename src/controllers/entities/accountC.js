import { bcryptEncoder } from "../../script/enScriptHandler.js";
import { getTimeZ } from "../../script/timeProvider.js";
import { uuidPrefix } from "../../script/IdProvider.js";
import CRUDTemplate from "../../database/crudTemplate.js";

const accountCRUDTemplate = new CRUDTemplate("account");

const showAll = async (req, res) => {
	res.json(await accountCRUDTemplate.readAll());
};

const showOne = async (req, res) => {
	const accountId = req.params.accountId;
	res.json(await accountCRUDTemplate.readById(accountId));
};

const updateOne = async (req, res) => {
	const { accountEmail, accountPassword, accountRole } = req.body;
	const accountId = req.params.accountId;
	res.json(
		await accountCRUDTemplate.updateById(accountId, {
			account_email: accountEmail,
			account_password: bcryptEncoder(accountPassword),
			account_role: accountRole,
		})
	);
};
const deleteOne = async (req, res) => {
	const accountId = req.params.accountId;
	res.json(await accountCRUDTemplate.deleteById(accountId));
};
const createOne = async (req, res) => {
	//* ::INTEGER ( Varchar -> int )
	const { accountEmail, accountPassword, accountRole } = req.body;
	res.json(
		await accountCRUDTemplate.create({
			account_id: uuidPrefix("TK"),
			account_email: accountEmail,
			account_password: bcryptEncoder(accountPassword),
			account_role: accountRole,
			create_at: getTimeZ(),
			update_at: getTimeZ(),
		})
	);
};
const method3 = (req, res) => {};
const method4 = (req, res) => {};

export { accountCRUDTemplate, showAll, showOne, updateOne, deleteOne, createOne };
