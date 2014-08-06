<?php
$lat=$_GET["lat"];
$lng=$_GET["lng"];
?>


<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>yandex</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
	<meta name="viewport" content="width=device-width, initial-scale=1.35">
    <!--
        Подключаем API карт 2.x
        Параметры:
          - load=package.full - полная сборка;
	      - lang=ru-RU - язык русский.
    -->
    <script src="http://api-maps.yandex.ru/2.0/?load=package.full&lang=ru-RU"
            type="text/javascript"></script>


</head>

<style type="text/css">
  html { height: 100% }
  body { height: 100%; margin: 0px; padding: 0px }

</style>

<body>


<div id="map" style="width:100%; height:100%"></div>
</body>



    <script type="text/javascript">
        // Как только будет загружен API и готов DOM, выполняем инициализацию
        ymaps.ready(init);

        function init () {
		
		
		
		
			var lat = <?php echo  $lat; ?>;
			var lng = <?php echo  $lng; ?>;
		
            var myMap = new ymaps.Map("map", {
                    center: [lat, lng],
                    zoom: 14,
					behaviors: ["default", "scrollZoom"]
                }),
            
		
    
			
                // Второй способ
                myGeoObject = new ymaps.GeoObject({
                    // Геометрия.
                    geometry: {
                        // Тип геометрии - точка
                        type: "Point",
                        // Координаты точки.
                        coordinates: [lat, lng]
                    }
                });

            // Добавляем метки на карту
            myMap.geoObjects.add(myGeoObject);
               
              
			  
			myMap.controls.add("mapTools")
			// Добавление кнопки изменения масштаба 
			.add("zoomControl");
		
		myMap.controls.add('trafficControl',{top: 5, right: 5});
			  
			  
        }
		
		
    </script>


</html>
