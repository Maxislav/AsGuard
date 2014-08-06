function GeoCoder(){
    var geocoder;
    var count_geo=0;
    this.open = function(){
        geocoder = new google.maps.Geocoder();

        $(document).ready(function() {

            //initialize();

            $(function() {
                $("#address").autocomplete({
                    //Определяем значение для адреса при геокодировании
                    source: function(request, response) {
                        geocoder.geocode( {'address': request.term}, function(results, status) {
                            response($.map(results, function(item) {

                                return {
                                    label:  item.formatted_address,
                                    value: item.formatted_address,
                                    latitude: item.geometry.location.lat(),
                                    longitude: item.geometry.location.lng()
                                }
                            }));
                        })
                    },
                    //Выполняется при выборе конкретного адреса
                    select: function(event, ui) {
                        $("#latitude").val(ui.item.latitude);
                        $("#longitude").val(ui.item.longitude);
                        //alert(ui.item.latitude);
                        map.panTo(L.latLng(ui.item.latitude, ui.item.longitude));
                        map.setZoom(17);
                        count_geo++;
                        geo_marker(ui.item.latitude,ui.item.longitude, count_geo);

                        var location = new google.maps.LatLng(ui.item.latitude, ui.item.longitude);

                        // marker.setPosition(location);
                        // map.setCenter(location);
                    }
                });
            });

            //Добавляем слушателя события обратного геокодирования для маркера при его перемещении
            google.maps.event.addListener(marker, 'drag', function() {
                geocoder.geocode({'latLng': marker.getPosition()}, function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        if (results[0]) {
                            $('#address').val(results[0].formatted_address);
                            $('#latitude').val(marker.getPosition().lat());
                            $('#longitude').val(marker.getPosition().lng());
                        }
                    }
                });
            });

        });

        document.getElementById("geosearch_v").onclick=geosearch;

        function geosearch(){
            if(document.getElementById("div_geosearch").style.visibility=="visible"){
                document.getElementById("div_geosearch").style.visibility="hidden";

            }else{
                document.getElementById("div_geosearch").style.visibility="visible";

            }
        }
    }


}
var geoCoder = new GeoCoder();
