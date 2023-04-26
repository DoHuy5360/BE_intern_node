document.addEventListener("DOMContentLoaded", (e) => {
	const loginForm = document.getElementById("login-form");
	const inpEmail = document.getElementById("email");
	const inpPassword = document.getElementById("password");
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
		const fetchHome = await fetch("/home", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${fetchToken}`,
			},
		})
			.then((res) => res.text())
			.then((data) => {
				body.innerHTML = data;
				const newUrl = "/home";
				window.history.replaceState(null, "", newUrl);
			});
	});
});
