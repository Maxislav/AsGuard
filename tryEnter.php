<?php
$login=$_POST["login"];
$pass=$_POST["pass"];

$pass = security($pass);
$login = security($login);

function security($val){
    $val = str_replace("`", "", $val);
    $val = str_replace("'", "", $val);
    $val = str_replace("\"", "", $val);
    $val = str_replace("\r\n", '', $val);
    $val = str_replace("\n", '', $val);
    return $val;
}


$config_sql = file_get_contents("../config_sql.txt");
$arr_config_sql = explode("!", $config_sql);
$hostname = "$arr_config_sql[1]";
$username = "$arr_config_sql[2]";
$password = "$arr_config_sql[3]";
$db = mysql_connect($hostname, $username, $password) //соединение с базой данных
    or die('connect to database failed');

$table_db = "$arr_config_sql[4]"; // название таблицы базы
mysql_select_db($table_db) or die('db not found'); //соединение  с базой данных
//mysql_query("SET NAMES utf8");
$res = mysql_query("SELECT * FROM user WHERE name ='$login'");

if (mysql_num_rows($res) > 0) {
    while ($row = mysql_fetch_array($res)) {
        $login_db = $row['name'];
		$pass_db = $row['pass'];
        $device = $row['device'];
        $options = $row['options'];
    }
    if ($pass_db == $pass &&  $login_db==$login) {
        $key = md5($pass.rand(1,100));

        setcookie('user',$login, time()+7*24*60*60);
        setcookie('key', $key, time()+7*24*60*60);
       //mysql_query("UPDATE user SET device='$deviceObj' WHERE name='$login'");

        mysql_query("UPDATE user SET `key`='$key' WHERE name ='$login' ");
   //     $location = 'login.php';
      //  header("Location: /");

        echo $pass_db;
    } else{
        setcookie('key', 'null');

        http_response_code(500);
       echo 'ololo1';
    }
}
else{

    setcookie('key', 'null');
    echo 'ololo2';
}
mysql_close($db);

?>