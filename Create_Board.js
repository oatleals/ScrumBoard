const columns=5
const rows=10
const Width=1920
const height=1080

var a=document.getElementById("scrumboard");
var context=a.getContext("2d");

for (var x=0; x<=rows; x++){
    context.moveTo(x*Width/rows,0);
    context.lineTo(x*Width/rows,height)};
    
for (var x=0; x<=columns; x++){
    context.moveTo(0,x*height/columns);
    context.lineTo(Width, x*height/columns);}
    
context.stroke();
    
