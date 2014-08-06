var zone = {
    el: null,
    collectionZone: [],
    zone: null,
    vhide: function (el) {

    },
    evetListiner: function () {

    },
    init: function (html) {
        var s = this;
        if (!s.el) {
            s.el = $(document.createElement('div')).attr('class', 'zone border-ridge bg')
            s.el.css({
                width: 180,
                position: 'absolute',
                left: 174,
                top: 32,
                height: $(window).height() - 38,
                zIndex: 5,
                opacity: 0,
                display: 'none'
            });
            s.el.html(html);
            $('body').append(s.el);
            s.el.find('.cancel').click(function () {
                s.hide()
            })
            s.el.find('.del-zone').click(function(){
                $.ajax({
                    url:'http:8888',
                    type: "POST",
                    success:function(d){
                        d
                    },
                    error: function(er){
                        er
                    }
                })
            })
            s.getRow();
        }

        if (s.el.css('display') == 'block') {
            s.hide()
        } else {
            s.show()
        }
        if ($('#div_avto').css('visibility') != 'hidden') {
            s.el.css({left: 174})
        } else {
            s.el.css({left: 0})
        }
    },
    show: function () {
        var s = this;
        s.el.css({
            display: 'block'
        })
        s.el.fadeTo(222, 1)
    },
    hide: function () {
        this.el.fadeTo(222, 0, function () {
            $(this).css({
                display: 'none'
            })
        })
    },
    getRow: function () {
        var s = this;
        require([
            "text!module/zone/rowzone.html"
        ], function (html) {

            if (!s.zone) {
                s.getZone(function () {
                    s.setEl(html);
                });
            } else {
                s.setEl(html);
            }

        })
    },
    position: function () {

        var s = this;
        if(s.el){
            if ($('#div_avto').css('visibility') == 'hidden') {
                s.el.css({left: 174})
            } else {
                s.el.css({left: 0})
            }

        }

    },
    getZone: function (succes) {
        var s = this;

        require([
            'text!module/zone/zone.css'
        ], function (css) {
                if (!app.css['zone']) {
                    $('head').append(
                        ' <style type="text/css" name="zone">' +
                            css +
                            ' </style>'
                    );
                }

                $.ajax({
                    url: 'php/zone.php',
                    method: 'POST',
                    data: {
                        login: login,
                        group: options.group
                    },
                    success: function (data) {

                        if (data) {
                            data = JSON.parse(data)
                        }
                        data
                        var d = data;
                        for (var name in d) {
                            for (var i = 0; i < d[name].zone.length; i++) {
                                d[name].zone[i].day = JSON.parse(data[name].zone[i].day);
                                d[name].zone[i].time = [
                                    d[name].zone[i].time_from,
                                    d[name].zone[i].time_to,

                                ];
                                d[name].zone[i].latLng = [
                                    d[name].zone[i].lat,
                                    d[name].zone[i].lng
                                ]
                            }
                        }
                        var zone = [];
                        for (var n in  d) {
                            zone.push(d[n]);
                        }
                        s.zone = zone;
                        //   s.setEl(row);
                        if (succes) {
                            succes();
                        }
                        s.setMapZone(zone);
                    },
                    error: function (data) {
                        data
                    }
                })


            }
        )





        /*
         var zone = [
         {
         name: "Maxislav",
         zone: [
         {
         radius: 1,
         latLng: [50.4347, 30.397],
         time: ["7.30", "15.37"],
         day: ["1", "2", "3", "4", "5"]
         },
         {
         radius: 2,
         latLng: [50.389, 30.495],
         time: ["15.37", "7.30"],
         day: ["1", "2", "3", "4", "5"]
         },
         {
         radius: 2,
         latLng: [50.389, 30.495],
         day: ["6", "7"]
         }
         ]
         },
         {
         name: "Sai",
         zone: [
         {
         radius: 2,
         latLng: [50.429, 30.272],
         time: ["7.30", "17.0"],
         day: ["1", "2", "3", "4", "5"]
         },


         {
         radius: 2,
         latLng: [50.481, 30.629],
         time: ["17.00", "7.30"],
         day: ["1", "2", "3", "4", "5"]
         },
         {
         radius: 2,
         latLng: [50.481, 30.629],
         time: ["5.0", "23.0"],
         day: ["6", "7"]
         }
         ]
         }
         ]
         */
        /*var a = $.tmpl(row, zone);
         s.el.find('.container-zone').append(a);
         s.setMapZone(zone);*/

    },
    setEl: function (row) {
        var s = this;
        var a = $.tmpl(row, s.zone);
        s.el.find('.container-zone').append(a);
    },


    setMapZone: function (zone) {
        var s = this;
        for (var i = 0; i < zone.length; i++) {
            for (var k = 0; k < zone[i].zone.length; k++) {
                var params = zone[i].zone[k];
                var circle = L.circle(zone[i].zone[k].latLng, zone[i].zone[k].radius, {
                    color: zone[i].zone[k].color,
                    weight: 2,
                    opacity: zone[i].zone[k].opacity
                });
                circle.params = params;

                if (!collection(circle)) {
                    s.collectionZone.push(circle);
                    circle.popup = L.popup({
                        className: 'name-zone',
                        offset: L.point(0, 40)
                    }).setLatLng(params.latLng).setContent(zone[i].name)
                }

                if (day(params.day)) {
                    if (time(params.time)) {
                        circle.addTo(map);
                        circle.popup.addTo(map)
                    }
                }
            }
        }

        setInterval(timer, 5000);

        function timer() {

            for (var i = 0; i < s.collectionZone.length; i++) {
                if (day(s.collectionZone[i].params.day)) {
                    if (time(s.collectionZone[i].params.time)) {

                        if (!s.collectionZone[i]._map) {
                            s.collectionZone[i].addTo(map);
                            s.collectionZone[i].popup.addTo(map)
                        }
                    } else if (s.collectionZone[i]._map) {
                        map.removeLayer(s.collectionZone[i]);
                        map.removeLayer(s.collectionZone[i].popup);
                    }
                } else if (s.collectionZone[i]._map) {
                    map.removeLayer(s.collectionZone[i]);
                    map.removeLayer(s.collectionZone[i].popup);
                }
            }
        }


        function collection(circle) {
            for (var i = 0; i < s.collectionZone.length; i++) {
                if (circle == s.collectionZone[i]) {
                    return true
                }
            }
            return false
        }

        function time(t) {
            var d = new Date();
            var hh = new Date().getHours();
            var date = new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours() - options.gmt, d.getMinutes(), d.getSeconds())
            var dateFrom = new Date(d.getFullYear(), d.getMonth(), d.getDate(), t[0].split('.')[0], t[0].split('.')[1], 0)
            var dateTo = new Date(d.getFullYear(), d.getMonth(), d.getDate(), t[1].split('.')[0], t[1].split('.')[1], 0)
            dateFrom
            dateTo
            if (dateFrom.getTime() < dateTo.getTime()) {
                if (dateFrom.getTime() < date.getTime() && date.getTime() < dateTo.getTime()) {
                    return true
                }
            } else {
                if (dateFrom.getTime() < date.getTime() || date.getTime() < dateTo.getTime()) {
                    return true
                }
            }
            return false
        }

        function day(_day) {
            var d = new Date();
            d = d.getDay() + '';
            for (var i = 0; i < _day.length; i++) {

                if (_day[i] == d) {
                    return true
                }
            }
            return false
        }

    }

}
