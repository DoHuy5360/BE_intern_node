function setLocation(wsCell, timeIn, timeOut) {
	const [hoursIn, minutesIn] = timeIn.split(":");
	const [hoursOut, minutesOut] = timeOut.split(":");
	const sumIn = parseInt(hoursIn) * 60 + parseInt(minutesIn);
	const sumOut = parseInt(hoursOut) * 60 + parseInt(minutesOut);
	const timeStart = scaleTime(sumIn);
	const timeEnd = scaleTime(sumOut) - timeStart;
	const timeLine = wsCell.querySelector(".time_line");
	Object.assign(timeLine.style, {
		width: `${timeEnd}px`,
		height: "3px",
		background: "black",
	});
	Object.assign(wsCell.style, {
		"margin-left": `${timeStart}px`,
		width: "fit-content",
	});
}
function scaleTime(time) {
	//* 60 minutes = 50px + 1px
	//* 50px: cell height
	//* 1px : gap
	//* n minutes = ((n * 51) / 60)px
	return (time * 51) / 60;
}

function createWsCell() {
	const wrap = document.createElement("div");
	wrap.innerHTML = `
            <div class="ws_cell">
				<div class="time_line"></div>
				<div class="ws_info">
					<div>${this.work_schedule_place}</div>
					<div>${this.employee_name}</div>
					<div>${this.timeIn} - ${this.timeOut}</div>
				</div>
            </div>
        `;
	return wrap.querySelector(".ws_cell");
}
function createUserCell() {
	return `
	<div class="wrap_user_schedule" data-id="${this.employee_id}">
		<div class="wrap_user_infor">${this.employee_name}</div>
		<div class="wrap_ws" data-day="1"></div>
		<div class="wrap_ws" data-day="2"></div>
		<div class="wrap_ws" data-day="3"></div>
		<div class="wrap_ws" data-day="4"></div>
		<div class="wrap_ws" data-day="5"></div>
		<div class="wrap_ws" data-day="6"></div>
		<div class="wrap_ws" data-day="0"></div>
	</div>
	`;
}
async function requestScheduleData() {
	const tableBody = document.querySelector("#table-body");
	await fetch("/api/v2/employee/all-name")
		.then((res) => res.json())
		.then((data) => {
			data.records.forEach((record) => {
				tableBody.insertAdjacentHTML("beforeend", createUserCell.call(record));
			});
		});
	await fetch("/api/v2/workschedule/all-workschedule")
		.then((res) => res.json())
		.then((data) => {
			data.records.forEach((record) => {
				const { work_schedule_time_in, work_schedule_time_out, employee_id } = record;
				const [dateIn, timeIn] = work_schedule_time_in.split("T");
				const [dateOut, timeOut] = work_schedule_time_out.split("T");
				const objDateIn = new Date(dateIn);
				const dayIn = objDateIn.getDay();
				const objDateOut = new Date(dateOut);
				const dayOut = objDateOut.getDay();
				const wsCell = createWsCell.call({ ...record, timeIn, timeOut });
				const userCell = document.querySelector(`[data-id="${employee_id}"]`);
				if (userCell !== null) {
					const dayCol = userCell.querySelector(`[data-day="${dayIn}"]`);
					setLocation(wsCell, timeIn, timeOut);
					dayCol.appendChild(wsCell);
				}
			});
		})
		.finally(() => {
			window.history.replaceState(null, "", "/schedule");
		});
}

// employee_avatar: null
// employee_id: "NV-46225f47-f56a-4506-afb6-6aef254c8abe"
// employee_name: "Khoaaaaa123"
// employee_phone: "0963758993"
// employee_position: "Manager"
// headquarter_address: "Japan"
// headquarter_name: "Yokohama"
// work_schedule_color: "pink"
// work_schedule_departure: null
// work_schedule_destination: null
// work_schedule_id: "WS-fc8e1310-fab8-49d0-ad2a-3d7efbc5feee"
// work_schedule_place: "Quá đẹp"
// work_schedule_plan: "Anh Thắng đẹp trai"
// work_schedule_time_in: "2023-04-17T03:00:00.00Z"
// work_schedule_time_out: "2023-04-17T03:30:00.00Z"
export { requestScheduleData };
