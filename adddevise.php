<?php

$login=$_POST["login"];
$imai=$_POST["imai"];
$devise_name=$_POST["devise_name"];
$phone=$_POST["phone"];


$imai1=$imai."i";

$config_sql=file_get_contents("../config_sql.txt");
$arr_config_sql=  explode("!",$config_sql);

$hostname= "$arr_config_sql[1]";


$username = "$arr_config_sql[2]";


$password = "$arr_config_sql[3]";

$db = mysql_connect($hostname, $username, $password) //соединение с базой данных
        or die('connect to database failed');

		
$table_db=	"$arr_config_sql[4]"; // название таблицы базы
mysql_select_db($table_db) or die('db not found'); //соединение  с базой данных


$res = mysql_query( "SELECT * FROM $imai1 ORDER BY datatime DESC LIMIT 1");
if($res) {
echo "Имей зарегестрирован на другого пользователя";
} else {



						//$sql = "INSERT INTO `$table_db`.`uzer_devise` (`id`, `uzer`, `emai`, `devise_name`, `contact`) VALUES (NULL, '$login', '$emai', '$devise_name', '$contact');"; //на будущее
						$sql = "INSERT INTO `$table_db`.`uzer_devise` (`id`, `uzer`, `emai`, `devise_name`, `contact`) VALUES (NULL, '$login', '$imai', '$devise_name', '$phone');";
						if (!mysql_query($sql,$db))
						  {
						  die('Error: ' . mysql_error());
						  }

						  
						  
						  $sql = "\n"
							. " CREATE TABLE `$table_db`.`$imai1` ( `id` int( 11 ) NOT NULL AUTO_INCREMENT ,\n"
							. " `lat` text,\n"
							. " `lng` text,\n"
							. " `datatime` text,\n"
							. " `speed` float DEFAULT NULL,\n"
							. " `sputnik` text,\n"
							. " `zaryad` text,\n"
							. " `azimut` float DEFAULT NULL ,\n"
							. " PRIMARY KEY ( `id` ) ,\n"
							. " KEY `id` ( `id` ) ,\n"
							. " KEY `id_2` ( `id` ) ) ENGINE = MyISAM DEFAULT CHARSET = utf8;";
						  
						  if (!mysql_query($sql,$db))
						  {
						  die('Error: ' . mysql_error());
						  }
						  
						  $sql = "INSERT INTO `$table_db`.`$imai1` (`id`, `lat`, `lng`, `datatime`, `speed`, `sputnik`, `zaryad`, `azimut` ) VALUES (NULL, '00', '00', '130101000000', '000', '000', '000', '000');";

						  
						  if (!mysql_query($sql,$db))
						  {
						  die('Error: ' . mysql_error());
						  }
						  
						  echo "запись добавлена";
						  //Нет
}
  
  
  
  
  
  
  
  
mysql_close($db);


?>