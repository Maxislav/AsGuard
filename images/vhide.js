function vhide(obj){
	
var id=obj.id;
//alert (id);
var boxid;
if(id=='send_email' || id=="cancel_send"){
boxid='div_send';
id='send_email';
}

if(id=="but_mh"){
document.getElementById("div_oblasti").style.visibility="hidden";
boxid='mh';
}

if(id=='oblasti'){
boxid='mh';
}

if(id=="confirm_send"){
boxid="div_send";
send();
id="send_email";
}


if(id=="setting"){
boxid="div_setting";
}



if(document.getElementById(boxid).style.visibility=="visible"){   //управляемый
	document.getElementById(boxid).style.visibility="hidden";
	document.getElementById(id).style.color="#000";                  //управлющий
	document.getElementById(id).style.textShadow="none";
	
	}else{
	document.getElementById(boxid).style.visibility="visible";
	document.getElementById(id).style.color="#fff";
	document.getElementById(id).style.textShadow="0px 0px 1px #fff,0px 0px 5px #caf5fc,0px 0px 5px #caf5fc,0px 0px 5px #caf5fc  ";
	}
	
	
			
}