<?php

$login=$_POST["login"];
$key = $_COOKIE["key"];
$_id = $_POST["id"];




require_once('permit.php');
require_once('permitAdmin.php');



if(permit($login,$key)){
    if(permitAdmin($login)){

    }else{
        echo "no";
        return;
    }
} else{
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

$sql = "UPDATE dtp SET active = '0' WHERE id = '$_id';";

if (!mysql_query($sql,$db))
{
    die('Error: ' . mysql_error());
}


mysql_close($db);