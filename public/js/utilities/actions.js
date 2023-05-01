function addClick(indetify, callback) {
	const d = document.querySelector(indetify);
	d.addEventListener("click", (e) => {
		callback(indetify, e);
	});
	return d;
}

export { addClick };
