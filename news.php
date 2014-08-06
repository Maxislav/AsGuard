<?php
$login = $_POST["login"];
$pass = $_POST["pass"];


$config_sql = file_get_contents("../config_sql.txt");
$arr_config_sql = explode("!", $config_sql);
$hostname = "$arr_config_sql[1]";


$username = "$arr_config_sql[2]";


$password = "$arr_config_sql[3]";

$db = mysql_connect($hostname, $username, $password) //соединение с базой данных
    or die('connect to database failed');

$table_db = "$arr_config_sql[4]";
mysql_select_db($table_db) or die('db not found'); //соединение  с базой данных


$res = mysql_query("SELECT * FROM user WHERE name ='$login'");

if (mysql_num_rows($res) > 0) {
    while ($row = mysql_fetch_array($res)) {
        $pass_db = $row['pass'];
        $options = $row['options'];
        $device = $row['device'];
        $options = $row['options'];
    }

    $deviceObj = json_decode($device, true);




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
        }
    }

    $points = json_encode($points);
    echo $points;
    mysql_close($db);


} else {
    echo 'null';
    mysql_close($db);
}



?>