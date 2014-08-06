<?php
$lat=$_GET["lat"];
$lng=$_GET["lng"];
if(!$lat){
	$lat = 0;
	$lng = 0;
}
?>


<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>yandex</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
	<!--<meta name="viewport" content="width=device-width, initial-scale=1.35">-->
	<meta name="viewport" content="width=device-width, initial-scale=1.35, height=device-height,minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">

        <meta name="MobileOptimized"  />
        <meta name="PalmComputingPlatform" content="true" />
	
    <!--
        Подключаем API карт 2.x
        Параметры:
          - load=package.full - полная сборка;
	      - lang=ru-RU - язык русский.
    -->
    <script src="http://api-maps.yandex.ru/2.0/?load=package.full&lang=ru-RU" type="text/javascript"></script>
    <script src="http://code.jquery.com/jquery-1.9.1.js"></script>
	<script type="text/javascript" src="js/GeoYandex.js"></script>

</head>

<style type="text/css">
  html { height: 100% }
  body { height: 100%; margin: 0px; padding: 0px }

</style>

<body>


<div id="map" style="width:100%; height:100%"></div>
</body>
    <script type="text/javascript">

             var lat = <?php echo  $lat; ?>;
    	     var lng = <?php echo  $lng; ?>;
    	     geoYandex.init(lat,lng);
        // Как только будет загружен API и готов DOM, выполняем инициализацию
        ymaps.ready(geoYandex.open);

    </script>
</html>
