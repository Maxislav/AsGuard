<?php
$fromPeriod=$_POST["fromPeriod"];
$toPeriod=$_POST["toPeriod"];
$selectUserImei=$_POST["selectUserImei"];
$login=$_POST["login"];
$pass=$_POST["pass"];


$config_sql=file_get_contents("../../config_sql.txt");
$arr_config_sql=  explode("!",$config_sql);

$hostname= "$arr_config_sql[1]";


$username = "$arr_config_sql[2]";


$password = "$arr_config_sql[3]";

$db = mysql_connect($hostname, $username, $password) //соединение с базой данных
    or die('connect to database failed');


$table_db=	"$arr_config_sql[4]";
mysql_select_db($table_db) or die('db not found'); //соединение  с базой данных



function cl($text){
		 $text = str_replace("'", "", $text);
		 $text = str_replace("\"", "", $text);
		 $text = str_replace("\r\n", '', $text);
		 $text = str_replace("\n", '', $text);
		 return $text;
	 }

	 $login = cl($login);






$res = mysql_query("SELECT * FROM user WHERE name ='$login'");
if (mysql_num_rows($res) > 0) {
    while ($row = mysql_fetch_array($res)) {
        $pass_db = $row['pass'];
        $options = $row['options'];
        $device = $row['device'];
    }
    if ($pass == $pass_db) {
        $temp="";
        $res = mysql_query( "SELECT * FROM  loghistory  WHERE imei='$selectUserImei' AND `datetime`>= $fromPeriod AND `datetime`<=$toPeriod  ORDER BY `speed` DESC LIMIT 1 ");
        while ($row = mysql_fetch_array($res)) {
        		$speed_h = $row['speed'];

        	}


        /*
        while($row = mysql_fetch_array($res)){
            $temp=$temp.$row['id'].",".$row['lat'].",".$row['lng'].",".$row['datetime'].",".$row['speed'].",".$row['sputnik'].",".$row['zaryad']. "!";
        }
        */

        $res = mysql_query( "SELECT * FROM  log  WHERE imei='$selectUserImei' AND `datetime`>= $fromPeriod AND `datetime`<=$toPeriod  ORDER BY `speed` DESC LIMIT 1  ");
        while ($row = mysql_fetch_array($res)) {
                		$speed = $row['speed'];

                	}
         if($speed<$speed_h){
             echo $speed_h;
         }else{
             echo $speed;
         }
    }

}else{
    echo 'null';
}






?>