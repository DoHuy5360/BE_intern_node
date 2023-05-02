function createHeadquarterCard() {
	return `
    <div class="wrap_hqt_bar">
			<div class="hqt_number">${this.idx + 1}</div>
			<div class="hqt_id">${this.headquarter_id}</div>
			<div class="hqt_name">${this.headquarter_name}</div>
			<div class="hqt_address">${this.headquarter_address}</div>
			<div class="number_of_employee">${this.number_of_employees}</div>
			<div class="wrap_hqt_options">
				<div class="option_btn" id="del-option">
					<i class="fa-solid fa-trash"></i>
				</div>
				<div class="option_btn" id="edit-option">
					<i class="fa-solid fa-pen-to-square"></i>
				</div>
			</div>
		</div>
    `;
}

function getHeadquarterData() {
	const listHeadquarter = document.querySelector("#list-headquarter");
	fetch("/api/v2/headquarter/all-info")
		.then((res) => res.json())
		.then((data) => {
			data.records.forEach((rec, idx) => {
				listHeadquarter.insertAdjacentHTML("beforeend", createHeadquarterCard.call({ ...rec, idx }));
			});
		})
		.finally(() => {
			window.history.replaceState("", null, "/headquarter");
		});
}

export { getHeadquarterData };
