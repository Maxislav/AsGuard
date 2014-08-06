<?php

$id=$_POST["id"];
$login=$_POST["login"];
$key = $_COOKIE["key"];


$config_sql=file_get_contents("../../config_sql.txt");
$arr_config_sql=  explode("!",$config_sql);

$hostname= "$arr_config_sql[1]";


$username = "$arr_config_sql[2]";


$password = "$arr_config_sql[3]";

$db = mysql_connect($hostname, $username, $password) //соединение с базой данных
        or die('connect to database failed');


$table_db=	"$arr_config_sql[4]"; // название таблицы базы
mysql_select_db($table_db) or die('db not found');

mysql_query("SET NAMES utf8");
$res = mysql_query("SELECT * FROM user WHERE name='$login' ORDER BY `id`");



if (mysql_num_rows($res) > 0) {
    while ($row = mysql_fetch_array($res)) {
        $pass_bd = $row['pass'];
        $key_bd = $row['key'];
        $options = $row['options'];
        $device = $row['device'];
        $options = $row['options'];
    }
    $options = json_decode($options, true);

    $event = $options['event'];
    $dtpnews = $options['dtpnews'];

    if($key_bd == $key && $event=='true' && $dtpnews=='true' ){

        $tableBd="regions";
        $res = mysql_query("SELECT * FROM regions ORDER BY `oblast`");
        $user = '';
        $data = '';
        $count = 0;

        while($row = mysql_fetch_array($res)){
            $cart[$count] = array(
                "name" => $row['name'],
                "oblast" => $row['oblast'],
                "_id" => $row['id'],
                "contact" => $row['contact'],
                "help" => $row['help'],
                "option" => $row['option'],
                "karmaup" => $row['karmaup'],
                "karmadown" => $row['karmadown']
            );
            $count++;
        }
        echo json_encode( $cart );

    }else{
        echo null;
    }


}



/*

if($_pass == $pass && $event==1 && $event_change==1 && $event_confirm==1){
$tableBd="regions";
$res = mysql_query("SELECT * FROM regions ORDER BY `oblast`");
$user = '';
$data = '';
$count = 0;

        while($row = mysql_fetch_array($res)){
             $cart[$count] = array(
                        "name" => $row['name'],
                        "oblast" => $row['oblast'],
                        "_id" => $row['id'],
                        "contact" => $row['contact'],
                        "help" => $row['help'],
                        "option" => $row['option'],
                        "karma" => $row['karma']
                        );
               $count++;
        }


}

echo json_encode( $cart );
*/
mysql_close($db);
?>