<?php

$id=$_POST["id"];
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







$tableBd="information";

if ($event_confirm==1){ // если пользователь имеет суперправа
$sql = "UPDATE `$table_db`.`$tableBd` SET `confirm` = '0' WHERE `information`.`id` = '$id';";

if (!mysql_query($sql,$db))
  {
  die('Error: ' . mysql_error());
  }
  
 $sql = "UPDATE `$table_db`.`$tableBd` SET `probable` = '0' WHERE `information`.`id` = '$id';";

if (!mysql_query($sql,$db))
  {
  die('Error: ' . mysql_error());
  } 
} 

if ($event_confirm!=1 && $event_change==1){ //если пользователь имеет только право попытки надо изменить только свою запись

 $sql = "UPDATE `$table_db`.`$tableBd` SET `probable` = '0' WHERE `information`.`id` = '$id' AND `information`.`user` = '$login' ;";

if (!mysql_query($sql,$db))
  {
  die('Error: ' . mysql_error());
  } 

}




  mysql_close($db);
  
echo "Запись удалена";






?>