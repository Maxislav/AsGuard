var set = {
	el:null,
	content:null,
	init:function () {
		var scope = this;
		if (!this.content) {
			this.content = $('#register_divise').html();
			this.setContent();
			this.center.init();

			$('.map-params input[name=gmt]').val(options.gmt);
			$('.map-params input[name=zoom]').val(options.startZoom);
			$('.map-params input[name=center_lat]').val(options.startCentre.lat);
			$('.map-params input[name=center_lng]').val(options.startCentre.lng);

			$('.map-params input[name=gmt]').keyup(function(){
				validUtc($(this)[0])
			})

			$('.map-params input[name=gmt]').change(function(){
				validUtc($(this)[0])
				validUtcBlurr($(this)[0])
			})

			$('.map-params input[name=zoom]').keyup(function(el){
				validZoom($(this)[0])
			})
			$('.map-params input[name=zoom]').change(function(el){
				validZoom($(this)[0])
			})

			function validZoom(input) {
				var value = input.value;
				var rep = /[-\.;":'a-zA-Zа-яА-Я]/;
				if( 2<input.value.split('').length){
					input.value = input.value.substr(0, 2)
				}
				if (rep.test(value)) {
					value = value.replace(rep, '');
					input.value = value;
				}
				if(18<input.value) {
					input.value = 18
				}
				if(input.value && input.value<4 ) {
					input.value = 4
				}
			}
			function validUtc(input) {
				var value = input.value;
				var rep = /[.;":'a-zA-Zа-яА-Я]/;
				if (rep.test(value)) {
					value = value.replace(rep, '');
					input.value = value;
				}
				if(0<input.value.split('').length && input.value.match(/[^-]/)   ){
					input.value = parseFloat(input.value)
				}
				input.value = input.value.replace(/-{2}/,'-')

				if(23<input.value){
					input.value = 23
				}
				if(input.value<(-23)){
					input.value = -23
				}
			}

			function validUtcBlurr(input){
				input.value = input.value.replace(/-(?!'')/, '0')
					if(!input.value){
						input.value = 0;
					}
			}

			//map-params
		}
	},
	setContent:function () {
		var scope = this;
		$('#register_divise').html('');
		for (var i = 0; i < devices.length; i++) {
			$('#register_divise').append(
				$.tmpl(scope.content, {
					"name":devices[i]['name'],
					"imei":devices[i]['imei'],
					"phone":devices[i]['phone'],
					"sprite":'old'
				})
			)
		}
		$('#register_divise').append(
			$.tmpl(scope.content, {
				"name":null,
				"imei":null,
				"phone":null,
				"sprite":'new'
			})
		)
		$('#register_divise input:checkbox').click(function () {
			$('#register_divise input:checkbox').not($(this)).removeAttr("checked");
		})
	},
	regist:function () {
		var scope = this;
		var imei = $('#register_divise .new .imei input').val();
		var name = $('#register_divise .new .name input').val();
		var phone = $('#register_divise .new .phone input').val();
		if (imei && name) {
			$.ajax({
				type:'POST',
				url:'addDevice.php',
				data:'login=' + login + '&pass=' + pass + '&imei=' + imei + '&name=' + name + '&phone=' + phone + '&action=add',
				success:function (data) {
					devices = JSON.parse(data);
					scope.setContent();
					// window.location.href = '/login.php' ;
				},
				error:function (xhr, status, error) {
					alert(error)
				}
			})
		} else {
			app.alert.show(null, 'Нет данных для регистрации', function () {

			})
		}
	},
	rem:function () {
		var imei;
		var scope = this;

		$('#register_divise input:checkbox:checked').each(function () {
			imei = ($(this).closest('.old').find('.imei input').val())
		})

		if (imei) {
			//   var c = devices.length;
			var dev = [], c = 0
			for (var i = 0; i < devices.length; i++) {
				if (devices[i].imei != imei) {
					dev[c] = devices[i];
					c++;
				}
			}
			devices = dev;
			try{
				dev = JSON.stringify(dev);
			} catch(err){
				app.alert.show(null,"Ошибка заполнения форы", function(){

				})
				return null;
			}


			app.alert.show('Данный imei будет удален', imei,
				function () {
					$.ajax({
						type:'POST',
						url:'addDevice.php',
						data:'login=' + login + '&pass=' + pass + '&dev=' + dev + '&action=del',
						success:function (data) {
							// devices = JSON.parse(data);
							data;
							scope.setContent();
						},
						error:function (xhr, status, error) {
							alert(error)
						}
					})
				},
				function () {

				})
		} else {
			app.alert.show(null, 'Устройство не выбрано', function () {

			})
		}
	},
	gmtchange:function () {
		var gmt = $('.map-params input[name=gmt]').val()

		if (gmt != options.gmt) {
			app.alert.show('Подтвердите действие', "Изменить UTC = " + gmt, function () {
					$.ajax({
						type:'POST',
						url:'php/setoptions.php',
						data:'login=' + login + '&pass=' + pass + '&gmt=' + gmt,
						success:function (data) {
							console.log(data);
							if (data) {
								options = JSON.parse(data);
								app.alert.show(null, 'Изменения сохранены на сервере', function () {
								})

							} else {
								app.alert.show(null, 'Внутренняя ошибка сервера', function () {
								})
							}
							//scope.setContent();
						},
						error:function (xhr, status, error) {
							app.alert.show(null, error, function () {
							})
						}
					})
				},
				function () {
				}
			)
		} else {
			app.alert.show(null, 'Для внесения изменений поменяйте параметр', function () {
			})
		}
	},
	zoomchange:function () {
		var startZoom = $('.map-params input[name=zoom]').val();
		if (startZoom == options.startZoom) {

			app.alert.show(null, 'Для внесения изменений поменяйте параметр', function () {
			})
		} else {
			app.alert.show('Подтвердите действие', 'Изменить асштаб карты при запуске </br> Zoom = ' + startZoom, function () {
					$.ajax({
						type:'POST',
						url:'php/setoptions.php',
						data:'login=' + login + '&pass=' + pass + '&startZoom=' + startZoom,
						success:function (data) {
							console.log(data);
							if (data) {
								options = JSON.parse(data);
								app.alert.show(null, 'Изменения сохранены на сервере</br> Обновить страницу?', function () {
										window.location.href = '/login.php'
									},
									function () {
									})
							} else {
								app.alert.show(null, 'Внутренняя ошибка сервера', function () {
								})
							}
							//scope.setContent();
						},
						error:function (xhr, status, error) {
							app.alert.show(null, error, function () {
							})
						}
					})
				},
				function () {
				}
			)
		}

	},
	center:{
		bnGetCenter:null,
		init:function(){
				this.lat= options.startCentre.lat;
				this.lng= options.startCentre.lng;
		},
		set: function(e){
			$('.map-params input[name=center_lat]').val(e.lat.toFixed(3));
			$('.map-params input[name=center_lng]').val(e.lng.toFixed(3)) ;
			(function (e){
				this.lat = e.lat.toFixed(3);
				this.lng = e.lng.toFixed(3);
			}).call(set.center, e)
		},
		get:function (el) {
			this.bnGetCenter = this.bnGetCenter ? this.bnGetCenter : $(el).find('.set-center');
			this.set(map.getCenter());
		},
		save:function (){
			var scope = this;
			if(this.lat!=options.startCentre.lat && this.lng!=options.startCentre.lng){
				$.ajax({
					type:'POST',
					url:'php/setoptions.php',
					data:'login=' + login + '&pass=' + pass + '&lat=' + scope.lat+'&lng=' + scope.lng,
					success:function (data) {
						console.log(data);
						if (data) {
							options = JSON.parse(data);
							app.alert.show(null, 'Изменения сохранены на сервере</br> Обновить страницу?', function () {
									window.location.href = '/login.php'
								},
								function () {
								})
						} else {
							app.alert.show(null, 'Внутренняя ошибка сервера', function () {
							})
						}
					},
					error:function (xhr, status, error) {
						app.alert.show(null, error, function () {
						})
					}
				})

			}else{
				app.alert.show(null, 'Ведите новые параметры', function () {
				})
			}
		}
	},
	changeMap: function(name){
		name = name.replace(/^\s/g,'');

		//var baseLayers =  {'OSM':osm, 'Google':ggl, 'Google sat':gglsats, 'Yandex': yan  } ;

		var layer =  {'OSM':'osm', 'Google':'ggl', 'Google sat':'gglsats', 'Yandex': 'yan'    } ;
		$.ajax({
			type:'POST',
			url:'php/setoptions.php',
			data:'login=' + login + '&pass=' + pass + '&map=' + layer[name],
			success: function(data){

			},
			error: function(xhr, status, error){
				console.log(error);
			}

		})


	}
}
