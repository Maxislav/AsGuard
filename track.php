<?php
$fromPeriod=$_POST["fromPeriod"];
$toPeriod=$_POST["toPeriod"];
$selectUserImei=$_POST["selectUserImei"];
$login=$_POST["login"];
$pass=$_POST["pass"];


$config_sql=file_get_contents("../config_sql.txt");
$arr_config_sql=  explode("!",$config_sql);

$hostname= "$arr_config_sql[1]";


$username = "$arr_config_sql[2]";


$password = "$arr_config_sql[3]";

$db = mysql_connect($hostname, $username, $password) //соединение с базой данных
    or die('connect to database failed');


$table_db=	"$arr_config_sql[4]";
mysql_select_db($table_db) or die('db not found'); //соединение  с базой данных

$res = mysql_query("SELECT * FROM user WHERE name ='$login'");
if (mysql_num_rows($res) > 0) {
    while ($row = mysql_fetch_array($res)) {
        $pass_db = $row['pass'];
        $options = $row['options'];
        $device = $row['device'];
    }
    if ($pass == $pass_db) {
        $temp="";

        //$res = mysql_query( "SELECT * FROM  loghistory  WHERE imei='$selectUserImei' AND `datetime`>= $fromPeriod AND `datetime`<=$toPeriod and `sputnik` not in (1) ORDER BY `datetime`   ");


        $sel =   "
        SELECT * FROM  loghistory
        WHERE(
            imei='$selectUserImei'
            AND datetime>= $fromPeriod
            AND datetime<=$toPeriod
            AND sputnik!='0'
        )
        ORDER BY datetime   ";
        $res = mysql_query($sel);


        while($row = mysql_fetch_array($res)){
            $temp=$temp.$row['id'].",".$row['lat'].",".$row['lng'].",".$row['datetime'].",".$row['speed'].",".$row['sputnik'].",".$row['zaryad']. "!";
        }

        $res = mysql_query( "SELECT * FROM  log  WHERE imei='$selectUserImei' AND `datetime`>= $fromPeriod AND `datetime`<=$toPeriod  ORDER BY `datetime`   ");
        while($row = mysql_fetch_array($res)){
            $temp=$temp.$row['id'].",".$row['lat'].",".$row['lng'].",".$row['datetime'].",".$row['speed'].",".$row['sputnik'].",".$row['zaryad']. "!";
        }

        echo $temp;
    }


}else{
    echo 'null';
}



      /*
$countUzers=0;
$uzers="";
$res = mysql_query("SELECT * FROM uzer_devise WHERE uzer='$login' ORDER BY `id`");
while($row = mysql_fetch_array($res)){
    $arrUzers[$countUzers]=$uzers.$row['emai']."#".$row['devise_name'];
    $countUzers++;
}



for($i=0; $i<$countUzers; $i++){                       //разбиваем массив юзеров на двумерный массив [имей юзера] [его имя]
    $arrEmaiUzer[$i] = explode("#",$arrUzers[$i]);
}


$tableBd=$arrEmaiUzer[$uzerClick][0]."i";
//echo $tableBd."*".$fromPeriod."*".$toPeriod."\r\n";

$res = mysql_query( "SELECT * FROM  `$tableBd` WHERE  `datatime`>= $fromPeriod AND `datatime`<=$toPeriod  ORDER BY `datatime`   ");


$temp="";

if (mysql_num_rows($res)>0){
    while($row = mysql_fetch_array($res)){
        //echo "id: ".$row['id'].",";
        //echo "lat:".$row['lat'].",";
        //echo "lng:".$row['lng'].",";
        //echo "datatime:".$row['datatime']."\r\n";
        $temp=$temp.$row['id'].",".$row['lat'].",".$row['lng'].",".$row['datatime'].",".$row['speed'].",".$row['sputnik'].",".$row['zaryad']. "!";
    }
    mysql_close($db);
    echo $temp;


}else{

    mysql_close($db);
    echo "0";}

      */


?>