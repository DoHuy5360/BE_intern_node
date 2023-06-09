const login = (req, res) => {
	res.render("login", { title: "Login", layout: "regular" });
};

const loginPost = (req, res) => {
	res.cookie("access_token", "your_access_token", { maxAge: 900000, httpOnly: true });
};

const admin = (req, res) => {
	res.render("admin", { title: "Admin", layout: "main" });
};

const postDashboard = (req, res) => {
	res.render("dashboard", { title: "Dashboard", layout: false });
};
const postEmployee = (req, res) => {
	res.render("employee", { title: "Employees", layout: false });
};
const postAddEmployee = async (req, res) => {
	res.render("addEmployee", { title: "Add Employees", layout: false, headquarters: req.headquarters.records, roles: req.roles });
};
const postSchedule = (req, res) => {
	res.render("schedule", { title: "Schedule", layout: false });
};
const postScheduleV2 = (req, res) => {
	res.render("scheduleV2", { title: "Schedule", layout: false, daysWeekArr: req.daysWeekArr, numberDays: req.numberDays, allEly: req.allEly });
};
const postHeadquarter = (req, res) => {
	res.render("headquarter", { title: "Schedule", layout: false });
};

const getDashboard = (req, res) => {
	res.render("dashboard", { title: "Dashboard", layout: req.layout });
};
const getEmployee = (req, res) => {
	res.render("employee", { title: "Employee", layout: req.layout });
};
const getAddemployee = (req, res) => {
	res.render("addEmployee", { title: "Add Employee", layout: req.layout, headquarters: req.headquarters.records, roles: req.roles });
};
const getSchedule = (req, res) => {
	res.render("schedule", { title: "Schedule", layout: req.layout });
};
const getScheduleV2 = (req, res) => {
	res.render("scheduleV2", { title: "Schedule", layout: req.layout, daysWeekArr: req.daysWeekArr, numberDays: req.numberDays, allEly: req.allEly });
};
const getHeadquarter = (req, res) => {
	res.render("headquarter", { title: "Headquarter", layout: req.layout });
};

export { login, loginPost, admin, getDashboard, postDashboard, postEmployee, getEmployee, postSchedule, getSchedule, postHeadquarter, getHeadquarter, postAddEmployee, getAddemployee, postScheduleV2, getScheduleV2 };
