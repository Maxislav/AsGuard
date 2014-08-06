<?php
$fromPeriod=$_POST["fromPeriod"];
$toPeriod=$_POST["toPeriod"];
$uzerClick=$_POST["uzerClick"];
$login=$_POST["login"];






//$uzers=file_get_contents("../uzers.txt"); //cxbnsdftv 

//echo  $uzers;
$arrUzers = explode(",",$uzers);
//echo $arrUzers[0];
$countUzers = count($arrUzers); // количество юзеров





for($i=0; $i<$countUzers; $i++){                       //разбиваем массив юзеров на двумерный массив [имей юзера] [его имя]
	$arrEmaiUzer[$i] = explode("#",$arrUzers[$i]);
}
//echo $period.$uzerClick;
// $arrEmaiUzer[$uzerClick][0]; emei выбранного юзера.



$config_sql=file_get_contents("../config_sql.txt");
$arr_config_sql=  explode("!",$config_sql);

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


$tableBd=$arrEmaiUzer[$uzerClick][0]."i";
//echo $tableBd."*".$fromPeriod."*".$toPeriod."\r\n";

$res = mysql_query( "SELECT * FROM  `$tableBd` WHERE  `datatime`>= $fromPeriod AND `datatime`<=$toPeriod  ORDER BY `speed` DESC LIMIT 1  ");


$temp="";

if (mysql_num_rows($res)>0){
	while($row = mysql_fetch_array($res)){
	//echo "id: ".$row['id'].",";
	//echo "lat:".$row['lat'].",";
	//echo "lng:".$row['lng'].",";
	//echo "datatime:".$row['datatime']."\r\n";
	$temp=$row['speed'];
	}
	mysql_close($db); 
	echo $temp;
	
	
}else{ 

mysql_close($db);
echo "0";}




?>