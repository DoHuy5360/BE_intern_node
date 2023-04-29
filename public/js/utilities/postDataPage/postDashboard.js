import { horizontalBarChart } from "../chart.js";

function getDashboardData() {
	function fetchData(url, callback) {
		fetch(url, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				callback(data);
				window.history.replaceState(null, "", "/dashboard");
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
export { getDashboardData };
