var weather = {
	el: null,
	markerUkbb: null,
	init: function (html) {
		var scope = this;
		window['mh'].style.visibility = 'hidden';
		if (!scope.el) {
			$('body').append(html);
			scope.el = $('.weather');

			scope.el.draggable({ handle: ".title", cancel: ".cancel" });

			var latR = 50.325, lngR = 30.895;
			$.ajax({
				type: 'POST',
				url: 'php/weather.php',
				data: 'pass=' + pass + '&login=' + login,
				success: function (data) {

					data = "data:image/png;base64, " + data;

					$('.weather .content').html(
						'<img src="' + data + '" >'
					)


					//	L.marker([85, 0]).addTo(map);
					//	L.marker([75, 0]).addTo(map);



					function ll(lat, lng) {
						var pi = Math.PI;
						var rLat = lat * pi / 180;
						var rLong = lng * pi / 180;
						var a = 6378137, b = 6356752.3142;
						var f = (a - b) / a;
						var e;

						e = Math.sqrt((2 * f - Math.pow(f, 2))); //e=sqrt(2*f-f^2)
						var X = a * rLong;

						var tt = pi / 4 + rLat / 2;
						var Y = a * Math.log(Math.tan(tt) * Math.pow(((1 - e * Math.sin(rLat)) / (1 + e * Math.sin(rLat))), (e / 2)))
						return    Y;
					}

					function nT(latR, lngR, zoom) {
						var z = Math.pow(2, zoom) / 2
						var d = z - (ll(latR, lngR) / ll(85, lngR)) * z;
						return d;
					}

					/*
					 map.on('zoomend', function () {
					 console.log(nT(latR, lngR, map.getZoom()))
					 })
					 */

					//console.log(data);

					//$('body').append('<img class="ukbb" src="data:image/png;base64, '+ data+'" style="width:600px; height: 400px; position: absolute; top: 0; left:0; z-index:5">' );

					var imageUrl = "data:image/png;base64, " + data,
						imageBounds = [
							[50.69, 29.92],
							[50.28, 31.07]
						];


					//var ukbb = L.imageOverlay(imageUrl, imageBounds).addTo(map);


					var canvasTiles = L.tileLayer.canvas();

					canvasTiles.drawTile = function (canvas, tilePoint, zoom) {
						var ctx = canvas.getContext('2d');
						ctx.strokeStyle = "#F00";
						ctx.rect(0, 0, 256, 256);
						ctx.stroke();

						ctx.fillStyle = "#00F";
						ctx.strokeStyle = "#00f";
						ctx.font = "italic 30pt Arial";
						ctx.fillText('x:' + tilePoint.x + ' y:' + tilePoint.y, 20, 50);
						ctx.fillText('zoom:' + zoom, 20, 100);

						var nTx = Math.floor(((180 + lngR) * Math.pow(2, zoom)) / 360);
						var nTy = Math.floor(nT(latR, lngR, zoom))

						if (tilePoint.x == nTx && tilePoint.y == nTy) {

							var ddx = (((180 + lngR) * Math.pow(2, zoom)) / 360) - nTx;
							var ddy = nT(latR, lngR, zoom) - nTy;
							ctx.beginPath();
							ctx.arc(ddx * 256, ddy * 256, 10, 0, 2 * Math.PI);
							ctx.stroke();
							ctx.closePath();
							ctx.fill();
						}

					}

					var point = L.point(50.3, 30.3)
					//	canvasTiles.addTo(map)
					//drawTile(canvasTiles)
					/*
					 app.alert.show(null, 'В разработке...', function () {
					 map.removeLayer(canvasTiles);
					 map.removeLayer(ukbb);


					 });
					 */


					//L.marker([latR, lngR]).addTo(map);


					var markerUkbb,
						kZoom = 0.009;

					var elCnv;
					function canvasAdd() {

						scope.markerUkbb = L.marker([latR, lngR], {icon: ukbbIcon(map.getZoom())}).addTo(map);

						function ukbbIcon(zoom) {
							var width = 507 * Math.pow(2, zoom) * kZoom;
							var height = 479 * Math.pow(2, zoom) * kZoom;
							return    L.divIcon({
								html: '<canvas width="' + width + '"  height="' + height + '" style="position: absolute; opacity: 0.7"></canvas>',
								className: 'canvas-ukbb',
								iconAnchor: L.point(0, 0)
							});
						}


						elCnv = $('.canvas-ukbb canvas');
						var ctx = elCnv[0].getContext('2d');
						var img = new Image();
						img.src = data;
						function topLeft(zoom) {
							var left = -507 * Math.pow(2, zoom) * kZoom / 2;
							var top = -479 * Math.pow(2, zoom) * kZoom / 2;
							return {top: top, left: left}
						}

						elCnv.css({top: topLeft(map.getZoom()).top, left: topLeft(map.getZoom()).left});
						function size(zoom) {
							var width = 654 * Math.pow(2, zoom) * kZoom;
							var height = 479 * Math.pow(2, zoom) * kZoom;
							return {width: width, height: height}
						}

						ctx.drawImage(img, 0, 0, size(map.getZoom()).width, size(map.getZoom()).height);
						return ctx;
					}

					redraw();

					map.on('zoomend', redraw)
					function redraw() {
						scope.markerUkbb ? map.removeLayer(scope.markerUkbb) : null;
						ctx = canvasAdd();
						var imageData = ctx.getImageData(0, 0, elCnv[0].width, elCnv[0].height);
						var pixels = imageData.data;
						for (var i = 0, il = pixels.length; i < il; i += 4) {
							if(pixels[i] == pixels[i+1] &&  pixels[i+1]<240 ){
								pixels[i + 3] = 0;
							}
						}
						ctx.putImageData(imageData, 0, 0);



					}


					scope.el.find('.cancel').click(function () {
						map.removeLayer(scope.markerUkbb);
						map.off('zoomend', redraw);
						scope.el.remove();
						scope.el = null;
					})

				},
				error: function (xhr, status, error) {
					console.log('err refactor');
				}

			});
		}

	},
	redraw: function () {

	}
}
