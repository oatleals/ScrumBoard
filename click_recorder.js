var users = document.querySelector('.users');
var board = document.getElementById('scrumboard');
var ctx = board.getContext("2d");

//Creating websocket
var websocket = new WebSocket("ws://127.0.0.1:6789/");

board.onmousedown = function (event) {
	websocket.send(JSON.stringify({action: 'mouseDown', XPosition: event.clientX, YPosition: event.clientY}));
}

board.onmouseup = function (event) {
	websocket.send(JSON.stringify({action: 'mouseUp', XPosition: event.clientX, YPosition: event.clientY}));
}

//Handling message from server
websocket.onmessage = function (event) {
	data = JSON.parse(event.data);
	console.log(event.data);
	switch (data.type) {
		case 'lines':
			ctx.moveTo(data.X1, data.Y1);
			ctx.lineTo(data.X2, data.Y2);
			ctx.stroke();
			break;					
		case 'users':
			users.style.background = "white";
			users.textContent = (
				data.count.toString() + " user" +
				(data.count == 1 ? "" : "s online"));
			break;
		default:
			console.error(
				"unsupported event", data);
	}
};
	
//This function executes when the websocket transitions to the CLOSED
//event. Normally this only happens when the server process terminates.
websocket.onclose = function (event){
	users.textContent = "Server Disconnected";
	users.style.background = "red";
};
        
        
        