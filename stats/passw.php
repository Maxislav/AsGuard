<?php

///////////////// mysql

 $DBName = 'monitoring';               // ��� ����
 $DBHost = 'localhost';      // ������ mysql
 $DBUser = 'root';               // ������������
 $DBPass = 'astalavista';               // ������

/////////////////

if (!mysql_connect($DBHost,$DBUser,$DBPass)) error_log(strftime("%d.%m.%y %H:%M:%S")." Error: ".mysql_error()."\n", 3, preg_replace("/[^\/]+$/i","",__FILE__)."errors.dat"); else
if (!mysql_select_db($DBName)) error_log(strftime("%d.%m.%y %H:%M:%S")." Error: ".mysql_error()."\n", 3, preg_replace("/[^\/]+$/i","",__FILE__)."errors.dat");
$error = mysql_error();

?>