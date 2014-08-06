<?php
$config_sql=file_get_contents("../config_sql.txt");
$arr_config_sql=  explode("!",$config_sql);

$hostname= "$arr_config_sql[1]";


$username = "$arr_config_sql[2]";


$password = "$arr_config_sql[3]";




$db = mysql_connect($hostname, $username, $password) //соединение с базой данных
        or die('connect to database failed');

		
//$table_db = 'monitoring';		
$table_db=	"$arr_config_sql[4]";
mysql_select_db($table_db) or die('db not found'); 
$count=0;
//$sql = "UPDATE `monitoring`.`uzer_devise` SET `contact` = \'(093)752-1548\' WHERE `uzer_devise`.`id` = 44;";



$res = mysql_query("SELECT * FROM uzer_devise WHERE uzer='MH' ORDER BY `id`"); //
		while($row = mysql_fetch_array($res)){
		$arr[$count]=$row['emai']."i"; // выбираем все emai
		echo $arr[$count]."</br>";
		$count++;
		
		}


for($i=0; $i<$count; $i++){
    $res = mysql_query("DELETE FROM $arr[$i] WHERE `datatime`<'131120000000' AND `datatime`>'130101000000'  ORDER BY `id`");
    
}



		



  

//$newuser="Maxislav";


//$sql = "DELETE FROM `uzer_devise` WHERE `devise_name`='al';"; 




mysql_close($db);


?>