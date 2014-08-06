function setting(){
	this.show=function(){
		var stroka="";
		stroka+= "<tr>"+"<td style='border-bottom: 1px solid #7EBFC1;' colspan='4'  align='center' >"+"Register device"+"</td>"+"</tr>";
		stroka=stroka+"<tr>"+"<td style=' border-bottom: 2px solid #7EBFC1;  ' align='center'  >"+"N"+"</td>"+"<td style=' border-bottom: 2px solid #7EBFC1;' align='center'>"+"imai/id"+"</td>"+"<td style=' border-bottom: 2px solid #7EBFC1; ' align='center'>"+"devise name"+"</td>"+"<td style=' border-bottom: 2px solid #7EBFC1; ' align='center'>"+"phone"+"</td>"+"</tr>";
		for (var i = 0; i<countUzers; i++){
		stroka=stroka+"<tr id='"+i+"' onclick='set.click(this)'  class='pointer'>"+"<td style=' border-bottom: 2px solid #7EBFC1; ' align='center' >"+(i+1)+"</td>"+"<td style=' border-bottom: 2px solid #7EBFC1;' align='center'>"+uzer [i][0]+"</td>"+"<td style=' border-bottom: 2px solid #7EBFC1; ' align='center'>"+uzer [i][1]+"</td>"+"<td style=' border-bottom: 2px solid #7EBFC1; ' align='center'>"+uzer [i][2]+"</td>"+"</tr>";
		}
		var addDevise;
		
		addDevise="<tr>"+"<td style=' border-bottom: 2px solid #7EBFC1; ' align='center' >"+"new"+"</td>"+"<td style=' border-bottom: 2px solid #7EBFC1;' align='center'>"+"<input id='imai' onkeyup='return proverka(this)' type='text' size='16'>"+"</td>"+"<td style=' border-bottom: 2px solid #7EBFC1;' align='center'>"+"<input id='devise_name' type='text' size='5'>"+"</td>"+"<td style=' border-bottom: 2px solid #7EBFC1;' align='center'>"+"<input id='phone' type='text' size='5'>"+"</td>"+"</tr>";
		stroka+=addDevise;
		return stroka;
	}
	
	
	this.click=function(obj){
	//alert (obj.id);
		for (var i = 0; i<countUzers; i++){
		document.getElementById(i).style.color="#000";
		}
		var n=parseInt(obj.id);
		document.getElementById(obj.id).style.color="red"; 
		document.getElementById("i_rem_dev").innerHTML=(n+1); 
	}
	
	
	
	
}

var set = new setting();