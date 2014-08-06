<?php
$func = $_POST["func"];
$login = $_POST["login"];
$pass = $_POST["pass"];
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

			$response = file_get_contents('http://motohelp-ua.org/api/webservice.php?func='.$func);
			$var = json_decode($response);
			echo json_encode($var);
		} else{
			echo 'norights';
			return;
		}


	}else{
		echo 'norights';
		return;
	}

}else{
	echo 'norights';
	return;
}


//$response = file_get_contents('http://motohelp-ua.org/api/webservice.php?func=donorsPhones&rh=p&group=4');
//$response = file_get_contents('http://motohelp-ua.org/api/webservice.php?func=donorsPhones');
//$response = file_get_contents('http://motohelp-ua.org/api/webservice.php?func='.$func);

///$var = json_decode($response);

//echo json_encode($var);
//echo 'http://motohelp-ua.org/api/webservice.php?func='.$func;
 // echo   $func;
?>