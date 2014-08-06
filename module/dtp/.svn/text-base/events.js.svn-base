define(function () {
    return function (item, button, id, data, _dtp) {
        var slider = null;
        var _dtp = _dtp;
        this.data = data;
          var s = this;

        if(!id){
            $("body").append(item);
            item.draggable({ handle: ".title" });
        }else{
            item.css({
                left:0,
                top:0,
                marginLeft:0
            })
             slider = $(document.createElement('div')).css({
                right: 180,
                top: 35,

                position: 'absolute',
                width: 0,
                overflow: 'hidden'
            })
            $('body').append(slider.append(item));
            slideShow(slider, item.height(), function(){
                slider.draggable({ handle: ".title" });
            })


        }
        item.fadeTo(222, 1);
        button.toggle('slide', {
            direction: 'up',
            duration: 0
        })
        var typeEvent=data.typeEvent;
        var gai= data.ambulance;
        var ambulance=data.ambulance;
        var hurt=data.hurt;
        var repost = data.repost;
        var mail = data.mail;
        var sms=data.sms;
        var accept = data.accept;
        var remotetime =data.remotetime;
        var address = null;
        var mh = data.mh;
        s.timer = null;

        if(id && remotetime ){
            comparison();
           this.timer = setInterval(comparison, 1000)
        }
        function comparison(){

           var date1 = app.dateTime.stringToDateUtc(remotetime) //дата в uts
           var date2 = app.dateTime.dateToDateUtc(new Date()) //дата в uts
            var dd = date1.valueOf() -date2.valueOf();
            var dif = new Date(dd);
            var mi;
            var ss;
            if(dd<0){
               mi = 0;
               ss =0;
               s.timer && clearInterval(s.timer);
            }else{
                var mi = (dif.getMinutes());
                var ss = (dif.getSeconds());
            }
            item.find('div[name=rtime-mi]').html(mi)
            item.find('div[name=rtime-ss]').html(ss)
           // console.log(mi+":" +ss)

        }

        app.loadCss('lib/jquery/jquery-ui-timepicker-addon.css', 'jquery-ui-timepicker-addon',
            function () {
                require([
                    'lib/jquery/jquery-ui-timepicker-addon'
                ], function () {
                    item.find('input[name=datetime]').datetimepicker({
                        timeFormat: 'HH:mm:ss',
                        dateFormat: 'yy-mm-dd',
                        setDate: new Date()
                    })
                    item.find('input[name=datetime]').datetimepicker(
                        "setDate", data.datetime ? app.dateTime.strinToDate(data.datetime) : new Date()
                    )
                })
            })
        volunteers(item);

        item
            .on('click', '.cancel', function () {
                item.fadeTo(222, 0, function () {
                    if(slider){
                        clearInterval(s.timer);
                       slider.remove();
                        dtp.dtpManagers[id] = null;
                    }else{
                        item.css({
                            display: 'none'
                        });
                    }
                })
            })

            .on('click', '.button2.deleteEvent', function () {

                app.alert.show(null, 'Удалить событие?',function(){
                        s.timer && clearInterval(s.timer);
                        del(id);
                },
                function(){

                })

            })
            .on('click', '[name=setMap]', function () {
                slide()
                map.on('click', setMarker)
            })
            .on('click', '.sprite-add .button2.ok', function () {
                slide();

                if(dtp.tmpMarker){
                    data.lat =   dtp.tmpMarker.getLatLng().lat;
                    data.lng =   dtp.tmpMarker.getLatLng().lng;
                    //dtp.tmpMarker = null;
                }
                dtp.slap.active &&  dtp.slap.offOk.call(dtp.slap);
                map.off('click', setMarker)
            })
            .on('click', '.sprite-add .button2.del', function () {
                slide();
                if(id){

                    dtp.slap.offDel.call(dtp.slap,id);
                }
                dtp.resetTmpMarker.call(dtp, item);
                map.off('click', setMarker);
            })
            .on('click', '.sprite-add .button2.no', function () {
                slide()

                    if (data.lat && data.lng){
                        item.find('input[name=lat]').val(f(data.lat).toFixed(5));
                        item.find('input[name=lng]').val(f(data.lng).toFixed(5));
                    }else{
                        item.find('input[name=lat]').val('');
                        item.find('input[name=lng]').val('');
                    }
                dtp.slap.active &&  dtp.slap.offNo.call(dtp.slap);
                map.off('click', setMarker);
            })


            .on('change', '.typeEvent input', function () {
                typeEvent = $(this).attr('t');
                dtp.tmpMarker && setMarker(null);
                if(id){
                    setMarker(null);
                }


            })
            .on('change', '.hurt input', function () {
                hurt = $(this).attr('p');
            })
            .on('change', '.gai input', function () {
                switch ($(this).attr('name')) {
                    case 'gai':
                        gai = ($(this).is(':checked')) ? '1' : null;
                        break;
                    case 'ambulance':
                        ambulance = ($(this).is(':checked')) ? '1' : null;
                        break;
                    case 'repost':
                        repost = ($(this).is(':checked')) ? '1' : null;
                        break;
                    case 'email':
                        mail = ($(this).is(':checked')) ? '1' : null;
                        break;
                    case 'sms':
                        sms = ($(this).is(':checked')) ? '1' : null;
                        break;
                    case 'mh':
                        mh = ($(this).is(':checked')) ? '1' : null;
                        break;
                }
            })

            .on('click', ".button2[name=save]", function () {
                s.timer && clearInterval(s.timer);
                save()
            })
            .on('click', ".button2[name=cancel]", function () {
                item.fadeTo(222, 0, function () {
                    if(slider){
                        s.timer && clearInterval(s.timer);
                        slider.remove();
                        dtp.dtpManagers[id] = null;
                    }else{
                        item.css({
                            display: 'none'
                        });
                    }
                   if(!id){
                      dtp.resetTmpMarker(item)
                   }
                    s.timer && clearInterval(s.timer);

                })
            });

        function slide() {
            item.find('.toggle').toggle('slide', {
                direction: 'up',
                duration: 100
            })
            button.toggle('slide', {
                direction: 'up',
                duration: 100
            })
        }

        function setMarker(e) {
            if(data.id){
                data.typeEvent = typeEvent;
                dtp.setMarker.call(dtp, e, item, s.data)
            }else{
                dtp.setTempMarker.call(dtp, e, item, typeEvent)
            }

        }


        function save() {
            item
            var comment = item.find('textarea').val();

            var dadteTime = dateToString(item.find('input[name=datetime]').val());

            if(item.find('input[name=remotetime]').val()){
                remotetime =  app.dateTime.strigSringPlus(dadteTime, 0, item.find('input[name=remotetime]').val(), 0 );
            }


            address = item.find('input[name=address]').val();

            var lat, lng;
            if(id){
                lat = data.lat;
                lng = data.lng;
            }else{
                lat = dtp.tmpMarker ? (dtp.tmpMarker.getLatLng().lat) : null;
                lng = dtp.tmpMarker ? (dtp.tmpMarker.getLatLng().lng) : null;
            }
            $.ajax({
                method: 'POST',
                url: 'php/addDtp.php',
                data: {

                    login: login,
                    id: id,
                    lat:lat,
                    lng: lng,
                    dadteTime: dadteTime,
                    comment: item.find('textarea').val(),
                    typeEvent: typeEvent,
                    gai: gai,
                    address:address,
                    ambulance: ambulance,
                    remotetime: remotetime,
                    hurt: hurt,
                    repost: repost,
                    mail: mail,
                    sms: sms,
                    accept: item.find('input[name=accept]').val() ? item.find('input[name=accept]').val() : null,
                    mh:mh
                },
                success: function (data) {

                    item.fadeTo(222, 0, function () {
                        item.remove();
                        dtp.dtpManagers['dtpManageAdd'] = null;
                        dtp.tmpMarker && map.removeLayer(dtp.tmpMarker);
                    })
                    dtp.zaprosDtp();
                },
                error: function (a, b, c) {

                }
            });

        }
        function del(id){
            $.ajax({
                method: 'POST',
                url: 'php/hideDtp.php',
                data:{
                    login:login,
                    id:id
                },
                success: function(data){
                    item.fadeTo(222, 0, function () {
                        if(slider){
                            slider.remove();
                            dtp.dtpManagers[id] = null;
                        }else{
                            item.css({
                                display: 'none'
                            });
                        }
                        item.remove();
                        if(dtp.markers[id]){
                            map.removeLayer(dtp.markers[id]);
                            delete  dtp.markers[id];
                        }
                    })
                    dtp.zaprosDtp();
                },
                error: function (a, b, c) {

                }
            })
        }

        function dateToString(val) {
            return app.dateTime.dateToString(val);
        }


        function volunteers(item) {
            $.ajax({
                method: 'POST',
                url: 'php/volunteers.php',
                data: {
                    login: login
                },
                success: function (data) {
                    item.find('input[name=accept]').autocomplete({
                        source: function (request, response) {
                            var results = $.ui.autocomplete.filter(JSON.parse(data), request.term);

                            response(results.slice(0, 10));
                        }
                    })
                    data

                },
                error: function (a, b, c) {

                }
            })
        }
        function slideShow(slide, height, success){
            var t = setTimeout(function(){
                var width = slide.width();
                if(width<500){
                    slide.css({
                    width: width+100,
                    height:height
                    })
                    slideShow(slide, height, success)
                }else{
                    success()
                }
            }, 20)
        }

    }
})