const rows = 5;
const cols = 5;
const width = 2000;
const height = 1500;

var c = document.getElementById("board");
var ctx = c.getContext("2d");

for (var i = 0; i <= rows; i++) {
	ctx.moveTo(i * width / rows, 0);
	ctx.lineTo(i * width / rows, height);
}

for (var i = 0; i <= cols; i++) {
	ctx.moveTo(0, i * height / cols);
	ctx.lineTo(width, i * height / cols);
}

ctx.stroke();