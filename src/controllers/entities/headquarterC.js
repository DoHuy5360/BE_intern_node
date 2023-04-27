import { getTimeZ } from "../../script/timeProvider.js";
import { uuidPrefix } from "../../script/IdProvider.js";
import CRUDTemplate from "../../database/curdTemplate.js";

const headquarterCRUDTemplate = new CRUDTemplate("headquarter");

const showAll = async (req, res) => {
	res.json(await headquarterCRUDTemplate.readAll());
};

const showOne = async (req, res) => {
	const headquarterId = req.params.headquarterId;
	res.json(await headquarterCRUDTemplate.readById(headquarterId));
};

const updateOne = async (req, res) => {
	const { headquarterName, headquarterAddress } = req.body;
	const headquarterId = req.params.headquarterId;
	res.json(
		await headquarterCRUDTemplate.updateById(headquarterId, {
			headquarter_name: headquarterName,
			headquarter_address: headquarterAddress,
		})
	);
};
const deleteOne = async (req, res) => {
	const headquarterId = req.params.headquarterId;
	res.json(await headquarterCRUDTemplate.deleteById(headquarterId));
};
const createOne = async (req, res) => {
	//* ::INTEGER ( Varchar -> int )
	const { headquarterName, headquarterAddress } = req.body;
	res.json(
		await headquarterCRUDTemplate.create({
			headquarter_id: uuidPrefix("TS"),
			headquarter_name: headquarterName,
			headquarter_address: headquarterAddress,
			create_at: getTimeZ(),
			update_at: getTimeZ(),
		})
	);
};
const method3 = (req, res) => {};
const method4 = (req, res) => {};

export { showAll, showOne, updateOne, deleteOne, createOne };