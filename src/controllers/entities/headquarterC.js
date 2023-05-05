import { getTimeZ } from "../../script/timeProvider.js";
import { uuidPrefix } from "../../script/IdProvider.js";
import CRUDTemplate from "../../database/crudTemplate.js";
import pool from "../../database/connect.js";

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
const getHeadquarterAndEmployee = (req, res) => {
	pool.query(
		`
		SELECT h.headquarter_id, headquarter_name, headquarter_address, 
		COALESCE(COUNT(employee_id)) AS number_of_employees
			FROM headquarter h
			LEFT JOIN employee e
			ON e.headquarter_id = h.headquarter_id
			GROUP BY h.headquarter_id, headquarter_name, headquarter_address
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
const method4 = (req, res) => {};

export { headquarterCRUDTemplate, showAll, showOne, updateOne, deleteOne, createOne, getHeadquarterAndEmployee };
