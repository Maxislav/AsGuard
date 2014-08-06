var personal = {
    el: null,
    data:null,
	color: [
    ],
    color_is_alert: null,
    color_is_alert1: null,
    color_is_alert2: null,
    color_is_alert3: null,
    color_is_alert4: null,
    scrollbar4: null,
    init: function (html) {
        var s = this;
        if (!this.el) {

            s.el = $(document.createElement('div')).css({
                top: 40,
                left: '50%',
                width: 400,
                position: 'absolute',
                zIndex: 2,
                marginLeft: -200,
				opacity: 0
            }).addClass('border-ridge ').addClass('bg-white').attr('id', 'div_personal')
            s.el.append(html)
            $('body').append(s.el);
			s.el.fadeTo(300,1);
            s.scrollbar4 = $('#scrollbar4').tinyscrollbar({invertscroll: true, wheel: 40});
			s.el.find('.title .cancel').click(function(){
				s.init(html);
			})
            s.el.find('  .button.close').click(function(){
                s.init(html);
            })

			if (brr != 'Android'){
				s.el.draggable({ handle: ".title" });
			}
            s.parseData();
        }else{
			this.vhide();

		}
    },
	vhide: function(){
		if(this.el.css('opacity')!=0){
			this.close();
		}else{
			this.el.css('display','inline')
			this.el.fadeTo(300,1)
		}

	},

    getData: function () {
        var s = this;
        if (!s.data) {
            s.data = $.ajax({

                type: 'POST',
                url: 'php/personal.php',
                data: 'login=' + login + '&pass=' + pass,
                async: false,
                success: function (data) {
                }
            }).responseText;
            //alert(scope.data);
            return s.data;
        } else {
            return s.data;
        }
    },
    parseData: function (param) {
        var s = this;
        var userText = "";
        var cart = [];
        var phone3;
        if (param) {
            s.cart = param;
            cart = param;
        } else {
            try {
                cart = JSON.parse(this.getData());
            } catch (err) {
                document.getElementById('table_personal').innerHTML = "Нет прав на просмотр информации";
                return;
            }
            cart = cart ? cart : [];
            s.cart = cart;
            for (var i = 0; i < cart.length; i++) {
                s.color[i] = {};
            }
            for (var i = 0; i < cart.length; i++) {
                for (var option in cart[i]) {
                    s.color[i][option] = cart[i][option];
                }
            }
        }


        userText = '<table >';


        for (var i = 0; i < cart.length; i++) {
            phone3 = "phone3";

            if (s.color[i]['is_alert'] == 1) {
                s.color_is_alert = 'rgba(255,0,0,0.4)'
            } else if (s.color[i]['email']) {
                s.color_is_alert = 'rgba(255,138,0,0.3)';
            } else {
                s.color_is_alert = 'transparent'
            }
            if (s.color[i]['is_alert1'] == 1) {
                color_is_alert1 = 'rgba(255,0,0,0.4)'
            } else if (s.color[i]['phone1']) {
                s.color_is_alert1 = 'rgba(255,138,0,0.3)';
            } else {
                s.color_is_alert1 = 'transparent'
            }

            if (s.color[i]['is_alert2'] == 1) {
                s.color_is_alert2 = 'rgba(255,0,0,0.4)'
            } else if (s.color[i]['phone2']) {
                s.color_is_alert2 = 'rgba(255,138,0,0.3)';
            } else {
                s.color_is_alert2 = 'transparent'
            }


            userText += '<tr>' + '<td style="width: 30px">' + (i + 1) + '</td><td style="width: 130px">' +
                cart[i]['user'] + ' </td><td class="check2" style="background-color:' + s.color_is_alert + '"> ' +

                '<input type="checkbox" name="is_alert" ' + (cart[i]['is_alert'] == 1 ? 'checked="checked"' : '') +
                'onchange = "personal.eventChecked(this,' + i + ')" >' +

                '</td><td  class="check" style="background-color:' + s.color_is_alert1 + '"> ' +
                '<span style="font-size: 9px">' + (cart[i]['phone1'] ? cart[i]['phone1'] : '' ) + '</span>' +
                '<span style="float: right"><input type="checkbox" ' +
                (cart[i]['phone1'] ? 'style="visibility:visible"' : 'style="visibility:hidden"') +
                '   name="is_alert1"' + (cart[i]['is_alert1'] == 1 ? 'checked="checked"' : '') +
                'onchange = "personal.eventChecked(this,' + i + ')" >' + '</span>' +

                //  '<input type="checkbox" name="is_alert1"'+ (cart[i]['is_alert1'] ==1 ? 'checked="checked"':'') +'onchange = "loadPersonal.eventChecked(this,'+i+')" >'+'</span>'+
                // '<input type="checkbox" name="is_alert1"'+ (cart[i]['is_alert1'] ==1 ? 'checked="checked"':'') +'onchange = "loadPersonal.eventChecked(this,'+i+')" >'+'</span>'+

                '</td><td  class="check" style="background-color:' + s.color_is_alert2 + '"> ' +
                '<span style="font-size: 9px">' + (cart[i]['phone2'] ? cart[i]['phone2'] : '') + '</span>' +
                '<span style="float: right"><input type="checkbox" ' +
                (cart[i]['phone2'] ? 'style="visibility:visible"' : 'style="visibility:hidden"') +
                '   name="is_alert2"' + (cart[i]['is_alert2'] == 1 ? 'checked="checked"' : '') +
                'onchange = "personal.eventChecked(this,' + i + ')" >' + '</span>' +


                '</td>'
            '</tr>';
        }


        userText += '</table>';
        document.getElementById('table_personal').innerHTML = userText;

        //  $('#table_personal').css("background-color",'red');
        if (s.scrollbar4) {
            s.scrollbar4.tinyscrollbar_update();
        } else {
            s.scrollbar4 = $('#scrollbar4').tinyscrollbar({invertscroll: true, wheel: 40});
        }

    },

    clear: function (param) {
        var s = this;
        if (param == 'oll') {
            for (var i = 0; i < this.cart.length; i++) {
                this.cart[i]['is_alert'] = 0;
                this.cart[i]['is_alert1'] = 0;
                this.cart[i]['is_alert2'] = 0;
                this.cart[i]['is_alert3'] = 0;
                this.cart[i]['is_alert4'] = 0;
            }
        } else {
            for (var i = 0; i < this.cart.length; i++) {
                this.cart[i][param] = 0;
            }
        }
        this.parseData(this.cart);
    },
    eventChecked: function (obj, i) {
        var scope = this;
        obj.name;
        scope.cart[i][obj.name] = (obj.checked ? 1 : 0);

    },
    alertMsg: function () {
        //vhide({id:'send_personal'});
        //alertMsg.show('Идет отправка');

        var scope = this;
        var val = '';
        var send;
        var email = '';
        var action = 'sms';
        var text = $('#perconal_comment').val();
        for (var i = 0; i < scope.cart.length; i++) {
            if (scope.cart[i]['is_alert1'] == 1) {
                val += scope.cart[i]['phone1'] + ';'
            }
            if (scope.cart[i]['is_alert2'] == 1) {
                val += scope.cart[i]['phone2'] + ';'
            }
            if (scope.cart[i]['is_alert'] == 1) {

                email += scope.cart[i]['email'] + ';';
            }
        }
        ;

        var arrVal = val.split(';');
        val = '';
        for (var i = 0; i < arrVal.length; i++) {
            val += arrVal[i] + (i < arrVal.length - 2 ? ';' : '' );
        }


        var arrEmail = email.split(';');
        email = '';
        for (var i = 0; i < arrEmail.length; i++) {
            email += arrEmail[i] + (i < arrEmail.length - 2 ? ';' : '');
        }
        text;
        val;
        email;
		console.log('email: ' + email)

        /* send = $.ajax({
         type: 'POST',
         //url:'alpha/fighters.php',
         url: 'alpha/send_mail.php',
         data: {
         action: 'sms',
         text: text,
         val: val,
         email: email
         },
         async: false,
         success: function (data) {
         }
         }).responseText;
         ///   alert(send);*/

        send = $.ajax({
            type: 'GET',
            url:'alpha/fighters.php',
            data: {
                login: login,
                action: 'sms',
                text: text,
                val: val,
                email: email
            },
            async: false,
            success: function (data) {
            }
        }).responseText;
           alert(send);

    },
	close: function(){
		var s = this;
		this.el.fadeTo(222,0,function(){
			$(this).css('display','none')

		})
	}

}
