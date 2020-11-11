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
			//ctx.moveTo(data.X1, data.Y1);
			//ctx.lineTo(data.X2, data.Y2);
			//ctx.stroke();
			
			drawArrow(data.X1, data.Y1, data.X2, data.Y2);
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
        
        
//Creating a function that draws arrows

function drawArrow(x1,y1,x2,y2){
       //Seeing if the line is going up to adjust the triangle direction
       let higher_y = (y1>y2)? 1:-1;
       
       let slope = (x2-x1)/(y2-y1);
       let theta = Math.atan(slope);
       
       //Size of the triangle
       let tri_height=5
       let tri_width=10
       
       //Center of triangle base
       let tri_basex=x2+tri_height*Math.sin(theta)*higher_y;
       let tri_basey=y2+tri_height*Math.cos(theta)*higher_y;
       
       //Point in triangle where the line ends
       let point_in_trix=x2+Math.sin(theta)*higher_y;
       let point_in_triy=y2+Math.cos(theta)*higher_y;
       
       //Right side point
       let tri_rightx=tri_basex + (tri_width/2)*Math.cos(theta);
       let tri_righty=tri_basey - (tri_width/2)*Math.sin(theta);
       
       
       //Left side point
       let tri_leftx=tri_basex - (tri_width/2)*Math.cos(theta);
       let tri_lefty=tri_basey + (tri_width/2)*Math.sin(theta);
       
       
       let area=new Path2D();
       area.moveTo(x2,y2);
       
       //Making line to the right and left base points of the triangle
       area.lineTo(tri_rightx,tri_righty);
       area.lineTo(tri_leftx,tri_lefty);
       area.lineTo(x2,y2);
       area.closePath();
       
       //Adding color
       ctx.fillStyle=data.Color;
       ctx.fill(area)
       
       ctx.moveTo(data.X1, data.Y1);
       ctx.lineTo(point_in_trix, point_in_triy);
	   ctx.strokeStyle = data.Color;
	   ctx.stroke();

       
       
       
       }        
