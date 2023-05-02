import { addClick, multiAddClick } from "../actions.js";

function createHeadquarterCard() {
	return `
    <div class="wrap_hqt_bar" data-hqt-id="${this.headquarter_id}">
			<div class="hqt_number">${this.idx + 1}</div>
			<div class="hqt_id">${this.headquarter_id}</div>
			<div class="hqt_name">${this.headquarter_name}</div>
			<div class="hqt_address">${this.headquarter_address}</div>
			<div class="number_of_employee">${this.number_of_employees}</div>
			<div class="wrap_hqt_options">
				<div class="option_btn del_option" data-del-id="${this.headquarter_id}">
					<i class="fa-solid fa-trash"></i>
				</div>
				<div class="option_btn edit_option">
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
			multiAddClick(".del_option", async (ths) => {
				const hqtId = ths.getAttribute("data-del-id");
				const isAccept = await popUp("Delete this Headquarter?");
				if (isAccept) {
					fetch(`/api/v2/headquarter/${hqtId}/delete`, {
						method: "DELETE",
					})
						.then((res) => res.json())
						.then((data) => {
							if (data.deleted) {
								document.querySelector(`[data-hqt-id="${hqtId}"]`).remove();
							}
						});
				}
			});
		});
}
async function popUp(message) {
	document.body.insertAdjacentHTML(
		"beforeend",
		`
		<div id="popup-bg">
			<div id="wrap-popup">
				<div id="popup-message">${message}</div>
				<div id="wrap-poup-options">
					<button id="popup-yes-btn" class="popup_btn" type="button">Yes</button>
					<button id="popup-no-btn" class="popup_btn" type="button">No</button>
				</div>
			</div>
		</div>
		`
	);
	const popupForm = document.querySelector("#popup-bg");
	const isDelete = await new Promise((resolve, reject) => {
		document.querySelector("#popup-yes-btn").addEventListener("click", (e) => {
			resolve(true);
		});
		document.querySelector("#popup-no-btn").addEventListener("click", (e) => {
			resolve(false);
		});
	});
	popupForm.remove();
	return isDelete;
}
export { getHeadquarterData };
