var donor = {
	el:null,
	selectedGr:'none',
	init:function (html) {
		var scope = this;
		if (!this.el) {
			$('body').append(html);
			this.el = $('.donor');
			this.el.css('display', 'inline');
			this.el.fadeTo(100, 1);
			$('#mh').fadeTo(100, 0, function () {
				$(this).css('visibility', 'hidden')
			})

			this.el.find('.cancel').click(function () {
				scope.vhide();
			})
			this.el.draggable({ handle:".title", cancel:'.cancel' });
			//this.ajax();

			require([
				'js/jquery/chosen.jquery'
			], function () {
				$('#chzn-select').chosen({
					disable_search:true,
					no_results_text:'...'
				});
				$('#chzn-select').change(function (evt, params) {
					scope.el.find('.selected').html($("#chzn-select :selected").html())
					if (params.selected == 'none') {
						scope.el.find('.selected').css({
							color:'gray',
							textShadow:'none'
						});
						scope.selectedGr = 'none';
					} else {
						scope.el.find('.selected').css({
							color:'red',
							textShadow:'0 -1px 0px rgba(0,0,0,0.6), 1px 1px 0 #fff '
						})

						scope.selectedGr = params.selected;
					}
					//console.log(params.selected);

				});
				scope.el.find('.action .button').eq(1).click(function () {
					$('#chzn-select').val('none').trigger('chosen:updated');
					scope.el.find('.selected').css({
						color:'gray',
						textShadow:'none'
					})
					scope.el.find('.selected').html('none');
					scope.selectedGr = 'none';
					scope.el.find('textarea').val('');
					scope.vhide();
				})
				scope.el.find('.action .button').eq(0).click(function () {
					if ($(this).hasClass('disabled')) {

					} else {
						$(this).addClass('disabled');
						scope.getList(scope.selectedGr);
					}

				})

			})

		} else {
			this.vhide();
		}
	},
	vhide:function () {
		var scope = this;
		//	alert(this.el[0].style.display)
		$('#mh').fadeTo(100, 0, function () {
			$(this).css('visibility', 'hidden')
		});
		if (this.el[0].style.display == 'inline') {
			this.el.fadeTo(100, 0, function () {
				scope.el[0].style.display = 'none'
			})
		} else {
			scope.el[0].style.display = 'inline'
			this.el.fadeTo(100, 1)
		}

	},
	getList:function (group) {
		var func;
		var scope = this;
		if (group == 'none') {
			app.alert.show(null, 'Не выбрана группа', function () {

			})
			scope.el.find('.action .button').eq(0).removeClass('disabled');
		} else {
			switch (group) {
				case '1':
					func = 'donorsPhones&rh=n&group=1'
					break;
				case '1p':
					func = 'donorsPhones&rh=p&group=1'
					break;
				case '2':
					func = 'donorsPhones&rh=n&group=2'
					break;
				case '2p':
					func = 'donorsPhones&rh=p&group=2'
					break;
				case '3':
					func = 'donorsPhones&rh=n&group=3'
					break;
				case '3p':
					func = 'donorsPhones&rh=p&group=3'
					break;
				case '4':
					func = 'donorsPhones&rh=n&group=4'
					break;
				case '4p':
					func = 'donorsPhones&rh=p&group=4'
					break;
				case 'oll':
					func = 'donorsPhones'
					break;
			}
			//console.log(func)
			$.ajax({
				type:'POST',
				url:'php/donor.php',
				data:{
					func:func,
					login:login,
					pass:pass
				},
				success:function (data) {
					if (data == 'norights') {
						app.alert.show(null, "У Вас нет прав", function () {
							scope.el.find('.action .button').eq(0).removeClass('disabled')
						})
					} else {
					//	console.log(data);
						scope.send(data)
					}
					//scope.el.find('.action .button').eq(0).removeClass('disabled')
				},
				error:function (xhr, status, error) {
					//console.log(error);
					scope.el.find('.action .button').eq(0).removeClass('disabled')
				}
			});
		}


	},
	send:function (data) {
	//	data = '["0937602617","0978892646","0934627515","0660254828","0672302671","0661750020","0674413120","0673527824","0672408443","0639322802","0677472292"]'
		//data =	'["380977237678"]'
		var scope= this;
		var text = $('.donor textarea').val();
		var val = '';
		var email = '';

		var tels = JSON.parse(data)
		tels;

		for (var i = 0; i < tels.length; i++) {
			val +='38'+ tels[i] + ( i == (tels.length - 1) ? '' : ';')
		}
		//val  ='';

		if (!val ) {
			app.alert.show(null, "Список телефонов пуст", function () {
					//console.log(val);
					//return;
				}
			)
		} else {
			if (!text) {
				app.alert.show(null, "Не заполнен текст", function () {
						//console.log(val) //успех пустое сообщение
						//ajax();
						scope.el.find('.action .button').eq(0).removeClass('disabled')
					}
				)
			} else {
				//console.log(val) //успех
				ajax();
			}
		}




		function ajax() {
			console.log('action: sms'+ ', text:'+text+ ', val:'+val + ', email:'+email)

			$.ajax({
				type:'get',
				url:'alpha/fighters.php',
				data:{
					action:'sms',
					text:text,
					val:val,
					email:email
				},
				success:function (data) {
					//console.log(data) ;
					app.alert.show(null, data, function(){
						$('#chzn-select').val('none').trigger('chosen:updated');
						scope.el.find('.selected').css({
							color:'gray',
							textShadow:'none'
						})
						scope.el.find('.selected').html('none');
						scope.selectedGr = 'none';
						scope.el.find('textarea').val('');
						scope.el.find('.action .button').eq(0).removeClass('disabled')
						scope.vhide();

					})
				},
				error:function (xhr, status, error) {
					console.log(error);
					scope.el.find('.action .button').eq(0).removeClass('disabled')
				}
			})

			 /*
			app.alert.show(null, 'См параметры в консоли', function(){
				$('#chzn-select').val('none').trigger('chosen:updated');
				scope.el.find('.selected').css({
					color:'gray',
					textShadow:'none'
				})
				scope.el.find('.selected').html('none');
				scope.selectedGr = 'none';
				scope.el.find('textarea').val('');
				scope.el.find('.action .button').eq(0).removeClass('disabled')
				scope.vhide();

			})
			*/



		}
	}
}
