<?php
//удаление пользователя

$devise_name=$_POST["devise_name"];
$user_id=$_POST["user_id"];
$user_id=$user_id.'i';

$config_sql=file_get_contents("../config_sql.txt");
$arr_config_sql=  explode("!",$config_sql);

$hostname= "$arr_config_sql[1]";


$username = "$arr_config_sql[2]";


$password = "$arr_config_sql[3]";




$db = mysql_connect($hostname, $username, $password) //соединение с базой данных
        or die('connect to database failed');


//$table_db = 'monitoring';
$table_db=	"$arr_config_sql[4]";
mysql_select_db($table_db) or die('db not found');


$res = mysql_query("DROP TABLE `$user_id`");
$res = mysql_query("DELETE FROM `uzer_devise` WHERE `uzer`='$devise_name'");
$res = mysql_query("DELETE FROM `uzer_devise` WHERE `devise_name`='$devise_name'");




mysql_close($db);
$msg = 'Устройства'.$user_id.' '.$devise_name.'Удалено. Требуется перезагрузка';
echo $msg ;

?>