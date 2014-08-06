<?php

$countUzers=$_POST["countUzers"];
$login=$_POST["login"];


$config_sql=file_get_contents("../config_sql.txt");
$arr_config_sql=  explode("!",$config_sql);
//$hostname = 'localhost';
$hostname= "$arr_config_sql[1]";


$username = "$arr_config_sql[2]";


$password = "$arr_config_sql[3]";

$db = mysql_connect($hostname, $username, $password) //соединение с базой данных
        or die('connect to database failed');

		
$table_db=	"$arr_config_sql[4]";
mysql_select_db($table_db) or die('db not found'); //соединение  с базой данных

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

for($i=0; $i<$countUzers; $i++){

$uzer=$arrEmaiUzer[$i][0]."i"; //имя таблицы

$res = mysql_query( "SELECT * FROM $uzer ORDER BY datatime DESC LIMIT 1");

$array1 = mysql_fetch_row($res);

//echo $array1[0].",".$array1[1].",".$array1[2].",".$array1[3]."</br>"; //последняя посылка каждого юзера
$lastPos[$i]=$array1[0].",".$array1[1].",".$array1[2].",".$array1[3].",".$array1[4].",".$array1[5].",".$array1[6].",".$array1[7]; //последняя посылка каждого юзера

//echo $lastPos[$i]."</br>"; // проверка последних данных
} 
$kz="";

for($i=0; $i<$countUzers; $i++){
$kz=$kz.$lastPos[$i]."!";      //формируем переменную kz с последними посылками рюзеров. разделяя каждого юзера !
}

mysql_close($db);

echo $kz; 
?>