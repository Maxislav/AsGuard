
<?php

$_id=$_POST["id"];
$login=$_POST["login"];
$pass=$_POST["pass"];

$comment=$_POST["comment"];
$lat=$_POST["lat"];
$lng=$_POST["lng"];




function cl($text){
	$text = str_replace("'", "", $text);
	$text = str_replace("\"", "", $text);
	$text = str_replace("\r\n", '', $text);
	$text = str_replace("\n", '', $text);
	return $text;
}
$login = cl($login);
$pass = cl($pass);


$config_sql = file_get_contents("../../config_sql.txt");
$arr_config_sql = explode("!", $config_sql);
$hostname = "$arr_config_sql[1]";
$username = "$arr_config_sql[2]";
$password = "$arr_config_sql[3]";
$db = mysql_connect($hostname, $username, $password) //соединение с базой данных
	or die('connect to database failed');
$table_db = "$arr_config_sql[4]";
mysql_select_db($table_db) or die('db not found'); //соединение  с базой данных

mysql_query("SET NAMES utf8");
$res = mysql_query("SELECT * FROM user WHERE name ='$login'");

if (mysql_num_rows($res) > 0) {
	while ($row = mysql_fetch_array($res)) {
		$pass_db = $row['pass'];
		$device = $row['device'];
		$login_db = $row['name'] ;
		$options =   $row['options'];
	}
	if ($pass_db == $pass && $login_db == $login) {
		$options = json_decode($options, true);
		if($options['event']=='true' ){


		$tableBd="information";

        if($lat!=0){
            $sql = "UPDATE `$table_db`.`$tableBd` SET `lat` = '$lat', `lng` = '$lng', `comment` = '$comment'  WHERE `information`.`id` = '$_id';";
            if (!mysql_query($sql,$db))
              {
              die('Error: ' . mysql_error());
              }
            mysql_close($db);
        }else{
         $sql = "UPDATE `$table_db`.`$tableBd` SET `comment` = '$comment'  WHERE `information`.`id` = '$_id';";
            if (!mysql_query($sql,$db))
              {
              die('Error: ' . mysql_error());
              }
            mysql_close($db);
        }






			echo json_encode('');
		} else{
			echo 'norights1';
			return;
		}


	}else{
		echo 'norights2';
		return;
	}

}else{
	echo 'norights3';
	return;
}



?>