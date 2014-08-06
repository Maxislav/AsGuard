<?php

function permitGroup($_login, $group)
{

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
    $res = mysql_query("SELECT * FROM user WHERE name='$_login' ORDER BY id");

    if (mysql_num_rows($res) > 0) {
        while ($row = mysql_fetch_array($res)) {
            $options =   $row['options'];

        }
        $options = json_decode($options, true);
        if ($options["group"] == $group) {
            mysql_close($db);
            return true;

        }
    }

    mysql_close($db);
    return false;

}
?>