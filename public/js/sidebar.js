import { getDashboardData } from "./utilities/postDataPage/postDashboard.js";
import { getListUser } from "./utilities/postDataPage/postEmployee.js";

const navigateLinks = document.querySelectorAll(".navigate_link");
navigateLinks.forEach((link) => {
	link.addEventListener("click", async (e) => {
		const dataLink = link.getAttribute("data-link");
		switch (dataLink) {
			case "dashboard":
				getDashboardData();
				break;
			case "employee":
				getListUser();
				break;
		}
	});
});
