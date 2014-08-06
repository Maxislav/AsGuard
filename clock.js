function class_clock(){
		this.show = function time()	{
					var request_db;
					var tm=new Date();
					var h=tm.getHours();
					var m=tm.getMinutes();
					var s=tm.getSeconds();
					m=checkTime(m);
					s=checkTime(s);
					document.getElementById('clock').innerHTML=h+":"+m+":"+s;
					t=setTimeout('clock.show()',500);
		}
		
		this.show_request = function time()	{
					var request_db;
					var tm=new Date();
					var h=tm.getHours();
					var m=tm.getMinutes();
					var s=tm.getSeconds();
					m=checkTime(m);
					s=checkTime(s);
					document.getElementById('clock2').innerHTML=h+":"+m+":"+s;
						
					//t=setTimeout('clock.show()',500);
		}
		
		this.start_site=function start_site(){
		pusk();
		}
		
		
		function checkTime(i){
			if (i<10){
				i="0" + i;
				}
		return i;
		}
					
}
					
var clock = new class_clock();
