import { getDashboardData } from "./utilities/postDataPage/postDashboard.js";
import { getListUser } from "./utilities/postDataPage/postEmployee.js";

const navigateLinks = document.querySelectorAll(".navigate_link");
const bodyContent = document.querySelector("#content-body");
navigateLinks.forEach((link) => {
	link.addEventListener("click", async (e) => {
		const dataLink = link.getAttribute("data-link");
		switch (dataLink) {
			case "dashboard":
				const token = localStorage.getItem("token");
				fetch("/dashboard", {
					method: "POST",
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
					.then((res) => res.text())
					.then((html) => {
						bodyContent.innerHTML = html;
						window.history.replaceState(null, "", "/dashboard");
					})
					.finally(() => {
						getDashboardData();
						replaceScript("/js/sidebar.js");
					});
				break;
			case "employee":
				await fetch("/employee", {
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
		}
	});
});
function replaceScript(script) {
	const scriptTag = document.createElement("script");
	scriptTag.type = "module";
	scriptTag.src = script;
	document.body.appendChild(scriptTag);
	const exitsScript = document.querySelector(`script[src="${script}"`);
	exitsScript.remove();
}
