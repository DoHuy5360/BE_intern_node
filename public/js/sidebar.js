import { getDashboardData } from "./utilities/postDataPage/postDashboard.js";
import { getListUser } from "./utilities/postDataPage/postEmployee.js";
import { getHeadquarterData } from "./utilities/postDataPage/postHeadquarter.js";
import { requestScheduleData } from "./utilities/postDataPage/postSchedule.js";

const navigateLinks = document.querySelectorAll(".navigate_link");
const bodyContent = document.querySelector("#content-body");
navigateLinks.forEach((link) => {
	link.addEventListener("click", async (e) => {
		const dataLink = link.getAttribute("data-link");
		switch (dataLink) {
			case "dashboard":
				const token = localStorage.getItem("token");
				fetch("/view/dashboard", {
					method: "POST",
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
					.then((res) => res.text())
					.then((html) => {
						bodyContent.innerHTML = html;
						window.history.replaceState(null, "", "/view/dashboard");
					})
					.finally(() => {
						getDashboardData();
					});
				break;
			case "employee":
				fetch("/view/employee", {
					method: "POST",
				})
					.then((res) => res.text())
					.then((html) => {
						bodyContent.innerHTML = html;
					})
					.finally(() => {
						getListUser();
					});
				break;

			case "schedule":
				fetch("/view/schedule", {
					method: "POST",
				})
					.then((res) => res.text())
					.then((html) => {
						bodyContent.innerHTML = html;
					})
					.finally(() => {
						requestScheduleData();
					});
				break;
			case "headquarter":
				fetch("/view/headquarter", {
					method: "POST",
				})
					.then((res) => res.text())
					.then((html) => {
						bodyContent.innerHTML = html;
					})
					.finally(() => {
						getHeadquarterData();
					});
				break;
		}
	});
});
