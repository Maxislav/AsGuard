var report = {
	el:null,
	from: null,
	to:null,
	vmax: null,
	arrPoints:null,
	init:function (html) {
		var scope = this;
		if (!this.el) {
			this.from= null
			this.to=null;

			$('body').append(html);
			this.el = $('.report');
			this.el.css('display', 'inline');
			this.el.fadeTo(100, 1);
			this.el.find('.cancel').click(function () {
				scope.vhide();
			})
			this.el.draggable({ handle:".title", cancel:'.cancel' });
			app.findModule(this.el);
			$('#show_track').click(function () {
				scope.otobrTrack();
			})
			$('#skryt').click(function () {
				scope.skryt();
			})
			this.el.find('input.in-musor').prop( "checked", (options['filter'] == 'true') ? true : false );
			this.el.find('input.in-musor').click(function(){
				if($(this).prop('checked')){
					scope.saveFilter(true)
				}else{
					scope.saveFilter(false)
				}
			})


		} else {
			this.vhide();
		}
	},
	saveFilter: function(t){
		var scope = this;
		$.ajax({
			type:'POST',
			url:'php/setoptions.php',
			data:'login=' + login + '&pass=' + pass + '&filter=' + (t ? 'true': 'false'),
			success:function (data) {
				console.log(data);
				if (data) {
					data
						options['filter'] = (t ? 'true': 'false');
				} else {

				}
				//scope.setContent();
			},
			error:function (xhr, status, error) {
				app.alert.show(null, error, function () {
				})
			}
		})
	},

	vhide:function () {
		var scope = this;
		if (this.el[0].style.display == 'inline') {
			this.el.fadeTo(100, 0, function () {
				scope.el[0].style.display = 'none'
			})
		} else {
			scope.el[0].style.display = 'inline'
			this.el.fadeTo(100, 1)
		}
	},
	icoTrack:function (_id) {
		return	L.divIcon({
			html:'<div style="width: 20px; height: 20px; " id="' + _id + '"></div>',
			iconSize:[20, 20],
			iconAnchor:[10, 10],
			className:'defaultMarker'
		});
	},
	otobrTrack:function () {
		var f = parseFloat;
		var scope = this;
		var fromPeriod = document.getElementById("forma_from").value;
		var toPeriod = document.getElementById("forma_to").value;
		fromPeriod = calcTime.parseCalendarFrom(fromPeriod);
		toPeriod = calcTime.parseCalendarTo(toPeriod);
		this.from = fromPeriod;
		this.to = toPeriod;
		if (fromPeriod == "dd-mm-yy" || toPeriod == "dd-mm-yy" || !selectUserImei) {
			app.alert.show(null, 'Устройство или период не выбран', function () {

			});
		} else {
			if (points[selectUserImei].markerTrack) {
				this.skryt();
			}

			var track = $.ajax({

				type:'POST',
				url:'track.php',
				data:'fromPeriod=' + fromPeriod + '&toPeriod=' + toPeriod + '&selectUserImei=' + selectUserImei + '&login=' + login + '&pass=' + pass, //посылаем интересующий нас день и номер юзера
				async:false,
				success:function (data) {
				},
				error:function (xhr, status, error) {
					console.log(error);
				}

			}).responseText;

			if (track == "0" || track == "") {
				app.alert.show(null, 'Нет данных', function () {

				})
				return;
			}
			scope.maxSpeed(fromPeriod, toPeriod, selectUserImei);

			points[selectUserImei].arrPointTrack = track.split('!');
			scope.arrPoints = points[selectUserImei].arrPointTrack;
			if(options['filter'] == 'true' ){
				points[selectUserImei].arrPointTrack = scope.filter(points[selectUserImei].arrPointTrack);
			}


		//	scope.filter(points[selectUserImei].arrPointTrack);
			points[selectUserImei].markerTrack;
			var marker_tr = [], lat, lng, latLng = [];
			var polyArr = [];
			$('.report .points').html(points[selectUserImei].arrPointTrack.length - 1);

			for (var i = 0; i < (points[selectUserImei].arrPointTrack.length - 1); i++) {
				var lat = (f(points[selectUserImei].arrPointTrack[i].split(',')[1]));
				var lng = (f(points[selectUserImei].arrPointTrack[i].split(',')[2]));
				marker_tr[i] = new L.Marker([lat, lng], {icon:scope.icoTrack('icoTrack' + selectUserImei + i)});
				polyArr[i] = new L.LatLng(lat, lng);
				showPopup(marker_tr[i], [lat, lng], points[selectUserImei].arrPointTrack[i], selectUserImei);
				latLng[i] = {
					lat:lat,
					lng:lng
				}

			}
			points[selectUserImei].markerTrack = L.featureGroup(marker_tr).addTo(map);
			document.getElementById('dist_t').innerHTML = " " + scope.distance(latLng);
			//	document.getElementById('dist_t').innerHTML = " " + dist_sum; //вставляем на страницу
			require([
				'js/CanvasMarker'
			],
				function () {
					for (var i = 0; i < (points[selectUserImei].arrPointTrack.length - 1); i++) {
						canvasMarker.setCanvasTrack('icoTrack' + selectUserImei + i, points[selectUserImei].arrPointTrack[i].split(',')[4]);
					}
				}
			)
			points[selectUserImei].polylineTrack = L.polyline(polyArr, {color:'#0024ff', weight:'2', opacity:"0.9"}).addTo(map);
			require([
				'js/leaflet.polylineDecorator.js'
			],
				function () {
					points[selectUserImei].polyDecorator = L.polylineDecorator(points[selectUserImei].polylineTrack, {
						patterns:[
							{ offset:'5%', repeat:'100px', symbol:new L.Symbol.ArrowHead({pixelSize:10, polygon:false, pathOptions:{stroke:true, weight:2, color:'#0024ff', opacity:"0.9"}})}
						]
					}).addTo(map);
				})

		}
		function showPopup(marker, latLng, data, imei) {
			var name = points[imei].name;
			var date = popupText(data)
			var popup;
			marker.on('mouseover', function (e) {
				popup = L.popup({offset:L.point(0, -3)})
					.setLatLng(latLng)
					.setContent(name + '</br>' + date)
				hover(popup);

			});
			marker.on('mouseout', function(e){
				out(popup);
			})
		}

		function hover(p){
			p.addTo(map);
		}
		function out(p){
			var el = $('.leaflet-popup-pane .leaflet-popup').last();
			setTimeout(function () {
				el.fadeTo(222,0, function(){
					map.removeLayer(p);
				})
			}, 1000)
		}

		function popupText(data) {
			var date = app.parseTime.decode(data.split(',')[3]).date;
			var time = app.parseTime.decode(data.split(',')[3]).time;
			var speed = data.split(',')[4];
            var sputnik = data.split(',')[5];
            var zaryzd  = data.split(',')[6];
			return 'Дата: ' + date + '</br>' + 'Время: ' + time + '</br>' + 'Скорость: ' + speed + ' km/h' +'</br>'+
                'Спутников: ' + (sputnik=="-1"?"б/с":sputnik)  + '</br>' +
                'Заряд : ' + zaryzd + ' V</br>';
		}


	},
	distance:function (arrTrackFull) {
		var dist_sum = 0;
		var R = 6372795;  //радиус Земли
		var lat1, lat2, long1, long2;

		for (var i = 0; i < (arrTrackFull.length - 1); i++) {
			lat1 = arrTrackFull[i].lat;
			long1 = arrTrackFull[i].lng;
			lat2 = arrTrackFull[i + 1].lat;
			long2 = arrTrackFull[i + 1].lng;
			//перевод коордитат в радианы
			lat1 *= Math.PI / 180;
			lat2 *= Math.PI / 180;
			long1 *= Math.PI / 180;
			long2 *= Math.PI / 180;
			//вычисление косинусов и синусов широт и разницы долгот
			var cl1 = Math.cos(lat1);
			var cl2 = Math.cos(lat2);
			var sl1 = Math.sin(lat1);
			var sl2 = Math.sin(lat2);
			var delta = long2 - long1;
			var cdelta = Math.cos(delta);
			var sdelta = Math.sin(delta);
			//вычисления длины большого круга
			var y = Math.sqrt(Math.pow(cl2 * sdelta, 2) + Math.pow(cl1 * sl2 - sl1 * cl2 * cdelta, 2));
			var x = sl1 * sl2 + cl1 * cl2 * cdelta;
			var ad = Math.atan2(y, x);
			var dist = ad * R; //расстояние между двумя координатами в метрах
			dist_sum = dist_sum + dist;
		}
		dist_sum = dist_sum / 1000;
		dist_sum = parseFloat(dist_sum.toFixed(3));
		return dist_sum;
	},
	skryt:function () {
		points[selectUserImei].markerTrack && map.removeLayer(points[selectUserImei].markerTrack);
		points[selectUserImei].polylineTrack && map.removeLayer(points[selectUserImei].polylineTrack);
		points[selectUserImei].polyDecorator && map.removeLayer(points[selectUserImei].polyDecorator);
		points[selectUserImei].arrPointTrack && (delete points[selectUserImei].arrPointTrack);
		document.getElementById('dist_t').innerHTML = " ..."; //вставляем на страницу
	},
	maxSpeed:function (fromPeriod, toPeriod, imei) {
		var s= this
		$.ajax({
			type:'POST',
			url:'php/maxSpeed.php',
			data:'fromPeriod=' + fromPeriod + '&toPeriod=' + toPeriod + '&selectUserImei=' + selectUserImei + '&login=' + login + '&pass=' + pass, //посылаем интересующий нас день и номер юзера
			success:function (data) {
				$('.report .vmax').html(data);
				s.vmax = data;
				if(gspeed){
				//	gspeed.arrPoints =	points[imei].arrPointTrack
					gspeed.vmax = data;
					gspeed.from =fromPeriod;
					gspeed.to=toPeriod;
					gspeed.startParam();
				}

			},
			error:function (xhr, status, error) {
				console.log(error);
			}
		})
	},
	filter:function (arrPoint1) {
		var pp;
		var scope = this;
		pre(arrPoint1);
		function pre(arrPoint){
			var latLng = [];
			var count = 0;
			var f = parseFloat;
			for (var i = 1; i < (arrPoint.length - 2); i++) {
				latLng[i] = {
					lat:arrPoint[i].split(',')[1],
					lng:arrPoint[i].split(',')[2]
				}
			}
			var suspect = [], musor = [];
			for (var i = 1; i < (latLng.length - 3); i++) {
				var d1 = 0, d2 = 0;
					d1 = scope.distance([
						{
							lat:latLng[i].lat,
							lng:latLng[i].lng
						},
						{
							lat:latLng[i + 1].lat,
							lng:latLng[i + 1].lng
						}
					]);
					d2 = scope.distance([
						{
							lat:latLng[i].lat,
							lng:latLng[i].lng
						},
						{
							lat:latLng[i + 2].lat,
							lng:latLng[i + 2].lng
						}
					]);
					if (d2 < d1) {
						suspect[i+2] = true;
						count++;
					}

			}
			var filterPoints = [];
			var m = 0;
			for (var i = 0; i < latLng.length+2; i++) {
				if (!suspect[i]) {
					filterPoints[m] = arrPoint[i]
					m++;
				}
			}
			console.log(latLng.length+' '+filterPoints.length)
			if(0<count){
				pre(filterPoints);
			} else{
				pp = filterPoints;
			}
		}
		return   pp;
	}
}
