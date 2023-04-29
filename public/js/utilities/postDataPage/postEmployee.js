async function getListUser() {
	const bodyContent = document.querySelector("#content-body");
	await fetch("/employee", {
		method: "POST",
	})
		.then((res) => res.text())
		.then((data) => {
			bodyContent.innerHTML = data;
		});
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
		});
}
function createEmplyeeInfoBar() {
	return `
    <div class="wrap_employee_bar">
        <div class="bar_format">
            <div>${this.idx + 1}</div>
            <div>${this.account_id}</div>
            <div>${this.employee_name}</div>
            <div>${this.employee_position}</div>
            <div>${this.account_role}</div>
        </div>
        <div class="wrap_option_btn">
            <div class="delete_btn option_btn">Delete</div>
            <div class="edit_btn option_btn">Edit</div>
            <div class="view_btn option_btn">View</div>
        </div>
    </div>
    `;
}
export { getListUser };
