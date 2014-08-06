
<?php

$login=$_POST["login"];
$key = $_COOKIE["key"];

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




$res = mysql_query("SELECT * FROM contact ORDER BY `user`");
$user = '';
$data = '';
$count = 0;
while($row = mysql_fetch_array($res)){
     $cart[$count] = array(
				"user" => $row['user'],
				"email" => $row['email'],
				"_id" => $row['id'],
				"is_alert" => $row['is_alert'],
				"phone1" => $row['phone1'],
			    "phone2" => $row['phone2'],
                "phone3" => $row['phone3'],
                "phone4" => $row['phone4'],
				"is_alert1" => $row['is_alert1'],
			    "is_alert2" => $row['is_alert2'],
			    "is_alert3" => $row['is_alert3'],
			    "is_alert4" => $row['is_alert4']
				);
	 $count++;
    }

echo json_encode( $cart );




?>