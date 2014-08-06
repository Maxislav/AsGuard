<?php

//http://meteoinfo.by/radar/UKBB/UKBB_latest.png

//file_put_contents('UKBB_latest.png',file_get_contents('http://meteoinfo.by/radar/UKBB/UKBB_latest.png?0.8627558420412242');
//copy("http://meteoinfo.by/radar/UKBB/UKBB_latest.png","imagepp.png");


//$urlImage = 'http://s2.gismeteo.ua/static/images/icons/new/d.sun.c4.png';
//file_put_contents(time().".png", file_get_contents($urlImage));

$url = 'http://phpforum.ru/style_images/1/flags/Russia_.gif';
$s = file_get_contents($url);
file_put_contents('./data/newname.jpg', $s);





echo "ok";
?>