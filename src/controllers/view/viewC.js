const login = (req, res) => {
	res.render("login", { title: "Login", layout: "regular" });
};

const loginPost = (req, res) => {
	res.cookie("access_token", "your_access_token", { maxAge: 900000, httpOnly: true });
};

const admin = (req, res) => {
	res.render("admin", { title: "Admin", layout: "main" });
};

const employee = (req, res) => {
	res.render("employee", { title: "View employees", layout: false });
};

export { login, loginPost, admin, employee };
