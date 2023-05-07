import { multiAddClick } from "./utilities/actions.js";
import { getDashboardData } from "./utilities/postDataPage/postDashboard.js";
import { getListUser } from "./utilities/postDataPage/postEmployee.js";
import { getHeadquarterData } from "./utilities/postDataPage/postHeadquarter.js";
import { requestScheduleData } from "./utilities/postDataPage/postSchedule.js";
import { postScheduleV2 } from "./utilities/postDataPage/postScheduleV2.js";
import { replaceScript } from "./utilities/replace.js";

multiAddClick(".wrap_multi_choice", (ths) => {
	ths.classList.toggle("selected");
});

const navigateLinks = document.querySelectorAll(".navigate_link.selectable");
const bodyContent = document.querySelector("#content-body");
navigateLinks.forEach((link) => {
	link.addEventListener("click", async (e) => {
		e.stopImmediatePropagation();
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
			case "scheduleV2":
				fetch("/view/scheduleV2", {
					method: "POST",
				})
					.then((res) => res.text())
					.then((html) => {
						bodyContent.innerHTML = html;
					})
					.finally(() => {
						window.history.replaceState(" ", null, "/view/scheduleV2");
						postScheduleV2();
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
			case "add-employee":
				fetch("/view/add/employee", {
					method: "POST",
				})
					.then((res) => res.text())
					.then((html) => {
						bodyContent.innerHTML = html;
					})
					.finally(() => {
						window.history.replaceState(" ", null, "/view/add/employee");
						// getHeadquarterData();
						replaceScript("/js/combobox/general.js");
					});
				break;
		}
	});
});
