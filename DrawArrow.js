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
       ctx.lineTo(xu, yu);
	   ctx.strokeStyle = data.Color;
	   ctx.stroke();

       
       
       
       }
       
       
       
   