<?php

$id=$_POST["id"];
$login=$_POST["login"];


$config_sql=file_get_contents("../config_sql.txt");
$arr_config_sql=  explode("!",$config_sql);

$hostname= "$arr_config_sql[1]";


$username = "$arr_config_sql[2]";


$password = "$arr_config_sql[3]";

$db = mysql_connect($hostname, $username, $password) //соединение с базой данных
        or die('connect to database failed');

		
$table_db=	"$arr_config_sql[4]"; // название таблицы базы
mysql_select_db($table_db) or die('db not found'); //соединение  с базой данных







$tableBd="information";

$sql = "UPDATE `$table_db`.`$tableBd` SET `confirm` = '1' WHERE `information`.`id` = '$id';";

if (!mysql_query($sql,$db))
  {
  die('Error: ' . mysql_error());
  }
  mysql_close($db);
  
echo "подтверждено";






?>