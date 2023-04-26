import { getTimeZ } from "../../script/timeProvider.js";
import { uuidPrefix } from "../../script/IdProvider.js";
import CRUDTemplate from "../../database/curdTemplate.js";

const workScheduleCRUDTemplate = new CRUDTemplate("work_schedule");

const showAll = async (req, res) => {
	res.json(await workScheduleCRUDTemplate.readAll());
};

const showOne = async (req, res) => {
	const workScheduleId = req.params.workScheduleId;
	res.json(await workScheduleCRUDTemplate.readById(workScheduleId));
};

const updateOne = async (req, res) => {
	const { workScheduleColor, workSchedulePlan, workSchedulePlace, workScheduleTimeIn, workScheduleTimeOut } = req.body;
	const workScheduleId = req.params.workScheduleId;
	res.json(
		await workScheduleCRUDTemplate.updateById(workScheduleId, {
			workSchedule_color: workScheduleColor,
			workSchedule_plan: workSchedulePlan,
			workSchedule_place: workSchedulePlace,
			workSchedule_timeIn: workScheduleTimeIn,
			workSchedule_timeOut: workScheduleTimeOut,
		})
	);
};
const deleteOne = async (req, res) => {
	const workScheduleId = req.params.workScheduleId;
	res.json(await workScheduleCRUDTemplate.deleteById(workScheduleId));
};
const createOne = async (req, res) => {
	//* ::INTEGER ( Varchar -> int )
	const { workScheduleColor, workSchedulePlan, workSchedulePlace, workScheduleTimeIn, workScheduleTimeOut } = req.body;
	res.json(
		await workScheduleCRUDTemplate.create({
			account_id: uuidPrefix("WS"),
			workSchedule_color: workScheduleColor,
			workSchedule_plan: workSchedulePlan,
			workSchedule_place: workSchedulePlace,
			workSchedule_timeIn: workScheduleTimeIn,
			workSchedule_timeOut: workScheduleTimeOut,
			create_at: getTimeZ(),
			update_at: getTimeZ(),
		})
	);
};
const method3 = (req, res) => {};
const method4 = (req, res) => {};

export { showAll, showOne, updateOne, deleteOne, createOne };
