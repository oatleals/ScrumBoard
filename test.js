var users = document.querySelector('.users');
var scrumBoard = document.getElementById('board');
var ctx = scrumBoard.getContext("2d");

//Creating websocket
var websocket= new Websocket("ws://127.0.0.1:6789/");

scrumBoard.onmousedown=function (event){
        websocket.send(JSON.stringify({action: 'mouse_down', Xposition: event.clientX,
Yposition: event.clientY}));
}                                      
        
sboard.onmouseup= function (event){
        websocket.send(JSON.stringify({action: 'mouse_up', Xposition: event.clientX,
                                       Yposition: event.clientY}));
        }
        
//Handling message from server

websocket.onmessage = function (event) {
        data=JSON.parse(event.data);
        console.log(event.data);
        switch (data.type) {
                case 'lines':
                    ctx.moveTo(data.X1, data.Y1);
                    ctx.lineTo(data.X2, data.Y2);
                    ctx.stroke();
                    break;
                case 'users':
                    users.style.background="white";
                    users.textContent=(
                            data.count.toString() + " user" + 
                            data.count == 1 ? "" : "s online"));
                    break;
                default: 
                    console.error(
                            "unsupported action", data);
        }
};
            
//Changing color of the server bar when disconnect occurs
websocket.onclose = function (event){
        users.textContent="Server Disconnected";
        users.style.background="orange";
};