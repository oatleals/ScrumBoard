const COLS = 8;
const ROWS = 10;
const WIDTH = 1920;
const HEIGHT = 1080;

var c = document.getElementById("board");
var ctx = c.getContext("2d");

for (var i = 0; i <= ROWS; i++) {
	ctx.moveTo(i * WIDTH / ROWS, 0);
	ctx.lineTo(i * WIDTH / ROWS, HEIGHT);
}

for (var i = 0; i <= COLS; i++) {
	ctx.moveTo(0, i * HEIGHT / COLS);
	ctx.lineTo(WIDTH, i * HEIGHT / COLS);
}

ctx.stroke();