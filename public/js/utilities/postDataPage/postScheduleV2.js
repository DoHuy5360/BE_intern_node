const year = 2023;
const month = 5;
function postScheduleV2() {
	fetch(`/api/v2/workschedule/${year}/${month}/all-workschedule`)
		.then((res) => res.json())
		.then((data) => {
			const timeObject = {};
			data.records.forEach((record) => {
				const { work_schedule_time_in, work_schedule_time_out, employee_id, work_schedule_plan, work_schedule_id } = record;
				const [dateIn, timeIn] = work_schedule_time_in.split("T");
				const [dateOut, timeOut] = work_schedule_time_out.split("T");
				const [hoursIn, minutesIn] = timeIn.split(":");
				const [hoursOut, minutesOut] = timeOut.split(":");
				const objectTimeIn = createObjectTime(hoursIn, minutesIn);
				const objectTimeOut = createObjectTime(hoursOut, minutesOut);
				const objDateIn = new Date(dateIn);
				const dayIn = objDateIn.getDate();
				const dataObj = { objectTimeIn, objectTimeOut, work_schedule_plan };
				if (timeObject[employee_id] === undefined) {
					const timeData = `${parseInt(hoursIn)}-${dayIn}`;
					timeObject[employee_id] = {
						timeData,
						records: [createWsCell.call(dataObj)],
					};
				} else {
					timeObject[employee_id].records.push(createWsCell.call(dataObj));
				}
			});
			Object.keys(timeObject).forEach((elyId) => {
				const timeCell = document.querySelector(`[data-ely-id="${elyId}"]`).querySelector(`[data-time="${timeObject[elyId].timeData}"]`);
				timeCell.classList.add("selectable");
				timeCell.textContent = timeObject[elyId].records.length;
				const elyCell = document.querySelector(`[data-ely-id="${elyId}"]`).querySelector(".sde_user_name");
				elyCell.classList.add("selectable");
				elyCell.addEventListener("click", (e) => {
					e.stopImmediatePropagation();
					document.body.insertAdjacentHTML("beforeend", createWrapWsCell(timeObject[elyId].records));
				});
			});
		});
}
function createObjectTime(hours, minutes) {
	return {
		hours: parseInt(hours),
		minutes: parseInt(minutes),
		both: `${hours}:${minutes}`,
	};
}
function createWrapWsCell(wsArr) {
	let wsStr = "";
	wsArr.forEach((ws) => {
		wsStr += ws;
	});
	return `
		<div class="wrp_ws_cell_bg">
			<div class="ws_table">
				<button id="close-wrp-ws-cell" type="button" onClick="this.parentNode.parentNode.remove()">
					<i class="fa-solid fa-xmark"></i>
				</button>
				<div class="wrp_lst_ws_cell">
					${wsStr}
				</div>
			</div>
		</div>
	`;
}
function createWsCell() {
	return `
		<div class="wrp_ws_cell">
			<div>${this.work_schedule_plan}</div>
			<div>${this.objectTimeIn.both} - ${this.objectTimeOut.both}</div>
		</div>
	`;
}
export { postScheduleV2 };
