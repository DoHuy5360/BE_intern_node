import { multiAddClick } from "../actions.js";
import { deleteRequest } from "../request.js";

async function getListUser() {
	let dataRecords;
	const token = localStorage.getItem("token");
	const listEmployee = document.querySelector("#list-employee");
	await fetch("/api/v2/employee/all-information", {
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
	})
		.then((res) => res.json())
		.then((data) => {
			const barLoading = document.querySelector("#employee-bar-loading");
			const { status, numbers, records } = data;
			dataRecords = records;
			if (status === 200) {
				records.forEach((rec, idx) => {
					listEmployee.insertAdjacentHTML("beforeend", createEmplyeeInfoBar.call({ idx, ...rec }));
					barLoading.style.transform = `translateY(${idx * 60}px)`;
				});
			}
		})
		.finally(() => {
			window.history.replaceState(null, "", "/employee");
			multiAddClick(".delete_btn", async (btn) => {
				const isAccept = await popUp(`Delete This Account?<br>${btn.getAttribute("data-email")}`);
				const employeeId = btn.getAttribute("data-id");
				if (isAccept) {
					const isDeleted = await deleteRequest(`/api/v2/account/${employeeId}/delete`);
					if (isDeleted) {
						document.querySelector(`[data-bar="${employeeId}"]`).remove();
					}
				}
			});
			multiAddClick(".edit_btn", (ths) => {
				const foundInfo = dataRecords.find((rec) => {
					return rec.account_id === ths.getAttribute("data-id");
				});
				document.body.insertAdjacentHTML("beforeend", createElyEditForm.call(foundInfo));
			});
			multiAddClick(".view_btn", () => {
				console.log("Not set");
			});
			const arrayWrapars = document.querySelectorAll("#list-employee .wrap_employee_bar");
			const arrayBars = document.querySelectorAll(".info-bar");
			const filterInputs = document.querySelectorAll(".filter_input");
			filterInputs.forEach((inp) => {
				let delayFilter;
				inp.addEventListener("input", (e) => {
					if (delayFilter !== undefined) {
						clearTimeout(delayFilter);
					}
					delayFilter = setTimeout(() => {
						listEmployee.innerHTML = "";
						const filterTray = handleFilter(e.target.value.trim(), inp.name, arrayBars, arrayWrapars);
						filterTray.forEach((bar) => {
							listEmployee.appendChild(bar);
						});
					}, 500);
				});
			});
			const resetFilterBtn = document.querySelector("#reset-filter-btn");
			resetFilterBtn.addEventListener("click", (e) => {
				listEmployee.innerHTML = "";
				arrayWrapars.forEach((bar) => {
					listEmployee.appendChild(bar);
				});
			});
		});
}

let filterObject = {};
function handleFilter(inputValue, type, arrayBars, arrayWrapars) {
	const filterTray = [];
	filterObject[type] = inputValue;
	arrayBars.forEach((bar) => {
		const arrayConditions = [];
		for (const key in filterObject) {
			const value = filterObject[key];
			if (value.length !== 0) {
				const regex = new RegExp(value);
				if (regex.test(bar.querySelector(`[data-name="${key}"]`).innerText.toLowerCase())) {
					arrayConditions.push(true);
				} else {
					arrayConditions.push(false);
				}
			}
		}
		if (arrayConditions.every((condition) => condition === true)) {
			filterTray.push(bar.parentNode);
		}
	});
	return filterTray.length === 0 ? arrayWrapars : filterTray;
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

function createEmplyeeInfoBar() {
	return `
    <div class="wrap_employee_bar" data-bar="${this.account_id}">
        <div class="bar_format info-bar">
            <div>${this.idx + 1}</div>
            <div data-name="id">${this.account_id}</div>
            <div data-name="name">${this.employee_name}</div>
            <div data-name="email">${this.account_email}</div>
            <div data-name="position">${this.employee_position}</div>
            <div data-name="role">${this.account_role}</div>
            <div data-name="address">${this.employee_address}</div>
        </div>
        <div class="wrap_option_btn">
            <div class="delete_btn option_btn" data-id="${this.account_id}" data-email="${this.account_email}">Delete</div>
            <div class="edit_btn option_btn" data-id="${this.account_id}">Edit</div>
            <div class="view_btn option_btn">View</div>
        </div>
    </div>
    `;
}
function createElyEditForm() {
	return `
	<div id="wrap-ely-edit-form">
		<form id="ely-form-edit">
			<div id="ely-edit-title">Edit</div>
			<div id="wrap-ely-inp">
				<div class="ely_label_inp">
					<label for="ely-name">Name</label>
					<input class="ely_inp" id="ely-name" name="name" type="text" value="${this.employee_name}"/>
				</div>
				</div>
				<div class="ely_label_inp">
					<label for="ely-phone">Phone</label>
					<input class="ely_inp" id="ely-phone" name="phone" type="text" value="${this.employee_phone}"/>
				</div>
				<div class="ely_label_inp">
					<label for="ely-role">Role</label>
					<input class="ely_inp" id="ely-role" name="role" type="text" value="${this.account_role}"/>
				</div>
				<div class="ely_label_inp">
					<label for="ely-position">Position</label>
					<input class="ely_inp" id="ely-position" name="position" type="text" value="${this.employee_position}"/>
				<div class="ely_label_inp">
					<label for="ely-address">Address</label>
					<textarea class="ely_inp area" id="ely-address" name="address" type="text">${this.employee_address}</textarea>
				</div>
			</div>
			<div id="wrap-edit-btn">
				<button id="ely-edit-cancel" type="button" onclick="this.parentNode.parentNode.parentNode.remove()">Cancel</button>
				<button id="ely-edit-submit" type="submit">Submit</button>
			</div>
		</form>
	</div>
	`;
}
export { getListUser };
