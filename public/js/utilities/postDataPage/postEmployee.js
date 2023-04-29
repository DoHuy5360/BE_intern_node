async function getListUser() {
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
			if (status === 200) {
				records.forEach((rec, idx) => {
					listEmployee.insertAdjacentHTML("beforeend", createEmplyeeInfoBar.call({ idx, ...rec }));
					barLoading.style.transform = `translateY(${idx * 60}px)`;
				});
			}
		})
		.finally(() => {
			window.history.replaceState(null, "", "/employee");
			setEventClick(".delete_btn", async (btn) => {
				const isDelete = await popUp(`Delete This Account?<br><br>${btn.getAttribute("data-email")}`);
				if (isDelete) {
					requestAction(`/api/v2/account/${btn.getAttribute("data-id")}/delete`, "DELETE");
				}
			});
			setEventClick(".edit_btn", () => {
				console.log(2);
			});
			setEventClick(".view_btn", () => {
				console.log(3);
			});
		});
}

function requestAction(url, method) {
	fetch(url, {
		method,
		headers: {
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
	})
		.then((res) => res.json())
		.then((mes) => {
			console.log(mes);
		});
}

async function popUp(message) {
	document.body.insertAdjacentHTML(
		"beforeend",
		`<div id="wrap-popup">
			<div>${message}</div>
			<div id="wrap-poup-options">
				<button id="popup-yes-btn" class="popup_btn" type="button">Yes</button>
				<button id="popup-no-btn" class="popup_btn" type="button">No</button>
			</div>
		</div>`
	);
	const popupForm = document.querySelector("#wrap-popup");
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
function setEventClick(className, callback) {
	document.querySelectorAll(className).forEach((btn) => {
		btn.addEventListener("click", (e) => {
			callback(btn);
		});
	});
}
function createEmplyeeInfoBar() {
	return `
    <div class="wrap_employee_bar">
        <div class="bar_format">
            <div>${this.idx + 1}</div>
            <div>${this.account_id}</div>
            <div>${this.employee_name}</div>
            <div>${this.account_email}</div>
            <div>${this.employee_position}</div>
            <div>${this.account_role}</div>
        </div>
        <div class="wrap_option_btn">
            <div class="delete_btn option_btn" data-id="${this.account_id}" data-email="${this.account_email}">Delete</div>
            <div class="edit_btn option_btn">Edit</div>
            <div class="view_btn option_btn">View</div>
        </div>
    </div>
    `;
}
export { getListUser };
