import { getTimeZ } from "../../script/timeProvider.js";
import { uuidPrefix } from "../../script/IdProvider.js";
import CRUDTemplate from "../../database/crudTemplate.js";
import pool from "../../database/connect.js";

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
const getAllWorkSchedule = (req, res) => {
	pool.query(
		`
	SELECT e.employee_id, employee_name,
		employee_phone, employee_avatar,
		employee_position, work_schedule_plan,
		work_schedule_departure,work_schedule_destination,
		w.work_schedule_time_in, w.work_schedule_time_out,
		work_schedule_place, work_schedule_color,
		work_schedule_id, headquarter_name,
		headquarter_address 
	FROM employee e, work_schedule w, headquarter h 
	WHERE e.employee_id = w.employee_id 
	AND e.headquarter_id = h.headquarter_id
	AND e.employee_name NOT LIKE 'null'
	LIMIT 10
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

const getAllWorkScheduleByTimeProvided = (req, res) => {
	const month = req.params.month;
	const year = req.params.year;
	pool.query(
		`
	SELECT e.employee_id, employee_name,
		employee_phone, employee_avatar,
		employee_position, work_schedule_plan,
		work_schedule_departure,work_schedule_destination,
		w.work_schedule_time_in, w.work_schedule_time_out,
		work_schedule_place, work_schedule_color,
		work_schedule_id, headquarter_name,
		headquarter_address 
	FROM employee e, work_schedule w, headquarter h 
	WHERE e.employee_id = w.employee_id 
	AND e.headquarter_id = h.headquarter_id
	AND e.employee_name NOT LIKE 'null'
	AND EXTRACT(MONTH FROM work_schedule_time_in::TIMESTAMP) = '${month}'
    AND EXTRACT(YEAR FROM work_schedule_time_in::TIMESTAMP) = '${year}'
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

export { showAll, showOne, updateOne, deleteOne, createOne, getAllWorkSchedule, getAllWorkScheduleByTimeProvided };
