function addClick(indetify, callback) {
	const d = document.querySelector(indetify);
	d.addEventListener("click", (e) => {
		callback(d, e);
	});
	return d;
}
function multiAddClick(indetify, callback) {
	const ds = document.querySelectorAll(indetify);
	ds.forEach((d) => {
		d.addEventListener("click", (e) => {
			callback(d, e);
		});
	});
	return ds;
}

export { addClick, multiAddClick };
