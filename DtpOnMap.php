<?php
$fromPeriod=$_POST["fromPeriod"];
$toPeriod=$_POST["toPeriod"];
$checkDtp=$_POST["checkDtp"];
$checkMaulfanction=$_POST["checkMaulfanction"];
$checkOther=$_POST["checkOther"];

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

mysql_query("SET NAMES utf8");

$passBd ='';
$res = mysql_query("SELECT * FROM uzer_config WHERE uzer='$login' ORDER BY `id`");
while($row = mysql_fetch_array($res)){
$passBd=$row['pass'];
};

$res = mysql_query("SELECT * FROM uzer_config WHERE uzer='$login' ORDER BY `id`");
while($row = mysql_fetch_array($res)){
$event_confirm=$row['event_confirm'];
};




	if($event_confirm=='1' && $passBd == $pass){

			$temp='';

			$res = mysql_query( "SELECT * FROM  `information` WHERE  `datatime`>= $fromPeriod AND `datatime`<=$toPeriod  ORDER BY `datatime`   ");

			$temp="";

			if (mysql_num_rows($res)>0){
					while($row = mysql_fetch_array($res)){
					//echo "id: ".$row['id'].",";
					//echo "lat:".$row['lat'].",";
					//echo "lng:".$row['lng'].",";
					//echo "datatime:".$row['datatime']."\r\n";
					$temp =$temp.$row['id']."#,#".$row['lat']."#,#".$row['lng']."#,#".$row['datatime']."#,#".$row['type']."#,#".$row['comment']."#!#";
					};
					
			};
			
			echo $fromPeriod.$toPeriod.$temp;
			mysql_close($db);
	}else{
	mysql_close($db);
	echo '0';
	}
	




/*

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