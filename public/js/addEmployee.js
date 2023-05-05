import { postRequest } from "./utilities/request.js";

const oneAddForm = document.querySelector("#add-one-form");
oneAddForm.addEventListener("submit", async (e) => {
	e.preventDefault();

	const isCreated = await postRequest("/api/v2/employee/create", {
		accountEmail: oneAddForm.querySelector("[name='email']").value,
		accountPassword: oneAddForm.querySelector("[name='password']").value,
		accountRole: oneAddForm.querySelector("[name='role']").value,
		headquarterId: oneAddForm.querySelector("[name='headquarter']").value,
		employeePosition: oneAddForm.querySelector("[name='position']").value,
	});
	if (isCreated) {
		alert("Success");
	}
});
