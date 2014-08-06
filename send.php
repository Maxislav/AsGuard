<?php

$login=$_POST["login"];
$selectIdDtp=$_POST["selectIdDtp"];
//echo $selectIdDtp;

$text=$_POST["text"];


function send_mail($to, $subject, $message, $headers){

echo "Отправлено: \r\n".$to;
mail($to, $subject, $message, $headers);//кому, тема, текст сообщения, параметры 
}



//if($selectIdDtp!="undefined" && $text!=""){
if($text!=""){

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


			mysql_query("SET NAMES 'utf8'");
			$res = mysql_query("SELECT * FROM information WHERE id='$selectIdDtp' ORDER BY `id`");

			while($row = mysql_fetch_array($res)){
			$lat=$row['lat'];
			$lng=$row['lng'];
			$event=$row['type'];
			$comment=$row['comment'];
			$datatime=$row['datatime'];
			}

			$res = mysql_query("SELECT * FROM contact WHERE sub=1 ORDER BY `id`"); //
			$count_m=0;
			while($row = mysql_fetch_array($res)){
			$mails[$count_m]=$row['email'];
			$count_m++;
			}


			mysql_close($db);

//http://31.131.16.130/yandex.php/script.php?lat=50.449&lng=30.497

$lat=preg_replace("/\s/","",$lat);
$lng=preg_replace("/\s/","",$lng);

$link="http://31.131.16.130/yandex.php/script.php?lat=".$lat."&lng=".$lng;
//$link="без ссылки";
	$message=$text." ".$link;
	//$message=$datatime." ".$login." "."lat=".$lat."lng=".$lng." ".$comment;
	//$message=iconv("UTF-8", "windows-1251", $message);
	//$message="блин";

	if ($event=="accident"){
	$subject="ДТП";
	}
	if ($event=="malfunction" ){
	$subject="Поломка";
	}

	

		
	

	
	
	
	
	
	if($count_m==1){
	$to=$to.$mails[$i];
	}
	if(1<$count_m){
		for($i=0; $i<$count_m-1; $i++){
			$to=$to.$mails[$i].", ";
		}
		$to=$to.$mails[$count_m-1];
	}
	//echo $count_m;
	//echo $to;
	
	//$text= iconv("utf-8", "windows-1251", $text);
	//$text= iconv("windows-1251", "utf-8", $text);

/*	$text= iconv("utf-8", "cp1251", $text);
	
	$headers =  'From: atlas@server.com' . "\r\n" .  //от кого
						"Content-type: text/plain; charset=cp-1251". // означает текстовое письмо
						'X-Mailer: PHP/' . phpversion(); 					

						
	$to="";		
	*/
	
	//$to="lmaxim@mail.ru";
	
	
$headers =  'From: atlas@server.com' . "\r\n" .  //от кого 
						"Content-type: text/plain; charset=\"utf-8\"".  // означает текстовое письмо  для колдировки utf-8
						'X-Mailer: PHP/' . phpversion(); 

	
send_mail($to, $subject, $message, $headers); 	
}else echo "нет данных для отправки";



//mail($to, $subject, $message, $headers);  //кому, тема, текст сообщения, параметры 


	
//echo "отправлено на адрес ".$to;
?>