<?php
$login = $_POST["login"];
$pass = $_POST["pass"];

$name = $_POST["name"];
$imei = $_POST["imei"];
$phone = $_POST["phone"];
$action = $_POST["action"];
$dev = $_POST["dev"];
     function cl($text){
		 $text = str_replace("'", "", $text);
		 $text = str_replace("\"", "", $text);
		 $text = str_replace("\r\n", '', $text);
		 $text = str_replace("\n", '', $text);
		 return $text;
	 }

$phone = cl($phone);
$login = cl($login);
$name = cl($name);
$imei = cl($imei);
$phone = cl($phone);
if ($action == 'add'){
	$dev = cl($dev);
}






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

if (mysql_num_rows($res) > 0) {
    while ($row = mysql_fetch_array($res)) {
        $pass_db = $row['pass'];
        $device = $row['device'];
    }
    // $devices =$device;
    $devices = json_encode($device);
    if ($pass == $pass_db) {

        $deviceObj = json_decode($device, true);
        if ($action == 'add') {
            $n = count($deviceObj);
            $deviceObj[$n] = array(
                "imei" => $imei,
                "phone" => $phone,
                "name" => $name
            );
            $deviceObj = json_encode($deviceObj);
            mysql_query("UPDATE user SET device='$deviceObj' WHERE name='$login'");
             echo $deviceObj;
        } else {
            /*
            for ($i = 0; $i < count($deviceObj); $i++) {
                if ($deviceObj[$i]['imei'] === $imei) {
                    unset ($deviceObj[$i]);
                }
            }
            */
            //$deviceObj = json_encode($deviceObj);

            mysql_query("UPDATE user SET device='$dev' WHERE name='$login'");
            echo 'ok';
        }
       // echo 'ok';


    } else {
        echo null;

    }
}



?>