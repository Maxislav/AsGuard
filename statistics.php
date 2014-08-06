<?php
$login=$_POST["login"];

//$arrLogPass=explode("!",$data);
//$login=$arrLogPass[0];
//$pass=$arrLogPass[1];


//$login=$_POST["login"];

$key = $_COOKIE["key"];







$config_sql=file_get_contents("../config_sql.txt");
$arr_config_sql=  explode("!",$config_sql);
$hostname= "$arr_config_sql[1]";
$username = "$arr_config_sql[2]";
$password = "$arr_config_sql[3]";

$db = mysql_connect($hostname, $username, $password) //соединение с базой данных
        or die('connect to database failed');

		
//$table_db = 'monitoring';		
$table_db=	"$arr_config_sql[4]";
mysql_query("set names utf8");
mysql_select_db($table_db) or die('db not found'); //соединение  с базой данных





mysql_query("SET NAMES utf8");
$res = mysql_query("SELECT * FROM user WHERE name='$login' ORDER BY `id`");


if (mysql_num_rows($res) > 0) {
    while ($row = mysql_fetch_array($res)) {
        $pass_bd = $row['pass'];
        $key_bd = $row['key'];
        $options = $row['options'];
        $device = $row['device'];
        $options = $row['options'];
    }
    $options = json_decode($options, true);

    $event = $options['event'];
    $dtpnews = $options['dtpnews'];

    if($key_bd == $key && $event=='true' && $dtpnews=='true' ){

        //echo "yes";
        statistics();
    }else{
    echo "access denied";
    }
}

























$res = mysql_query("SELECT * FROM uzer_config WHERE uzer='$login'");
	$row = mysql_fetch_row($res);	
	$pass_db =$row[2]; // пароль в в базе
	$gmt=$row[3]; 
	$event=$row[4]; //подписка на события
	$event_change=$row[5]; // разрешение на добавление маркера
	$event_confirm=$row[6]; // разрешение на подтверждение события

	
	

function statistics(){
$count=0;
//echo "Статистика";

$res = mysql_query("SELECT * FROM information ORDER BY `id`");
		while($row = mysql_fetch_array($res)){
		$arrEvent[$count]=$row['id']."#".$row['datatime']."#".$row['type']."#".$row['comment'];

		$arrEvent[$count] =  array(
		   "id" => $row['id'],
		   "dateTime" => $row['datatime'],
		   "type" => $row['type'],
		   "comment" => $row['comment']

		);

		$count++;
		}



		$arrEvent =	json_encode($arrEvent);
		
        include("statistics.html");

		//echo $arrUzers[1];
}	
	




/*
if ($pass_db==$pass && $event_confirm==1){

statistics();
}else{ 
echo "у Вас нет прав для просмотра страницы";
}
*/







?>