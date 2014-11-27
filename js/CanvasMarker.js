/**
 * Created with JetBrains WebStorm.
 * User: Администратор
 * Date: 9/12/13
 * Time: 8:39 PM
 * To change this template use File | Settings | File Templates.
 */
function CanvasMarker() {
    this.cnv = null;
    this.cnvSh = null;
    var colorPlus, colorMinus, rgba1, rgba2, op;
    var gradient;
    var maxSpeed = 100;
    this.init = function () {
        this.cnv = [];
        this.cnvSh = [];
    };


    this.open = function (countMarker, speed, azimut) {
        this.init();
        this.setCanvas(countMarker,speed,azimut);

    };

    this.setCanvas = function (countMarker,speed,azimut) {
        document.getElementById('markerId' + countMarker).innerHTML = '<canvas width="30" height="30"  style="position: absolute; left: 1px; top:2px" id="cnvShMarkerId' + countMarker + '"></canvas>'+
            '<canvas width="30" height="30" class="cnvMarkerIco" style="position: absolute; left: 0; top: 0" id="cnvMarkerId' + countMarker + '"></canvas>';
        this.cnv[countMarker] = document.getElementById('cnvMarkerId' + countMarker).getContext('2d');
        this.cnvSh[countMarker] = document.getElementById('cnvShMarkerId' + countMarker).getContext('2d');
        this.draw(this.cnv[countMarker],this.cnvSh[countMarker],countMarker,speed,azimut);

        this.initListeners(countMarker);

    };

    this.draw = function (cnv, cnvSh, countMarker,speed,azimut) {
        var timeAgo = this.difference(countMarker);
        cnv.translate(15, 15);
        cnvSh.translate(15, 15);
        if(timeAgo<=600){

            if(speed==0){

                cnv.beginPath();
                cnv.arc(0, 0, 7, 0, 2*Math.PI, true);
                var gradient = cnv.createRadialGradient(0, -4, 0, 0, 0, 10);
                gradient.addColorStop("0",'rgba(255,255,255,1)');
                gradient.addColorStop("0.5",'rgba(255,93,0,1)');

                gradient.addColorStop("1.0",'rgba(195,93,0,1)');
                cnv.fillStyle = gradient;
                cnv.fill();

                cnv.beginPath();
                cnv.arc(0, 0, 7, 0, 2*Math.PI, true);
                cnv.strokeStyle = '#9b4d00';
                cnv.stroke();




                cnvSh.beginPath();
                cnvSh.arc(0, 0, 7, 0, 2*Math.PI, true);
                gradient = cnvSh.createRadialGradient(0, -4, 0, 0, 0, 10);
                gradient.addColorStop("0",'rgba(0,0,0,1)');
                gradient.addColorStop("0.5",'rgba(0,0,0,0.4)');

                gradient.addColorStop("1.0",'rgba(195,93,0,1)');
                cnvSh.fillStyle = gradient;
                cnvSh.fill();

                cnvSh.beginPath();
                cnvSh.arc(0, 0, 7, 0, 2*Math.PI, true);
                cnvSh.strokeStyle = 'rgba(0,0,0,0.4)';
                cnvSh.stroke();

            }else{

                cnv.rotate(this.degree(azimut));
                cnvSh.rotate(this.degree(azimut));
                cnv.scale(1.1,1.1);
                cnvSh.scale(1.2,1.2);

                cnv.beginPath();
                cnv.moveTo(0, 0);
                cnv.moveTo(0, -10);
                cnv.lineTo(7, 7);
                cnv.lineTo(0, 0);
                cnv.fillStyle = '#007ae3';
                cnv.fill();


                cnv.beginPath();
                cnv.moveTo(0, 0);
                cnv.moveTo(7, 7);
                cnv.lineTo(0, 3);
                cnv.lineTo(0, 0);
                cnv.fillStyle = '#0064a4';
                cnv.fill();

                cnv.beginPath();
                cnv.moveTo(0, 0);
                cnv.moveTo(0, 3);
                cnv.lineTo(-7, 7);
                cnv.lineTo(0, 0);
                cnv.fillStyle = '#00396f';
                cnv.fill();

                cnv.beginPath();
                cnv.moveTo(0, 0);
                cnv.moveTo(-7, 7);
                cnv.lineTo(0, -10);
                cnv.lineTo(0, 0);
                cnv.fillStyle = '#00e5ff';
                cnv.fill();

                //cnv.translate(1, 0);
                cnv.beginPath();
                cnv.lineWidth = 1;
                cnv.strokeStyle = '#003557';
                cnv.moveTo(0, -10);
                cnv.lineTo(7, 7);
                cnv.lineTo(0, 3);
                cnv.lineTo(-7, 7);
                cnv.lineTo(0, -10);
                cnv.stroke();


                cnvSh.beginPath();
                cnvSh.moveTo(0, -10);
                cnvSh.lineTo(7, 7);
                cnvSh.lineTo(0,3);
                cnvSh.lineTo(-7, 7);
                cnvSh.lineTo(0, -10);

                cnvSh.lineWidth = 1;
                cnvSh.strokeStyle = '#003557';
                cnvSh.fillStyle = 'rgba(0,0,0,0.4)';
                cnvSh.fill();
            }

        }else if(timeAgo<86400){

            colorPlus = parseFloat((255 - (timeAgo*(255/86400))).toFixed(0));
            colorMinus = parseFloat((timeAgo*(255/86400)).toFixed(0));
            op = 1- timeAgo/86400;
            rgba1 = 'rgba(255,255'+','+colorMinus+','+'1'+')';
            rgba2 = 'rgba('+colorPlus+','+colorPlus+','+colorPlus+',1)';
            var gradient = cnv.createRadialGradient(0, 0, 0, 0, 0, 14);
            gradient.addColorStop("0",rgba1);
            gradient.addColorStop("1.0",'rgba(255,255,255,1)');
            cnv.fillStyle = gradient;

            cnv.fillRect(-7, -7, 14, 14);
            cnv.beginPath();
            cnv.moveTo(-7, -7);
            cnv.lineTo(7, -7);
            cnv.lineTo(7, 7);
            cnv.lineTo(-7, 7);
            cnv.lineTo(-7, -7);
            cnv.lineWidth = 1;
            cnv.strokeStyle = '#00000';
            cnv.stroke();



            cnvSh.beginPath();
            cnvSh.moveTo(-7, -7);
            cnvSh.lineTo(7, -7);
            cnvSh.lineTo(7, 7);
            cnvSh.lineTo(-7, 7);
            cnvSh.lineTo(-7, -7);
            cnvSh.lineWidth = 1;
            cnvSh.strokeStyle = 'rgba(0,0,0,0.5)';
            cnvSh.stroke();
            cnvSh.fillStyle = 'rgba(0,0,0,0.5)';
            cnvSh.fill();



        }else{
            gradient = cnv.createRadialGradient(0, 0, 0, 0, 0, 14);
            gradient.addColorStop("0",'rgba(255,255,255,1)');
            gradient.addColorStop("1.0",'rgba(255,255,255,0.5)');
            cnv.fillStyle = gradient;
            cnv.fillRect(-7, -7, 14, 14);
            cnv.beginPath();
            cnv.moveTo(-7, -7);
            cnv.lineTo(7, -7);
            cnv.lineTo(7, 7);
            cnv.lineTo(-7, 7);
            cnv.lineTo(-7, -7);
            cnv.lineWidth = 1;
            cnv.strokeStyle = 'rgba(0,0,0,1)';
            cnv.stroke();

            cnvSh.beginPath();
            cnvSh.moveTo(-7, -7);
            cnvSh.lineTo(7, -7);
            cnvSh.lineTo(7, 7);
            cnvSh.lineTo(-7, 7);
            cnvSh.lineTo(-7, -7);
            cnvSh.lineWidth = 1;
            cnvSh.strokeStyle = 'rgba(0,0,0,0.4)';
            cnvSh.stroke();
            cnvSh.fillStyle = 'rgba(0,0,0,0.4)';
            cnvSh.fill();
        }
    };

    this.difference = function (i) {
        var presentSS = calcTime.ssYear(calcTime.present_time());//секунд с начала года текущие
        var parcelSS = calcTime.ssYear(calcTime.plusGmt(arrLastPos[i][3]));  //секунд с начала года в посылке
        return (presentSS - parcelSS);
    };

    this.setCanvasTrack = function(_id, speed){
		window[_id].innerHTML = '<canvas width="20" height="20"  style="position: absolute; left: 1px; top:2px" id="cnvShTrackId' + _id + '"></canvas>'+
//        document.getElementById('icoTrack' + i).innerHTML = '<canvas width="20" height="20"  style="position: absolute; left: 1px; top:2px" id="cnvShTrackId' + i + '"></canvas>'+
            '<canvas width="20" height="20" class="cnvMarkerIco" style="position: absolute; left: 0; top: 0" id="cnvTrackId' + _id + '"></canvas>';

        this.drawTrackMarker(
            document.getElementById('cnvTrackId' + _id).getContext('2d'),
            document.getElementById('cnvShTrackId' + _id).getContext('2d'),
            _id,
            speed
        )

    }



    this.drawTrackMarker = function(cnv, cnvSh, i, speed){
        cnv.translate(10, 10);
        cnvSh.translate(10, 10);

        if(speed == 0){ //скорость 0
            cnv.scale(0.8,0.8);
            cnvSh.scale(0.8,0.8);
            gradient = cnv.createRadialGradient(0, 0, 0, 0, 0, 14);
            gradient.addColorStop("0",'rgba(254,211,255,1)');
            gradient.addColorStop("0.4",'rgba(255,0,255,1)');
            gradient.addColorStop("1.0",'rgba(255,0,255,1)');
            cnv.fillStyle = gradient;
            cnv.fillRect(-7, -7, 14, 14);
            cnv.beginPath();
            cnv.moveTo(-7, -7);
            cnv.lineTo(7, -7);
            cnv.lineTo(7, 7);
            cnv.lineTo(-7, 7);
            cnv.lineTo(-7, -7);
            cnv.lineWidth = 1;
            cnv.strokeStyle = 'rgba(0,0,0,1)';
            cnv.stroke();
        }else if(speed<maxSpeed/5){
            cnv.scale(0.6,0.6);
            cnvSh.scale(0.6,0.6);
            cnv.beginPath();
            cnv.arc(0, 0, 7, 0, 2*Math.PI, true);
            gradient = cnv.createRadialGradient(0, -4, 0, 0, 0, 10);
            gradient.addColorStop("0",'rgba(255,255,255,1)');
            gradient.addColorStop("0.5",'rgba(255,0,255,1)');
            gradient.addColorStop("1.0",'rgba(255,0,255,1)');
            colorMinus = parseFloat((255-(speed*255/(maxSpeed/5))).toFixed(0));
            rgba1 = 'rgba('+colorMinus+',0,255,1)';

            cnv.fillStyle = rgba1;
            cnv.fill();
            cnv.strokeStyle = '#000';
            cnv.stroke();




        }else if(speed<(2*maxSpeed/5)){
            cnv.scale(0.6,0.6);
            cnvSh.scale(0.6,0.6);
            cnv.beginPath();
            cnv.arc(0, 0, 7, 0, 2*Math.PI, true);
            colorPlus = parseFloat((((speed-(maxSpeed/5))*255/(maxSpeed/5))).toFixed(0));
            rgba1 = 'rgba(0,'+colorPlus+',255,1)';
            cnv.fillStyle = rgba1;
            cnv.fill();
            cnv.strokeStyle = '#000';
            cnv.stroke();

        }else if(speed<(3*maxSpeed/5)){
            cnv.scale(0.6,0.6);
            cnvSh.scale(0.6,0.6);
            cnv.beginPath();
            cnv.arc(0, 0, 7, 0, 2*Math.PI, true);
            colorMinus = parseFloat((255-((speed-(2*maxSpeed/5))*255/(maxSpeed/5))).toFixed(0));
            rgba1 = 'rgba(0,255,'+colorMinus+',1)';
            cnv.fillStyle = rgba1;
            cnv.fill();
            cnv.strokeStyle = '#000';
            cnv.stroke();

        }else if(speed<(4*maxSpeed/5)){
            cnv.scale(0.6,0.6);
            cnvSh.scale(0.6,0.6);
            cnv.beginPath();
            cnv.arc(0, 0, 7, 0, 2*Math.PI, true);
            colorPlus = parseFloat((((speed-(3*maxSpeed/5))*255/(maxSpeed/5))).toFixed(0));
            rgba1 = 'rgba('+colorPlus+',255,255,1)';
            cnv.fillStyle = rgba1;
            cnv.fill();
            cnv.strokeStyle = '#000';
            cnv.stroke();

        }else if(speed<maxSpeed){
            cnv.scale(0.6,0.6);
            cnvSh.scale(0.6,0.6);
            cnv.beginPath();
            cnv.arc(0, 0, 7, 0, 2*Math.PI, true);
            colorMinus = parseFloat((255-((speed-(4*maxSpeed/5))*255/(maxSpeed/5))).toFixed(0));
            rgba1 = 'rgba(255,'+colorMinus+',0,1)';
            cnv.fillStyle = rgba1;
            cnv.fill();
            cnv.strokeStyle = '#000';
            cnv.stroke();

        }else{
            cnv.scale(0.6,0.6);
            cnvSh.scale(0.6,0.6);
            cnv.beginPath();
            cnv.arc(0, 0, 7, 0, 2*Math.PI, true);
            rgba1 = 'rgba(255,0,0,1)';
            cnv.fillStyle = rgba1;
            cnv.fill();
            cnv.strokeStyle = '#000';
            cnv.stroke();
        }





    };





    this.degree = function(a) {
        return a * Math.PI / 180;
    };

    this.initListeners = function(i){
            marker[i].on('mousedown', function(e) {
                document.getElementById('cnvShMarkerId'+i).setAttribute("class", "leaflet-marker-icon-active");
            });

            $('#markerId' + i).mouseup(function() {
                document.getElementById('cnvShMarkerId'+i).setAttribute("class", "leaflet-marker-icon-normal");
            });

    };




}
var canvasMarker = new CanvasMarker;
