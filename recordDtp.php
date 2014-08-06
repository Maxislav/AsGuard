<?php

$lat=$_POST["lat"];
$lng=$_POST["lng"];
$datatime=$_POST["datatime"];
$type=$_POST["type"];
$comment=$_POST["comment"];
$login=$_POST["login"];
$event=$_POST["event"];
$event_change=$_POST["event_change"];
$event_confirm=$_POST["event_confirm"];

$config_sql=file_get_contents("../config_sql.txt");
$arr_config_sql=  explode("!",$config_sql);

$hostname= "$arr_config_sql[1]";


$username = "$arr_config_sql[2]";


$password = "$arr_config_sql[3]";

$db = mysql_connect($hostname, $username, $password) //соединение с базой данных
        or die('connect to database failed');

		
$table_db=	"$arr_config_sql[4]"; // название таблицы базы
mysql_select_db($table_db) or die('db not found'); //соединение  с базой данных

mysql_query("SET NAMES utf8");





$tableBd="information";

$sql = "INSERT INTO `$table_db`.`$tableBd` (`id`, `lat`, `lng`, `datatime`, `type`, `comment`, `probable`, `confirm`, `user`) 
VALUES (NULL, '$lat', '$lng', '$datatime', '$type', '$comment', '$event_change', '$event_confirm', '$login');";

if (!mysql_query($sql,$db))
  {
  die('Error: ' . mysql_error());
  }
  
  
mysql_close($db);
  
echo "Запись добавлена";





?>