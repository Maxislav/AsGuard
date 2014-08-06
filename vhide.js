function vhide(obj) {

    var id = obj.id;
    var element = obj.element;
//alert (id);
    var boxid;
    if (id == 'send_email' || id == "cancel_send") {
        boxid = 'div_send';
        id = 'send_email';
    }

    if (id == "but_mh") {
        document.getElementById("div_oblasti").style.visibility = "hidden";
        boxid = 'mh';
    }

    if (id == 'oblasti') {
        boxid = 'mh';
    }

    if (id == "confirm_send") {
        boxid = "div_send";
        send();
        id = "send_email";
    }


    if (id == "setting") {
        boxid = "div_setting";
        set.init();
    }

    if (id == "statistics") {
        boxid = "mh";
    }

    if (id == "show_graph_speed") {
        boxid = "div_graph_speed";
    }

    if (id == "close_graph") {
        boxid = "div_graph_speed";
        id = "show_graph_speed";
    }
    ;

    if (id == "addEvent") {
        boxid = "div_msg_dtp";

    }
    ;
    //new
    if (id == 'canceReportDtp') {
        boxid = "div_msg_dtp";
        id = "addEvent";
    }

    if (id == 'target') {
        boxid = "div_avto";
		if(window['zone']) {
			zone.position();
		}
    }

    if (id == 'statisticsOnMap') {
        document.getElementById('mh').style.visibility = "hidden";
        boxid = 'selectPeriodDtp';
        loadScript('js/DtpOnMap.js');



    }

    if(id=='cancelReport'){
        id = 'k_report';
        boxid ='div_report';

    }
    if(id=='cancel_reMark'){
      //  alert('sa');
        boxid = 'div_reMark_dtp';
    }

    if(id=='send_personal'){
        boxid = 'div_personal';
        loadScript('js/Personal.js', loadPersonal);
       // personal.getUsers();
    }


    if(id=='btn_regions'){
        document.getElementById('mh').style.visibility = "hidden";
       // boxid = 'selectPeriodDtp';
        loadScript('js/Regions.js');
    }
    if(id=='information'){
        boxid = 'div_information';

    }



    if (boxid && id) {
      //  alert(id)
        if (document.getElementById(boxid).style.visibility == "visible") {   //управляемый
            $('#'+boxid).fadeTo(100,0,function(){
				document.getElementById(boxid).style.visibility = "hidden";
				//document.getElementById(id).style.color = "#000";                  //управлющий
			//	document.getElementById(id).style.textShadow = "none";
				if(boxid == 'div_personal'){
					$('#scrollbar4 input').css('visibility', 'hidden')
				}
			})


        } else {


				document.getElementById(boxid).style.visibility = "visible";
				//document.getElementById(id).style.color = "#fff";
				//document.getElementById(id).style.textShadow = "0px 0px 1px #fff,0px 0px 5px #caf5fc,0px 0px 5px #caf5fc,0px 0px 5px #caf5fc  ";
				if(boxid == 'div_personal'){
					$('#scrollbar4 input').css('visibility', 'visible');
				}
			$('#'+boxid).fadeTo(100,1);

        }
        if(boxid=='div_reMark_dtp'){
          //  document.getElementById(id).style.color = "#000";                  //управлющий
          //  document.getElementById(id).style.textShadow = "0 1px 0 #fff";
        }
    }

    if (element) {
        if (document.getElementById(element).style.visibility == "visible") {
            document.getElementById(element).style.visibility = "hidden";
        }

    }




}