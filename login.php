<?php

$c_user =   $_COOKIE['user'];
$c_key =   $_COOKIE['key'];


$c_user = security($c_user);
$c_key = security($c_key);
function security($val){
    $val = str_replace("`", "", $val);
    $val = str_replace("'", "", $val);
    $val = str_replace("\"", "", $val);
    $val = str_replace("\r\n", '', $val);
    $val = str_replace("\n", '', $val);
    return $val;
}



if($c_user!='' && $c_key!=''){

    $config_sql = file_get_contents("../config_sql.txt");
    $arr_config_sql = explode("!", $config_sql);
    $hostname = "$arr_config_sql[1]";
    $username = "$arr_config_sql[2]";
    $password = "$arr_config_sql[3]";
    $db = mysql_connect($hostname, $username, $password) //соединение с базой данных
        or die('connect to database failed');
    $table_db = "$arr_config_sql[4]";
    mysql_select_db($table_db) or die('db not found'); //соединение  с базой данных


    $res = mysql_query("SELECT * FROM user WHERE name ='$c_user'");

    if (mysql_num_rows($res) > 0) {
        while ($row = mysql_fetch_array($res)) {
            $pass_db = $row['pass'];
            $options = $row['options'];
            $device = $row['device'];
            $key =  $row['key'];
        }
        if($c_key===$key) {
          //  echo $_COOKIE['user'] ;
          //  echo $_COOKIE['key'] ;
            $pass = $pass_db;
            $pass_1 = $pass_db;
            $login =  $c_user;
            $devices = json_encode($device);
            include("start.php");
        } else{
           setcookie('key', 'null');
            mysql_close($db);
           echo 'Wrong pass';

            $location = getRoot( $_SERVER['REQUEST_URI']);

            //echo  $location;
            //header("Location: /".$location);
            header("Location: /");

        }
    }else{
        setcookie('key', 'null');
        mysql_close($db);
        echo 'Error2';
    }






}else{
       mysql_close($db);
     $location = getRoot( $_SERVER['REQUEST_URI']);
     header("Location: /".$location);
}

function getRoot($path){
    $arr  = array();
    $arr =  explode("/", $path);
    return $arr[1];

}

