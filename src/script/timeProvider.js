function getTimeZ() {
	const now = new Date();
	return now.toISOString();
}

export { getTimeZ };
