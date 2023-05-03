import { multiAddClick } from "../actions.js";
import { deleteRequest, putRequest } from "../request.js";

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
			multiAddClick(".delete_btn", async (btn, e) => {
				e.stopImmediatePropagation();
				const isAccept = await popUp(`Delete This Account?<br>${btn.getAttribute("data-email")}`);
				const employeeId = btn.getAttribute("data-id");
				if (isAccept) {
					const isDeleted = await deleteRequest(`/api/v2/account/${employeeId}/delete`);
					if (isDeleted) {
						document.querySelector(`[data-bar="${employeeId}"]`).remove();
					}
				}
			});
			multiAddClick(".edit_btn", (ths, e) => {
				e.stopImmediatePropagation();
				const accountId = ths.getAttribute("data-id");
				const foundInfo = dataRecords.find((rec) => {
					return rec.account_id === accountId;
				});
				document.body.insertAdjacentHTML("beforeend", createElyEditForm.call(foundInfo));
				const editForm = document.querySelector("#ely-form-edit");
				editForm.addEventListener("submit", async (e) => {
					e.preventDefault();
					const isUpdated = await putRequest(`/api/v2/account/${accountId}/update/user`, {
						headquarterId: editForm.querySelector("[name='headquarter']").value,
						accountRole: editForm.querySelector("[name='role']").value,
						employeePosition: editForm.querySelector("[name='position']").value,
						employeeSalary: editForm.querySelector("[name='salary']").value,
					});
					if (isUpdated) {
						editForm.parentNode.remove();
					}
				});
			});
			const arrayWrapars = document.querySelectorAll("#list-employee .wrap_employee_bar");
			const arrayBars = document.querySelectorAll(".info-bar");
			multiAddClick(".info-bar", (ths) => {
				const accountId = ths.getAttribute("data-bar");
				const foundAc = dataRecords.find((rec) => {
					return rec.account_id === accountId;
				});
				console.log(foundAc);
				document.body.insertAdjacentHTML("beforeend", createElyViewForm.call(foundAc));
			});
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
	<div class="bar_format info-bar" data-bar="${this.account_id}">
		<div>${this.idx + 1}</div>
		<div data-name="id">${this.account_id}</div>
		<div data-name="name">${this.employee_name}</div>
		<div data-name="email">${this.account_email}</div>
		<div data-name="position">${this.employee_position}</div>
		<div data-name="role">${this.account_role}</div>
		<div data-name="address">${this.employee_address}</div>
		<div data-name="gender">${this.employee_gender ? "Male" : "Female"}</div>
		<div class="wrap_option_btn">
			<div class="delete_btn option_btn" data-id="${this.account_id}" data-email="${this.account_email}">
				<i class="fa-solid fa-trash"></i>
			</div>
			<div class="edit_btn option_btn" data-id="${this.account_id}">
				<i class="fa-solid fa-pen-to-square"></i>
			</div>
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
					<input class="ely_inp" id="ely-name" name="name" type="text" value="${this.employee_name}" disabled/>
				</div>
				<div class="ely_label_inp">
					<label for="ely-phone">Phone</label>
					<input class="ely_inp" id="ely-phone" name="phone" type="text" value="${this.employee_phone}" disabled/>
				</div>
				<div class="ely_label_inp">
					<label for="ely-phone">Salary</label>
					<input class="ely_inp" id="ely-salary" name="salary" type="text" value="${this.employee_salary}"/>
				</div>
				<div class="ely_label_inp">
					<label for="ely-phone">Headquarter</label>
					<input class="ely_inp" id="ely-headquarter" name="headquarter" type="text" value="${this.headquarter_name}"/>
				</div>
				<div class="ely_label_inp">
					<label for="ely-role">Role</label>
					<input class="ely_inp" id="ely-role" name="role" type="text" value="${this.account_role}"/>
				</div>
				<div class="ely_label_inp">
					<label for="ely-position">Position</label>
					<input class="ely_inp" id="ely-position" name="position" type="text" value="${this.employee_position}"/>
				</div>
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
function createElyViewForm() {
	return `
	<div id="wrap-ely-view">
		<div id="wrap-user-info">
			<div id="ely-close-view" onclick="this.parentNode.parentNode.remove()">
				<i class="fa-solid fa-xmark"></i>
			</div>
			<div id="wrap-ely-line">
				<div class="ely_label_info">
					<label for="ely-name-info">Name</label>
					<input class="ely_info" id="ely-name-info" name="name" type="text" readonly value="${this.employee_name}"/>
				</div>
				<div class="ely_label_info">
					<label for="ely-email-info">Email</label>
					<input class="ely_info" id="ely-email-info" name="email" type="text" readonly value="${this.account_email}"/>
				</div>
				<div class="ely_label_info">
					<label for="ely-phone-info">Phone</label>
					<input class="ely_info" id="ely-phone-info" name="phone" type="text" readonly value="${this.employee_phone}"/>
				</div>
				<div class="ely_label_info">
					<label for="ely-salary-info">Salary</label>
					<input class="ely_info" id="ely-salary" name="salary" type="text" readonly value="${this.employee_salary}"/>
				</div>
				<div class="ely_label_info">
					<label for="ely-headquarter-info">Headquarter</label>
					<input class="ely_info" id="ely-headquarter" name="headquarter" type="text" readonly value="${this.headquarter_name}"/>
				</div>
				<div class="ely_label_info">
					<label for="ely-role-info">Role</label>
					<input class="ely_info" id="ely-role" name="role" type="text" readonly value="${this.account_role}"/>
				</div>
				<div class="ely_label_info">
					<label for="ely-position-info">Position</label>
					<input class="ely_info" id="ely-position" name="position" type="text" readonly value="${this.employee_position}"/>
				</div>
			</div>
			<div id="ely-avatar-address">
				<div id="wrap-avatar-info">
					<img src="https://th.bing.com/th/id/OIP.gMZZVC_8fsOKN2iD5Ff_2QAAAA?pid=ImgDet&rs=1" alt="" draggable="false">
				</div>
				<div class="ely_label_info">
					<label for="ely-address-info">Address</label>
					<textarea id="address-area" id="ely-address" name="address" type="text" readonly>${this.employee_address}</textarea>
				</div>
			</div>
		</div>
	</div>
	`;
}
export { getListUser };
