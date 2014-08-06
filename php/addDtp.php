<?php

$login = $_POST["login"];
$key = $_COOKIE["key"];

$id = $_POST["id"];
$lat = $_POST["lat"];
$lng = $_POST["lng"];
$datetime = $_POST["dadteTime"];
$comment = $_POST["comment"];

$comment = $_POST["comment"];
$typeEvent = $_POST["typeEvent"];
$gai = $_POST["gai"];
$ambulance = $_POST["ambulance"];
$hurt = $_POST["hurt"];
$remotetime = $_POST["remotetime"];
$repost = $_POST["repost"];


$mail = $_POST["mail"];
$sms = $_POST["sms"];
$accept = $_POST["accept"];
$address = $_POST["address"];

$mh = $_POST["mh"];


require_once('permit.php');
require_once('permitAdmin.php');


if (permit($login, $key)) {
    if (permitAdmin($login)) {

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
mysql_select_db($table_db) or die('db not found');
mysql_query("SET NAMES utf8");


if ($id) {
    $sql = "UPDATE dtp SET
    lat = '$lat',
    lng = '$lng',
    datetime ='$datetime',
    address ='$address',
    comment ='$comment',
    type ='$typeEvent',
    ambulance ='$ambulance',
    hurt = '$hurt',
    remotetime = '$remotetime',
    gai = '$gai',
    sms = '$sms',
    mail = '$mail',
    repost ='$repost',
    login = '$login',
    mh = '$mh'
     WHERE id = '$id';";
} else {

    $sql = "INSERT INTO dtp
(id,    lat,    lng,   datetime,  address, comment, type, ambulance , hurt, remotetime, gai ,sms, mail, repost, active, login, accept ,mh)
VALUES
(NULL, '$lat', '$lng', '$datetime', '$address' , '$comment', '$typeEvent', '$ambulance', '$hurt' , '$remotetime', '$gai', '$sms', '$mail', '$repost' , '1', '$login', '$accept', '$mh');";

}


if (!mysql_query($sql, $db)) {
    die('Error: ' . mysql_error());
}


mysql_close($db);