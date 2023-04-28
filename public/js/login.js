document.addEventListener("DOMContentLoaded", (e) => {
	const loginForm = document.getElementById("login-form");
	const inpEmail = document.getElementById("email");
	const inpPassword = document.getElementById("password");
	const htmlTag = document.querySelector("html");
	const body = document.querySelector("body");
	loginForm.addEventListener("submit", async (e) => {
		e.preventDefault();
		const fetchToken = await fetch("/api/v2/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: inpEmail.value, password: inpPassword.value }) })
			.then((res) => res.json())
			.then((data) => {
				localStorage.setItem("token", data.token);
				const second = 1800;
				document.cookie = `token=${data.token}; max-age=${second}; path=/; secure; SameSite=strict`;
				return data.token;
			});
		const fetchHome = await fetch("/admin", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${fetchToken}`,
			},
		})
			.then((res) => res.text())
			.then((data) => {
				htmlTag.innerHTML = data;
				const newUrl = "/admin";
				window.history.replaceState(null, "", newUrl);
			})
			.finally(() => {
				replaceScript("/js/admin.js");
				replaceScript("/js/sidebar.js");
			});
	});
	function replaceScript(script) {
		const scriptTag = document.createElement("script");
		scriptTag.type = "module";
		scriptTag.src = script;
		document.body.appendChild(scriptTag);
	}
});
