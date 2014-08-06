<?php

$login = $_POST["login"];
$key = $_COOKIE["key"];
require_once('permit.php');
require_once('permitDtpnews.php');


if (permit($login, $key)) {
    if (permitDtpnews($login)) {

    } else {
        echo "no";
        return;
    }
} else {
    echo "no";
    return;
}


$config_sql = file_get_contents("../../config_sql.txt");
$arr_config_sql = explode("!", $config_sql);
$hostname = "$arr_config_sql[1]";
$username = "$arr_config_sql[2]";
$password = "$arr_config_sql[3]";
$db = mysql_connect($hostname, $username, $password) //соединение с базой данных
or die('connect to database failed');

$table_db = "$arr_config_sql[4]"; // название таблицы базы
mysql_select_db($table_db) or die('db not found'); //соединение  с базой данных
mysql_query("SET NAMES utf8");

$res = mysql_query("SELECT * FROM  dtp WHERE  active =  1  ORDER BY datetime   ");

$temp = "";
$arrDtp = array();

if (mysql_num_rows($res) > 0) {
    while ($row = mysql_fetch_array($res)) {
        array_push($arrDtp,
            array(
                "id" => $row['id'],
                "lat" => $row['lat'],
                "lng" => $row['lng'],
                "datetime" => $row['datetime'],
                "comment" => $row['comment'],
                "address" => $row['address'],
                "accept" => $row['accept'],
                 "remotetime" => $row['remotetime'],
                "typeEvent" => $row['type'],
                "hurt" => $row['hurt'],
                "gai" => $row['gai'],
                "ambulance" => $row['ambulance'],
                "sms" => $row['sms'],
                "mail" => $row['mail'],
                "repost" => $row['repost'],
                "login" => $row['login'],
                "mh" => $row['mh']
            ));
    }
}
mysql_close($db);
echo json_encode($arrDtp);
