import { Router } from "express";
import { admin, postEmployee, postDashboard, getDashboard, getEmployee, getSchedule, postSchedule, getHeadquarter, postHeadquarter, getAddemployee, postAddEmployee, postScheduleV2, getScheduleV2 } from "../../controllers/view/viewC.js";
import { userAuthorization } from "../../middlewares/middlewarePort.js";
import { userAuthorizationReloadPage } from "../../middlewares/auth/authorize.js";
import { injectAllHeadquarters } from "../../middlewares/data/headquarterInjection.js";
import { injectAllRoles } from "../../middlewares/data/roleInjection.js";
import { injectAllEmployees } from "../../middlewares/data/employeeInjection.js";

const viewR = Router();

viewR.post("/admin", userAuthorization, admin);
viewR.get("/admin", userAuthorizationReloadPage, admin);

viewR.get("/dashboard", getDashboard);
viewR.get("/employee", getEmployee);
viewR.get("/add/employee", injectAllHeadquarters, injectAllRoles, getAddemployee);
viewR.get("/schedule", getSchedule);
viewR.get("/scheduleV2", injectTime, injectAllEmployees, getScheduleV2);
viewR.get("/headquarter", getHeadquarter);

viewR.post("/dashboard", postDashboard);
viewR.post("/employee", postEmployee);
viewR.post("/add/employee", injectAllHeadquarters, injectAllRoles, postAddEmployee);
viewR.post("/schedule", postSchedule);
viewR.post("/scheduleV2", injectTime, injectAllEmployees, postScheduleV2);
viewR.post("/headquarter", postHeadquarter);

function injectTime(req, res, next) {
	const date = new Date();
	const currentYear = date.getFullYear();
	const currentMonth = date.getMonth();
	const dateArr = [
		{ name: "January", days: 31 },
		{ name: "February", days: getTotalDaysInMonth(1, currentYear) },
		{ name: "March", days: 31 },
		{ name: "April", days: 30 },
		{ name: "May", days: 31 },
		{ name: "June", days: 30 },
		{ name: "July", days: 31 },
		{ name: "August", days: 31 },
		{ name: "September", days: 30 },
		{ name: "October", days: 31 },
		{ name: "November", days: 30 },
		{ name: "December", days: 31 },
	];
	const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	const numberDays = dateArr[currentMonth].days;
	const daysWeekArr = [];
	for (let day = 1; day <= numberDays; day++) {
		const dayIdx = new Date(`${currentYear}-${currentMonth + 1}-${day}`).getDay();
		daysWeekArr.push(daysOfWeek[dayIdx]);
	}
	req.numberDays = numberDays;
	req.daysWeekArr = daysWeekArr;
	next();
}
function getTotalDaysInMonth(month, year) {
	const firstDay = new Date(Date.UTC(year, month, 1));
	const nextMonth = new Date(Date.UTC(year, month + 1, 1));
	const totalDays = Math.floor((nextMonth - firstDay) / (1000 * 60 * 60 * 24));
	return totalDays;
}
export { viewR };
