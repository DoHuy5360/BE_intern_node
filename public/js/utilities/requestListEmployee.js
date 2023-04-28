function requestListEmployee() {
	const token = localStorage.getItem("token");
	const listEmployee = document.querySelector("#list-employee");
	fetch("/api/v2/employee/all-information", {
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
	})
		.then((res) => res.json())
		.then((data) => {
			const { status, numbers, records } = data;
			if (status === 200) {
				records.forEach((rec) => {
					listEmployee.insertAdjacentHTML("beforeend", createEmplyeeInfoBar.call(rec));
				});
			}
		});
	function createEmplyeeInfoBar() {
		return `
    <div class="wrap_employee_bar">
        <div class="bar_format">
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
}
// requestListEmployee();
export { requestListEmployee };
