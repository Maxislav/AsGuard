<?php

$login=$_POST["login"];
$event=$_POST["event"];
$event_change=$_POST["event_change"];//если юзер может делать попытку добавлять
$event_confirm=$_POST["event_confirm"]; //супер пользхователь надо высветить все дтп




$config_sql=file_get_contents("../config_sql.txt");
$arr_config_sql=  explode("!",$config_sql);

$hostname= "$arr_config_sql[1]";


$username = "$arr_config_sql[2]";


$password = "$arr_config_sql[3]";

$db = mysql_connect($hostname, $username, $password) //соединение с базой данных
        or die('connect to database failed');

		
$table_db=	"$arr_config_sql[4]"; // название таблицы базы
mysql_select_db($table_db) or die('db not found'); //соединение  с базой данных



mysql_query("SET NAMES utf8");



$tableBd="information";
if($event_confirm==1){ // если пользователь иеет суперправа высвечиваем все
$res = mysql_query( "SELECT * FROM  `$tableBd` WHERE  `probable`= '1' OR `confirm` = '1' ORDER BY `datatime`   ");
}
if($event_change==1 && $event_confirm==0){ //если пользователь имеет право только на попытку высвечиваем только его попытку + подтвержденные дтп
$res = mysql_query( "SELECT * FROM  `$tableBd` WHERE  `probable`= '1' AND  `user`= '$login' OR `confirm`= '1'  ORDER BY `datatime`   ");
}
if($event==1 && $event_change==0 && $event_confirm==0){
$res = mysql_query( "SELECT * FROM  `$tableBd` WHERE  `confirm` = '1' ORDER BY `datatime`   ");
}





$temp="";

if (mysql_num_rows($res)>0){
	while($row = mysql_fetch_array($res)){
	//echo "id: ".$row['id'].",";
	//echo "lat:".$row['lat'].",";
	//echo "lng:".$row['lng'].",";
	//echo "datatime:".$row['datatime']."\r\n";
	$temp=$temp.$row['id']."&#32".$row['lat']."&#32".$row['lng']."&#32".$row['datatime']."&#32".$row['type']."&#32".$row['comment']."&#32".$row['probable']."&#32".$row['confirm']."&#32".$row['user']."&#33";
	}
mysql_close($db);
echo $temp;
	
	
}else{
mysql_close($db);
echo "0";}




?>