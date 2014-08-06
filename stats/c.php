<?php

error_reporting(0);
include("passw.php");

function q($v) { return mysql_real_escape_string($v); }
if (empty($error)) {
$offset = 0;
@include("offset.php");
$t = time()+3600*$offset;
$day = date("D",$t);
$dt = date("Ymd",$t);
$tm = date("H:i",$t);
$refer = $_SERVER['HTTP_REFERER'];
$lang = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2);
$user = $_SERVER['HTTP_USER_AGENT'];
$req = $_SERVER['REQUEST_URI'];
if ($ip = $_SERVER['HTTP_X_FORWARDED_FOR'])
{
 if (!stristr($_SERVER['HTTP_X_FORWARDED_FOR'],$_SERVER['REMOTE_ADDR']) and !empty($_SERVER['HTTP_X_FORWARDED_FOR'])) $ip .= ", ".$_SERVER['REMOTE_ADDR']; else $ip = $_SERVER['REMOTE_ADDR'];
 $proxy = $_SERVER['REMOTE_ADDR'];
}
else { $ip = $_SERVER['REMOTE_ADDR']; $proxy = ""; }
if ($proxy == $ip) $proxy = "";
$a = explode(", ",$ip); $real_ip = $a[count($a)-1];
if (!empty($proxy)) $host = gethostbyaddr($proxy); else if ($host = gethostbyaddr($ip)) ; else if ($host = gethostbyaddr($real_ip)) ; else $host = $ip;

$fri = mysql_query("INSERT INTO surf(day,dt,tm,refer,ip,proxy,host,lang,user,req) VALUES('".$day."','".$dt."','".$tm."','".q($refer)."','".q($ip)."','".$proxy."','".$host."','".q($lang)."','".q($user)."','".q($req)."')");
if (!$fri) error_log(strftime("%d.%m.%y %H:%M:%S")." Error: ".mysql_error()."\n", 3, preg_replace("/[^\/]+$/i","",__FILE__)."errors.dat");
mysql_close();
}

?>
