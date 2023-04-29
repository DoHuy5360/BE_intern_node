async function setJwtToken(url, requestBody) {
	await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(requestBody) })
		.then((res) => res.json())
		.then((data) => {
			localStorage.setItem("token", data.token);
			document.cookie = `token=${data.token}; max-age=${1800}; path=/; secure; SameSite=strict`;
		});
}

export { setJwtToken };
