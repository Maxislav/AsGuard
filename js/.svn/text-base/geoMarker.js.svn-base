function geo_marker(lat, lng, count_geo){
     var ops=1;
     var count_geo=count_geo;
    // alert(count_geo);
    var g='<canvas id="geo'+count_geo+'" width=40 heignt=40 style="margin-left:-20px; mrgin-top: -20px"></canvas>';
    var geo_sersh_ico = L.divIcon({html: g, className:geo_sersh_ico});
   var geo_mark= L.marker([lat, lng], {icon: geo_sersh_ico}).addTo(map);
   // alert(lat+" "+lng);
   
   var pic = document.getElementById('geo'+count_geo).getContext('2d'); 
   
   
    draw();
  var count_redrow=0;
  function draw(){
  pic.clearRect (0, 0, 40, 40);
   
  ops=ops-0.1;
  pic.beginPath();
  pic.fillStyle ="rgba(255,0,0, "+ops+")";
  pic.strokeStyle = "rgba(0,0,255, "+ops+")";
   pic.lineWidth=3;
  
  pic.arc(20, 20, 10, 0, Math.PI*2, true);
  pic.stroke();

      pic.closePath();
  pic.fill();
    if(0<ops){
   setTimeout(draw, 100);
    
    }else{
   
        ops=1;
       count_redrow++;
       if(count_redrow<10){
        draw();
       }else{//  
          map.removeLayer(geo_mark);
       }
    }
  
  }
  
  //setTimeout(draw, 100);
  
  
}
