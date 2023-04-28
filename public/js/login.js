import { getDashboardData } from "./utilities/requestDataPage.js";

document.addEventListener("DOMContentLoaded", (e) => {
	const htmlTag = document.querySelector("html");
	const loginForm = document.getElementById("login-form");
	const inpEmail = document.getElementById("email");
	const inpPassword = document.getElementById("password");
	loginForm.addEventListener("submit", async (e) => {
		e.preventDefault();
		await fetch("/api/v2/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: inpEmail.value, password: inpPassword.value }) })
			.then((res) => res.json())
			.then((data) => {
				localStorage.setItem("token", data.token);
				const second = 1800;
				document.cookie = `token=${data.token}; max-age=${second}; path=/; secure; SameSite=strict`;
			});
		await fetch("/admin", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then((res) => res.text())
			.then((html) => {
				htmlTag.innerHTML = html;
			})
			.finally(() => {
				getDashboardData();
			});
	});
});
