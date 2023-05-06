import { getDashboardData } from "./utilities/postDataPage/postDashboard.js";
import { replaceScript } from "./utilities/replace.js";
import { setJwtToken } from "./utilities/requestToken.js";

document.addEventListener("DOMContentLoaded", (e) => {
	const htmlTag = document.querySelector("html");
	const loginForm = document.getElementById("login-form");
	const inpEmail = document.getElementById("email");
	const inpPassword = document.getElementById("password");
	loginForm.addEventListener("submit", async (e) => {
		e.preventDefault();
		await setJwtToken("/api/v2/login", { email: inpEmail.value, password: inpPassword.value });
		await fetch("/view/dashboard", {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		})
			.then((res) => res.text())
			.then((html) => {
				htmlTag.innerHTML = html;
			})
			.catch((e) => {
				console.warn(e);
			})
			.finally(() => {
				getDashboardData();
				replaceScript("/js/sidebar.js");
				replaceScript("https://kit.fontawesome.com/22e1005e84.js");
			});
	});
});
