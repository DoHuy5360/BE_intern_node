import { horizontalBarChart } from "./chart.js";

function getListUser() {
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
		})
		.finally(() => {
			window.history.replaceState(null, "", "/employee");
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
function getDashboardData() {
	const bodyContent = document.querySelector("#content-body");
	const token = localStorage.getItem("token");
	fetch("/dashboard", {
		method: "POST",
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
		.then((res) => res.text())
		.then((data) => {
			bodyContent.innerHTML = data;
			window.history.replaceState(null, "", "/dashboard");
		})
		.finally(() => {
			replaceScript("/js/admin.js");
			replaceScript("/js/sidebar.js");
		});
	function replaceScript(script) {
		const scriptTag = document.createElement("script");
		scriptTag.type = "module";
		scriptTag.src = script;
		document.body.appendChild(scriptTag);
	}
	function fetchData(url, callback) {
		fetch(url, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				callback(data);
			});
	}
	fetchData("/api/v2/index/table/records", (data) => {
		const barChart = new horizontalBarChart("#noRecords", 500, 500);
		barChart.setData(data, "record");
		barChart.setBarFrameWidth(250);
		barChart.setProportion();
		barChart.setChartHeight(40, 80);
		barChart.createBar("table", "record", 1, 40);
		barChart.setLabel("Number of Records");
	});
	fetchData("/api/v2/index/table/headquarter/employee/count", (data) => {
		const barChart = new horizontalBarChart("#noEmployee", 500, 500);
		barChart.setData(data, "employee_count");
		barChart.setBarFrameWidth(250);
		barChart.setProportion();
		barChart.setChartHeight(40, 80);
		barChart.createBar("headquarter_name", "employee_count", 1, 40);
		barChart.setLabel("Number of Employees");
	});
}
export { getListUser, getDashboardData };
