function class_graph_speed(){
	var width; 
	var height;
	var canvas
	var c;
	var from, to, period, scaleX, scaleY;
	var arrDraw;
	var maxS;
	var skaleDay=1;
	//alert(from);
	this.option = function setParam(){
	width=document.body.clientWidth-20; 
	if(800<width){
	width=width-330;
	}
	document.getElementById("div_graph_speed").style.width=width+"px";
	document.getElementById("div_graph_speed").style.marginLeft="-"+((width/2)+2+"px");
	height=document.getElementById("div_graph_speed").style.height;
	height=height.replace('px', '');
	document.getElementById("canvas_speed").width=width+1;
	
	canvas=document.getElementById("canvas_speed");
	c=canvas.getContext("2d");
	c.fillStyle ="rgba(255,255,255,0.6)";
	c.fillRect (0, 0, width, height);
	
	//$('#scrollbar3').toggleClass('overview').width("100%");
	var ww=width+1;
	document.getElementById("ss").innerHTML="#scrollbar3 .overview { list-style: none; width: "+ww+"px; padding: 0; margin: 0; position: absolute; left: 0px; top: 0;  }"
	
	//$('#scrollbar3').style(".overview").width='500px';
	 $('#scrollbar3').tinyscrollbar({ axis: 'x', wheel: 200});

	}
	

	this.zumPlus= function setOp(){
	width=width*2;
	document.getElementById("canvas_speed").width=width;
	canvas=document.getElementById("canvas_speed");
	c=canvas.getContext("2d");
	c.fillStyle ="rgba(255,255,255,0.6)";
	c.clearRect(0, 0, width, height);
	c.fillRect (0, 0, width, height);
	
	document.getElementById("ss").innerHTML="#scrollbar3 .overview { list-style: none; width: "+width+"px; padding: 0; margin: 0; position: absolute; left: 0px; top: 0;  }"
	$('#scrollbar3').tinyscrollbar_update('relative');
	
	
		try{
		graphSpeed.setFromTo(from, to);
		graphSpeed.maxSpeed(maxS);
		graphSpeed.draw(arrDraw);
		}catch(err){}
	}
	 
	this.zumMinus= function setOp(){
	width=width/2;
	
	document.getElementById("canvas_speed").width=width;
	canvas=document.getElementById("canvas_speed");
	c=canvas.getContext("2d");
	c.fillStyle ="rgba(255,255,255,0.6)";
	c.clearRect(0, 0, width, height);
	c.fillRect (0, 0, width, height);
	
	document.getElementById("ss").innerHTML="#scrollbar3 .overview { list-style: none; width: "+width+"px; padding: 0; margin: 0; position: absolute; left: 0px; top: 0;  }"
	$('#scrollbar3').tinyscrollbar_update('relative');
	
		try{
		graphSpeed.setFromTo(from, to);
		graphSpeed.maxSpeed(maxS);
		graphSpeed.draw(arrDraw);
		}catch(err){}
	}
	 
	
	
	this.setFromTo= function frTo(f, t){
	from = f;
	to=t;
	period=calcTime.ssYear(to) - calcTime.ssYear(from); //количество секунд
	scaleX=width/period;
	scaleDay=period/86400;
	//alert (scale);
		var stepLine=width/(24*scaleDay);
		var s=0;
		var h=0;
		//alert (s);
		for(var i =0; i<width; i+=stepLine/4){
			
			//alert(s);
				if(s==4){
				c.beginPath();
				c.strokeStyle  ="#828282";
				c.lineWidth = 2;
				c.moveTo(i, 0);
				c.lineTo(i, 200);
				c.stroke();
				
				h++;
				if(23<h){
				h=0;
				}
				c.fillStyle = '#00f';  //текст
				c.font = 'italic 10px sans-serif';
				c.textBaseline = 'top';
				c.fillText (h+".00h", i, 0)
				
				s=0;
				}else{
				c.beginPath();
				c.strokeStyle  ="#828282";
				c.lineWidth = 0.5;
				c.moveTo(i, 0);
				c.lineTo(i, 200);
				c.stroke();
			
				}
				s++;
			
		}
		
		
		
		
		
		
	}
	this.maxSpeed= function s(m){
	scaleY=200/m;
	maxS=m;
	var s=0
	var kmh=0;
		for(var i=0; i<200; i+=scaleY){
			s++;
			if(9<s){
					kmh+=10;
					c.beginPath();
					c.strokeStyle  ="#828282";
					c.lineWidth = 0.5;
					c.moveTo(0, (200-i));
					c.lineTo(width, (200-i));
					c.stroke();
					
					c.fillStyle = '#00f';  //текст
					c.font = 'italic 10px sans-serif';
					c.textBaseline = 'top';
					c.fillText (kmh+"km/h", 0, 193-i)
				
					
					
					
			s=0;
			}
			
			
			
		}
	
	
	//alert(scaleY);
	}
	
	
	
	
	this.draw= function drw(x){
		var arr=[];
		var x1, y1, x2, y2;
		arrDraw=x;
		
		for(var i=0; i<x.length-1; i++){
		arr[i]=x[i].split(",");
		}
		
		
		for(var i=0; i<x.length-2; i++){
		//arr[i]=x[i].split(",");
		
				x1=(width-((calcTime.ssYear(calcTime.plusGmt(to))-calcTime.ssYear(calcTime.plusGmt(arr[i][3])))*scaleX));
				y1=(200-(arr[i][4]*scaleY));
				//alert(x1+":"+y1);
				x2=(width-((calcTime.ssYear(calcTime.plusGmt(to))-calcTime.ssYear(calcTime.plusGmt(arr[i+1][3])))*scaleX));
				y2=(200-(arr[i+1][4]*scaleY));
				
				c.beginPath();
				c.strokeStyle  ="#f00";
				c.lineWidth = 1;
				c.moveTo(x1, y1);
				c.lineTo(x2, y2);
				c.stroke();
		
		
		}
	
	}
	
	
}
var graphSpeed = new class_graph_speed();
//var graphSpeed = new class_graph_speed();