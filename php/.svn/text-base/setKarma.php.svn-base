<?php
$login=$_POST["login"];
$key = $_COOKIE["key"];
$_id = $_POST["_id"];
$karmaUp = $_POST["karmaUp"];
$karmaDown = $_POST["karmaDown"];
include_once 'permit.php';
include_once 'permitAdmin.php';


if(permit($login,$key)){
    if(permitAdmin($login)){
       // echo "ok";
        if($karmaUp){
            karmaUp($_id, $karmaUp);
        }else{
            karmaDown($_id, $karmaDown);
        }
    }else{
        echo "no";
    }

}else{
    echo "no";
}
function karmaUp($_id, $karmaUp){

    $config_sql = file_get_contents("../../config_sql.txt");
    $arr_config_sql = explode("!", $config_sql);
    $hostname = "$arr_config_sql[1]";
    $username = "$arr_config_sql[2]";
    $password = "$arr_config_sql[3]";
    $db = mysql_connect($hostname, $username, $password) //соединение с базой данных
    or die('connect to database failed');

    $table_db = "$arr_config_sql[4]"; // название таблицы базы
    mysql_select_db($table_db) or die('db not found'); //соединение  с базой данных
    mysql_query("SET NAMES utf8");
    $karmaUp++;
    $sql = "UPDATE `$table_db`.`regions` SET `karmaup` = '$karmaUp' WHERE `regions`.`id` = '$_id';";
    if (!mysql_query($sql,$db))
    {
        die('Error: ' . mysql_error());
    }
    mysql_close($db);

    echo "подтверждено";


}
function karmaDown($_id, $karmaDown){

    $config_sql = file_get_contents("../../config_sql.txt");
    $arr_config_sql = explode("!", $config_sql);
    $hostname = "$arr_config_sql[1]";
    $username = "$arr_config_sql[2]";
    $password = "$arr_config_sql[3]";
    $db = mysql_connect($hostname, $username, $password) //соединение с базой данных
    or die('connect to database failed');

    $table_db = "$arr_config_sql[4]"; // название таблицы базы
    mysql_select_db($table_db) or die('db not found'); //соединение  с базой данных
    mysql_query("SET NAMES utf8");
    $karmaDown--;
    $sql = "UPDATE `$table_db`.`regions` SET `karmadown` = '$karmaDown' WHERE `regions`.`id` = '$_id';";
    if (!mysql_query($sql,$db))
    {
        die('Error: ' . mysql_error());
    }
    mysql_close($db);

    echo "подтверждено";


}

?>
