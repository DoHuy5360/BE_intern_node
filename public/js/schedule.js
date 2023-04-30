function setLocation(wsCell, timeIn, timeOut) {
	const [hoursIn, minutesIn] = timeIn.split(":");
	const [hoursOut, minutesOut] = timeOut.split(":");
	const sumIn = parseInt(hoursIn) * 60 + parseInt(minutesIn);
	const sumOut = parseInt(hoursOut) * 60 + parseInt(minutesOut);
	const timeStart = scaleTime(sumIn);
	const timeEnd = scaleTime(sumOut) - timeStart;
	Object.assign(wsCell.style, {
		"margin-top": `${timeStart}px`,
		height: `${timeEnd}px`,
	});
}
function scaleTime(time) {
	//* 60 minutes = 32px + 1px
	//* 32px: cell height
	//* 1px : gap
	//* n minutes = ((n * 33) / 60)px
	return (time * (32 + 1)) / 60;
}

function createWsCell() {
	const wrap = document.createElement("div");
	wrap.innerHTML = `
            <div class="ws_cell">
                <div>${this.work_schedule_place}</div>
                <div>${this.employee_name}</div>
                <div>${this.timeIn} - ${this.timeOut}</div>
            </div>
        `;
	return wrap.querySelector(".ws_cell");
}
fetch("/api/v2/workschedule/all-workschedule")
	.then((res) => res.json())
	.then((data) => {
		console.log(data);
		data.records.forEach((record) => {
			const { work_schedule_time_in, work_schedule_time_out } = record;
			const [dateIn, timeIn] = work_schedule_time_in.split("T");
			const [dateOut, timeOut] = work_schedule_time_out.split("T");
			const objDateIn = new Date(dateIn);
			const dayIn = objDateIn.getDay();
			const objDateOut = new Date(dateOut);
			const dayOut = objDateOut.getDay();
			const wsCell = createWsCell.call({ ...record, timeIn, timeOut });
			const dayCol = document.querySelector(`[data-day="${dayIn}"]`);
			setLocation(wsCell, timeIn, timeOut);
			dayCol.appendChild(wsCell);
		});
	});
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
