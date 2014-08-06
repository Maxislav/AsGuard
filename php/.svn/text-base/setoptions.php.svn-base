<?php

$login = $_POST['login'];
$pass = $_POST['pass'];
$gmt = $_POST['gmt'];
$startZoom = $_POST['startZoom'];
$lat = $_POST['lat'];
$lng = $_POST['lng'];
$map = $_POST['map'];
$filter = $_POST['filter'];


//echo $login.":".$pass_l.":".$pass_2;
$pass = str_replace("'", "", $pass);
$login = str_replace("\"", "", $login);
$pass = str_replace("\r\n", '', $pass);
$pass = str_replace("\n", '', $pass);
$login = str_replace("\r\n", '', $login);
$login = str_replace("\n", '', $login);


$config_sql = file_get_contents("../../config_sql.txt");
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
		$login_db = $row['name'];
		$pass_db = $row['pass'];
		$device = $row['device'];
		$options = $row['options'];
	}
	if ($pass_db == $pass && $login_db == $login) {
		$options = json_decode($options, true);
		if ($gmt != '') {
			$options['gmt'] = $gmt;
		}
		if ($startZoom != '') {
			$options['startZoom'] = $startZoom;
		}
		if ($lat != '' && $lng != '') {
			$options['startCentre'] = array(
				'lat' => $lat,
				'lng' => $lng
			);
		}
		if ($map != ''){
		    $options['map'] = $map;
		}
		if($filter){
			$options['filter'] = $filter;
		}


		$options = json_encode($options);
		mysql_query("UPDATE user SET `options`='$options' WHERE name='$login'");
		echo $options;
	} else {
		header("HTTP/1.0 500 Internal Server Error");
		echo null;
	}
} else {
	header("HTTP/1.0 500 Internal Server Error");
	echo null;
}





?>