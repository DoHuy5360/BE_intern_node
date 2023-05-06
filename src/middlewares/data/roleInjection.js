function injectAllRoles(req, res, next) {
	req.roles = [{ role_name: "Admin" }, { role_name: "User" }];
	next();
}

export { injectAllRoles };
