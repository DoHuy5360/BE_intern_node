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
	res.render("employee", { title: "View employees", layout: false });
};

const getDashboard = (req, res) => {
	res.render("dashboard", { title: "Dashboard", layout: "main" });
};
const getEmployee = (req, res) => {
	res.render("employee", { title: "Employee", layout: "main" });
};

export { login, loginPost, admin, getDashboard, postDashboard, postEmployee, getEmployee };
