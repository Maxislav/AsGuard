<?php

error_reporting(E_ALL);
include("passw.php");

if (empty($error)) {
mysql_query("CREATE TABLE surf (
        i int not null primary key auto_increment,
        day char(3) default null,
        dt char(8) default null,
        tm char(5) default null,
        refer text default null,
        ip char(64) default null,
        proxy char(64) default null,
        host char(64) default null,
        lang char(2) default null,
        user text default null,
        req text default null
        ) ENGINE=MyISAM");
$error = mysql_error();
mysql_query("CREATE TABLE mainh (
        i int not null primary key auto_increment,
        dt char(10) default null,
        cnt1 int default null,
        cnt2 int default null,
        cnt3 int default null,
        cnt4 int default null,
        cnt5 int default null
        ) ENGINE=MyISAM");
$error .= mysql_error();
mysql_query("CREATE TABLE mainp (
        i int not null primary key auto_increment,
        dt char(2) default null,
        god char(4) default null,
        cnt1 int default null,
        cnt2 int default null,
        cnt3 int default null,
        cnt4 int default null,
        cnt5 int default null
        ) ENGINE=MyISAM");
$error .= mysql_error();
}

echo "<html><head><meta http-equiv=\"content-type\" content=\"text/html; charset=windows-1251\"><title>Install MySQL</title></head><body>".$error."<br>Установка ".(!empty($error)?"не":"успешно")." завершена.</body></html>";

?>
