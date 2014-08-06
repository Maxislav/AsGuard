function setting() {

    var stroka = "";
    var addDevise;
    var selectUser = null;
    this.show = function () {
        stroka = "";
        stroka += "<tr>" + "<td style='border-bottom: 1px solid #7EBFC1;' colspan='4'  align='center' >" + "Register device" + "</td>" + "</tr>";
        stroka = stroka + "<tr>" + "<td style=' border-bottom: 2px solid #7EBFC1;  ' align='center'  >" + "N" + "</td>" + "<td style=' border-bottom: 2px solid #7EBFC1;' align='center'>" + "imai/id" + "</td>" + "<td style=' border-bottom: 2px solid #7EBFC1; ' align='center'>" + "devise name" + "</td>" + "<td style=' border-bottom: 2px solid #7EBFC1; ' align='center'>" + "phone" + "</td>" + "</tr>";
        for (var i = 0; i < countUzers; i++) {
            stroka = stroka + "<tr id='" + i + "' onclick='set.click(this)'  class='pointer'>" + "<td style=' border-bottom: 2px solid #7EBFC1; ' align='center' >" + (i + 1) + "</td>" + "<td style=' border-bottom: 2px solid #7EBFC1;' align='center'>" + uzer [i][0] + "</td>" + "<td style=' border-bottom: 2px solid #7EBFC1; ' align='center'>" + uzer [i][1] + "</td>" + "<td style=' border-bottom: 2px solid #7EBFC1; ' align='center'>" + uzer [i][2] + "</td>" + "</tr>";
        }


        addDevise = "<tr>" + "<td style=' border-bottom: 2px solid #7EBFC1; ' align='center' >" + "new" + "</td>" + "<td style=' border-bottom: 2px solid #7EBFC1;' align='center'>" + "<input id='imai' onkeyup='return set.proverka(this)' type='text' size='16'>" + "</td>" + "<td style=' border-bottom: 2px solid #7EBFC1;' align='center'>" + "<input id='devise_name' type='text' size='5'>" + "</td>" + "<td style=' border-bottom: 2px solid #7EBFC1;' align='center'>" + "<input id='phone' type='text' size='5'>" + "</td>" + "</tr>";

        document.getElementById('register_divise').innerHTML = stroka + addDevise;
    }


    this.click = function (obj) {
        //alert (obj.id);
       //alert(uzer[obj.id][0]+' '+uzer[obj.id][1])
        selectUser = {
            id: uzer[obj.id][0],
            deviseName: uzer[obj.id][1]
        } ;
        for (var i = 0; i < countUzers; i++) {
            document.getElementById(i).style.color = "#000";
        }
        var n = parseInt(obj.id);
        document.getElementById(obj.id).style.color = "red";
        document.getElementById("i_rem_dev").innerHTML = (n + 1);
    }


    this.proverka = function proverka(input) {  // функция проверки ввода только цыфр
        input.value = input.value.replace(/[^\d]/g, '');
    };


    this.regist = function () {
        //alert ("не подключено");
        var imai = document.getElementById("imai").value;
        var devise_name = document.getElementById("devise_name").value;
        var phone = document.getElementById("phone").value;

        if (imai != "" && devise_name != "") {
            //alert (imai+devise_name+phone);

            var zapros = $.ajax({
                type:'POST',
                url:'adddevise.php',
                data:'login=' + login + '&imai=' + imai + '&devise_name=' + devise_name + '&phone=' + phone,
                async:false,
                success:function (data) {
                    //alert(data);
                    //proverka_popoln();
                }
            }).responseText;


            alert(zapros);

            if (zapros == "запись добавлена") {


                countUzers++;
                //alert (uzer[countUzers][0]+uzer[countUzers][1]+uzer[countUzers][1]);
                stroka = stroka + "<tr id='" + i + "' onclick='set.click(this)'  class='pointer'>" + "<td style=' border-bottom: 2px solid #7EBFC1; ' align='center' >" + countUzers + "</td>" + "<td style=' border-bottom: 2px solid #7EBFC1;' align='center'>" + imai + "</td>" + "<td style=' border-bottom: 2px solid #7EBFC1; ' align='center'>" + devise_name + "</td>" + "<td style=' border-bottom: 2px solid #7EBFC1; ' align='center'>" + phone + "</td>" + "</tr>";
                document.getElementById('register_divise').innerHTML = stroka + addDevise;
            }

            //	document.location.href = "index.php";
        } else alert("поля не заполнены");
    }

    this.rem = function () {
        //alert(selectUser.id);

        var zapros = $.ajax({

            type:'POST',
            url:'delete_user.php',
            data:'user_id=' + selectUser.id + '&devise_name=' + selectUser.deviseName,
            async:false,
            success:function (data) {
                //alert(data);
                //proverka_popoln();

            }

        }).responseText;
        alert(zapros);

    };


    this.gmtchange = function () {
        var gmt = document.getElementById('gmt').value;

        //alert(gmt);
        var zapros = $.ajax({

            type:'POST',
            url:'changegmt.php',
            data:'login=' + login + '&gmt=' + gmt,
            async:false,
            success:function (data) {
                //alert(data);
                //proverka_popoln();

            }

        }).responseText;


        alert(zapros);


    }


}

var set = new setting();