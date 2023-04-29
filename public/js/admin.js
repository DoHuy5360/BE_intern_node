import { getDashboardData } from "./utilities/postDataPage/postDashboard.js";

getDashboardData();

// var canvas = document.getElementById("myPie");
// canvas.width = 300;
// canvas.height = 300;
// canvas.style.outline = "1px solid #eaeaea";
// var ctx = canvas.getContext("2d");
// var centerX = canvas.width / 2;
// var centerY = canvas.height / 2;
// var radius = 100;
// var part1Percent = 25;
// var part2Percent = 35;
// var part3Percent = 40;

// var part1Degrees = (part1Percent / 100) * 360;
// var part2Degrees = (part2Percent / 100) * 360;
// var part3Degrees = (part3Percent / 100) * 360;

// // Part 1
// ctx.beginPath();
// ctx.moveTo(centerX, centerY);
// ctx.arc(centerX, centerY, radius, 0, (part1Degrees * Math.PI) / 180);
// ctx.fillStyle = "red";
// ctx.fill();

// // Part 2
// ctx.beginPath();
// ctx.moveTo(centerX, centerY);
// ctx.arc(centerX, centerY, radius, (part1Degrees * Math.PI) / 180, ((part1Degrees + part2Degrees) * Math.PI) / 180);
// ctx.fillStyle = "blue";
// ctx.fill();

// // Part 3
// ctx.beginPath();
// ctx.moveTo(centerX, centerY);
// ctx.arc(centerX, centerY, radius, ((part1Degrees + part2Degrees) * Math.PI) / 180, ((part1Degrees + part2Degrees + part3Degrees) * Math.PI) / 180);
// ctx.fillStyle = "green";
// ctx.fill();
