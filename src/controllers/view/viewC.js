const login = (req, res) => {
	res.render("login", { title: "Login", layout: "regular" });
};

const loginPost = (req, res) => {
	res.cookie("access_token", "your_access_token", { maxAge: 900000, httpOnly: true });
};

const home = (req, res) => {
	res.render("home", { title: "Home", layout: "main" });
};

export { login, loginPost, home };
