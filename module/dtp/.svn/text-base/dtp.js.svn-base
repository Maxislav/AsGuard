var dtp = {
    row: null,
    block: null,
    t: null,
    data: null,
    arr: null,
    offsetY: null,
    scrollbar: null,
    arrDmEl: [],
    tmpMarker: null,
    dtpManagers: {},
    markers: {},
    child: {},
    init: function (html) {
        var s = this;
        this.row = html;

        require([
            'module/dtp/dtp.jquery.tinyscrollbar'
        ], function () {
            s.scrollbar = $('#scrollbar2').dtptinyscrollbar({
                drag: s.drag
            });
            s.zaprosDtp();
        });
        $("#markMap").click(function () {
            s.markMap();
        })
    },
    drag: function (y) {
        var s = this;


    },
    zaprosDtp: function () {
        var s = this;
        if (!eventBlock.blocked && !s.block) { // eсли мышкой не заблокированно и запрос не начался
            s.block = true;  // запрос начался

            $.ajax({
                type: 'POST',
                url: 'php/dtp.php',
                data: {
                    login: login
                },
                success: function (data) {
                    s.block = false;
                    s.timer();
                    if (!eventBlock.blocked && !s.block) {
                        s.compare(data);
                    }

                },
                error: function (xhr, status, error) {
                    s.block = false;
                    console.log('Обрыв связи Дтп1');
                    s.timer();
                }
            })
        } else {
            s.timer();
        }
    },
    timer: function () {
        var s = this;
        if (s.t) {
            clearInterval(s.t);
        }

        s.t = setTimeout(function () {
            s.zaprosDtp();
        }, 5000)
    },
    compare: function (data) {
        if (this.data != data) {
            this.data = data;
            this.draw(this.drag)
        }
    },
    draw: function (drag) {
        var s = this;
        try {
            s.arr = JSON.parse(s.data)
        } catch (err) {
            return;
        }
        $('#div_information .overview').html('');
        for (var i = 0; i < s.arr.length; i++) {
            var row = $.tmpl(s.row, s.arr[i]);
            row.css({
                padding: 2
            }).attr('class', 'dtp-container')
            $('#div_information .overview').append(row);

            s.scrollbar.dtptinyscrollbar_update();
            s.clickRoll(row.find('.button.roll'), s.arr[i]);
            s.setMarker(null, row,s.arr[i] );


        }


    },
    clickRoll: function(button, data){
        var s = this;
        button.click(function(){
            s.dtpManageCreate(data.id, data)
        })
    },
    markMap: function () {
        this.dtpManageCreate('dtpManageAdd');
    },
    dtpManageCreate: function (_item, data) {
        var s = this;
        var data = data ? data : {
            id: null,
            gai: null,
            mh: null,
            repost: 1,
            ambulance: null,
            sms: 1,
            hurt: null,
            typeEvent: null,
            mail: 1,
            address: null,
            title: 'Добавить событие'
        }
        if (!s.dtpManagers[_item]) {
            require([
                'text!module/dtp/title.html',
                'text!module/dtp/dtp-manage.html',
                'text!module/dtp/spritebutton.html'
            ], function (html, dtpManag, spritebutton) {
                var item = $(document.createElement('div')).css("width", "490px");
                item.append($.tmpl(html, data));
                var button = $(document.createElement('div')).append(spritebutton);
                item.append(button);

                var div = $(document.createElement("div")).attr('class', 'toggle')
                    .append($(document.createElement("div"))
                        .attr('class', 'dtp-manage add')
                        .append($.tmpl(dtpManag,data)));
                item.append(div);
                item.css({
                    position: "absolute",
                    left: "50%",
                    marginLeft: "-246px",
                    top: 30,
                    zIndex: 2,
                    opacity: 0
                }).attr('class', 'border-ridge')
                s.dtpManagers[_item] = item;
                require([
                    'module/dtp/events'
                ],function(js){
                    s.child[_item] = new js(item, button,data.id, data);
                })
            })

        } else {
            if(!data.id){
                s.dtpManagers[_item].css({
                    display: "inline"
                }).fadeTo(222, 1);
                s.dtpManagers[_item].find('input[name=datetime]').datetimepicker(
                    "setDate", new Date()
                )
            }else{
                slideHide(s.dtpManagers[_item].parent())
                function slideHide(slide){

                    var width = slide.width();
                    if(0<width){
                        slide.css({
                            width: width-100

                        })

                        setTimeout(function(){
                              slideHide(slide);
                        }, 20)
                    }else{
                        slide.remove();
                        s.dtpManagers[_item]=null;
                    }

                }

            }

        }
    },


    tmpIcon: function (type) {

        switch (type){
            case "dtp": return   L.icon({
                iconUrl: 'images/mrk_dtp.png',
                iconRetinaUrl: 'my-icon@2x.png',
                iconSize: [20, 20],
                iconAnchor: [10, 10]
            });
            break;
            case "malfunction": return  L.icon({
                iconUrl: 'images/mrk_malfunction.png',
                iconRetinaUrl: 'my-icon@2x.png',
                iconSize: [20, 20],
                iconAnchor: [10, 10]
            });
            break;
            case "away": return  L.icon({
                iconUrl: 'images/mrk_away.png',
                iconRetinaUrl: 'my-icon@2x.png',
                iconSize: [20, 20],
                iconAnchor: [10, 10]
            });
                break;
            case "saway": return  L.icon({
                iconUrl: 'images/mrk_away.png',
                iconRetinaUrl: 'my-icon@2x.png',
                iconSize: [20, 20],
                iconAnchor: [10, 10]
            });
                break;
            case "mugging": return  L.icon({
                iconUrl: 'images/mrk_mugging.png',
                iconRetinaUrl: 'my-icon@2x.png',
                iconSize: [20, 20],
                iconAnchor: [10, 10]
            });
                break;
            default :  return   L.icon({
                iconUrl: 'images/mrk_dtp.png',
                iconRetinaUrl: 'my-icon@2x.png',
                iconSize: [20, 20],
                iconAnchor: [10, 10]
            });
        }

    },
    setTempMarker: function (e, item, type) {
        var s = this;
        var latlng;
        if (s.tmpMarker) {
            latlng = s.tmpMarker.getLatLng();
            map.removeLayer(s.tmpMarker)
        }
        if(e){
            latlng = e.latlng
        }

        s.tmpMarker = L.marker(latlng, {icon: s.tmpIcon(type)}).addTo(map);
        item.find('input[name=lat]').val(f(latlng.lat).toFixed(5));
        item.find('input[name=lng]').val(f(latlng.lng).toFixed(5));
    },
    setMarker: function(e, item, data){
        var s = this;
        var marker;
        if(!e){
            s.markers[data.id] && map.removeLayer(s.markers[data.id]);

            if(data.lat && data.lng){
                s.markers[data.id] =  L.marker([data.lat, data.lng], {icon: s.tmpIcon(data.typeEvent)}).bindPopup(data.comment).addTo(map);
                marker =  s.markers[data.id];

                item.on('click', '', function(e){
                    if(!$(e.target).hasClass('roll'))
                    map.panTo(marker.getLatLng())
                })


            }
        }else{
           if(!s.slap.active && s.markers[data.id]){
               s.slap.on(s.markers[data.id],data.id);
           }
            s.setTempMarker(e, item, data.typeEvent)
        }
    },
    slap: {
        el: null,
        active: false,
        id: null,
        tt: null,
        on: function(el, id){
            var s = this
            s.active = true;
            s.el = el;
            s.id = id;
            t();
            function t (){
                if(s.active){
                    map.removeLayer(s.el)
                    s.tt = setTimeout(function(){
                        s.el.addTo(map);
                        s.ta =  setTimeout(t,500);
                    },100)
                }else{
                    clearTimeout(s.tt);
                    clearTimeout(s.ta);
                  //  map.removeLayer(s.el);
                }
            }
        },
        offOk: function(){
            var s = this;
            s.active = false;
            clearTimeout(s.tt);
            clearTimeout(s.ta);
            map.removeLayer(s.el);
            dtp.markers[s.id] = dtp.tmpMarker;
            map.removeLayer(dtp.tmpMarker);
            dtp.tmpMarker = null;
            dtp.markers[s.id].addTo(map);

            dtp.child[s.id].data.lat = dtp.markers[s.id].getLatLng().lat;
            dtp.child[s.id].data.lng = dtp.markers[s.id].getLatLng().lng;
        },
        offNo: function(){
            this.active = false;
            dtp.tmpMarker && map.removeLayer(dtp.tmpMarker);
            dtp.tmpMarker = null;
        },
        offDel: function(id){
            var s = this;
            this.active = false;
            clearTimeout(s.tt);
            clearTimeout(s.ta);
            if(dtp.tmpMarker){
                map.removeLayer(dtp.tmpMarker);
                dtp.tmpMarker = null;
            }
            if(dtp.markers[id]) {
                map.removeLayer(dtp.markers[id]);
                delete dtp.markers[id]
            }
            dtp.child[id].data.lat = null;
            dtp.child[id].data.lng = null;
        }
    },
    resetTmpMarker: function(item){
        var s = this;
        s.tmpMarker && map.removeLayer(s.tmpMarker);
        s.tmpMarker = null;
        item.find('[name=lat]').val('');
        item.find('[name=lng]').val('')

    }
}
