class horizontalBarChart {
	constructor(node, width, height) {
		this.node = document.querySelector(node);
		this.ctx = this.node.getContext("2d");
		this.width = width;
		this.height = height;
		this.node.width = this.width;
		this.node.height = this.height;
		this.node.style.outline = "1px solid #eaeaea";
	}
	setBarFrameWidth(nameWidth) {
		this.barWidth = this.node.width - nameWidth;
	}
	setData(data, colName) {
		this.data = data;
		this.numberOfRecords = this.data.length;
		this.maxLimit = this.data[0][colName];
	}
	setChartHeight(barWidth, bonus) {
		this.node.height = this.numberOfRecords * barWidth + bonus;
	}
	setProportion() {
		this.proportion = this.barWidth / this.maxLimit;
	}
	setLabel(text) {
		this.ctx.fillText(text, this.width / 2 - 100, 40, 500);
	}
	createBar(colName, colValue, yStartAt, barWidth) {
		this.data.forEach((row, idx) => {
			const y = (idx + 1 + yStartAt) * barWidth;
			const startX = 150;
			const endX = this.proportion * parseInt(row[colValue]) + startX + yStartAt;
			this.ctx.beginPath();
			this.ctx.moveTo(startX, y); //tọa độ điểm đầu
			this.ctx.lineTo(endX, y); //tọa độ điểm cuối
			this.ctx.lineWidth = barWidth - 10;
			this.ctx.strokeStyle = randomColor();
			this.ctx.stroke();

			this.ctx.font = "normal normal 16px Arial";
			const textCenter = 5;
			this.ctx.fillText(row[colValue], endX + 5, y + textCenter, 500);
			this.ctx.fillText(row[colName], 10, y + textCenter, 500);
		});
	}
}
function randomColor() {
	const letters = "0123456789ABCDEF";
	let color = "#";
	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}

class circleChart {
	constructor(node, width = 300, height = 300, radius = 100) {
		this.node = document.querySelector(node);
		this.ctx = this.node.getContext("2d");
		this.radius = radius;
		this.width = width;
		this.height = height;
		this.node.width = this.width;
		this.node.height = this.height;
		this.node.style.outline = "1px solid #eaeaea";
	}
	createPie() {
		// var canvas = document.getElementById("myPie");
		// canvas.width = 300;
		// canvas.height = 300;
		// var ctx = canvas.getContext("2d");
		var centerX = this.width / 2;
		var centerY = this.height / 2;
		var part1Percent = 25;
		var part2Percent = 35;
		var part3Percent = 40;

		var part1Degrees = (part1Percent / 100) * 360;
		var part2Degrees = (part2Percent / 100) * 360;
		var part3Degrees = (part3Percent / 100) * 360;

		// Part 1
		ctx.beginPath();
		ctx.moveTo(centerX, centerY);
		ctx.arc(centerX, centerY, this.radius, 0, (part1Degrees * Math.PI) / 180);
		ctx.fillStyle = "red";
		ctx.fill();

		// Part 2
		ctx.beginPath();
		ctx.moveTo(centerX, centerY);
		ctx.arc(centerX, centerY, this.radius, (part1Degrees * Math.PI) / 180, ((part1Degrees + part2Degrees) * Math.PI) / 180);
		ctx.fillStyle = "blue";
		ctx.fill();

		// Part 3
		ctx.beginPath();
		ctx.moveTo(centerX, centerY);
		ctx.arc(centerX, centerY, this.radius, ((part1Degrees + part2Degrees) * Math.PI) / 180, ((part1Degrees + part2Degrees + part3Degrees) * Math.PI) / 180);
		ctx.fillStyle = "green";
		ctx.fill();
	}
}

export { horizontalBarChart, circleChart };
