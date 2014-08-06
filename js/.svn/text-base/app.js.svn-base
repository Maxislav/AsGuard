var points = points ? points : {};
var f = parseFloat;
var app = {
	css:{},
	init:function () {

		var scope = this;

		for (var opt in points) {
			this.setMarker(points[opt]);
		}

        if(options.zone && options.zone=="true" ){
            require([
                'module/zone/zone'
            ],function(){
               window['zone'].getZone();
            })
        }

		$('.exit').click(function () {
			app.alert.show(null, 'Выйти из системы?',
				function () {

					function delete_cookie(cookie_name) {
						var cookie_date = new Date();  // Текущая дата и время
						cookie_date.setTime(cookie_date.getTime() - 1);
						document.cookie = cookie_name += "=; expires=" + cookie_date.toGMTString();
					}

					delete_cookie("key");
					window.location.href = '/';
				},
				function () {

				})
		})
		$.get("items/device.html", function (html) {
			for (var opt in points) {
				scope.setDevice(points[opt], html);
			}
			scrollbar1.height($(window).height() - 70)
			scrollbar1.tinyscrollbar_update();
			$('.device').hover(
				function () {
					$(this).addClass('hover')
				},
				function () {
					$(this).removeClass('hover')
				}
			)
			$('.device').click(function () {
				var imei = $(this).attr('name');
				map.panTo([points[imei]['lat'], points[imei]['lng']]);
				$('#report_user').html(points[imei]['name'])
				selectUserImei = points[imei]['imei'];
			})
			$('.device .follow-me .follow').click(function () {
				$('.device .follow-me .follow').not($(this)).removeClass('on');
				if ($(this).hasClass('on')) {
					$(this).removeClass('on');
					points[$(this).closest('.device').attr('name')]['follow'] = null;
				} else {
					$(this).addClass('on')
					points[$(this).closest('.device').attr('name')]['follow'] = true;
				}
			})
			$('.device .follow-me .track-on').click(function () {
				var imei = $(this).closest('.device').attr('name');
				if ($(this).hasClass('on')) {
					$(this).removeClass('on');
					points[imei]['polyline'] ? map.removeLayer(points[imei]['polyline']) : null;
					points[imei]['arrPoly'] = null;
					points[imei]['trackon'] = null;
				} else {
					$(this).addClass('on');
					points[imei]['trackon'] = true;
				}
			})


		})

		this.findModule($(document));

		$('.leaflet-control-layers-base input').click(function () {
			set.changeMap($(this).parent('label').find('span').html())
			//alert($(this).parent('label').find('span').html())
		})


	},
	findModule:function (el) {
		var scope = this;
		el.find('.button[module]').click(function () {

            var module = $(this).attr('module');
            scope.loadModule(module);
		});
	},
    loadModule: function(module){
        var scope= this;
        require([
            'text!module/'+ module + '/' +module+'.css',
            'text!module/'+ module + '/' +module+'.html',
            'module/'+ module+ '/'+module
        ],function(css, html){
            if (!scope.css[module]) {
                scope.css[module] = true;
                $('head').append(
                    ' <style type="text/css" name="' + module + '">' +
                        css +
                        ' </style>'
                );
            }
            window[module].init(html);
        })
    },
    loadCss: function(path, name, success){
        var scope = app;
        require([
            'text!'+path
        ], function(css){
            if (!scope.css[name]) {
                scope.css[name] = true;
                $('head').append(
                    ' <style type="text/css" name="' + name + '">' +
                        css +
                        ' </style>'
                );
            }
            success && success();
        })
    },
	cnvStop:function (canvas) {
		canvas.beginPath();
		canvas.arc(12, 12, 7, 0, 2 * Math.PI, false);
		canvas.fillStyle = '#ffa509';
		canvas.fill();
		canvas.lineWidth = 1;
		canvas.strokeStyle = 'red';
		canvas.stroke();
	},
    cnvNoSatellite: function(canvas){
        canvas.beginPath();
        canvas.arc(12, 12, 7, 0, 2 * Math.PI, false);
        canvas.fillStyle = '#5293C9';
        canvas.fill();
        canvas.lineWidth = 1;
        canvas.strokeStyle = 'blue';
        canvas.stroke();
    },
    cnvNoBs: function(canvas){
        canvas.beginPath();
        canvas.arc(12, 12, 7, 0, 2 * Math.PI, false);
        canvas.fillStyle = '#E54B4E';
        canvas.fill();
        canvas.lineWidth = 1;
        canvas.strokeStyle = 'red';
        canvas.stroke();
    },
	cnvNoSignal:function (canvas) {
		canvas.fillStyle = '#ffff00';
		canvas.fillRect(4, 4, 16, 16);
		canvas.strokeStyle = 'red';
		canvas.lineWidth = 1;
		canvas.strokeRect(4, 4, 16, 16);
	},
	cnvMove:function (canvas, azimuth) {
		canvas.translate(12, 12);
		canvas.rotate(this.degree(azimuth));
		canvas.scale(1.1, 1.1);

		canvas.beginPath();
		canvas.moveTo(0, 0);
		canvas.moveTo(0, -10);
		canvas.lineTo(7, 7);
		canvas.lineTo(0, 0);
		canvas.fillStyle = '#007ae3';
		canvas.fill();


		canvas.beginPath();
		canvas.moveTo(0, 0);
		canvas.moveTo(7, 7);
		canvas.lineTo(0, 3);
		canvas.lineTo(0, 0);
		canvas.fillStyle = '#0064a4';
		canvas.fill();

		canvas.beginPath();
		canvas.moveTo(0, 0);
		canvas.moveTo(0, 3);
		canvas.lineTo(-7, 7);
		canvas.lineTo(0, 0);
		canvas.fillStyle = '#00396f';
		canvas.fill();

		canvas.beginPath();
		canvas.moveTo(0, 0);
		canvas.moveTo(-7, 7);
		canvas.lineTo(0, -10);
		canvas.lineTo(0, 0);
		canvas.fillStyle = '#00e5ff';
		canvas.fill();

		//cnv.translate(1, 0);
		canvas.beginPath();
		canvas.lineWidth = 1;
		canvas.strokeStyle = '#003557';
		canvas.moveTo(0, -10);
		canvas.lineTo(7, 7);
		canvas.lineTo(0, 3);
		canvas.lineTo(-7, 7);
		canvas.lineTo(0, -10);
		canvas.stroke();
	},
	setMarker:function (point) {
		//   point['marker'] ? (map.removeLayer(point['marker'])) : null;
		var scope = this;
		point['marker'] = L.marker([point.lat, point.lng], {icon:this.div(point)});
		point['marker'].addTo(map);
		for (var i = 0; i < devices.length; i++) {
			if (devices[i]['imei'] == point['imei']) {
				point['phone'] = devices[i]['phone'];
				point['name'] = devices[i]['name'];
			}
		}

		point['marker'].bindPopup(
			'<p>' + scope.parseTime.decode(point.datetime).time + '</p>' +
				'<p>' + scope.parseTime.decode(point.datetime).date + '</p>' +
				'<p>' + 'Скорость: ' + point.speed + ' km/h</p>'+
                '<p>' + 'Спутников: ' + (point.sputnik =="-1" ? "б/с":point.sputnik) +'<p>'+
                 '<p> ' +'Заряд: ' +point.zaryad  +' V</p>'
			,

			{offset:new L.Point(0, -3)})


		point['popup'] = L.popup({autoPan:false, offset:new L.Point(0, -3)})
			.setLatLng([point.lat, point.lng])
			.setContent(point['name'] + '</br>' + (point['phone'] ? point['phone'] : ''))
			.addTo(map);

		var active = this.parseTime.active(point['datetime']);

		var canvas = window['cnv' + point.imei].getContext('2d');
		if (active < 600) {//устройство активно
            if(point.sputnik =="-1"){
                this.cnvNoBs(canvas); //по базовым станциям
                points[point.imei]['status'] = 'noBs';
            }else if(point.sputnik =="0"){
                this.cnvNoSatellite(canvas); //нет спутников
                points[point.imei]['status'] = 'noSatellite';
            }else if (point.speed && 0 < point.speed) {
				this.cnvMove(canvas, point.azimuth);//устройство движется
				points[point.imei]['status'] = 'move'
			} else {
				this.cnvStop(canvas); //устройство стоит
				points[point.imei]['status'] = 'stop'
			}

		} else { //устройство не активно
			this.cnvNoSignal(canvas);
			points[point.imei]['status'] = 'noSignal'
		}


	},
	div:function (point) {
		return L.divIcon({
			html:'<canvas width="24" height="24" id="cnv' + point.imei + '" ></canvas>',
			iconSize:[24, 24],
			iconAnchor:[12, 12],
			className:'defaultMarker'
		})
	},
	setDevice:function (point, html) {
		var scope = this;
		$('#div_avto .overview').append($.tmpl(html, {
			"imei":point['imei'],
			"phone":point['phone'],
			"name":point['name'],
			"date":scope.parseTime.decode(point['datetime'])['date'],
			"time":scope.parseTime.decode(point['datetime'])['time'],
			"speed":point['speed'],
			"active":point['status'],
            "sputnik":point['sputnik']=="-1"?"б/c":point['sputnik'],
            "zaryad":point['zaryad']
		}));
	},
	refreshParams:function (point) {
		var el = $('.device[name=' + point['imei'] + ']').find('.params');
		el.find('.data-date').html(this.parseTime.decode(point['datetime'])['date'])
		el.find('.data-time').html(this.parseTime.decode(point['datetime'])['time'])
		el.find('.speed').html(point['speed']);
        el.find('.satellite').html(point['sputnik']=="-1"?"б/c":point['sputnik']);
        el.find('.power').html(point['zaryad']);
		//el.find('[name=active]').html('<div name="' + point['status'] + '"></div><div class="after"><nobr></nobr></div>')
		el.find('[name=active] div').eq(0).attr({
			name:point['status']
		})
		//el.find('[name=active] div').eq(1).find('nobr')
		// el.find('[name=active]').html('<div name="'+'move'+'"></div>')
	},
    dateTime: new dateTime(),

	parseTime:{
		//todo отсчет ведем с начала 13 года
		startDate: new Date(2013,0,0,0,0,0), //Mon Dec 31 2012 00:00:00 GMT+0200 (EET)
		active:function (time, ny) {
			var f = parseFloat;
			var dayInMonth = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
			var dayInMonthLeap = [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

			var date = new Date();
			var leapYear = [2016, 2020, 2024, 2028];

			function checkLapYwer(y) {
				for (var i = 0; i < leapYear.length; i++) {
					if (y == leapYear[i]) {
						return true;
					}
				}
				return false;
			}

			var yy = date.getFullYear() + '';
			var currentTime = {
				yy:yy.split('')[2] + yy.split('')[3],
				mm:(date.getMonth() + 1) < 10 ? ('0' + (date.getMonth() + 1)) : '' + (date.getMonth() + 1),
				dd:(date.getDate() < 10) ? ('0' + date.getDate()) : '' + date.getDate(),
				hh:(date.getHours() < 10) ? ('0' + date.getHours()) : '' + date.getHours(),
				mi:(date.getMinutes() < 10) ? ('0' + date.getMinutes()) : '' + date.getMinutes(),
				ss:(date.getSeconds() < 10) ? ('0' + date.getSeconds()) : '' + date.getSeconds()
			}
			var arrtime = time.split('');
			var timeProtocol = {
				yy:'' + arrtime[0] + arrtime[1],
				mm:'' + arrtime[2] + arrtime[3],
				dd:'' + arrtime[4] + arrtime[5],
				hh:'' + arrtime[6] + arrtime[7],
				mi:'' + arrtime[8] + arrtime[9],
				ss:'' + arrtime[10] + arrtime[11]
			}
			var timeProtocolPlusGmt = this.plusGmt(timeProtocol);
			var different;

			//сколько секунд с начала года в посылке
			var ddYear = 0;
			for (var i = 0; i < parseFloat(timeProtocolPlusGmt.mm); i++) {
				if (checkLapYwer(date.getFullYear())) {
					ddYear += dayInMonthLeap[i];
				} else {
					ddYear += dayInMonth[i];
				}
			}
			var ssStartYearInProtocol; // секунд с начала года
			ssStartYearInProtocol = parseFloat(timeProtocolPlusGmt.ss) +
				(parseFloat(timeProtocolPlusGmt.mi) * 60) +
				(parseFloat(timeProtocolPlusGmt.hh) * 3600) +
				(parseFloat(timeProtocolPlusGmt.dd) * 3600 * 24) +
				(ddYear * 3600 * 24) +
				((f(timeProtocolPlusGmt.yy) - 13) * ddLeap(timeProtocolPlusGmt.yy) * 3600 * 24);
			//ssStartYearInProtocol = '' + timeProtocol.yy + ssStartYearInProtocol;
			ssStartYearInProtocol = parseFloat(ssStartYearInProtocol);
			// сколько секунд с начала года по текущее время
			var ddYearCurrent = 0;
			for (var i = 0; i < (date.getMonth() + 1); i++) {
				if (checkLapYwer(date.getFullYear())) {
					ddYearCurrent += dayInMonthLeap[i];
				} else {
					ddYearCurrent += dayInMonth[i];
				}
			}

			var ssStartYearCurrent;
			ssStartYearCurrent = parseFloat(currentTime.ss) +
				(parseFloat(currentTime.mi) * 60) +
				(parseFloat(currentTime.hh) * 3600) +
				(parseFloat(currentTime.dd) * 3600 * 24) +
				(ddYearCurrent * 3600 * 24) +
				((f(currentTime.yy) - 13) * ddLeap(currentTime.yy) * 3600 * 24);
			ssStartYearCurrent = parseFloat(ssStartYearCurrent);
			function ddLeap(yy) {
				yy = '20' + yy;
				yy = f(yy)
				for (var i = 0; i < leapYear.length; i++) {
					if (yy == leapYear[i]) {
						return 366
					}
				}
				return 365
			}

			different = ssStartYearCurrent - ssStartYearInProtocol;

			if (ny) {
				return ssStartYearInProtocol;
			} else {
				return different;
			}
		},
		plusGmt:function (time) {
			var date = time;
			date.hh = parseFloat(date.hh) + parseFloat(options.gmt);
			if (23 < date.hh) {
				date.hh = date.hh - 24;
				date.dd = parseFloat(date.dd) + 1;
				if (date.dd < 10) {
					date.dd = '0' + date.dd
				}
			}
			if (date.hh < 10) {
				date.hh = '0' + date.hh
			}

			date.hh = '' + date.hh;
			return date; //возвращаем 130401194156 дату + gmt
		},
		decode:function (_time) {
			var timeProtocol = this.explode(_time);
			var time = this.plusGmt(timeProtocol);
			var date = {
				date:'' + time.dd + '/' + time.mm + '/' + time.yy,
				time:'' + time.hh + ':' + time.mi + ':' + time.ss
			}
			return date;
		},
		incode:function (time) {
			var intime = time.split(' ');
			var d = {
				yy:'' + intime[0].split('/')[2].split('')[2] + intime[0].split('/')[2].split('')[3],
				mm:intime[0].split('/')[1],
				dd:intime[0].split('/')[0],
				hh:intime[1].split(':')[0],
				mi:intime[1].split(':')[1],
				ss:'00'
			}
			d = this.minusGmt(d);
			var date = '' + d.yy + d.mm + d.dd + d.hh + d.mi + d.ss;
			return date;
		},
		minusGmt:function (time) {
			var dayInMonth = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
			var f = parseFloat;
			time.hh = f(time.hh) - f(options.options.gmt);
			if (time.hh < 0) {
				time.hh = time.hh + 24;
				time.dd = f(time.dd) - 1;
				if (time.dd <= 0) {
					time.mm = f(time.mm) - 1;
					time.dd = dayInMonth[time.mm]
				}
			}
			for (var opt in time) {
				time[opt] = f(time[opt]);
				if (time[opt] < 10) {
					time[opt] = '0' + time[opt]
				} else {
					time[opt] = '' + time[opt]
				}
			}
			return time;
		},
		explode:function (time) {
			var arrtime = time.split('');
			return {
				yy:'' + arrtime[0] + arrtime[1],
				mm:'' + arrtime[2] + arrtime[3],
				dd:'' + arrtime[4] + arrtime[5],
				hh:'' + arrtime[6] + arrtime[7],
				mi:'' + arrtime[8] + arrtime[9],
				ss:'' + arrtime[10] + arrtime[11]
			}
		},
		ssToDate:function (date, delta) {
			//140112220000
			//app.parseTime.ssToDate(140112220000, 12978)
			var s = this;
			var f = parseFloat;
			var d = s.explode('' + date)
			var inUtc = new Date('20' + d.yy, d.mm, d.dd, f(d.hh)+f(options.gmt), d.mi, d.ss+f(delta));

			var yy = ''+ (''+ inUtc.getFullYear()).split('')[2]+ (''+ inUtc.getFullYear()).split('')[3];
			//console.log(inUtc);
			var date={
				date:inUtc.getDate()+'/'+(inUtc.getMonth()<10?('0'+inUtc.getMonth()):inUtc.getMonth())+'/'+  yy,
				time: inUtc.getHours()+':'+inUtc.getMinutes()+':'+inUtc.getSeconds()
			}
			 return date;
		},
		toDate: function(string){
			var d = this.explode('' + string);
			return new Date('20' + d.yy, d.mm-1, d.dd, f(d.hh), f(d.mi), f(d.ss));
		},
		toString: function(d){
			var yy = (''+d.getUTCFullYear()).split('')[2]+(''+d.getUTCFullYear()).split('')[3];
			function n(p){
				p = f(p);
				if(p<10){
					return '0'+p;
				}
				return p;
			}
			return ''+yy+n(d.getMonth()+1)+n(d.getDate())+n(d.getHours())+n(d.getMinutes())+n(d.getSeconds())
		},

		after:function (s) {
			var mi;
			var hh;
			var t;
			if (s < 60) {
				return s + 'с'
			} else if (s < 3600) {
				mi = Math.floor(s / 60);
				s = s - (mi * 60);
				return mi + 'm' + s + 'с'

			} else if (s < 86400) {
				hh = Math.floor(s / 3600);
				s = s - hh * 3600;
				t = app.parseTime.after(s);

				return hh + 'ч' + t;
			} else if (s < 604800) {
				s = Math.floor(s / 86400);
				if (s < 2) {
					return s + 'дeнь'
				} else if (s < 5) {
					return s + 'дня'
				} else {
					return s + 'дней'
				}

			} else {
				return 'Более нед'
			}

		}
	},
	news:function (_data) {
		var data = JSON.parse(_data);
		data;
		this;
		var f = parseFloat;
		for (var opt in points) {
			//  points[opt]['marker'] ? map.removeLayer(points[opt]['marker']) : null;
			$('.device[name=' + opt + ']').find('.after nobr').html(this.parseTime.after(this.parseTime.active(points[opt]['datetime'])))

			if (600 < this.parseTime.active(points[opt]['datetime']) && points[opt]['status'] !== 'noSignal') {
				points[opt]['marker'] ? map.removeLayer(points[opt]['marker']) : null;
				points[opt]['popup'] ? map.removeLayer(points[opt]['popup']) : null;
				this.setMarker(points[opt]);
				this.refreshParams(points[opt]);
			}


			if (points[opt]['datetime'] !== data[opt]['datetime']) {

				if (points[opt]['trackon']) {
					points[opt]['arrPoly'] = points[opt]['arrPoly'] ? points[opt]['arrPoly'] : [
						[f(points[opt]['lat']), f(points[opt]['lng'])]
					];
					points[opt]['arrPoly'].push([f(data[opt]['lat']), f(data[opt]['lng'])]);

					points[opt]['polyline'] ? map.removeLayer(points[opt]['polyline']) : null;
					points[opt]['polyline'] = L.polyline(points[opt]['arrPoly'], {color:'#ff0078', weight:'2', opacity:"1"}).addTo(map);
				}


				for (var newopt in data[opt]) {
					points[opt][newopt] = data[opt][newopt]
				}
				map.removeLayer(points[opt]['marker']);
				map.removeLayer(points[opt]['popup']);

				this.setMarker(points[opt]);
				if (points[opt]['follow']) {
					map.panTo([f(points[opt]['lat']), f(points[opt]['lng'])])
				}

				this.refreshParams(points[opt]);

			}
		}
	},
	degree:function (a) {
		return a * Math.PI / 180;
	},
	alert:{
		eltext:null,
		el:null,
		mask:null,
		show:function (title, msg, ok, cancel) {
			var scope = this;
			if (!this.el) {
				$.get('items/dialog.html', function (data) {
					scope.eltext = data;
					setContent();
				})
			} else {
				setContent()
			}

			function setContent() {
				var el;
				var mask;

				$('body').append(scope.eltext);
				mask = $('.mask').last();
				mask.height($(window).height());
				mask.width($(window).width());

				el = $('.dialog').last();

				if (title) el.find('.title p').html(title);
				if (msg) el.find('.content-dialog').html(msg);

				if (ok) {
					el.find('.button').first().css('display', 'inline-block').click(function () {
						ok()
						scope.hide(el, mask);
					})
				}
				if (cancel) {
					el.find('.button').last().css('display', 'inline-block').click(function () {
						cancel()
						scope.hide(el, mask);
					})
				}
				el.css('top', ($(document).height() / 2 - el.height() / 1.5));
				el.fadeTo(222, 1);
				mask.fadeTo(222, 0.3)
				el.draggable({ handle:".title", cancel:".cancel" });

				el.find('.cancel').click(function () {
					scope.hide(el, mask)
				})
			}
		},
		hide:function (el, mask) {
			el.fadeTo(222, 0, function () {
				el.remove();
			})
			mask.fadeTo(222, 0, function () {
				mask.remove()
			})
		}
	},
	mask:{
		show:function (success) {
			var s = this;
			$('body').append('<div class="mask">' +
				'<svg width="60" height="60" class="svg">' +
				'<image xlink:href="images/cross_mh.png" width="60" height="60">' +
				'<animateTransform attributeType="xml"' +
				'attributeName="transform" ' +
				'type="rotate"' +
				'from="0 30 30"' +
				'to="360 30 30"' +
				'dur="2s"' +
				'repeatCount="indefinite"/>' +
				'</image>' +
				'<image xlink:href="images/mh_mh.png" x="5px" y="10px"width="50" height="40">'+
				'</svg>' +
				'</div>');


			$('.mask svg').click(function(){
				app.mask.hide()
			})

			$('.mask').css({
				height: $(window).height(),
				width: '100%'
			}).fadeTo(222, 1, function(){
					if(success){
						success();
					}
				})
				//height($(window).height()).fadeTo(222, 1);
			$('.svg').css({
				position:'absolute',
				left:$(window).width() / 2 - 30 + 'px',
				top:$(window).height() / 2 - 30 + 'px'
			})
		},
		hide:function (success) {
			$('.mask').fadeTo(222, 0, function () {
				$(this).remove();
				if(success){
					success();
				}
			})

		}
	},
}
