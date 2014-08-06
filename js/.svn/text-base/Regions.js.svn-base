function Regions() {
    this.points = null;
    ///this.regionLayer = null;
    var mainDiv = null;
    var featureGrouFlag = null, featureGrouName=null;
    var regionLayer = null;
    var centerMap, zoomMap;
    this.peopleObj=[];
    var atach=null;

    var cityDecode = {
        "Kiev":"Киев",
        "Kiev City":"Город Киев",
        "Zhytomyr":"Житомир",
        "Rivne":"Ровно",
        "Volyn":"Волынь",
        "L'viv":"Львов",
        "Ternopil'":"Тернополь",
        "Khmel'nyts'kyy":"Хмельницкий",
        "Vinnytsya":"Винница",
        "Chernivtsi":"Черновцы",
        "Transcarpathia":"Закарпатье",
        "Ivano-Frankivs'k":"Ивано-Франковск",
        "Cherkasy":"Черкассы",
        "Kirovohrad":"Кировоград",
        "Dnipropetrovs'k":"Днепропетровск",
        "Zaporizhzhya":"Запорожье",
        "Donets'k":"Донецк",
        "Luhans'k":"Луганск",
        "Kharkiv":"Харьков",
        "Poltava":"Полтава",
        "Sumy":"Сумы",
        "Chernihiv":"Чернигов",
        "Kirovohrad":"Кировоград",
        "Mykolayiv":"Николаев",
        "Kherson":"Херсон",
        "Crimea":"Крым",
        "Odessa":"Одесса"
    }

    var collectionName = [];

    this.init = function () {
        var scope = this;
        scope.setDiv();


    }

    this.setRegion = function (region) {
        var scope = this;
        var region = region;

        var mouseover = function (e) {
            //  this.popup.addTo(map);
            this.setStyle({color:'#9000ff'});
        }
        var mouseout = function (e) {
            this.setStyle({color:'blue'});
        }

        var onClick = function (e) {
            map.setView([e.latlng.lat, e.latlng.lng], 8);
        }
        /*
         function mouseover(e){
         this.setStyle({color: '#red'});
         }
         */
        function mouseout(e) {
            this.setStyle({color:'#blue'})
        }

        function onEachFeature(feature, layer) {
            var marker, iconDiv;
            var lis;
            var popupContent = 'Область:' + feature.properties.NAME_1 + (feature.properties.NAME_2 ? '</br> Район: ' + feature.properties.NAME_2 : '' );
            if (feature.properties && feature.properties.popupContent) {
                popupContent += feature.properties.popupContent;
            }
            layer.setStyle({weight:2});
            layer.on('click', onClick);
            //layer.on('mouseover', mouseover);
            $('#div_regions .ul_region').append(
                '<li>' +cityDecode[feature.properties.NAME_1]+ '</li>'
            )
            lis = $('#div_regions .ul_region li').last();
            layer.on('mouseover', function (e) {
                layer.setStyle({color: '#4f95ff',weight: 2,fillOpacity: 0.7,opacity: 1,fillColor:'#4f95ff'});
                if(!atach){
                    $("#list_helper .list").html(scope.setPeople(cityDecode[feature.properties.NAME_1]));
                    $("#list_helper .title").html(cityDecode[feature.properties.NAME_1]);
                }
                lis.addClass("active");
            });
            layer.on('mouseout', function (e) {
                layer.setStyle({color: '#006290',weight: 2,fillOpacity: 0.2,opacity: 0.5,fillColor:'#4f95ff'});
                lis.removeClass("active");
            });

            //  layer.on('mouseout', mouseout);
          //  layer.setStyle({color:'#4f95ff', opacity:'0.2'});
            layer.setStyle({color: '#006290',weight: 2,fillOpacity: 0.2,opacity: 0.5,fillColor:'#4f95ff'});
            layer.bindPopup(popupContent);

            $('#div_regions .ul_region li').last().hover(function() {
                $( this ).addClass("active");
                layer.setStyle({color: '#4f95ff',weight: 2,fillOpacity: 0.7,opacity: 1,fillColor:'#4f95ff'});
                if(!atach){
                    $("#list_helper .list").html(scope.setPeople(cityDecode[feature.properties.NAME_1]));
                    $("#list_helper .title").html(cityDecode[feature.properties.NAME_1]);
                    $("#list_helper").find(".changeT").each(function(){
                        regions.changeTextAreaLength(this)
                    })
                }
            }, function() {
                $( this ).removeClass("active");
                layer.setStyle({color: '#006290',weight: 2,fillOpacity: 0.2,opacity: 0.5,fillColor:'#4f95ff'});
            });
        }
        regionLayer = L.geoJson(region, {
            filter:function (feature, layer) {
                if (feature.properties) {
                    return feature.properties.underConstruction !== undefined ? !feature.properties.underConstruction : true;
                }
                return false;
            },

            onEachFeature:onEachFeature
        }).addTo(map);
        $(".ul_region").find('li').click(function(){

            if($(this).hasClass('atach')){
                $(this).removeClass('atach');
                atach = null;
            }else{
                $(".ul_region").find('li').removeClass('atach');
                $(this).addClass('atach');
                atach = true;
            }

        })

    }

    this.setCity = function (points) {
        points;
        var popup = [];
        var marker = [];
        var flagIcon, names;
        var markerFlag = [], iconDiv=[];
        var popup = [];
        for (var i = 0; i < points.collection.length; i++) {

            var lat, lng, demic;
            lat = '' + points.collection[i]['latlng'][1];
            demic = 100 * lat.split('.')[1] / 60;
            lat = lat.split('.')[0] + '.' + demic;
            lat = parseFloat(lat);

            lng = '' + points.collection[i]['latlng'][0];
            demic = 100 * lng.split('.')[1] / 60;
            lng = lng.split('.')[0] + '.' + demic;
            lng = parseFloat(lng);

            flagIcon = L.icon({
                iconUrl:'images/flagCity.png',
                iconSize:[14, 14 ], // size of the icon
                iconAnchor:[7, 7], // point of the icon which will correspond to marker's location
                popupAnchor:[0, -7] // point from which the popup should open relative to the iconAnchor
            });

            iconDiv[i] = L.divIcon({
                html:'<div style="width: 30px; height: 30px; color: #51382d; font-size: 14px; font-weight: bold"> <nobr>' + points.collection[i]['name'] + '</nobr></div>',
                iconSize:[30, 30],
                iconAnchor:[0, 25],
                className:'defaultMarker'
            });


            marker[i] = L.marker([lat, lng], {icon:iconDiv[i]});


            var point = new L.Point(0, -20);
            var mark;
            collectionName[i] = points.collection[i]['name'];

            markerFlag[i] = L.marker([ lat , lng], {icon:flagIcon});
            setPopup(markerFlag[i], i, points.collection[i], [lat, lng]);
            //markerFlag[i].addTo(map);

        }

        featureGrouFlag = L.featureGroup(markerFlag).addTo(map);
        featureGrouName = L.featureGroup(marker).addTo(map);

        function setPopup(marker, nN, collection, latlng) {
            var popup;
            var content = collection['name'];
            var popupNameSity;
            var iconDiv = L.divIcon({
                html:'<div style="width: 30px; height: 30px; color: #51382d; font-size: 14px; font-weight: bold"> <nobr>' + content + '</nobr></div>',
                iconSize:[30, 30],
                iconAnchor:[0, 25],
                className:'defaultMarker'

            });

            marker.on('mouseover', function (e) {
                popup = L.popup({offset:L.point(0, -5)})
                    .setLatLng(latlng)//(assuming e.latlng returns the coordinates of the event)
                    .setContent(content)
                    .openOn(map);
                popupNameSity= L.marker(latlng, {icon:iconDiv}).addTo(map);
            });
            marker.on('mouseout', function (e) {
                map.removeLayer(popup);
            });


        }

        this.getPeople();

    }

    this.getPeople = function () {
        var scope = this;
        $.ajax({
            type:'POST',
            url:'php/regionPeople.php',
            data:'pass=' + pass + '&login=' + login,
            success:function (data) {
                data;
                scope.peopleObj= JSON.parse(data);
                scope.peopleObj;
            },
            error:function (xhr, status, error) {
                console.log('Обрыв связи1');
            }

        });
    }
    this.changeTextAreaLength = function(e){
        var txtLength = e.value.length;
        var numRows = 0 ;
        var arrNewLines = e.value.split("\n");

        for(var i=0; i<=arrNewLines.length-1; i++){
            numRows++;
            if(arrNewLines[i].length > e.cols-5) {
                numRows += Math.floor(arrNewLines[i].length/e.cols)
            }
        }
        if(numRows < 1) {
            e.cols = (txtLength % e.cols) + 1 >= e.cols ? ((txtLength % e.cols) + 1) : e.cols ;
        }else{
            e.cols = e.cols ;
            e.rows = numRows;
        }
    }


   this.setPeople = function(region){
       var scope = this;
       var text="";
       for(var i = 0; i<scope.peopleObj.length; i++){
           if(scope.peopleObj[i]["oblast"]==region){
               text+='<div class="border-bottom">'+'<textarea rows="1" class="bold" style="width: 88%">'+scope.peopleObj[i]["name"]+'</textarea>'+
                   '<textarea rows="1" class="karma" style="width: 10%">'+scope.peopleObj[i]["karma"]+'</textarea>'+
                   '<textarea rows="1" class="changeT" style="width: 100%;" onkeyup="regions.changeTextAreaLength(this);">'+scope.peopleObj[i]["help"]+'</textarea>'+
                   '<textarea rows="1" class="changeT" style="width: 100%;" onkeyup="regions.changeTextAreaLength(this);">'+scope.peopleObj[i]["contact"]+'</textarea>'+
                   "</div>";

               /*
               text+="<div class='bold'>"+scope.peopleObj[i]["name"]+'<span class="karma" style="float: right">'+scope.peopleObj[i]["karma"]+'</span>'+"</div>"+
                   "<div>"+scope.peopleObj[i]["help"]+"</div>"+
                   "<div class='border-bottom'>"+scope.peopleObj[i]["contact"]+"</div>"
               */
           }
       }

        return text;

    }

    this.setDiv = function () {
        var el;
        var scope = this;
        if (!mainDiv) {
            $.get("items/regions.html", function (data) {
                mainDiv = data;
                $('body').append(data);
                el = $("#div_regions");
                $("#div_regions .cancel").click(function () {
                    showHide(el);
                })
                if (brr != 'Android') {
                    $("#div_regions").draggable();
                    $("#list_helper").draggable();
                }
                $.getJSON('../json/regionUA.json').success(function (json) {
                    $.getJSON('../json/cityUA.json').success(function (json) {

                        console.log(json); // тут Object {text: 'text', id: 2 ....}
                        scope.setCity(json);
                    });
                    centerMap = map.getCenter();
                    zoomMap = map.getZoom();
                    map.setView([48.442, 34.558], 6)
                    scope.setRegion(json);
                });
            });
        } else {
            el = $("#div_regions");
            showHide(el);
        }

        function showHide(elem) {

            if (elem.is(":visible")) {
                map.setView(centerMap, zoomMap)
                elem.css("display", "none");
                featureGrouFlag ? map.removeLayer(featureGrouFlag) : featureGrouFlag;
                featureGrouName ? map.removeLayer(featureGrouName) : featureGrouName;
                regionLayer ? map.removeLayer(regionLayer) : regionLayer;
            } else {
                centerMap = map.getCenter();
                zoomMap = map.getZoom();
                map.setView([48.442, 30.558], 6);
                elem.css("display", "inline");
                featureGrouFlag ? featureGrouFlag.addTo(map) : featureGrouFlag;
                featureGrouName ? featureGrouName.addTo(map) : featureGrouName;
                regionLayer ? regionLayer.addTo(map) : regionLayer;
            }

        }
    }
    this.init();
}
regions = new Regions();
