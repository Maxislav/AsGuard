gspeed = {
	el:null,
	from:null,
	to:null,
	html:null,
	position:null,
	widthPx:null,
	hpx:null,
	wpx:null,
	dragFrom:null,
	dragTo:null,
	init:function (html, tr) {
		var scope = this;
		if (!this.el) {
			this.html = html;
			this.from = null;

			this.to = null;
			gspeed.__proto__ = report;
			$('body').append(html);
			this.el = $('.gspeed');
			this.el.css('display', 'inline');
			this.width(this.el)
			this.el.fadeTo(100, 1);
			this.el.find('.cancel').click(function () {
				scope.vhide();
			})

			this.el.draggable({ handle:".title", cancel:'.cancel' });
			//this.ajax()
			this.el.find('.from-bar, .to-bar').draggable({
				axis:'x',
				start:function (event, ui) {
					//scope.move(ui)
					//event
				},
				create:function (event, ui) {
					event
				},
				drag:function (event, ui) {
					scope.drag($(this), ui.position.left)
				},
				stop:function (event, ui) {
					//alert('s')
					if ($(this).hasClass('from-bar')) {
						scope.from && scope.resetFromTo(scope.from, 'dragFrom', ui.position.left);
					}
					if ($(this).hasClass('to-bar')) {
						scope.from && scope.resetFromTo(scope.from, 'dragTo', ui.position.left);
					}
				},
				containment:scope.el
			})
			this.el.find('.apply').click(function () {
				scope.dragFrom && (scope.from = scope.dragFrom);
				scope.dragTo && (scope.to = scope.dragTo);
				scope.setCanvas();
			})


		} else {
			this.vhide();
		}
	},
	drag:function (el, x) {
		var scope = this;
		var s = this;
		var tekPer = (app.parseTime.toDate(s.to) - app.parseTime.toDate(s.from))/1000;
		var cDel = tekPer/s.wpx;
		if (el.hasClass('from-bar')) {
			if(s.from){
				var dss = (x+5)*cDel;
				$(scope.el).find('.text-from').html(dss.toFixed(0));
			}
		}
		if (el.hasClass('to-bar')) {
			var dss = (x+5)*cDel;
			$(scope.el).find('.text-to').html(dss.toFixed(0));
			//scope.to && $(scope.el).find('.text-to').html(scope.period(x + 5))
		}
	},
	period:function (x) {
		var width = this.widthPx;
		var ps = app.parseTime.active(this.to, true) - app.parseTime.active(this.from, true);
		ps = app.parseTime
		var ss = ps * x / width;
		var text =
			app.parseTime.ssToDate(
				this.from,
				f(ss).toFixed(0)
			).date +
				'</br>' +
				app.parseTime.ssToDate(
					this.from,
					f(ss).toFixed(0)
				).time;
		return text;
	},
	resetFromTo:function (old, nd, x) {

		//	var nd = this.dragFrom;
		var width = this.widthPx;
		var f = parseFloat;
		var ps = app.parseTime.active(this.to, true) - app.parseTime.active(this.from, true);
		var ss = ps * x / width;
		var d = app.parseTime.explode('' + old);
		var newDate = new Date('20' + d.yy, d.mm, d.dd, f(d.hh), d.mi, f(d.ss) + f(ss));
		//this[nd] =  newDate;
		var yy = '' + ('' + newDate.getFullYear()).split('')[2] + ('' + newDate.getFullYear()).split('')[3];
		var date = '' + yy + c(newDate.getMonth()) + c(newDate.getDate()) + c(newDate.getHours()) + c(newDate.getMinutes()) + c(newDate.getSeconds())
		this[nd] = date;
		function c(p) {
			if (p < 10) {
				return '0' + p;
			}
			return p;
		}
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
	width:function (el) {
		var scope = this;
		var w = $(document).width() - 360;
		if (w < 300) {
			w = $(document).width() - 5;
		}
		el.width(w);
		this.widthPx = w;
		this.wpx = w;
		var left = -1 * (w + 4) / 2;
		el[0].style["margin-left"] = left + 'px';
		el.css(
			{marginLeft:left + 'px'}
		)
		this.setCanvas();
	},
	setCanvas:function () {
		var scope = this;
		var s = this;
		var el = scope.el;
		$('.gspeed .to-bar').css(
			{left:scope.widthPx - 10 + 'px'}
		)
		$('.gspeed .from-bar').css(
			{left:0 + 'px'}
		)

		var csElGraph = el.find('.graph canvas').eq(0).attr({	  //первый канвас графики
			width:el.find('.graph').width(),
			height:el.find('.graph').height() - 30
		})
		var csElScale = el.find('.graph canvas').eq(1); //канвас временной шкалы
		csElScale.attr({
			width:el.find('.scale').width(),
			height:el.find('.scale').height()
		})
		var csElSpeed = el.find('.graph canvas').eq(2);
		csElSpeed.attr({
			width:200,
			height:el.find('.graph').height() - 30
		})
		s.hpx = el.find('.graph').height() - 30;
		if (report.from) {
			this.from = this.dragFrom ? this.dragFrom : report.from;
			scope.el.find('.text-from').html(app.parseTime.decode(this.from).date + '</br>' + app.parseTime.decode(this.from).time)
		}
		if (report.to) {
			this.to = this.dragTo ? this.dragTo : report.to;
			scope.el.find('.text-to').html(app.parseTime.decode(this.to).date + '</br>' + app.parseTime.decode(this.to).time)
		}
		var cnvGph = csElGraph[0].getContext('2d');
		var cnvScl = csElScale[0].getContext('2d');
		var cnvSp = csElSpeed[0].getContext('2d');
		s.cnvGph = cnvGph;
		s.cnvSp = cnvSp;
		var period_hh = 24;
		if (10 < el.find('.graph').width() / period_hh) {
			for (var x = 0; x < el.find('.graph').width(); x += (el.find('.graph').width() / (4 * period_hh))) {
				cnvGph.beginPath();
				cnvGph.moveTo(x, 0);
				cnvGph.lineTo(x, el.find('.graph').height());
				cnvGph.strokeStyle = 'rgba(0,0,255,0.3)';
				cnvGph.stroke();
			}
		}
		for (var x = 0; x < el.find('.graph').width(); x += (el.find('.graph').width() / period_hh)) {
			cnvGph.beginPath();
			cnvGph.moveTo(x, 0);
			cnvGph.lineTo(x, el.find('.graph').height());
			cnvGph.strokeStyle = 'rgba(0,0,255,0.5)';
			cnvGph.stroke();
		}
		s.lineSpeed();
	},
	lineSpeed:function () {
		var s = this;
		if (s.vmax) {
			s.vmax = f(s.vmax);
			var dHpx;

			if (s.vmax < 50) {
				//dHpx = 10;
				lineSpeed(s.cnvGph, 20, 0.3)
				lineSpeed(s.cnvGph, 10, 1);
				textSped(s.cnvSp, 5, 50);
				s.drawGraph(100);
			} else if (s.vmax < 100) {
				lineSpeed(s.cnvGph, 20, 0.3)
				lineSpeed(s.cnvGph, 10, 1);
				textSped(s.cnvSp, 10, 100);
				s.drawGraph(100);
			} else if (s.vmax < 200) {
				lineSpeed(s.cnvGph, 20, 0.3)
				lineSpeed(s.cnvGph, 10, 1);
				textSped(s.cnvSp, 10, 100);

			} else if (s.vmax < 300) {

			}
			function lineSpeed(ctx, d, linewidth) {
				var dy = s.hpx / d;
				for (var i = 0; i < d; i++) {
					ctx.beginPath();
					ctx.moveTo(0, dy * i);
					ctx.lineTo(s.widthPx, dy * i);
					ctx.lineWidth = linewidth;
					ctx.strokeStyle = 'rgba(0,0,255,0.5)';

					ctx.stroke();
				}
			}

			function textSped(ctx, d, vtop) {
				var dy = s.hpx / d;
				ctx.fillStyle = "#f00";
				ctx.strokeStyle = "#f00";
				ctx.font = "italic 12px Arial";
				ctx.fillText('km/h', 100, 20);
				for (var i = d; 0 < i; i--) {
					ctx.fillStyle = "#f00";
					ctx.strokeStyle = "#000";
					ctx.font = "italic 12px Arial";
					ctx.fillText((vtop - (i * d)), 80, dy * i);
					ctx.lineWidth = 0.5;
					ctx.strokeText((vtop - (i * d)), 80, dy * i);
				}
			}
		}
	},
	drawGraph:function (vtop) {
		var s = this;
		var ctx = s.cnvGph;
		var arr = s.arrPoints;
		var width = this.widthPx;

		var ps = app.parseTime.active(this.to, true) - app.parseTime.active(this.from, true);
		//	var ss = ps * x / width;

		var x = width * (app.parseTime.active(arr[0].split(',')[3], true) - app.parseTime.active(this.from, true) ) / ps;
		var y = s.hpx - (s.hpx * arr[0].split(',')[4] / vtop);
		var divPoint = '<div class="divPoint"></div>';
		if (s.el.find('.content .layerDiv').length) {
			s.el.find('.content .layerDiv').remove()
		}

		s.el.find('.content .from-bar').before('<div class="layerDiv"></div>');
		s.el.find('.content .layerDiv').append(divPoint);
		div(s.el.find('.layerDiv .divPoint').last(), x, y, [arr[0].split(',')[1], arr[0].split(',')[2]], arr[0]);
		ctx.beginPath();
		ctx.moveTo(x, y);
		for (var i = 1; i < (arr.length - 1); i++) {
			x = width * (app.parseTime.active(arr[i].split(',')[3], true) - app.parseTime.active(this.from, true) ) / ps;
			y = s.hpx - (s.hpx * arr[i].split(',')[4] / vtop);
			ctx.strokeStyle = "#F00";
			ctx.lineWidth = 1;
			ctx.lineTo(x, y);
			ctx.stroke();
			s.el.find('.content .layerDiv').append(divPoint);
			div(s.el.find('.layerDiv .divPoint').last(), x, y, [arr[i].split(',')[1], arr[i].split(',')[2]], arr[i]);
		}

		function div(el, x, y, latLng, p) {
			el.css({
				left:x - 4,
				top:y - 4
			})

			var popup;
			el.hover(function () {
					map.panTo(latLng);
					popup = L.popup({autoPan:false, offset:new L.Point(0, -3)})
						.setLatLng(latLng)
						.setContent(app.parseTime.decode(p.split(',')[3]).date + '</br>' +
						app.parseTime.decode(p.split(',')[3]).time + '</br>' +
						'Скорость: ' + p.split(',')[4] + ' km/h'
					)
					hover(popup)
				},
				function () {

					remPopup(popup)
				})


		}
		function hover(p){
			p.addTo(map)
		}
		function remPopup(p) {
			var el = $('.leaflet-popup-pane .leaflet-popup').last();
			setTimeout(function () {
				el.fadeTo(222,0, function(){
					map.removeLayer(p);
				})
			}, 1000);

		}




	},
	setArr:function (from, to, data) {
		this.arrPoints = data.split(/!/);
	},
	drawScale:function (from, to) {

	},
	startParam:function () {
		//report.vmax && (this.vmax = report.vmax);
		this.dragFrom = null;
		this.dragTo = null;
		this.setCanvas();
	}
}