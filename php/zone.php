<?php
$login=$_POST["login"];
$key = $_COOKIE["key"];
$group = $_POST["group"];
include_once 'permit.php';
include_once 'permitGroup.php';


if(permit($login,$key)){
    if(permitGroup($login,$group)){
        echo get_zone($group);
    }else{
        echo null;
    }
}else{
    echo null;
}

function get_zone($group){
    $config_sql = file_get_contents("../../config_sql.txt");
    $arr_config_sql = explode("!", $config_sql);
    $hostname = "$arr_config_sql[1]";
    $username = "$arr_config_sql[2]";
    $password = "$arr_config_sql[3]";
    $db = mysql_connect($hostname, $username, $password) //соединение с базой данных
    or die('connect to database failed');
    $table_db = "$arr_config_sql[4]"; // название таблицы базы
    mysql_select_db($table_db) or die('db not found');

    $res = mysql_query("SELECT * FROM `zone` WHERE `group`='$group' ORDER BY `id`");
    $count = 0;
    $array = array();
    if (mysql_num_rows($res) > 0) {
        while ($row = mysql_fetch_array($res)) {
            array_push($array,$row);
        }
    }
    $arr = _refact($array);

    return json_encode($arr);
   // return  $group;
}

function _refact($arr){
    $a = array();
    for($i = 0; $i< count($arr); $i++){
        if(!$a[$arr[$i]['name']]){
            $a[$arr[$i]['name']] = array(
                "name"=>$arr[$i]['name'],
                "zone" => array($arr[$i])
            );
        }else{
            array_push($a[$arr[$i]['name']]["zone"], $arr[$i]);
        }
    }
    return $a;
}

?>