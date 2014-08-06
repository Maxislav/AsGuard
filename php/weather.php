<?php

//http://meteoinfo.by/radar/UKBB/UKBB_latest.png

//file_put_contents('UKBB_latest.png',file_get_contents('http://meteoinfo.by/radar/UKBB/UKBB_latest.png?0.8627558420412242');
//copy("http://meteoinfo.by/radar/UKBB/UKBB_latest.png","imagepp.png");


//$urlImage = 'http://s2.gismeteo.ua/static/images/icons/new/d.sun.c4.png';
//file_put_contents(time().".png", file_get_contents($urlImage));

$url = 'http://meteoinfo.by/radar/UKBB/UKBB_latest.png';
$s = file_get_contents($url);
file_put_contents('UKBB.png', $s);





echo base64_encode($s) ;
?>