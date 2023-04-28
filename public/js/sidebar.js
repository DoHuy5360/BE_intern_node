import { getDashboardData, getListUser } from "./utilities/requestDataPage.js";

const bodyContent = document.querySelector("#content-body");
const navigateLinks = document.querySelectorAll(".navigate_link");
navigateLinks.forEach((link) => {
	link.addEventListener("click", async (e) => {
		const dataLink = link.getAttribute("data-link");
		switch (dataLink) {
			case "dashboard":
				getDashboardData();
				break;
			case "employee":
				fetch("/list/employee", {})
					.then((res) => res.text())
					.then((data) => {
						bodyContent.innerHTML = data;
						getListUser();
					});
				break;
		}
	});
});
