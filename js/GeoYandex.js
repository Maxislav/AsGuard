/**
 * Created with JetBrains WebStorm.
 * User: Администратор
 * Date: 9/28/13
 * Time: 9:49 PM
 * To change this template use File | Settings | File Templates.
 */
function GeoYandex(){
    this.lat = null;
    this.lng= null;
    var myMap;



    this.init = function(lat, lng){
        this.lat = lat;
        this.lng= lng;
    };

    this.open = function(){
        var scope = geoYandex;


        navigator.geolocation.getCurrentPosition(function(position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
           // alert(latitude+' '+longitude);
            scope.show(latitude,longitude)
        });


      //  scope.show( this.lat, this.lng );
    };


    this.show = function(lat,lng){
       // alert('ff');



       // lat =   this.lat; lng = this.lng;
        if(lat==0){
            lat = 50.5429;
            lng =  30.462;

        }

        myMap = new ymaps.Map("map", {
                center: [lat, lng],
                zoom: 14,
                behaviors: ["default", "scrollZoom"]
            }),




        // Второй способ
            /*
            myGeoObject = new ymaps.GeoObject({
                // Геометрия.
                geometry: {
                    // Тип геометрии - точка
                    type: "Point",
                    // Координаты точки.
                    coordinates: [lat, lng]
                }
            });
        */

        // Добавляем метки на карту


        myGeoObject = new ymaps.Placemark([lat, lng], {
            balloonContent: 'Мое местоположение'
        }, {
            iconImageHref: 'images/myIcon.gif', // картинка иконки
            iconImageSize: [30, 42], // размеры картинки
            iconImageOffset: [-3, -42] // смещение картинки
        });




        myMap.geoObjects.add(myGeoObject);



        myMap.controls.add("mapTools")
            // Добавление кнопки изменения масштаба
            .add("zoomControl");

        myMap.controls.add('trafficControl',{top: 5, right: 5});
        this.getEvents();
    }


    this.getEvents = function(){
        var scope = geoYandex;
        $.ajax({
            type:'POST',
            url:'dtp.php',
            data: 'login='+'MH'+'&event='+1+'&event_change='+1+'&event_confirm='+1,
            async: false,
            success: function (data){
               // events = data;
                scope.parseEvents(data)
               // alert(events);
            }

        }).responseText;


    }

    this.parseEvents = function(data){
        var arrEvents = [];
        var fulllarrdtp = [];
        arrEvents = data.split("&#33");

        for(var i=0; i<arrEvents.length; i++){
            fulllarrdtp[i]=arrEvents[i].split("&#32");
        }
        this.markMap(fulllarrdtp)
    };

    this.markMap = function (arr){

    for (var i = 0; i<arr.length-1; i++){
        var lat = arr[i][1];
        var lng = arr[i][2];









        myGeoObject = new ymaps.GeoObject({
            // Геометрия.
            geometry: {
                // Тип геометрии - точка
                type: "Point",
                // Координаты точки.
                coordinates: [lat, lng],

            }
        });
        myMap.geoObjects.add(myGeoObject);
    }



    }


}
var geoYandex = new GeoYandex();