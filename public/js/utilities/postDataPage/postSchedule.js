import { addClick, multiAddClick } from "../actions.js";

function setLocation(wsCell, timeIn, timeOut) {
	const sumIn = timeIn.hours * 60 + timeIn.minutes;
	const sumOut = timeOut.hours * 60 + timeOut.minutes;
	const timeStart = scaleTimeLine(sumIn);
	const timeEnd = scaleTimeLine(sumOut) - timeStart;
	const timeLine = wsCell.querySelector(".time_line");
	Object.assign(timeLine.style, {
		width: `${timeEnd}px`,
		height: "3px",
		background: "black",
	});
	// Object.assign(wsCell.style, {
	// 	"margin-left": `${timeStart}px`,
	// 	width: "fit-content",
	// });
	Object.assign(wsCell.style, {
		"margin-left": `${timeStart}px`,
		width: "fit-content",
		cursor: "pointer",
		"user-select": "none",
	});
}
function scaleTimeLine(time) {
	//* 60 minutes = 50px + 1px
	//* 50px: cell height
	//* 1px : gap
	//* n minutes = ((n * 51) / 60)px
	return (time * 51) / 60;
}

// function createWsCell() {
// 	const wrap = document.createElement("div");
// 	wrap.innerHTML = `
//             <div id="${this.work_schedule_id}" class="ws_cell">
// 				<div class="time_line"></div>
// 				<div class="ws_info">
// 					<div>${this.work_schedule_place}</div>
// 					<div>${this.employee_name}</div>
// 					<div>${this.objectTimeIn.both} - ${this.objectTimeOut.both}</div>
// 				</div>
//             </div>
//         `;
// 	return wrap.querySelector(".ws_cell");
// }
function createWsCell() {
	const wrap = document.createElement("div");
	wrap.innerHTML = `
            <div id="${this.work_schedule_id}" class="ws_cell">
				<div class="time_line"></div>
				<div class="ws_info">
					<div>${this.work_schedule_place}</div>
				</div>
            </div>
        `;
	return wrap.querySelector(".ws_cell");
}
function createUserCell() {
	return `
	<div class="wrap_user_schedule" data-user-id="${this.employee_id}">
		<div class="wrap_user_infor">
			<div class="cell_user_id">${this.employee_id}</div>
			<div class="cell_user_name">${this.employee_name}</div>
			<ol class="ws_fast_jump"></ol>
		</div>
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
function createFastJump() {
	return `
		<li>
			<a href="#${this.work_schedule_id}" class="ws_jump_link">${this.objectTimeIn.both}-${this.objectTimeOut.both}</a>
		</li>
	`;
}
let allWrapWs;
let allWrapJump;
let delayTimeSelect;
let tableBody;
async function requestScheduleData() {
	const theYear = document.querySelector("#the-year");
	const theMonth = document.querySelector("#the-month");
	const arrayMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

	const date = new Date();
	const currentYear = date.getFullYear();
	theYear.innerText = currentYear;
	let monthIndex = date.getMonth();
	theMonth.innerText = arrayMonths[monthIndex];
	let currentMonth = monthIndex + 1;
	tableBody = document.querySelector("#table-body");
	await fetch("/api/v2/employee/all-name")
		.then((res) => res.json())
		.then((data) => {
			data.records.forEach((record) => {
				tableBody.insertAdjacentHTML("beforeend", createUserCell.call(record));
			});
		})
		.finally(() => {
			addClick("#pre-year-btn", () => {
				handleUpdateNewWs(() => {
					theYear.innerText--;
				});
			});
			addClick("#next-year-btn", () => {
				handleUpdateNewWs(() => {
					theYear.innerText++;
				});
			});

			addClick("#pre-month-btn", () => {
				if (monthIndex > 0) {
					handleUpdateNewWs(() => {
						theMonth.innerText = arrayMonths[--monthIndex];
						currentMonth--;
					});
				}
			});
			addClick("#next-month-btn", () => {
				if (monthIndex < 11) {
					handleUpdateNewWs(() => {
						theMonth.innerText = arrayMonths[++monthIndex];
						currentMonth++;
					});
				}
			});

			function handleUpdateNewWs(callback) {
				if (delayTimeSelect !== undefined) {
					clearTimeout(delayTimeSelect);
				}
				callback();

				delayTimeSelect = setTimeout(() => {
					const merge = [...allWrapJump].concat([...allWrapWs]);
					merge.forEach((wrap, idx) => {
						wrap.innerHTML = "";
						if (idx === merge.length - 1) {
							requestSchedule(theYear.innerText, currentMonth);
						}
					});
				}, 1000);
			}
		});
	await requestSchedule(currentYear, currentMonth);
}
function createObjectTime(hours, minutes) {
	return {
		hours: parseInt(hours),
		minutes: parseInt(minutes),
		both: `${hours}:${minutes}`,
	};
}
async function requestSchedule(year, month) {
	await fetch(`/api/v2/workschedule/${year}/${month}/all-workschedule`)
		.then((res) => res.json())
		.then((data) => {
			data.records.forEach((record) => {
				const { work_schedule_time_in, work_schedule_time_out, employee_id, work_schedule_id } = record;
				const [dateIn, timeIn] = work_schedule_time_in.split("T");
				const [dateOut, timeOut] = work_schedule_time_out.split("T");
				const [hoursIn, minutesIn] = timeIn.split(":");
				const [hoursOut, minutesOut] = timeOut.split(":");
				const objectTimeIn = createObjectTime(hoursIn, minutesIn);
				const objectTimeOut = createObjectTime(hoursOut, minutesOut);
				const objDateIn = new Date(dateIn);
				const dayIn = objDateIn.getDay();
				// const objDateOut = new Date(dateOut);
				// const dayOut = objDateOut.getDay();
				const wsCell = createWsCell.call({ ...record, objectTimeIn, objectTimeOut });
				const userCell = document.querySelector(`[data-user-id="${employee_id}"]`);
				if (userCell !== null) {
					const wsFastJump = userCell.querySelector(".ws_fast_jump");
					wsFastJump.insertAdjacentHTML("beforeend", createFastJump.call({ work_schedule_id, objectTimeIn, objectTimeOut }));
					const dayCol = userCell.querySelector(`[data-day="${dayIn}"]`);
					setLocation(wsCell, objectTimeIn, objectTimeOut);
					dayCol.appendChild(wsCell);
				}
			});
			allWrapWs = document.querySelectorAll(".wrap_ws");
			allWrapJump = document.querySelectorAll(".ws_fast_jump");
		})
		.finally(() => {
			window.history.replaceState(null, "", "/schedule");
			const wrapUserSchedule = document.querySelectorAll(".wrap_user_schedule");
			const wrapUserInfor = document.querySelectorAll(".wrap_user_infor");
			const filterInput = document.querySelectorAll(".filter_input");
			const objFilter = {};
			filterInput.forEach((inp) => {
				inp.addEventListener("input", (e) => {
					tableBody.innerHTML = "";
					objFilter[e.target.name] = inp.value.trim();
					let arrayFilter = [];
					wrapUserInfor.forEach((wrap) => {
						const arrayConditions = [];
						for (const key in objFilter) {
							const value = objFilter[key];
							const regex = new RegExp(value);
							if (value.length !== 0) {
								if (regex.test(wrap.querySelector(`.cell_user_${key}`).innerText.toLowerCase())) {
									arrayConditions.push(true);
								} else {
									arrayConditions.push(false);
								}
							}
						}
						if (arrayConditions.every((condition) => condition === true)) {
							arrayFilter.push(wrap.parentNode);
						}
					});
					arrayFilter.length !== 0 ? handleInsertFilter(arrayFilter) : handleInsertFilter(wrapUserSchedule);
					arrayFilter = [];
				});
			});
			function handleInsertFilter(arr) {
				arr.forEach((node) => {
					tableBody.appendChild(node);
				});
			}
			addClick("#ws-reset-filter", () => {
				tableBody.innerHTML = "";
				handleInsertFilter(wrapUserSchedule);
			});
			let tempLink;
			multiAddClick(".ws_jump_link", (ths) => {
				if (tempLink !== undefined) {
					tempLink.classList.remove("selected");
				}
				ths.classList.add("selected");
				tempLink = ths;
			});
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
