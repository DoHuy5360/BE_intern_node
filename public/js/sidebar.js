import { requestListEmployee } from "./utilities/requestListEmployee.js";

const bodyContent = document.querySelector("#content-body");
const navigateLinks = document.querySelectorAll(".navigate_link");
navigateLinks.forEach((link) => {
	link.addEventListener("click", async (e) => {
		if (link.getAttribute("data-link") === "employee") {
			fetch("/list/employee", {})
				.then((res) => res.text())
				.then((data) => {
					bodyContent.innerHTML = data;
					requestListEmployee();
				});
		}
	});
});
