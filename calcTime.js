function class_time(){
var yy; //год
var mm; //месяц
var dd; //день
var hh; //часы
var mi; // минуты
var ss; // ffсекунды

	this.unparse=function unp(t){ //принимаем 130401174156
		var date;
		var arr=[];
		arr=t.split("");
		var date;
		date=arr[4]+arr[5]+"/"+arr[2]+arr[3]+"/"+arr[0]+arr[1]+" "+arr[6]+arr[7]+":"+arr[8]+arr[9]+":"+arr[10]+arr[11];
	return date; //возвращаем  01/04/13 17:41:56
	}

	this.unparsePresent=function unp(t){ // принимаем 130401174156 послку по gmt
		//alert(t);
		
		var arr= new Array();
		var date;
	
		arr=t.split("");
		
		
		
		yy= (arr[0]+arr[1]);
		mm=(arr[2]+arr[3]);
		dd=parseFloat(""+arr[4]+arr[5]); 
		hh=parseFloat(""+arr[6]+arr[7]); //не берет
		mi=(arr[8]+arr[9]);
		ss=(arr[10]+arr[11]);
		//alert(hp+" "+hh);
	
		hh=hh+gmt;
		
		if(23<hh){
		hh=hh-24;
		dd=parseFloat(dd);
		dd=dd+1;
		//alert(hh);
		}
		
		if(hh<10){
		hh="0"+hh;
		}
		if(dd<10){
		dd="0"+dd;
		}
		
		date=dd+"/"+mm+"/"+yy+" "+hh+":"+mi+":"+ss;
		//alert(date);
		return date; //возвращаем дату +GMT 01/04/13 19:41:56 
	}
	
	this.present_time=function unp(){ //иекущее время. снимаем текущую дату с компа юзера
		var date;
		var m=new Date();
		yy = m.getFullYear()-2000;
		mm = m.getMonth()+1; if (mm<10){mm="0"+mm;}
		dd = m.getDate() ;  if (dd<10){dd="0"+dd;}
		hh = m.getHours(); if (hh<10){hh="0"+hh;}
		mi = m.getMinutes(); if (mi<10){mi="0"+mi;}
		ss = m.getSeconds(); if (ss<10){ss="0"+ss;}
		var date=""+yy+mm+dd+hh+mi+ss ;
		return date;  //возвращаем дату 130401174156
	}
	
	this.plusGmt=function unp(t){  //принимаем 130401174156
	var date;
	arr=t.split("");
		yy= (arr[0]+arr[1]);
		mm=(arr[2]+arr[3]);
		dd=parseFloat(arr[4]+arr[5]);
		hh=parseFloat(arr[6]+arr[7]);
		mi=(arr[8]+arr[9]);
		ss=(arr[10]+arr[11]);

	
		hh=hh+gmt;
		
		if(23<hh){
		hh=hh-24;
		dd=parseFloat(dd);
		dd=dd+1;
		}
		
		if(hh<10){
		hh="0"+hh;
		}
		if(dd<10){
		dd="0"+dd;
		}
	date=""+yy+mm+dd+hh+mi+ss;
	return date; //возвращаем 130401194156 тату + gmt
	}
	
	this.minusGmt=function unp(t){  //принимаем 130401174156
	var date;
	arr=t.split("");
		yy= (arr[0]+arr[1]);
		mm=(arr[2]+arr[3]);
		dd=parseFloat(arr[4]+arr[5]);
		hh=parseFloat(arr[6]+arr[7]);
		mi=(arr[8]+arr[9]);
		ss=(arr[10]+arr[11]);

	
		hh=hh-gmt;
		
		if(hh<0){
		hh=hh+24;
		dd=parseFloat(dd);
		dd=dd-1;
		}
		
		if(hh<10){
		hh="0"+hh;
		}
		if(dd<10){
		dd="0"+dd;
		}
	date=""+yy+mm+dd+hh+mi+ss;
	return date; //возвращаем 130401194156 тату - gmt
	}
	
	
	
	//рсчет секунд с начала года
	this.ssYear=function unp(t){ //принимаем  послку вида  130401174156
		var arrMonthDay = [ 0, 31, 28, 31, 30, 31, 30, 31, 30,31,30,31,30];
		var arr=t.split("");
		
		var ssa=parseFloat(arr[10]+arr[11]);
		var mia=parseFloat(arr[8]+arr[9]);
		var hha=parseFloat(arr[6]+arr[7]);
		var dda=parseFloat(arr[4]+arr[5]);
		var mma=parseFloat(arr[2]+arr[3]);
		var yya=arr[0]+arr[1];
		
		mia=mia*60;
		hha=hha*3600;
		dda=dda*86400;
		 //сколько дней с начала года
		 var dsng=0;
			 for(var i=1; i<mma; i++){
			 dsng=dsng+arrMonthDay[i];
			 }
			 mma=dsng*86400;
		   
		
		var fullTime=mia+hha+dda+mma+ssa;
		
		return fullTime;   //секунд с начала года
	}
	
	
	this.parseCalendarFrom =function unp(t){ //получаем строку вида dd-mm-yy  06-05-2013
		
		var date;
		var arr=[];
        arr=t.split("-");
        date=arr[2].substring(2)+arr[1]+arr[0]+"000000";
		date=calcTime.minusGmt(date);
		return date;//возврааем возвращаем типа 130401030000 + gmt
	};


	
	this.parseCalendarTo =function unp(t){ //получаем строку вида dd-mm-yy  06-05-2013
		var date;
		var arr=[];
        arr=t.split("-");
		var z;
		z=parseFloat(arr[0]);
		z=z+1;
		if(z<10){
		z="0"+z;
		}
        date=arr[2].substring(2)+arr[1]+z+"000000";
		date=calcTime.minusGmt(date);
		return date; //возврааем возвращаем 130401030000 типа дату +1 день + gmt
	};

    this.parseCalendar  = function(t){ //получаем строку вида dd-mm-yy  06-05-2013
        var date;
        var arr=[];
        arr=t.split("-");
        date=arr[2].substring(2)+arr[1]+arr[0]+"000000";
        return date;//возврааем возвращаем типа 130401000000
    }

    this.parseCalendarPlus  = function(t){ //получаем строку вида dd-mm-yy  06-05-2013
        var date;
        var arr=[];
        arr=t.split("-");
        var z;
        z=parseFloat(arr[0]);
        z=z+1;
        if(z<10){
            z="0"+z;
        };
        date=arr[2].substring(2)+arr[1]+z+"000000";
        return date; //возврааем возвращаем 130401030000 типа дату +1 день
    }
	

}
var calcTime = new class_time();