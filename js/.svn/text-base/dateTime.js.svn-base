function dateTime() {
    //2014-05-19 15:27:51
    this.dateToString = function (val) {
        var date = val.split(" ")[0]
        var time = val.split(" ")[1]
        var yy = date.split("-")[0]
        var mm = date.split("-")[1]
        var dd = date.split("-")[2]
        var hh = time.split(":")[0]
        var mi = time.split(":")[1]
        var ss = time.split(":")[2]
        var d = new Date(yy, mm, dd, f(hh) - f(options.gmt), mi, ss);
        var string = "" + c(d.getFullYear()) + c(d.getMonth()) + c(d.getDate()) + c(d.getHours()) + c(d.getMinutes()) + c(d.getSeconds())
        return string; //140519112715
    }

    this.strigSringPlus = function (val, hh, mi, ss) {
        !hh && (hh=0);
        !mi && (mi=0);
        !ss && (ss=0);
        if(hh==0 && mi==0 && ss==0){
            return null
        }

        if(val){

        }else{
            return null
        }

        val = '' + val;
        var a = val.split('');

        hh = f(hh);
        mi = f(mi);
        ss = f(ss);

        var _yy = f('20' + a[0] + a[1]);
        var _mm = f(a[2] + a[3])-1;
        var _dd = f(a[4] + a[5]);
        var _hh = f(a[6] + a[7]);
        var _mi = f(a[8] + a[9]);
        var _ss = f(a[10] + a[11]);
        var d = new Date(_yy, _mm, _dd, _hh + hh, _mi + mi, _ss + ss)
        var string = "" + c(d.getFullYear()) + c(d.getMonth()+1) + c(d.getDate()) + c(d.getHours()) + c(d.getMinutes()) + c(d.getSeconds());
        return string;
    }

    this.dateToDateUtc = function(d){
        return new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours() - f(options.gmt), d.getMinutes(), d.getSeconds() )
    }

    this.strinToDate = function(val){
        val = '' + val;
        var a = val.split('');



        var _yy = f('20' + a[0] + a[1]);
        var _mm = f(a[2] + a[3])-1;
        var _dd = f(a[4] + a[5]);
        var _hh = f(a[6] + a[7]);
        var _mi = f(a[8] + a[9]);
        var _ss = f(a[10] + a[11]);

        return new Date(_yy, _mm, _dd, _hh + f(options.gmt), _mi, _ss)
    }

    this.stringToDateUtc =function(val ){
        val = '' + val;
        var a = val.split('');

        var _yy = f('20' + a[0] + a[1]);
        var _mm = f(a[2] + a[3])-1;
        var _dd = f(a[4] + a[5]);
        var _hh = f(a[6] + a[7]);
        var _mi = f(a[8] + a[9]);
        var _ss = f(a[10] + a[11]);

        return new Date(_yy, _mm, _dd, _hh, _mi, _ss)

    }
    this.comparison = function(date1, date2){

    }

    function c(val) {
        val = '' + val;
        if (3 < val.split('').length) {
            var k = val.split('');
            var m = '';
            for (var i = 2; i < val.split('').length; i++) {
                m += k[i];
            }
            return m
        }
        if (val.split('').length < 2) {
            return '0' + val;
        }
        return val;
    }
}

