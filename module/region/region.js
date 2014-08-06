var region = {
    el: null,
    points: null,
    mainDiv: null,
    collectionName: [],
    regionLayer: null,
	attach: null,


    cityDecode: {
        "Kiev": "Киев",
        "Kiev City": "Город Киев",
        "Zhytomyr": "Житомир",
        "Rivne": "Ровно",
        "Volyn": "Волынь",
        "L'viv": "Львов",
        "Ternopil'": "Тернополь",
        "Khmel'nyts'kyy": "Хмельницкий",
        "Vinnytsya": "Винница",
        "Chernivtsi": "Черновцы",
        "Transcarpathia": "Закарпатье",
        "Ivano-Frankivs'k": "Ивано-Франковск",
        "Cherkasy": "Черкассы",
        "Kirovohrad": "Кировоград",
        "Dnipropetrovs'k": "Днепропетровск",
        "Zaporizhzhya": "Запорожье",
        "Donets'k": "Донецк",
        "Luhans'k": "Луганск",
        "Kharkiv": "Харьков",
        "Poltava": "Полтава",
        "Sumy": "Сумы",
        "Chernihiv": "Чернигов",
        "Kirovohrad": "Кировоград",
        "Mykolayiv": "Николаев",
        "Kherson": "Херсон",
        "Crimea": "Крым",
        "Odessa": "Одесса"
    },

    init: function (html) {
        var s = this;
        s.setDiv(html)

    },
    setDiv: function(data){
        var s = this;
        if (!s.mainDiv) {

			app.mask.show( function(){

			});

                s.mainDiv = data;
                $('body').append(data);
                s.el = $("#div_regions");

				s.el.find('#list_helper').css({
					width: $(window).width()-400,
					left: -1*($(window).width()-390),
					top: -2,
					minHeight: $(window).height()- 40
				})

                $("#div_regions .cancel").click(function () {
                    s.showHide(s.el);
                });

			s.el.find('.roll').click(function(){
				s.el.find('#list_helper').toggle( "slide",{direction: 'right'} );
			})

                if (brr != 'Android') {
                    $("#div_regions").draggable({cancel:'.cancel, #list_helper'});
                    $("#list_helper").draggable({cancel:'.list'});
                }
            $('#scrollbar5').css({
                height:$(window).height()- 76

            })
            $('#scrollbar5 .viewport').css({
                width:$(window).width()-410
            });
            s.scrollbar = $('#scrollbar5').tinyscrollbar({invertscroll: true, wheel: 20});

                $.getJSON('module/region/regionUA.json').success(function (json) {
                    $.getJSON('module/region/cityUA.json').success(function (json) {

                        console.log(json); // тут Object {text: 'text', id: 2 ....}
                        s.setCity(json);
						//app.mask.hide();
                    });
                    s.centerMap = map.getCenter();
                    s.zoomMap = map.getZoom();
                    map.setView([48.442, 34.558], 6);

                    require([
                        'lib/lodash/lodash.compat.min'
                    ],function(){
                       // _.sortBy([1, 2, 3], function(num) { return Math.sin(num); });
                        for (var i= 0; i<json.features.length; i++){
                            json.features[i].properties.NAME_Ru = s.cityDecode[json.features[i].properties.NAME_1];
                           // console.log(json.features[i].properties.NAME_1)
                        }
                        json.features = _.sortBy(json.features,
                            function(num){
                             return num.properties.NAME_Ru
                            });

                        s.setRegion(json);
                        vhide({id:'but_mh'});
                        app.mask.hide();
                    })


                });

        } else {
          //  s.el = $("#div_regions");
            s.showHide(s.el);
        }

    },
    setCity: function(points){
        var s = this;
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
            s.collectionName[i] = points.collection[i]['name'];

            markerFlag[i] = L.marker([ lat , lng], {icon:flagIcon});
            setPopup(markerFlag[i], i, points.collection[i], [lat, lng]);
            //markerFlag[i].addTo(map);

        }

        s.featureGrouFlag = L.featureGroup(markerFlag).addTo(map);
        s.featureGrouName = L.featureGroup(marker).addTo(map);

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
        s.getPeople();


    },
    getPeople: function(){
        var s = this;
        $.ajax({
            type:'POST',
            url:'php/regionPeople.php',
            data:'pass=' + pass + '&login=' + login,
            success:function (data) {
                data;
                s.peopleObj= JSON.parse(data);
            //  var p =  refactor(s.peopleObj);
                s.people =   refactor(s.peopleObj);
                s.sortByName(s.people);

            },
            error:function (xhr, status, error) {
                console.log('Обрыв связи1');
            }

        });
        function codeCity(city){
            for(var el in s.cityDecode){
                if(s.cityDecode[el]==city){
                    return el;
                }
            }

        }

        function refactor(obj){
            var people = {};
            for(var el in s.cityDecode){
                for(var i = 0; i<obj.length; i++){
                  if(codeCity(obj[i].oblast) == el){
                      people[el] =     people[el] ?  people[el] : []
                      people[el].push({
                          contact: obj[i].contact,
                          help: obj[i].help,
                          _id: obj[i]._id,
                          karmaup: f(obj[i].karmaup),
                          karmadown: f(obj[i].karmadown),
                          name: obj[i].name,
                          oblast: obj[i].oblast,
                          option: obj[i].option,
                          oblastEn: el

                      })
                  }
                }
            }
            return people;
        }
    },
    sortByName: function(people, succes){
        require([
            'lib/lodash/lodash.compat.min'
        ],function(){
                 for(var reg in people){
                     people[reg] = _.sortBy(people[reg], ['name']);
                 }
            people;
            })

    },
    showHide: function(elem){
        var s = this;
        if (elem.is(":visible")) {
            map.setView(s.centerMap, s.zoomMap)
            elem.css("display", "none");
            s.featureGrouFlag ? map.removeLayer(s.featureGrouFlag) : s.featureGrouFlag;
            s.featureGrouName ? map.removeLayer(s.featureGrouName) : s.featureGrouName;
           s.regionLayer ? map.removeLayer(s.regionLayer) : s.regionLayer;


        } else {
            vhide({id:'but_mh'});



            s.centerMap = map.getCenter();
            s.zoomMap = map.getZoom();
            map.setView([48.442, 30.558], 6);
            elem.css("display", "inline");
            s.featureGrouFlag ? s.featureGrouFlag.addTo(map) : s.featureGrouFlag;
            s.featureGrouName ? s.featureGrouName.addTo(map) : s.featureGrouName;
            s.regionLayer ? s.regionLayer.addTo(map) : s.regionLayer;
        }
    },
	setRegion: function(region){
		var s = this;
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

			$('#div_regions .ul_region').append(
				'<li name="'+feature.properties.NAME_1+'">' + s.cityDecode[feature.properties.NAME_1]+ '</li>'
			)
			lis = $('#div_regions .ul_region li').last();
			layer.on('mouseover', function (e) {
				layer.setStyle({color: '#4f95ff',weight: 2,fillOpacity: 0.7,opacity: 1,fillColor:'#4f95ff'});
				lis.addClass("active");
				s.setContent(feature.properties.NAME_1);
			});
			layer.on('mouseout', function (e) {
				layer.setStyle({color: '#006290',weight: 2,fillOpacity: 0.2,opacity: 0.5,fillColor:'#4f95ff'});
				lis.removeClass("active");
			});


			layer.setStyle({color: '#006290',weight: 2,fillOpacity: 0.2,opacity: 0.5,fillColor:'#4f95ff'});
			layer.bindPopup(popupContent);

			$('#div_regions .ul_region li').last().hover(function() {
				$( this ).addClass("active");
				layer.setStyle({color: '#4f95ff',weight: 2,fillOpacity: 0.7,opacity: 1,fillColor:'#4f95ff'});

				s.setContent(feature.properties.NAME_1);


			}, function() {
				$( this ).removeClass("active");
				layer.setStyle({color: '#006290',weight: 2,fillOpacity: 0.2,opacity: 0.5,fillColor:'#4f95ff'});
			});


		}
		s.regionLayer = L.geoJson(region, {
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
				s.attach = null;
			}else{
				$(".ul_region").find('li').removeClass('atach');
				$(this).addClass('atach');
				s.attach = null;

				s.setContent($(this).attr('name'));
				s.attach = $(this).attr('name');

			}

		})
	},
	setContent: function(region){
		var s = this;
		if(!s.attach){
			s.setPeople(region, function(text){
				$("#list_helper .list").html(text);
                s.scrollbar.tinyscrollbar_update('relative');
			})
			$("#list_helper .title .reg-name").html(s.cityDecode[region]);
		}
	},
	setPeople: function(region, succes){
		var s = this;
		var text="";
        region
        require([
            'text!module/region/row.html'

        ], function(html){
            text =  $.tmpl(html, s.people[region]);
            succes(text);
        })
	},
    karmaUp: function(data,el){
        var s = this;
        data=data.data;

        app.alert.show(null, "Поднять оценку "+data.name+"?", function(){
            up();
        },function(){});

        function up(){
            $.ajax({
                method: "POST",
                data: {
                    login: login,
                    _id: data._id,
                    karmaUp: getKarma(data)
                },
                url: "php/setKarma.php",
                success: function(_data){
                    getKarma(data, true);
                    s.people;
                    $(el).parent('div').find('[name="karmaup"]').html(getKarma(data));
                },
                error: function(data){
                    data;
                }
            })
        }

        function getKarma(data, plus){
            for(var i =0; i< s.people[data.oblastEn].length; i++){
                if(s.people[data.oblastEn][i]._id == data._id){
                  plus && s.people[data.oblastEn][i].karmaup++
                  return  s.people[data.oblastEn][i].karmaup;
                    
                }
            }
        }

    },
    karmaDown: function(data,el){
        var s = this;
        data=data.data;

        app.alert.show(null, "Понизить оценку "+data.name+"?", function(){
            down();
        },function(){});

        function down(){
            $.ajax({
                method: "POST",
                data: {
                    login: login,
                    _id: data._id,
                    karmaDown: getKarma(data)
                },
                url: "php/setKarma.php",
                success: function(_data){
                    getKarma(data, true);
                    s.people;
                    $(el).parent('div').find('[name="karmadown"]').html(getKarma(data));
                },
                error: function(data){
                    data;
                }
            })
        }

        function getKarma(data, plus){
            for(var i =0; i< s.people[data.oblastEn].length; i++){
                if(s.people[data.oblastEn][i]._id == data._id){
                    plus && s.people[data.oblastEn][i].karmadown--;
                    return  s.people[data.oblastEn][i].karmadown;

                }
            }
        }
    }

}