var canvas = document.getElementById("myCanvas");
canvas.width = 500;
const halfWidth = canvas.width - (150 + 100);
canvas.style.outline = "1px solid #eaeaea";
let numberOfRecords;
var ctx = canvas.getContext("2d");

fetch("/api/v2/index/table/records", {
	headers: {
		Authorization: `Bearer ${localStorage.getItem("token")}`,
	},
})
	.then((res) => res.json())
	.then((data) => {
		numberOfRecords = data.length;
		//todo: Số lượng bản ghi x 40 ( Vị trí của y khi vẽ thanh ngang ) + 80 (Vị trí của thanh ngang đầu tiên)
		canvas.height = numberOfRecords * 40 + 80;
		const maxLimit = data[0].record;
		data.forEach((row, idx) => {
			createBar(ctx, row, idx + 1, maxLimit);
		});
	});
function createBar(ctx, row, idx, maxLimit) {
	const proportion = halfWidth / maxLimit;
	const y = (idx + 1) * 40;
	ctx.beginPath();
	const startX = 150;
	ctx.moveTo(startX, y); //tọa độ điểm đầu
	const endX = proportion * parseInt(row.record) + startX + 1;
	ctx.lineTo(endX, y); //tọa độ điểm cuối
	ctx.lineWidth = 30;
	ctx.strokeStyle = randomColor();
	ctx.stroke();

	ctx.font = "normal normal 16px Arial";
	const textCenter = 5;
	ctx.fillText(row.record, endX + 5, y + textCenter, 500);
	ctx.fillText(row.table, 10, y + textCenter, 500);
	ctx.fillText("Number of Records", 500 / 2 - 100, 40, 500);
}
function randomColor() {
	const letters = "0123456789ABCDEF";
	let color = "#";
	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}
