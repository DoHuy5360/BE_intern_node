const token = localStorage.getItem("token");

async function fetchNoBody(url, method) {
	return await fetch(url, {
		method,
		headers: {
			Authorization: `Bearer ${token}`,
		},
	}).then((res) => res.json());
}
async function fetchBody(url, body, method) {
	return await fetch(url, {
		method,
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(body),
	}).then((res) => res.json());
}
async function getRequest(url) {
	return (await fetchNoBody(url, "GET")).json();
}
async function postRequest(url) {
	const res = await fetchBody(url, "POST");
	return res.json();
}
async function putRequest(url, body) {
	const res = await fetchBody(url, body, "PUT");
	return res.updated === 1 ? true : false;
}
async function deleteRequest(url) {
	const data = await fetchNoBody(url, "DELETE");
	return data.deleted === 1 ? true : false;
}

export { getRequest, postRequest, putRequest, deleteRequest };
