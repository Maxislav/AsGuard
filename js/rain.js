////////////////// Rain	

	



	
function dot(){
	var x=parseInt(Math.random() * (width), 10);;
	var y=0;
	var ry;
	var rx;
	var dy;
	var w_pixel=parseInt(Math.random() * (5), 10); //размер пикселя
	var l=80; // длинна хвоста
	
	
	var ximg;
	var yimg;
	var r_img;
	var g_img;
	var b_img;
	
	var rr;
	var gg;
	var bb;
	
	
	var t=Math.random() * (20)
	ry=parseInt(Math.random() * (height/2),10);
	dy=y-ry;
	
	this.s=function set(){
	start();
	}
	
	function rxrandom(){
	x=parseInt(Math.random() * (1600), 10);
	ry=parseInt(Math.random() * (height/2),10);
	
	}
	
	function limit(z){
		if(height+200<z){ // 200 - длинна хваоста. Как только хвост уходит за пределы - рисуем заново
		rxrandom();
		return 0;
		}
		return z;	
		
	}
	
	
	var start=function(){
	dy=limit(dy)+1;
	pixel(x, dy);
	setTimeout(start, t);	
		
	}
	
	
	var pixel=function(x, y){ 
		
	c.fillStyle ="rgba("+r+","+b+","+g+", 1)";//цвет заливки	
	c.fillRect (x, y, w_pixel, w_pixel);
	//c.fillRect (x, y, 1, 1);
	
		for(var i=1; i<=l; i=i+4){
			
			 ximg=x;
			 yimg=y-i;
			 r_img=(yimg-1)*width*4+((ximg-1)*4);
			 g_img=r_img+1;
			b_img=r_img+2;
									
				
				for(var ii=0; ii<w_pixel; ii++){
					ximg=x+ii;
					yimg=y-i;
					r_img=(yimg-1)*width*4+((ximg-1)*4);
					g_img=r_img+1;
					b_img=r_img+2;
					
					rr=parseInt((255-i*(255-pix[r_img])/l),10);
					gg=parseInt((255-i*(255-pix[g_img])/l),10);
					bb=parseInt((255-i*(255-pix[b_img])/l),10);
					
					c.fillStyle="rgba(+"+rr+"," +gg+","+bb+",1)";
					c.fillRect (ximg, yimg, 1,1);
				}
				
				
				
		/* 		
			c.fillStyle="rgba(+"+(pix[r_img]+101-i)+"," +(pix[g_img]+101-i)+","+(pix[b_img]+101-i)+",1)";
			//c.fillStyle ="rgba("+(160-i)+","+(225-i)+","+(255-i)+", 1)";//цвет заливки	
			//c.fillRect (x, y-2*i, w_pixel,3);
			c.fillRect (ximg, yimg, 1,1);
		 */
			/* if (i==100 && 200<y){
			//alert(x+":"+ y);
				for(var ii=0; ii<w_pixel; ii++){
					var ximg=x+ii;
					var yimg=y-i;
					var r_img=(yimg-1)*width*4+((ximg-1)*4);
					var g_img=r_img+1;
					var b_img=r_img+2;
								
					c.fillStyle="rgba(+"+pix[r_img]+"," +pix[g_img]+","+pix[b_img]+",1)";
					c.fillRect (ximg, yimg, 1,1);
				}
			
			} */
		}
		
	
	
	
	}
}
