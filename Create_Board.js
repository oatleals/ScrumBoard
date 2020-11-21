const columns=10
const rows=3
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
    
    
//Defining columns names    
context.font = '32px sans-serif';
context.fillText("To-Do", Width/rows-Width/(rows*2)-50, 30, 1000)
context.fillText('In-Progress',(Width/rows+Width/(rows*2))-88, 30, 1000)
context.fillText('Done',(Width/rows)*2+Width/(rows*2)-50, 30, 1000)