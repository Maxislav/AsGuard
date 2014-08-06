<?php

$login = $_POST['login'];
$pass = $_POST['pass'];
$confirm_pass = $_POST['confirm_pass'];


//echo $login.":".$pass_l.":".$pass_2;
$pass = str_replace("'", "", $pass);
$confirm_pass = str_replace("\"", "", $confirm_pass);


$pass = str_replace("\r\n", '', $pass);
$pass = str_replace("\n", '', $pass);
$confirm_pass = str_replace("\r\n", '', $confirm_pass);
$confirm_pass = str_replace("\n", '', $confirm_pass);


if ($pass != "" && $confirm_pass != "" && $pass == $confirm_pass) {

	$config_sql = file_get_contents("../config_sql.txt");
	$arr_config_sql = explode("!", $config_sql);
	$hostname = "$arr_config_sql[1]";
	$username = "$arr_config_sql[2]";
	$password = "$arr_config_sql[3]";
	$db = mysql_connect($hostname, $username, $password) //соединение с базой данных
		or die('connect to database failed');
	$table_db = "$arr_config_sql[4]";
	mysql_select_db($table_db) or die('db not found'); //соединение  с базой данных


	$res = mysql_query("SELECT * FROM user WHERE name ='$login'");
	if (mysql_num_rows($res) > 0){
		header("HTTP/1.0 500 Internal Server Error");
		echo "Пользователь c стаким именем уже существует \r \nРегистрация невозможна.";
	} else{
		mysql_query("INSERT INTO user (`name`,`pass`,`options`) VALUES ('$login', '$pass',   '{\"map\":\"osm\",\"startCentre\":{\"lat\":\"50.44\",\"lng\":\"30.52\"},\"gmt\":\"2\",\"startZoom\":\"12\",\"event\":\"false\",\"dtpnews\":\"false\"}') ");
		echo "Регистрация прошла успешно ";
	}


} else {
	header("HTTP/1.0 500 Internal Server Error");
	echo "eror2  неправильно заполнены поля"; // не заполнены поля или не совпал подтвержденный пароль
}

?>



