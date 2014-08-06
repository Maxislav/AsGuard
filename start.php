<?php
//echo $device;

$deviceObj = json_decode($device, true);

//echo  count($deviceObj);
//echo  $deviceObj[0][imei];

for ($i = 0; $i < count($deviceObj); $i++) {
    $imei = $deviceObj[$i][imei];
    $res = mysql_query("SELECT * FROM log WHERE imei = '$imei'  ORDER BY datetime DESC LIMIT 1");

    while ($row = mysql_fetch_array($res)) {

        $points->$row['imei'] = array(
            "imei" => $row['imei'],
            "lat" => $row['lat'],
            "lng" => $row['lng'],
            "speed" => $row['speed'],
            "datetime" => $row['datetime'],
            "zaryad" => $row['zaryad'],
            "azimuth" => $row['azimuth'],
            "sputnik" => $row['sputnik'],
            "tc" => $row['tc'],
            "params" => $row['params'],
            "sourcedata" => $row['sourcedata']
        );
        // $points  =$row['imei'];

        /*
        $cart[$count] = array(
            "name" => $row['name'],
            "oblast" => $row['oblast'],
            "_id" => $row['id'],
            "contact" => $row['contact'],
            "help" => $row['help'],
            "option" => $row['option'],
            "karma" => $row['karma']
        );
        $count++;
        */
    }


    //$arrUzers[$i] =  $deviceObj[$i][imei].'#'.$deviceObj[$i][name].'#'.$deviceObj[$i][phone];
}
$points = json_encode($points);



$fistSubStr = 0; // для разных серверов обрезка первого символа при считывании файла  0 или 3;


//echo $countUzers;
for ($i = 0; $i < $countUzers; $i++) { //разбиваем массив юзеров на двумерный массив [имей юзера] [его имя]
    $arrEmaiUzer[$i] = explode("#", $arrUzers[$i]);

}


//echo $arrEmaiUzer[0][0].$arrEmaiUzer[1][0];


$longPos = '';
for ($i = 0; $i < $countUzers; $i++) {

    $uzer = $arrEmaiUzer[$i][0] . "i";

    //echo $uzer;

    $res = mysql_query("SELECT * FROM $uzer ORDER BY datatime DESC LIMIT 1");

    $array1 = mysql_fetch_row($res);

    //echo $array1[0].",".$array1[1].",".$array1[2].",".$array1[3]."</br>"; //последняя посылка каждого юзера
    $lastPos[$i] = $array1[0] . "," . $array1[1] . "," . $array1[2] . "," . $array1[3] . "," . $array1[4] . "," . $array1[5] . "," . $array1[6] . "," . $array1[7]; //последняя посылка каждого юзера
    $longPos = $longPos . $array1[0] . "," . $array1[1] . "," . $array1[2] . "," . $array1[3] . "," . $array1[4] . "," . $array1[5] . "," . $array1[6] . "," . $array1[7] . '#';


    //echo $lastPos[$i]."</br>"; // проверка последних данных
}


// конец работа с базой данных
$longPos = '"' . $longPos . '"';


/////////////////////////////
$arrUzers = json_encode($arrUzers); // передаем в Ov массив юзеров

$lastPos = json_encode($lastPos); // передаем массив с последними посылками
               $countUzers = 5;
for ($i = 0; $i < $countUzers; $i++) {
    $k = 'function click' . $i . '(){ map.panTo(L.latLng(arrLastPos[' . $i . '][1], arrLastPos[' . $i . '][2])); uzerClick=' . $i . '; activUzer();}'; //создание функций click0 click1.. map.setCenter(last_marker_array_position['.$i.']) карта центрируется на последней координате каждого юзера
    $funClick = $funClick . $k;

    $o = 'document.getElementById("uzer' . $i . '").onclick=click' . $i . ';  ';
    $obrabotka = $obrabotka . $o; //создание обработчика по клику. Для каждой фукции по Id юзера
}
mysql_close($db);

//include ("stats/c.php");

include("ov.html");
?>

