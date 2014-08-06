<?php

$ttt = microtime();
$ttt = ((double)mb_strstr($ttt, ' ') + (double)mb_substr($ttt, 0, mb_strpos($ttt, ' ')));


error_reporting(0);
@set_time_limit(0);
@ini_set('output_buffering', 1);
@ini_set('implicit_flush', 1);
mb_internal_encoding('UTF-8');
if (mb_strtolower("qwertyёЁАБГДЯQWERTYZ") != "qwertyёёабгдяqwertyz") echo "<p>Notice: PHP can't setup locale to UTF8 character set. MBString lib not installed or off!</p>";
require_once('idna_convert.class.php');

include("passw2.php");
include("passw.php");
if (!empty($error)) {
	echo "Error: " . mysql_error();
	exit;
}
$u = $_SERVER['HTTP_USER_AGENT'];
if (mb_stristr($u, "ipad") or mb_stristr($u, "ipod") or mb_stristr($u, "iphone")) define("APPLE", 1);

function hdr()
{
	?>
<html>
<head>
	<title>FRI Stats - <?php
		if (empty($_SERVER['QUERY_STRING'])) echo "Главная"; else
		{
			$titles = array(
				"seek" => "Поиск",
				"item" => "Поиск",
				"qs" => "Поиск",
				"conf" => "Настройки",
				"f_del" => "Настройки",
				"grp" => "Настройки",
				"erd" => "Настройки",
				"h=" => "Настройки",
				"utf8" => "Настройки",
				"help" => "Помощь",
				"lq" => "Последние 100 запроса",
				"ls" => "Последние 100 других сайта",
				"detail_se" => "Детали с поиска за " . mb_substr($_GET['detail_se'], 6, 2) . "." . mb_substr($_GET['detail_se'], 4, 2) . "." . mb_substr($_GET['detail_se'], 0, 4),
				"detail_other" => "Детали c других сайтов за " . mb_substr($_GET['detail_other'], 6, 2) . "." . mb_substr($_GET['detail_other'], 4, 2) . "." . mb_substr($_GET['detail_other'], 0, 4),
				"detail_ho" => "Детали хостов за " . mb_substr($_GET['detail_ho'], 6, 2) . "." . mb_substr($_GET['detail_ho'], 4, 2) . "." . mb_substr($_GET['detail_ho'], 0, 4),
				"detail_hi" => "Детали хитов за " . mb_substr($_GET['detail_hi'], 6, 2) . "." . mb_substr($_GET['detail_hi'], 4, 2) . "." . mb_substr($_GET['detail_hi'], 0, 4),
				"detail" => "Детали за " . mb_substr($_GET['detail'], 6, 2) . "." . mb_substr($_GET['detail'], 4, 2) . "." . mb_substr($_GET['detail'], 0, 4),
				"fix" => "fix-ы за " . mb_substr($_GET['fix'], 6, 2) . "." . mb_substr($_GET['fix'], 4, 2) . "." . mb_substr($_GET['fix'], 0, 4),
				"top=1&" => "Поисковые запросы",
				"top=2" => "Посещаемые страницы",
				"top=3" => "Переходы с других сайтов",
				"top=4" => "Поисковые системы",
				"top=5" => "IP-адреса",
				"top=6" => "Хосты",
				"top=7" => "Роботы",
				"top=8" => "Время посещений",
				"top=9" => "Языки",
				"top=10" => "Зоны хостов (Страны)",
				"top=11" => "Браузеры",
				"top=12" => "User-Agent'ы",
				"top=13" => "Proxy",
				"top=14" => "Точки входа на сайт",
				"top=16" => "Точки выхода с сайта",
				"top=15" => "Переходы с доменов",
				"top=17" => "fix-ы",
				"top=18" => "fix-ы"
			);
			foreach ($titles as $key => $value) if (mb_stristr($_SERVER['QUERY_STRING'], $key)) {
				echo $value;
				break;
			}
		}
		?></title>
	<meta http-equiv="content-type" content="text/html; charset=UTF-8">
	<style type="text/css">
		body {
			cursor: wait;
		}

		tr {
			font-family: Tahoma, 'Lucida Grande';
			font-size: 11px;
		}

		tr.h {
			background-color: #9999cc;
			font-weight: bold;
			text-align: center;
		}

		tr.s1 {
			background-color: #dcdcdc;
			text-align: center;
		}

		tr.s2 {
			background-color: #ededed;
			text-align: center;
		}

		a {
			font-family: Tahoma, 'Lucida Grande';
			font-size: 11px;
			color: #000000;
			text-decoration: none;
		}

		a:hover {
			color: #de3163;
			text-decoration: underline;
		}

		a.d {
			font-family: Verdana, 'Lucida Grande';
			color: #de3163;
			text-decoration: none;
		}

		a.d:hover {
			text-decoration: underline;
		}

		a.e {
			color: #de3163;
			text-decoration: none;
		}

		a.e:hover {
			text-decoration: underline;
		}

		input {
			font-family: Tahoma, 'Lucida Grande';
			font-size: 11px;
		}
	</style>
	<?php if (isset($_GET['top'])) echo "\n<script type='text/javascript' src='clipboard.js'></script>"; ?>
</head>

<body <?php if (isset($_GET['top'])) echo "onresize=\"clip.reposition();\""; ?>>
<?php if (!isset($_GET['help'])) { ?>
<div align="center" style="margin-top: 16px; font-size: 25px;"><img src="logo.png" border="0" width="118" height="17">
	<hr color="#000000" width="210" size="1" noshade>
	<div align=center
		 style="font-family: Tahoma, 'Lucida Grande'; margin-top: 10px; font-size: 10px; font-weight: bold; color: #696969">
		<b>WebSite Surfing log extender<br>Optimized for <font color="black">1024x720</font> view+</b></div>
</div><br>
	<?php
}
	flush();
}

$logout = $_GET['logout'];
if (isset($logout)) {
	setcookie("alogin", "", 0);
	setcookie("apass", "", 0);
	header("Location: ./");
	exit;
}

if ($_GET['p'] == $pass) {
	$_COOKIE['alogin'] = $login;
	$_COOKIE['apass'] = $pass;
	$_SERVER['QUERY_STRING'] = "";
}

if (!isset($_COOKIE['alogin']) or $_COOKIE['alogin'] == "") {
	if (!empty($login) and isset($_POST['alogin'])) {
		if (isset($_POST['save'])) $t = time() + 9999999; else $t = 0;
		if ($_POST['alogin'] == $login and $_POST['apass'] == $pass) {
			setcookie("alogin", $login, $t);
			setcookie("apass", $pass, $t);
			error_log(strftime("%d.%m.%y %B %H:%M:%S") . " -> " . str_pad($_SERVER['REMOTE_ADDR'], 15) . " -> Login: Ok!  [Referer: " . $_SERVER['HTTP_REFERER'] . "]\n", 3, "log_in.dat");
			header("Location: ./");
			exit;
		}

		if ($_POST['alogin'] == $ldemo and $_POST['apass'] == $pdemo) {
			setcookie("alogin", $ldemo, $t);
			setcookie("apass", $pdemo, $t);
			error_log(strftime("%d.%m.%y %B %H:%M:%S") . " -> " . str_pad($_SERVER['REMOTE_ADDR'], 15) . " -> DEMO Login: Ok!  [Referer: " . $_SERVER['HTTP_REFERER'] . "]\n", 3, "log_in.dat");
			header("Location: ./");
			exit;
		}
	}

	$err = 0;
	if (isset($_POST['alogin']) and isset($_POST['apass'])) {
		if ($_POST['alogin'] == $login and $_POST['apass'] == $pass) $err = 2;
		if ($_POST['alogin'] == $ldemo and $_POST['apass'] == $pdemo) $err = 2;
		if ($err != 2) $err = 1;
	}
	?>
<html>
<head>
	<title>FRI Stats</title>
	<meta http-equiv="content-type" content="text/html; charset=UTF-8">
	<style type="text/css">
		tr {
			font-family: Tahoma, 'Lucida Grande';
			font-size: 11px;
		}

		tr.h {
			background-color: #9999cc;
			font-weight: bold;
			text-align: center;
		}

		tr.s1 {
			background-color: #dcdcdc;
			text-align: center;
		}

		input {
			font-family: Tahoma, 'Lucida Grande';
			font-size: 11px;
			text-align: center;
		}

		a {
			font-family: Tahoma, 'Lucida Grande';
			font-size: 11px;
			color: #000000;
			text-decoration: none;
		}

		a:hover {
			color: #de3163;
			text-decoration: underline;
		}
	</style>
</head>

<body><br>

<div align=center style="margin-top: 10px; font-size: 25px;"><img src="logo.png" border="0" width="118" height="17">
</div>
<br>
<table align=center width=250 cellpadding=5 cellspacing=1 border=0>
	<tr class=h>
		<td width=250>Авторизация</td>
	</tr>
	<tr class="s1">
		<td align=left>
			<form style='margin:0px;padding:0px;' action="" method="post">
				<center>
					<div style="width:80px;float:left;vertical-align:middle;height:19px;padding-top:3px;"><span
						style="margin-left:16px;"><b>Логин:</b></span></div>
					<div style="float:left;vertical-align:middle;height:19px;"><input type="text" name="alogin"
																					  style="width:134px;"></div>
					<div style="clear:both;height:0px;"></div>
					<div style="width:80px;float:left;vertical-align:middle;height:19px;padding-top:3px;"><span
						style="margin-left:16px;"><b>Пароль:</b></span></div>
					<div style="float:left;vertical-align:middle;height:19px;"><input type="Password" name="apass"
																					  style="width:134px;"></div>
					<div style="clear:both;vertical-align:middle;height:19px;padding-top:1px;padding-bottom:3px;"><input
						name="save" type="checkbox" value='1' checked style='vertical-align:middle;'> <span
						style='vertical-align:middle;'>Запомнить меня</span></div>
					<div style="padding:3px;"><input type="submit" value="   Вход   "></div>
					<?php if ($err == 1) {
					echo "<font color=red>Неверные логин или пароль</font>";
					error_log(strftime("%d.%m.%y %B %H:%M:%S") . " -> " . str_pad($_SERVER['REMOTE_ADDR'], 15) . " -> Login: Fail! (login: \"" . $_POST['alogin'] . "\" pass: \"" . $_POST['apass'] . "\")  [Referer: " . $_SERVER['HTTP_REFERER'] . "]\n", 3, "log_in.dat");
				}
					?></center>
			</form>
		</td>
	</tr>
</table>
<div align=center
	 style="font-family: Tahoma, 'Lucida Grande'; margin-top: 10px; font-size: 10px; font-weight: bold; color: #696969;">
	2013 &copy; Copyright by <a href="http://www.fri-stats.com">www.fri-stats.com</a> &nbsp;<a
	href="http://vk.com/i_fri" title="Андрей Фри" target=_blank><img src="flags/vk.png" border=0
																	 style="vertical-align:middle"></a></div>
</body>
</html>
	<?php
	exit;
}
else
{

	if ($robots = file("robots.dat")) {
		$i = 0;
		for ($i = 0; $i < count($robots); $i++) $robots[$i] = iconv("CP1251", "UTF-8", $robots[$i]);
		foreach ($robots as $val)
		{
			list($rb1, $rb2) = explode("|", $val);
			$rb2 = trim($rb2);
			$rbd[$i++] = rtrim($rb1);
			if (!empty($rb2)) $rbdn[$rb2][] = rtrim($rb1);
			$robo[] = $rb2;
		}
	}
	if ($hosts = file("hosts.dat")) {
		$i = 0;
		for ($i = 0; $i < count($hosts); $i++) $hosts[$i] = iconv("CP1251", "UTF-8", $hosts[$i]);
		foreach ($hosts as $val)
		{
			list($hb1, $hb2) = explode("|", $val);
			$hb2 = trim($hb2);
			$hbd[$i++] = rtrim($hb1);
			if (!empty($hb2)) $hbdn[$hb2][] = rtrim($hb1);
			$robo[] = $hb2;
		}
	}
	$robo = array_unique($robo);

	foreach ($rbd as $val) $zp .= " LOWER(user) NOT LIKE '%" . mb_strtolower($val) . "%' AND";
	if (filesize("hosts.dat")) foreach ($hbd as $val) $zp .= " LOWER(host) NOT LIKE '%" . mb_strtolower($val) . "%' AND";
	$zp .= " LOWER(user) NOT LIKE '' AND";
	if ($skip = file("skip.dat")) {
		foreach ($skip as $vl)
		{
			list($s1, $s2) = explode("|", $vl);
			$zp2 .= " $s1 NOT LIKE '%" . rtrim($s2) . "%' AND";
		}
	}
	$zp .= $zp2;
	$zp = mb_substr($zp, 0, -4);

	if ($se_m = file("se.dat")) {
		for ($i = 0; $i < count($se_m); $i++) $se_m[$i] = iconv("CP1251", "UTF-8", $se_m[$i]);
		foreach ($se_m as $vl)
		{
			list($s1, $s2, $s3) = explode("|", $vl);
			$se_n[$s1] = rtrim($s3);
			$se_nn[$s1] = $s2;
		}
	}

	if ($fx_m = file("fix.dat")) {
		$zfx = "";
		$pf = "";
		for ($i = 0; $i < count($fx_m); $i++) $fx_m[$i] = iconv("CP1251", "UTF-8", $fx_m[$i]);
		foreach ($fx_m as $vl)
		{
			list($s1, $s2, $s3) = explode("|", $vl);
			$zfx .= $pf . "LOWER(" . $s1 . ") LIKE '%" . mb_strtolower($s2) . "%'";
			$pf = " OR ";
			$s3 = rtrim($s3);
			if (!empty($s3)) $fxn[$s3][] = $s1 . "|" . $s2;
			$fxo[] = $s3;
		}
	}


	$qse = array("?q=", "&q=", "query=", "?r=", "&r=", "as_q=", "words=", "old_q=", "?p=", "&p=", "text=", "holdreq=");
	foreach ($qse as $val) $qse_m .= "LOWER(refer) LIKE '%$val%' OR ";
	foreach ($se_n as $val)
	{
		if (!in_array($val, $qse) and !in_array("&" . $val, $qse) and !in_array("?" . $val, $qse)) $qse_m .= "LOWER(refer) LIKE '%$val%' OR ";
	}
	$qse_m = mb_substr($qse_m, 0, -4);
	foreach ($se_nn as $val)
	{
		$cse_m .= " OR LOWER(refer) LIKE '%$val%'";
		$cot_m .= " AND LOWER(refer) NOT LIKE '%$val%'";
	}

	$pages = $_GET['pages'];
	if ($pages == "0" and file_exists("pages.dat")) unlink("pages.dat");
	if ($pages == "1") {
		$fp = fopen("pages.dat", "w");
		fwrite($fp, "1");
		fclose($fp);
	}
	if (file_exists("pages.dat")) $pages = 1;

	$site = str_replace("www.", "", $_SERVER["HTTP_HOST"]);

	$lang = array( // ISO 639
		"AA" => "Afar",
		"AB" => "Abkhazian",
		"AE" => "Avestan",
		"AF" => "Afrikaans",
		"AK" => "Akan",
		"AM" => "Amharic",
		"AN" => "Aragonese",
		"AR" => "Arabic",
		"AS" => "Assamese",
		"AV" => "Avaric",
		"AY" => "Aymara",
		"AZ" => "Azerbaijani",
		"BA" => "Bashkir",
		"BE" => "Byelorussian",
		"BG" => "Bulgarian",
		"BH" => "Bihari",
		"BI" => "Bislama",
		"BM" => "Bambara",
		"BN" => "Bengali",
		"BO" => "Tibetan",
		"BR" => "Breton",
		"BS" => "Bosnian",
		"CA" => "Catalan",
		"CE" => "Chechen",
		"CH" => "Chamorro",
		"CO" => "Corsican",
		"CR" => "Cree",
		"CS" => "Czech",
		"CU" => "Old Church Slavonic",
		"CV" => "Chuvash",
		"CY" => "Welsh",
		"DA" => "Danish",
		"DE" => "German",
		"DV" => "Divehi",
		"DZ" => "Bhutani",
		"EE" => "Ewe",
		"EL" => "Greek",
		"EN" => "English",
		"EO" => "Esperanto",
		"ES" => "Spanish",
		"ET" => "Estonian",
		"EU" => "Basque",
		"FA" => "Persian",
		"FF" => "Fula",
		"FI" => "Finnish",
		"FJ" => "Fiji",
		"FO" => "Faeroese",
		"FR" => "French",
		"FY" => "Frisian",
		"GA" => "Irish",
		"GD" => "Gaelic",
		"GL" => "Galician",
		"GN" => "Guarani",
		"GU" => "Gujarati",
		"GV" => "Manx",
		"HA" => "Hausa",
		"HE" => "Hebrew",
		"HI" => "Hindi",
		"HO" => "Hiri Motu",
		"HR" => "Croatian",
		"HT" => "Haitian",
		"HU" => "Hungarian",
		"HY" => "Armenian",
		"HZ" => "Herero",
		"IA" => "Interlingua",
		"ID" => "Indonesian",
		"IE" => "Interlingue",
		"IG" => "Igbo",
		"II" => "Nuosu",
		"IK" => "Inupiak",
		"IN" => "Indonesian",
		"IO" => "Ido",
		"IS" => "Icelandic",
		"IT" => "Italian",
		"IU" => "Inuktitut",
		"IW" => "Hebrew",
		"JA" => "Japanese",
		"JV" => "Javanese",
		"JI" => "Yiddish",
		"JW" => "Javanese",
		"KA" => "Georgian",
		"KG" => "Kongo",
		"KI" => "Kikuyu",
		"KJ" => "Kwanyama",
		"KK" => "Kazakh",
		"KZ" => "Kazakh",
		"KL" => "Greenlandic",
		"KM" => "Cambodian",
		"KN" => "Kannada",
		"KO" => "Korean",
		"KR" => "Kanuri",
		"KS" => "Kashmiri",
		"KU" => "Kurdish",
		"KV" => "Komi",
		"KW" => "Cornish",
		"KY" => "Kirghiz",
		"LA" => "Latin",
		"LB" => "Luxembourgish",
		"LG" => "Ganda",
		"LI" => "Limburgish",
		"LN" => "Lingala",
		"LO" => "Laothian",
		"LT" => "Lithuanian",
		"LU" => "Luba-Katanga",
		"LV" => "Latvian",
		"MG" => "Malagasy",
		"MH" => "Marshallese",
		"MI" => "Maori",
		"MK" => "Macedonian",
		"ML" => "Malayalam",
		"MN" => "Mongolian",
		"MO" => "Moldavian",
		"MR" => "Marathi",
		"MS" => "Malay",
		"MT" => "Maltese",
		"MY" => "Burmese",
		"NA" => "Nauru",
		"NB" => "Norwegian Bokmal",
		"ND" => "North Ndebele",
		"NE" => "Nepali",
		"NG" => "Ndonga",
		"NL" => "Dutch",
		"NN" => "Norwegian Nynorsk",
		"NO" => "Norwegian",
		"NR" => "South Ndebele",
		"NV" => "Navajo",
		"NY" => "Chichewa",
		"OC" => "Occitan",
		"OJ" => "Ojibwe",
		"OM" => "Oromo",
		"OR" => "Oriya",
		"OS" => "Ossetian",
		"PA" => "Punjabi",
		"PI" => "Pali",
		"PL" => "Polish",
		"PS" => "Pashto",
		"PT" => "Portuguese",
		"QU" => "Quechua",
		"RM" => "Rhaeto-Romance",
		"RN" => "Kirundi",
		"RO" => "Romanian",
		"RU" => "Russian",
		"RW" => "Kinyarwanda",
		"SA" => "Sanskrit",
		"SC" => "Sardinian",
		"SD" => "Sindhi",
		"SE" => "Northern Sami",
		"SG" => "Sangro",
		"SH" => "Serbo-Croatian",
		"SI" => "Singhalese",
		"SK" => "Slovak",
		"SL" => "Slovenian",
		"SM" => "Samoan",
		"SN" => "Shona",
		"SO" => "Somali",
		"SQ" => "Albanian",
		"SR" => "Serbian",
		"SS" => "Siswati",
		"ST" => "Sesotho",
		"SU" => "Sudanese",
		"SV" => "Swedish",
		"SW" => "Swahili",
		"TA" => "Tamil",
		"TE" => "Tegulu",
		"TG" => "Tajik",
		"TH" => "Thai",
		"TI" => "Tigrinya",
		"TK" => "Turkmen",
		"TL" => "Tagalog",
		"TN" => "Setswana",
		"TO" => "Tonga",
		"TR" => "Turkish",
		"TS" => "Tsonga",
		"TT" => "Tatar",
		"TW" => "Twi",
		"TY" => "Tahitian",
		"UG" => "Uighur",
		"UK" => "Ukrainian",
		"UR" => "Urdu",
		"UZ" => "Uzbek",
		"VE" => "Venda",
		"VI" => "Vietnamese",
		"VO" => "Volapuk",
		"WA" => "Walloon",
		"WO" => "Wolof",
		"XH" => "Xhosa",
		"YI" => "Yiddish",
		"YO" => "Yoruba",
		"ZA" => "Zhuang",
		"ZH" => "Chinese",
		"ZU" => "Zulu"
	);

	function norm($w)
	{
		?>
	<script type="text/javascript">
		v =  <?php echo $w;?>;
		w = document.getElementById("table").offsetWidth;
		if (w > v && v != 0) document.getElementById("table").style.tableLayout = "fixed";
		if (v == 0) {
			if (document.body && document.body.offsetWidth) {
				winW = document.body.offsetWidth;
			}
			if (document.compatMode == 'CSS1Compat' &&
				document.documentElement &&
				document.documentElement.offsetWidth) {
				winW = document.documentElement.offsetWidth;
			}
			if (window.innerWidth && window.innerHeight) {
				winW = window.innerWidth;
			}
			if (winW < w) document.getElementById("table").style.tableLayout = "fixed";
		}
	</script>
		<?php
	}

	function Ref($ref)
	{
		global $site;
		if (($ref != "") and !(mb_stristr($ref, "://" . $site) and mb_stripos($ref, "://" . $site, 6) == 0) and !(mb_stristr($ref, "://www." . $site) and mb_stripos($ref, "://www." . $site, 6) == 0)) {
			if (mb_stristr($ref, "=")) {
				$reff = str_replace("www.", "", $ref);
				if (!mb_stristr($ref, "://")) {
					$reff = "://" . $reff;
					$ref = "://" . $ref;
				}
				if (mb_stristr($reff, "://yandex") or mb_stristr($reff, "://search.yaca.yandex") or mb_stristr($reff, "://images.yandex")) return se_yandex($ref); else
					if (mb_stristr($reff, "://google")) return se_google($ref); else
						if (mb_stristr($reff, "://rambler") or mb_stristr($reff, "://nova.rambler") or mb_stristr($reff, "://search.rambler") or mb_stristr($reff, "://ie4.rambler") or mb_stristr($reff, "://ie5.rambler")) return se_rambler($ref); else
							if (mb_stristr($reff, "://go.mail.ru") and mb_stristr($reff, "words=")) return se_mail1($ref); else
								if (mb_stristr($reff, "://go.mail.ru") or mb_stristr($reff, "://wap.go.mail.ru")) return se_mail2($ref); else
									if (mb_stristr($reff, "://search.msn") or mb_stristr($reff, "://search.live.com") or mb_stristr($reff, "://ie.search.msn") or mb_stristr($reff, "://bing")) return se_msn($ref); else
										if (mb_stristr($reff, "://search.yahoo")) return se_yahoo($ref); else
											if (se_sp($ref) <> -1) return se_sp($ref); else
												if (mb_stristr($ref, "?q=") or mb_stristr($ref, "&q=")) return se_other($ref, "q="); else
													if (mb_stristr($ref, "query=")) return se_other($ref, "query=");
													else return $ref;
			} else return $ref;
		} else return $ref;
	}

	function se_yandex($ref)
	{
		$sw = "text=";
		$sw2 = "holdreq=";
		$engine = "Y";
		$rw = 0;
		if (mb_stristr($ref, "yandpage")) {
			if (mb_stristr($ref, "text%3D%25u")) {
				$rw = 1;
				if (mb_stristr($ref, "holdreq%3D%25u")) $rw = 2;
			}
		}
		$url = urldecode($ref);
		if (mb_substr_count(iconv("CP1251", "UTF-8", $url), "Р") > 2) ; else $url = iconv("CP1251", "UTF-8", $url);
		$url = stripslashes($url);
		$url = strip_tags($url);
		if (mb_substr_count($url, "Г") > 2) {
			$url = iconv("UTF-8", "CP1251", $url);
			$url = iconv("UTF-8", "CP1252", $url);
			$url = iconv("CP1251", "UTF-8", $url);
		}
		if (mb_substr_count($url, "Р") > 2) $url = iconv("UTF-8", "CP1251", $url);
		if (mb_stristr($url, "°") or mb_stristr($url, "Ѓ") or mb_stristr($url, "„") or mb_stristr($url, "‡") or mb_stristr($url, "Ќ")) $url = iconv("UTF-8", "CP1251", $url);
		preg_match("/[?&]+" . $sw . "([^&]*)/i", $url . "&", $match1);
		preg_match("/[?&]+" . $sw2 . "([^&]*)/i", $url . "&", $match2);
		if ($match2[1] == $match1[1]) return array($engine, $match1[1]);
		if (!empty($match2[1])) return array($engine, ($match2[1] . " + " . $match1[1]));
		else return array($engine, $match1[1]);
	}


	function utf8RawUrlDecode($source)
	{
		$decodedStr = '';
		$pos = 0;
		$len = strlen($source);
		while ($pos < $len) {
			$charAt = substr($source, $pos, 1);
			if ($charAt == '%') {
				$pos++;
				$charAt = substr($source, $pos, 1);
				if ($charAt == 'u') {
					$pos++;
					$unicodeHexVal = substr($source, $pos, 4);
					$unicode = hexdec($unicodeHexVal);
					$entity = "&#" . $unicode . ';';
					$decodedStr .= utf8_encode($entity);
					$pos += 4;
				}
				else {
					$hexVal = substr($source, $pos, 2);
					$decodedStr .= chr(hexdec($hexVal));
					$pos += 2;
				}
			}
			else {
				$decodedStr .= $charAt;
				$pos++;
			}
		}
		return $decodedStr;
	}

	function get_encoding($str)
	{
		$cp_list = array('utf-8', 'cp1251');
		foreach ($cp_list as $k => $codepage) {
			if (md5($str) === md5(iconv($codepage, $codepage, $str))) {
				return $codepage;
			}
		}
		return null;
	}

	function se_google($ref)
	{
		$sw = "q=";
		$sw2 = "as_q=";
		$engine = "G";
		$url = urldecode($ref);
		$url = str_replace("aq=", "bb=", $url);
		if (mb_stristr($url, "e=KOI8-R")) $url = convert_cyr_string($url, "k", "w");
		$url = stripslashes($url);
		$url = strip_tags($url);
		if (get_encoding($url) == "cp1251") $url = iconv("CP1251", "UTF-8", $url);
		preg_match("/[?&]+" . $sw . "([^&]*)/i", $url . "&", $match1);
		if (mb_stristr($match1[1], "%")) $match1[1] = urldecode($match1[1]);
		$match1[1] = trim($match1[1]);
		preg_match("/[?&]+" . $sw2 . "([^&]*)/i", $url . "&", $match2);
		$match2[1] = trim($match2[1]);
		if ($match2[1] == $match1[1]) return array($engine, $match1[1]);
		if (!empty($match2[1])) return array($engine, ($match2[1] . " + " . $match1[1]));
		else return array($engine, $match1[1]);
	}

	function se_mail1($ref)
	{
		$sw = "words=";
		$engine = "M";
		$url = urldecode($ref);
		$url = stripslashes($url);
		$url = strip_tags($url);
		if (get_encoding($url) == "cp1251") $url = iconv("CP1251", "UTF-8", $url);
		preg_match("/[?&]+" . $sw . "([^&]*)/i", $url . "&", $match1);
		$match1[1] = trim($match1[1]);
		return array($engine, $match1[1]);
	}

	function se_mail2($ref)
	{
		$sw = "q=";
		$sw2 = "as_q=";
		$engine = "M";
		$url = urldecode($ref);
		$url = stripslashes($url);
		$url = strip_tags($url);
		if (get_encoding($url) == "cp1251") $url = iconv("CP1251", "UTF-8", $url);
		preg_match("/[?&]+" . $sw . "([^&]*)/i", $url . "&", $match1);
		$match1[1] = trim($match1[1]);
		preg_match("/[?&]+" . $sw2 . "([^&]*)/i", $url . "&", $match2);
		$match2[1] = trim($match2[1]);
		if ($match2[1] == $match1[1]) return array($engine, $match1[1]);
		if (!empty($match2[1])) return array($engine, ($match2[1] . " + " . $match1[1]));
		else return array($engine, $match1[1]);
	}

	function se_rambler($ref)
	{
		$sw = "words=";
		$sw1 = "query=";
		$sw2 = "old_q=";
		$engine = "R";
		$url = urldecode($ref);
		if (mb_stristr($url, "btnG=оБКФЙ!")) $url = convert_cyr_string($url, "k", "w");
		$url = stripslashes($url);
		$url = strip_tags($url);
		if (get_encoding($url) == "cp1251") $url = iconv("CP1251", "UTF-8", $url);
		preg_match("/[?&]+" . $sw . "([^&]*)/i", $url . "&", $match1);
		if (empty($match1)) preg_match("/[?&]+" . $sw1 . "([^&]*)/iu", $url . "&", $match1);
		$match1[1] = trim($match1[1]);
		if (mb_stristr($url, "infound=1")) {
			preg_match("/[?&]+" . $sw2 . "([^&]*)/i", $url . "&", $match2);
			return array($engine, ($match2[1] . " + " . $match1[1]));
		} else return array($engine, $match1[1]);
	}

	function se_yahoo($ref)
	{
		$sw = "p=";
		$engine = "H";
		$url = urldecode($ref);
		$url = stripslashes($url);
		$url = strip_tags($url);
		if (get_encoding($url) == "cp1251") $url = iconv("CP1251", "UTF-8", $url);
		preg_match("/[?&]+" . $sw . "([^&]*)/i", $url . "&", $match1);
		$match1[1] = trim($match1[1]);
		return array($engine, $match1[1]);
	}

	function se_msn($ref)
	{
		$sw = "q=";
		$engine = "S";
		$url = urldecode($ref);
		$url = stripslashes($url);
		$url = strip_tags($url);
		if (get_encoding($url) == "cp1251") $url = iconv("CP1251", "UTF-8", $url);
		preg_match("/[?&]+" . $sw . "([^&]*)/i", $url . "&", $match1);
		$match1[1] = trim($match1[1]);
		return array($engine, $match1[1]);
	}

	function se_other($ref, $sw)
	{
		$engine = "?";
		$url = urldecode($ref);
		$url = stripslashes($url);
		$url = strip_tags($url);
		if (get_encoding($url) == "cp1251") $url = iconv("CP1251", "UTF-8", $url);
		preg_match("/[?&]+" . $sw . "([^&]*)/i", $url . "&", $match1);
		$match1[1] = trim($match1[1]);
		return array($engine, $match1[1]);
	}

	function se_sp($ref)
	{
		global $se_n, $se_nn;
		foreach ($se_n as $key => $val)
		{
			if (mb_stristr($ref, $se_nn[$key])) {
				$engine = $key;
				$sw = $val;
				$url = urldecode($ref);
				$url = stripslashes($url);
				$url = strip_tags($url);
				if (get_encoding($url) == "cp1251") $url = iconv("CP1251", "UTF-8", $url);
				preg_match("/[?&]+" . $sw . "([^&]*)/i", $url . "&", $match1);
				$match1[1] = trim($match1[1]);
				return array($engine, $match1[1]);
			}
		}
		return -1;
	}

	function is_robot($check, $check2)
	{
		global $rbd, $hbd;
		if (empty($check)) return TRUE;
		if (isset($rbd)) foreach ($rbd as $val) if (mb_stristr($check, $val)) return TRUE;
		if (isset($hbd)) foreach ($hbd as $val) if (mb_stristr($check2, $val)) return TRUE;
		return FALSE;
	}

	function c_uniqs_hits($dt)
	{
		global $zp;
		$res = mysql_query("SELECT COUNT(DISTINCT ip),COUNT(i) FROM surf WHERE dt='" . $dt . "' AND" . $zp);
		return (mysql_fetch_row($res));
	}

	function c_se($dt)
	{
		global $cse_m, $qse_m, $zp;
		$row = mysql_fetch_row(mysql_query("SELECT COUNT(refer) FROM surf WHERE dt='" . $dt . "' AND (((LOWER(refer) LIKE '%yand%' OR LOWER(refer) LIKE '%google.%' OR LOWER(refer) LIKE '%go.mail.ru%' OR LOWER(refer) LIKE '%rambler.%' OR LOWER(refer) LIKE '%search.yahoo%' OR LOWER(refer) LIKE '%search.msn%' OR LOWER(refer) LIKE '%bing%' OR LOWER(refer) LIKE '%search.live.com%'" . $cse_m . ") AND (" . $qse_m . "))) AND LOWER(refer) NOT LIKE '%@%' AND " . $zp));
		return $row[0];
	}

	function c_other($dt)
	{
		global $site, $cot_m, $zp;
		$row = mysql_fetch_row(mysql_query("SELECT COUNT(refer) FROM surf WHERE dt='" . $dt . "' AND refer <> '' AND LOWER(refer) NOT LIKE '%://" . $site . "%' AND LOWER(refer) NOT LIKE '%://www." . $site . "%' AND LOWER(refer) NOT LIKE '" . $site . "%' AND (LOWER(refer) NOT LIKE '%yand%' AND LOWER(refer) NOT LIKE '%google.%' AND LOWER(refer) NOT LIKE '%go.mail.ru%' AND LOWER(refer) NOT LIKE '%rambler.%' AND LOWER(refer) NOT LIKE '%search.yahoo%' AND LOWER(refer) NOT LIKE '%search.msn%' AND LOWER(refer) NOT LIKE '%bing%' AND LOWER(refer) NOT LIKE '%search.live.com%' AND LOWER(refer) NOT LIKE '%?q=%' AND LOWER(refer) NOT LIKE '%&q=%' AND LOWER(refer) NOT LIKE '%query=%'" . $cot_m . ") AND " . $zp));
		return $row[0];
	}

	function c_fix($dt)
	{
		global $zfx, $zp;
		$row = mysql_fetch_row(mysql_query("SELECT COUNT(i) FROM surf WHERE (" . $zfx . ") AND dt='" . $dt . "' AND" . $zp));
		return $row[0];
	}

	$dday = array(
		"Mon" => "ПН: ",
		"Tue" => "ВТ: ",
		"Wed" => "СР: ",
		"Thu" => "ЧТ: ",
		"Fri" => "<font color='#675caf'>ПТ:</font> ",
		"Sat" => "<font color='#de3163'>СБ:</font> ",
		"Sun" => "<font color='#de3163'>ВС:</font> "
	);

	function dtconv($dt)
	{
		return mb_substr($dt, 6, 2) . "." . mb_substr($dt, 4, 2) . "." . mb_substr($dt, 0, 4);
	}

	function dtconv2($dt)
	{
		return mb_substr($dt, 6, 4) . mb_substr($dt, 3, 2) . mb_substr($dt, 0, 2);
	}

	function echo_se($engine)
	{
		global $se_n;
		switch ($engine) {
			case "Y":
				echo "<b><font color=#FF0000>Я</font>ndex</b>";
				break;
			case "R":
				echo "<b><font color=#0000FF>R</font>ambler</b>";
				break;
			case "G":
				echo "<b><font color=#2159D6>G</font><font color=#C61800>o</font><font color=#D6AE00>o</font><font color=#2159D6>g</font><font color=#18A221>l</font><font color=#C61800>e</font></b>";
				break;
			case "M":
				echo "<b><font color=#F8AC32>@</font><font color=#00468c>mail</font><font color=#F8AC32>.ru</font></b>";
				break;
			case "H":
				echo "<b>Yahoo</b>";
				break;
			case "S":
				echo "<b>MSN Bing</b>";
				break;
			case "?":
				echo "<b>?</b>";
				break;
			default :
				foreach ($se_n as $key => $val) if (mb_stristr(strip_tags($key), strip_tags($engine))) {
					echo "<b>" . $key . "</b>";
					break;
				}
				break;
		}
	}

	function GetBrowser($UA)
	{
		if (mb_stristr($UA, "Maxthon") or mb_stristr($UA, "Myie")) return "maxthon.png";
		if (mb_stristr($UA, "MSIE")) return "ie.png";
		if (mb_stristr($UA, "Opera") or mb_stristr($UA, "OPR/")) return "opera.png";
		if (mb_stristr($UA, "Firefox")) return "firefox.png";
		if (mb_stristr($UA, "Chrome") or mb_stristr($UA, "Android")) return "chrome.png";
		if (mb_stristr($UA, "Safari")) return "safari.png";
		if (mb_stristr($UA, "Mac")) return "mac.gif";
		if (mb_stristr($UA, "Mozilla")) return "mozilla.gif";
		else return "";
	}

	function GetBrw($brw)
	{
		switch ($brw)
		{
			case "maxthon.png":
				return "AND (LOWER(user) LIKE '%maxthon%' OR LOWER(user) LIKE '%myie%')";
				break;
			case "ie.png":
				return "AND LOWER(user) NOT LIKE '%maxthon%' AND LOWER(user) NOT LIKE '%myie%' AND LOWER(user) LIKE '%msie%'";
				break;
			case "opera.png":
				return "AND LOWER(user) NOT LIKE '%maxthon%' AND LOWER(user) NOT LIKE '%myie%' AND LOWER(user) NOT LIKE '%msie%' AND (LOWER(user) LIKE '%opera%' OR LOWER(user) LIKE '%OPR/%')";
				break;
			case "firefox.png":
				return "AND LOWER(user) NOT LIKE '%maxthon%' AND LOWER(user) NOT LIKE '%myie%' AND LOWER(user) NOT LIKE '%msie%' AND LOWER(user) NOT LIKE '%opera%' AND LOWER(user) LIKE '%firefox%'";
				break;
			case "chrome.png":
				return "AND LOWER(user) NOT LIKE '%maxthon%' AND LOWER(user) NOT LIKE '%myie%' AND LOWER(user) NOT LIKE '%msie%' AND LOWER(user) NOT LIKE '%opera%' AND LOWER(user) NOT LIKE '%firefox%' AND (LOWER(user) LIKE '%chrome%' OR LOWER(user) LIKE '%Android%')";
				break;
			case "safari.png":
				return "AND LOWER(user) NOT LIKE '%maxthon%' AND LOWER(user) NOT LIKE '%myie%' AND LOWER(user) NOT LIKE '%msie%' AND LOWER(user) NOT LIKE '%opera%' AND LOWER(user) NOT LIKE '%firefox%' AND LOWER(user) NOT LIKE '%chrome%' AND LOWER(user) LIKE '%safari%'";
				break;
			case "mac.gif":
				return "AND LOWER(user) NOT LIKE '%maxthon%' AND LOWER(user) NOT LIKE '%myie%' AND LOWER(user) NOT LIKE '%msie%' AND LOWER(user) NOT LIKE '%opera%' AND LOWER(user) NOT LIKE '%firefox%' AND LOWER(user) NOT LIKE '%chrome%' AND LOWER(user) NOT LIKE '%safari%' AND LOWER(user) LIKE '%mac%'";
				break;
			case "mozilla.gif":
				return "AND LOWER(user) NOT LIKE '%maxthon%' AND LOWER(user) NOT LIKE '%myie%' AND LOWER(user) NOT LIKE '%msie%' AND LOWER(user) NOT LIKE '%opera%' AND LOWER(user) NOT LIKE '%firefox%' AND LOWER(user) NOT LIKE '%chrome%' AND LOWER(user) NOT LIKE '%safari%' AND LOWER(user) NOT LIKE '%mac%' AND LOWER(user) LIKE '%mozilla%'";
				break;
			default:
				return "AND LOWER(user) NOT LIKE '%maxthon%' AND LOWER(user) NOT LIKE '%myie%' AND LOWER(user) NOT LIKE '%msie%' AND LOWER(user) NOT LIKE '%opera%' AND LOWER(user) NOT LIKE '%firefox%' AND LOWER(user) NOT LIKE '%chrome%' AND LOWER(user) NOT LIKE '%safari%' AND LOWER(user) NOT LIKE '%mac%' AND LOWER(user) NOT LIKE '%mozilla%'";
				break;
		}
	}

	function fixo($s, $str)
	{
		global $fx_m;
		foreach ($fx_m as $vl)
		{
			list($s1, $s2, $s3) = explode("|", $vl);
			$s3 = trim($s3);
			if (mb_stristr($str, $s2) and !empty($s3) and $s == $s1) return "<font color='#DE3163'><b>" . $s3 . " :</b></font><br>";
		}
		return;
	}

	$month = array(
		"12" => "Декабрь",
		"11" => "Ноябрь",
		"10" => "Октябрь",
		"09" => "Сентябрь",
		"08" => "Август",
		"07" => "Июль",
		"06" => "Июнь",
		"05" => "Май",
		"04" => "Апрель",
		"03" => "Март",
		"02" => "Февраль",
		"01" => "Январь"
	);

	function accdeny()
	{
		?>
	<table align=center width=250 cellpadding=5 cellspacing=1 border=0>
		<tr class=h>
			<td width=250>Авторизация</td>
		</tr>
		<tr class="s1">
			<td align=left>
				<br>

				<div align="center">Доступ закрыт!</div>
				<br>
			</td>
		</tr>
	</table>
	<div align=center><br><a href=?logout><b>Выйти</b></a></div><br>
	<style type="text/css"> body {
		cursor: auto;
	} </style>
</body>
</html>
<?php
		exit;
	}

	function timefilter()
	{
		global $s_date, $f_date, $u;
		$res = mysql_query("SELECT DISTINCT dt FROM surf ORDER BY 1 DESC");
		if ($_GET['dy']) switch ($_GET['dy'])
		{
			case 1:
				$s_date = mysql_result($res, 0);
				$f_date = $s_date;
				break;
			case 2:
				$s_date = mysql_result($res, 1);
				$f_date = $s_date;
				break;
			case 3:
				$f_date = mysql_result($res, 0);
				$s_date = mb_substr($f_date, 0, 6) . "01";
				break;
			case 4:
				$f_date = mysql_result($res, 0);
				$f_d = mb_substr($f_date, 0, 4) . mb_substr($f_date, 4, 2);
				while ($row = mysql_fetch_row($res))
				{
					$s_d = mb_substr($row[0], 0, 4) . mb_substr($row[0], 4, 2);
					if ($f_d <> $s_d) {
						$f_date = $row[0];
						break;
					}
				}
				$s_date = $s_d . "01";
				break;
			case 5:
				$s_date = mysql_result($res, mysql_num_rows($res) - 1);
				$f_date = mysql_result($res, 0);
				break;
		}
		if (empty($s_date)) $s_date = mysql_result($res, mysql_num_rows($res) - 1);
		if (empty($f_date)) $f_date = mysql_result($res, 0);
		?>
	<table align=center width=750 cellpadding=5 cellspacing=1 border=0>
		<tr class=h>
			<td width=100% valign=middle>
				<form style="margin:0px;padding:0px;" action="" method="get"><span style="vertical-align: middle;">Фильтр: &nbsp;<font
					color=#de3163>с</font></span> <input type=text name="s_date"
														 style="width:  <?php echo (APPLE == 1) ? "80" : "70";?>px; font-family: Tahoma, 'Lucida Grande'; font-size: 11px; vertical-align: middle;"
														 value="<?php echo dtconv($s_date); ?>">
					<span style="vertical-align: middle;"><font color=#de3163>до</font></span> <input type=text
																									  name="f_date"
																									  style="width:  <?php echo (APPLE == 1) ? "80" : "70";?>px; font-family: Tahoma, 'Lucida Grande'; font-size: 11px; vertical-align: middle;"
																									  value="<?php echo dtconv($f_date); ?>">
					<?php if (!in_array($_GET['top'], array(17, 11, 8)) and ($_GET['top'] != 4 or isset($_GET['engin']))) { ?>
						&nbsp;<span style="vertical-align: middle;">кол-во поз.</span> <input type=text name="pos"
																							  style="width: 30px; font-family: Tahoma, 'Lucida Grande'; font-size: 11px; vertical-align: middle;"
																							  value="<?php if ($_GET['pos'] == 99999) echo ""; else echo $_GET['pos']; ?>">
						<?php } ?>
					<?php if (!in_array($_GET['top'], array(5, 6, 7, 13, 10, 14, 16)) or ($_GET['top'] == 10 and !isset($_GET['domen']))) { ?>
						&nbsp;<span style="vertical-align: middle;">сорт.</span> <select name="sort"
																						 style="font-family: Tahoma, 'Lucida Grande'; font-size: 11px; vertical-align: middle;">
							<option
								value="ho" <?php if ($_GET['sort'] == "ho" or $_GET['sort'] != "hi") echo "selected"; ?>>
								Хосты
							</option>
							<option value="hi" <?php if ($_GET['sort'] == "hi") echo "selected"; ?>>Хиты</option>
						</select>
						<?php } ?>
					<input name="top" value=" <?php echo $_GET['top'];?>" type="hidden">
					<?php if ($_GET['engin']) echo "<input name='engin' value=" . $_GET['engin'] . " type='hidden'>"; ?>
					<?php if ($_GET['domen']) echo "<input name='domen' value=" . $_GET['domen'] . " type='hidden'>"; ?>
					<?php if ($_GET['brw']) echo "<input name='brw' value='" . $_GET['brw'] . "' type='hidden'>"; ?>
					<?php if ($_GET['qq']) echo "<input name='qq' value='" . $_GET['qq'] . "' type='hidden'>"; ?>
					<?php if (!in_array($_GET['top'], array(17, 4, 7, 9, 11, 10, 8)) or ($_GET['top'] == 10 and isset($_GET['domen'])) or ($_GET['top'] == 4 and !empty($_GET['engin']))) { ?>
						&nbsp;<span style="vertical-align: middle;">строка</span> <input type=text name="str_f"
																						 style="width:  <?php echo (APPLE == 1) ? "140" : "160";?>px; font-family: Tahoma, 'Lucida Grande'; font-size: 11px; vertical-align: middle;"
																						 value="<?php if ($_GET['str_f']) echo $_GET['str_f']; ?>">
						<?php } ?>
					<input
						style="width:  <?php echo (APPLE == 1) ? "60" : "72";?>px; font-family: Tahoma, 'Lucida Grande'; font-size: 11px; padding: 1px; vertical-align: middle;"
						type=submit value=" <?php echo (APPLE == 1) ? "Показ!" : "Показать!";?>">
					<?php if (APPLE != 1) { ?>
						<div style="display:inline">
							<button id="copy"
									style="width: 16px;height: 16px;padding: 0;margin: 0;border: 0;background: url(excel.gif) no-repeat center top;overflow: hidden;cursor: pointer; vertical-align: middle;"></button>
						</div>
						<?php } ?>
				</form>
			</td>
		</tr>
	</table><br>
	<script type="text/javascript">
		var clip = new ZeroClipboard.Client();
		clip.addEventListener('complete', function (client, text) {
			alert("Таблица успешно скопирована!\nТеперь можете вставить её в Excel (Ctrl+V)");
		});
		clip.addEventListener('mouseDown', function (client) {
			var tbls = document.getElementById("table");
			var s = '';
			for (var r = 0; r < tbls.rows.length; r++) {
				for (var c = 0; c < tbls.rows[r].cells.length; c++) {
					s = s + tbls.rows[r].cells[c].innerHTML + '\t';
					s = s.replace(/<\/?[^>]+>/gi, '');
				}
				s = s + '\n';
			}
			clip.setText(s);
		});
		clip.glue('copy');
	</script>
	<?php
	}

	$detail = $_GET['detail'];
	$detail_se = $_GET['detail_se'];
	$detail_other = $_GET['detail_other'];

	if (isset($detail)) {
		hdr();

		if (($_COOKIE['alogin'] <> $login or $_COOKIE['apass'] <> $pass)) accdeny();

		$s = "s2";

		$group = $_GET['group'];
		if (file_exists("detail.dat") and $group <> "false") $group = "true";
		if ($group <> "true") {
			echo "<table id=table align=center width=100% cellpadding=5 cellspacing=1 border=0><tr class=h><td width=35>Время</td><td>Referer</td><td width=90>IP-адрес <a class=d href=\"?detail=" . $detail . "&group=true\"\"\">&plusmn;</a></td><td>Хост</td><td>User-Agent</td><td>Страница</td></tr>";
			$r = mysql_query("SELECT tm,refer,ip,proxy,host,lang,user,req FROM surf WHERE dt='" . $detail . "' ORDER BY i DESC");

			while ($row = mysql_fetch_row($r))
			{
				if ($s == "s2") {
					$s = "s1";
					echo "<tr class=s1>";
				} else {
					$s = "s2";
					echo "<tr class=s2>";
				}
				echo "<td>" . $row[0] . "</td>";

				echo "<td align=left style='overflow: hidden;text-overflow: ellipsis;'>";
				$refer = Ref($row[1]);
				if (is_array($refer)) {
					list($engine, $query) = $refer;
					if ($engine == "G" and !empty($query) and mb_stristr($row[1], "/url?")) $row[1] = str_replace("/url?", "/search?", $row[1]);
					echo_se($engine);
					if (empty($query)) $query = "<font color=grey>неизвестно</font>";
					echo ": <a target=_blank href=\"" . $row[1] . "\">" . $query . "</a></td>";
				} else if ($refer == "") echo "<font color=grey>неизвестно</font>"; else {
					echo "<a target=_blank href=\"" . $row[1] . "\">";
					if (mb_stristr(urldecode($row[1]), "xn--")) {
						$IDN = new idna_convert(array('idn_version' => 2008));
						echo $IDN->decode(urldecode($row[1]));
					} else echo urldecode($row[1]);
					echo "</a></td>";
				}

				if ($row[2] != "unknown") echo "<td><a target=_blank href=\"?item=ip&qs=" . $row[2] . "\">" . $row[2] . "</a>"; else echo "<td><font color=grey>неизвестно</font>";
				if ($row[3] != "") echo "<br><a target=_blank href=\"?item=ip&qs=" . $row[3] . "\">через proxy</a>";
				echo "</td>";

				if ($row[4] == "") echo "<td><font color=grey>неизвестно</font>"; else echo "<td><a target=_blank href=\"http://www.tcpiputils.com/browse/ip-address/" . (($row[3] != "") ? $row[3] : $row[2]) . "\">" . $row[4] . "</a>";
				if ($row[5] != "") {
					echo "<br>Язык: " . (!empty($lang[mb_strtoupper($row[5])]) ? $lang[mb_strtoupper($row[5])] : "<font color=grey>неизвестно</font>");
					if (file_exists("flags/" . mb_strtolower($lang[mb_strtoupper($row[5])]) . ".gif")) echo " <img align=absmiddle src=flags/" . mb_strtolower($lang[mb_strtoupper($row[5])]) . ".gif width=16 height=12>";
				}
				echo "</td>";

				echo "<td align=left style='overflow: hidden;text-overflow: ellipsis;'>";
				if (!is_robot($row[6], $row[4])) {
					$brw = GetBrowser($row[6]);
					if ($brw != "") echo "<img src=browsers/$brw width=16 height=16 align=absmiddle> ";
				}
				echo $row[6] . "</td>";
				echo "<td align=left style='overflow: hidden;text-overflow: ellipsis;' nowrap><a target=_blank href=" . $row[7] . ">" . $row[7] . "</a></td>";
				echo "</tr>";
			}
			echo "<tr class=h><td></td><td></td><td></td><td></td><td></td><td></td></tr></table>";
			norm(0);
		}
		else
		{
			echo "<table id=table align=center width=100% cellpadding=5 cellspacing=1 border=0><tr class=h><td width=90>IP-адрес <a class=d href=\"?detail=" . $detail . "&group=false\"\"\">&plusmn;</a></td><td>Хост</td><td>User-Agent</td><td width=30%>Referer</td><td width=35>Время</td><td>Страница</td></tr>";
			$rs = mysql_query("SELECT tm,refer,ip,proxy,host,lang,user,req FROM surf WHERE dt='" . $detail . "' ORDER BY i DESC");
			while ($r = mysql_fetch_row($rs)) $row[$r[2]][] = array($r[0], $r[1], $r[3], $r[4], $r[5], $r[6], $r[7]);
			foreach ($row as $ip => $val)
			{
				if ($s == "s2") {
					$s = "s1";
					echo "<tr class=s1>";
				} else {
					$s = "s2";
					echo "<tr class=s2>";
				}

				if ($ip != "unknown") echo "<td rowspan=" . count($val) . "><a target=_blank href=\"?item=ip&qs=" . $ip . "\">" . $ip . "</a>"; else echo "<td><font color=grey>неизвестно</font>";
				if ($val[0][2] != "") echo "<br><a target=_blank href=\"?item=ip&qs=" . $val[0][2] . "\">через proxy</a>";
				echo "</td>";
				$skip = 0;
				foreach ($val as $k => $rw)
				{
					if ($skip <> 0) echo "<tr class=" . $s . ">";
					$skip = 1;

					if ($rw[3] == "") echo "<td><font color=grey>неизвестно</font>"; else echo "<td><a target=_blank href=\"http://www.tcpiputils.com/browse/ip-address/" . (($rw[2] != "") ? $rw[2] : $ip) . "\">" . $rw[3] . "</a>";
					if ($rw[4] != "") {
						echo "<br>Язык: " . (!empty($lang[mb_strtoupper($rw[4])]) ? $lang[mb_strtoupper($rw[4])] : "<font color=grey>неизвестно</font>");
						if (file_exists("flags/" . mb_strtolower($lang[mb_strtoupper($rw[4])]) . ".gif")) echo " <img align=absmiddle src=flags/" . mb_strtolower($lang[mb_strtoupper($rw[4])]) . ".gif width=16 height=12>";
					}
					echo "</td>";

					echo "<td align=left style='overflow: hidden;text-overflow: ellipsis;'>";
					if (!is_robot($rw[5], $rw[3])) {
						$brw = GetBrowser($rw[5]);
						if ($brw != "") echo "<img src=browsers/$brw width=16 height=16 align=absmiddle> ";
					}
					echo $rw[5] . "</td>";

					echo "<td align=left style='overflow: hidden;text-overflow: ellipsis;'>";
					$refer = Ref($rw[1]);
					if (is_array($refer)) {
						list($engine, $query) = $refer;
						if ($engine == "G" and !empty($query) and mb_stristr($rw[1], "/url?")) $rw[1] = str_replace("/url?", "/search?", $rw[1]);
						echo_se($engine);
						if (empty($query)) $query = "<font color=grey>неизвестно</font>";
						echo ": <a target=_blank href=\"" . $rw[1] . "\">" . $query . "</a></td>";
					} else if ($refer == "") echo "<font color=grey>неизвестно</font>"; else {
						echo "<a target=_blank href=\"" . $row[1] . "\">";
						if (mb_stristr(urldecode($rw[1]), "xn--")) {
							$IDN = new idna_convert(array('idn_version' => 2008));
							echo $IDN->decode(urldecode($rw[1]));
						} else echo urldecode($rw[1]);
						echo "</a></td>";
					}

					echo "<td>" . $rw[0] . "</td>";
					echo "<td align=left style='overflow: hidden;text-overflow: ellipsis;' nowrap><a target=_blank href=" . $rw[6] . ">" . $rw[6] . "</a></td>";
					echo "</tr>";
				}
			}
			echo "<tr class=h><td></td><td></td><td></td><td></td><td></td><td></td></tr></table>";
			norm(0);
		}

	}

	if (isset($detail_se)) {
		hdr();

		if (($_COOKIE['alogin'] <> $login or $_COOKIE['apass'] <> $pass)) accdeny();

		$s = "s2";
		echo "<table id=table align=center width=100% cellpadding=5 cellspacing=1 border=0><tr class=h><td>Referer</td><td width=90>IP-адрес</td><td>Хост</td><td>User-Agent</td><td>Время / Страница</td></tr>";

		$rs = mysql_query("SELECT i,refer,ip,proxy,host,lang,user,tm,req FROM surf WHERE dt='" . $detail_se . "' AND " . $zp . " ORDER BY i ASC");
		while ($row = mysql_fetch_row($rs))
		{
			$refer = Ref($row[1]);
			if (array_key_exists($row[2], $i1_ip)) {
				if ((is_array($refer) or (($row[1] != "") and !mb_stristr($row[1], "://" . $site) and !mb_stristr($row[1], "://www." . $site)))) ;
				else $i2[$i1_ip[$row[2]]][] = array($row[7], $row[8]);
			}
			if (is_array($refer)) {
				$i1[$row[0]] = array($row[1], $row[2], $row[3], $row[4], $row[5], $row[6]);
				$i1_ip[$row[2]] = $row[0];
				$i2[$i1_ip[$row[2]]][] = array($row[7], $row[8]);
			}
		}
		$i1 = array_reverse($i1, true);
		foreach ($i1 as $id => $row)
		{
			$refer = Ref($row[0]);
			if (is_array($refer)) {
				list($engine, $query) = $refer;
				if ($s == "s2") {
					$s = "s1";
					echo "<tr class=s1>";
				} else {
					$s = "s2";
					echo "<tr class=s2>";
				}
				echo "<td align=left style='overflow: hidden;text-overflow: ellipsis;'>";
				if ($engine == "G" and !empty($query) and mb_stristr($row[0], "/url?")) $row[0] = str_replace("/url?", "/search?", $row[0]);
				echo_se($engine);
				if (empty($query)) $query = "<font color=grey>неизвестно</font>";
				echo ": <a target=_blank href=\"" . $row[0] . "\">" . $query . "</a></td>";
			}

			if ($row[1] != "unknown") echo "<td><a target=_blank href=\"?item=ip&qs=" . $row[1] . "\">" . $row[1] . "</a>"; else echo "<td><font color=grey>неизвестно</font>";
			if ($row[2] != "") echo "<br><a target=_blank href=\"?item=ip&qs=" . $row[2] . "\">через proxy</a>";
			echo "</td>";

			if ($row[3] == "") echo "<td><font color=grey>неизвестно</font>"; else echo "<td nowrap><a target=_blank href=\"http://www.tcpiputils.com/browse/ip-address/" . (($row[2] != "") ? $row[2] : $row[1]) . "\">" . $row[3] . "</a>";
			if ($row[4] != "") {
				echo "<br>Язык: " . (!empty($lang[mb_strtoupper($row[4])]) ? $lang[mb_strtoupper($row[4])] : "<font color=grey>неизвестно</font>");
				if (file_exists("flags/" . mb_strtolower($lang[mb_strtoupper($row[4])]) . ".gif")) echo " <img align=absmiddle src=flags/" . mb_strtolower($lang[mb_strtoupper($row[4])]) . ".gif width=16 height=12>";
			}
			echo "</td>";

			echo "<td align=left style='overflow: hidden;text-overflow: ellipsis;'>";
			if (!is_robot($row[5], $row[3])) {
				$brw = GetBrowser($row[5]);
				if ($brw != "") echo "<img src=browsers/$brw width=16 height=16 align=absmiddle> ";
			}
			echo $row[5] . "</td>";

			echo "<td align=left style='overflow: hidden;text-overflow: ellipsis;' nowrap>";
			$tu = "";
			foreach ($i2[$id] as $rw) {
				$tu = $rw[0] . " <a target=_blank href=" . $rw[1] . ">" . $rw[1] . "</a><br>" . $tu;
			}
			echo $tu;
			echo "</a></td></tr>";
		}
		echo "<tr class=h><td></td><td></td><td></td><td></td><td></td></tr></table>";
		norm(0);
	}

	if (isset($detail_other)) {
		hdr();

		if (($_COOKIE['alogin'] <> $login or $_COOKIE['apass'] <> $pass)) accdeny();

		$s = "s2";
		echo "<table id=table align=center width=100% cellpadding=5 cellspacing=1 border=0><tr class=h><td>Referer</td><td width=90>IP-адрес</td><td>Хост</td><td>User-Agent</td><td>Время / Страница</td></tr>";

		$rs = mysql_query("SELECT i,refer,ip,proxy,host,lang,user,tm,req FROM surf WHERE dt='" . $detail_other . "' AND " . $zp . " ORDER BY i ASC");
		$f_se = array("yand", "google.", "go.mail.ru", "rambler.", "search.yahoo", "search.msn", "bing", "search.live.com");
		$f_se = array_merge($f_se, $se_nn);
		while ($row = mysql_fetch_row($rs))
		{
			$refer = Ref($row[1]);
			$skip = 0;
			foreach ($f_se as $val) {
				if (mb_stristr($refer, $val)) $skip = 1;
			}
			if (mb_stristr($refer, $site) and mb_stripos($refer, $site) == 0) $skip = 1;
			if (array_key_exists($row[2], $i1_ip)) {
				if ((is_array($refer) or (($refer != "") and !(mb_stristr($refer, "://" . $site) and mb_stripos($refer, "://" . $site, 6) == 0) and !(mb_stristr($refer, "://www." . $site) and mb_stripos($refer, "://www." . $site, 6) == 0)) or $skip == 1)) ;
				else $i2[$i1_ip[$row[2]]][] = array($row[7], $row[8]);
			}
			if (is_string($refer) and $refer != "" and !(mb_stristr($refer, "://" . $site) and mb_stripos($refer, "://" . $site, 6) == 0) and !(mb_stristr($refer, "://www." . $site) and mb_stripos($refer, "://www." . $site, 6) == 0) and $skip == 0) {
				$i1[$row[0]] = array($row[1], $row[2], $row[3], $row[4], $row[5], $row[6]);
				$i1_ip[$row[2]] = $row[0];
				$i2[$i1_ip[$row[2]]][] = array($row[7], $row[8]);
			}
		}
		$i1 = array_reverse($i1, true);
		foreach ($i1 as $id => $row)
		{
			if ($s == "s2") {
				$s = "s1";
				echo "<tr class=s1>";
			} else {
				$s = "s2";
				echo "<tr class=s2>";
			}

			echo "<td align=left style='overflow: hidden;text-overflow: ellipsis;'>";
			echo "<a target=_blank href=\"" . $row[0] . "\">";
			if (mb_stristr(urldecode($row[0]), "xn--")) {
				$IDN = new idna_convert(array('idn_version' => 2008));
				echo $IDN->decode(urldecode($row[0]));
			} else echo urldecode($row[0]);
			echo "</a></td>";


			if ($row[1] != "unknown") echo "<td><a target=_blank href=\"?item=ip&qs=" . $row[1] . "\">" . $row[1] . "</a>"; else echo "<td><font color=grey>неизвестно</font>";
			if ($row[2] != "") echo "<br><a target=_blank href=\"?item=ip&qs=" . $row[2] . "\">через proxy</a>";
			echo "</td>";

			if ($row[3] == "") echo "<td><font color=grey>неизвестно</font>"; else echo "<td nowrap><a target=_blank href=\"http://www.tcpiputils.com/browse/ip-address/" . (($row[2] != "") ? $row[2] : $row[1]) . "\">" . $row[3] . "</a>";
			if ($row[4] != "") {
				echo "<br>Язык: " . (!empty($lang[mb_strtoupper($row[4])]) ? $lang[mb_strtoupper($row[4])] : "<font color=grey>неизвестно</font>");
				if (file_exists("flags/" . mb_strtolower($lang[mb_strtoupper($row[4])]) . ".gif")) echo " <img align=absmiddle src=flags/" . mb_strtolower($lang[mb_strtoupper($row[4])]) . ".gif width=16 height=12>";
			}
			echo "</td>";

			echo "<td align=left style='overflow: hidden;text-overflow: ellipsis;'>";
			if (!is_robot($row[5], $row[3])) {
				$brw = GetBrowser($row[5]);
				if ($brw != "") echo "<img src=browsers/$brw width=16 height=16 align=absmiddle> ";
			}
			echo $row[5] . "</td>";

			echo "<td align=left style='overflow: hidden;text-overflow: ellipsis;' nowrap>";
			$tu = "";
			foreach ($i2[$id] as $rw) {
				$tu = $rw[0] . " <a target=_blank href=" . $rw[1] . ">" . $rw[1] . "</a><br>" . $tu;
			}
			echo $tu;
			echo "</a></td></tr>";
		}
		echo "<tr class=h><td></td><td></td><td></td><td></td><td></td></tr></table>";
		norm(0);
	}

	$detail_ho = $_GET['detail_ho'];

	if (isset($detail_ho)) {
		hdr();

		if (($_COOKIE['alogin'] <> $login or $_COOKIE['apass'] <> $pass)) accdeny();

		$s = "s2";

		echo "<table id=table align=center width=100% cellpadding=5 cellspacing=1 border=0><tr class=h><td width=35>Время</td><td>Referer</td><td width=90>IP-адрес</td><td>Хост</td><td>User-Agent</td><td>Страница</td></tr>";
		$r = mysql_query("SELECT tm,refer,ip,proxy,host,lang,user,req FROM surf WHERE dt='" . $detail_ho . "' AND " . $zp . " GROUP BY ip ORDER BY i DESC");

		while ($row = mysql_fetch_row($r))
		{
			if ($s == "s2") {
				$s = "s1";
				echo "<tr class=s1>";
			} else {
				$s = "s2";
				echo "<tr class=s2>";
			}
			echo "<td>" . $row[0] . "</td>";

			echo "<td align=left style='overflow: hidden;text-overflow: ellipsis;'>";
			$refer = Ref($row[1]);
			if (is_array($refer)) {
				list($engine, $query) = $refer;
				if ($engine == "G" and !empty($query) and mb_stristr($row[1], "/url?")) $row[1] = str_replace("/url?", "/search?", $row[1]);
				echo_se($engine);
				if (empty($query)) $query = "<font color=grey>неизвестно</font>";
				echo ": <a target=_blank href=\"" . $row[1] . "\">" . $query . "</a></td>";
			} else if ($refer == "") echo "<font color=grey>неизвестно</font>"; else {
				echo "<a target=_blank href=\"" . $row[1] . "\">";
				if (mb_stristr(urldecode($row[1]), "xn--")) {
					$IDN = new idna_convert(array('idn_version' => 2008));
					echo $IDN->decode(urldecode($row[1]));
				} else echo urldecode($row[1]);
				echo "</a></td>";
			}

			if ($row[2] != "unknown") echo "<td><a target=_blank href=\"?item=ip&qs=" . $row[2] . "\">" . $row[2] . "</a>"; else echo "<td><font color=grey>неизвестно</font>";
			if ($row[3] != "") echo "<br><a target=_blank href=\"?item=ip&qs=" . $row[3] . "\">через proxy</a>";
			echo "</td>";

			if ($row[4] == "") echo "<td><font color=grey>неизвестно</font>"; else echo "<td><a target=_blank href=\"http://www.tcpiputils.com/browse/ip-address/" . (($row[3] != "") ? $row[3] : $row[2]) . "\">" . $row[4] . "</a>";
			if ($row[5] != "") {
				echo "<br>Язык: " . (!empty($lang[mb_strtoupper($row[5])]) ? $lang[mb_strtoupper($row[5])] : "<font color=grey>неизвестно</font>");
				if (file_exists("flags/" . mb_strtolower($lang[mb_strtoupper($row[5])]) . ".gif")) echo " <img align=absmiddle src=flags/" . mb_strtolower($lang[mb_strtoupper($row[5])]) . ".gif width=16 height=12>";
			}
			echo "</td>";

			echo "<td align=left style='overflow: hidden;text-overflow: ellipsis;'>";
			if (!is_robot($row[6], $row[4])) {
				$brw = GetBrowser($row[6]);
				if ($brw != "") echo "<img src=browsers/$brw width=16 height=16 align=absmiddle> ";
			}
			echo $row[6] . "</td>";
			echo "<td align=left style='overflow: hidden;text-overflow: ellipsis;' nowrap><a target=_blank href=" . $row[7] . ">" . $row[7] . "</a></td>";
			echo "</tr>";
		}
		echo "<tr class=h><td></td><td></td><td></td><td></td><td></td><td></td></tr></table>";
		norm(0);
	}


	$detail_hi = $_GET['detail_hi'];

	if (isset($detail_hi)) {
		hdr();

		if (($_COOKIE['alogin'] <> $login or $_COOKIE['apass'] <> $pass)) accdeny();

		$s = "s2";
		echo "<table id=table align=center width=100% cellpadding=5 cellspacing=1 border=0><tr class=h><td>Referer</td><td width=90>IP-адрес</td><td>Хост</td><td>User-Agent</td><td>Время / Страница</td></tr>";

		$rs = mysql_query("SELECT i,refer,ip,proxy,host,lang,user,tm,req FROM surf WHERE dt='" . $detail_hi . "' AND " . $zp . " ORDER BY i ASC");
		while ($row = mysql_fetch_row($rs))
		{
			if (array_key_exists($row[2], $i1_ip)) {
				$i2[$i1_ip[$row[2]]][] = array($row[7], $row[8]);
			} else {
				$i1[$row[0]] = array($row[1], $row[2], $row[3], $row[4], $row[5], $row[6]);
				$i1_ip[$row[2]] = $row[0];
				$i2[$i1_ip[$row[2]]][] = array($row[7], $row[8]);
			}
		}
		$i1 = array_reverse($i1, true);
		foreach ($i1 as $id => $row)
		{
			$refer = Ref($row[0]);
			if (is_array($refer)) {
				list($engine, $query) = $refer;
				if ($s == "s2") {
					$s = "s1";
					echo "<tr class=s1>";
				} else {
					$s = "s2";
					echo "<tr class=s2>";
				}
				echo "<td align=left style='overflow: hidden;text-overflow: ellipsis;'>";
				if ($engine == "G" and !empty($query) and mb_stristr($row[0], "/url?")) $row[0] = str_replace("/url?", "/search?", $row[0]);
				echo_se($engine);
				if (empty($query)) $query = "<font color=grey>неизвестно</font>";
				echo ": <a target=_blank href=\"" . $row[0] . "\">" . $query . "</a></td>";
			} else {
				if ($s == "s2") {
					$s = "s1";
					echo "<tr class=s1>";
				} else {
					$s = "s2";
					echo "<tr class=s2>";
				}
				echo "<td align=left style='overflow: hidden;text-overflow: ellipsis;'>";
				if ($refer == "") echo "<font color=grey>неизвестно</font>"; else {
					echo "<a target=_blank href=\"" . $row[0] . "\">";
					if (mb_stristr(urldecode($row[0]), "xn--")) {
						$IDN = new idna_convert(array('idn_version' => 2008));
						echo $IDN->decode(urldecode($row[0]));
					} else echo urldecode($row[0]);
					echo "</a></td>";
				}
			}

			if ($row[1] != "unknown") echo "<td><a target=_blank href=\"?item=ip&qs=" . $row[1] . "\">" . $row[1] . "</a>"; else echo "<td><font color=grey>неизвестно</font>";
			if ($row[2] != "") echo "<br><a target=_blank href=\"?item=ip&qs=" . $row[2] . "\">через proxy</a>";
			echo "</td>";

			if ($row[3] == "") echo "<td><font color=grey>неизвестно</font>"; else echo "<td nowrap><a target=_blank href=\"http://www.tcpiputils.com/browse/ip-address/" . (($row[2] != "") ? $row[2] : $row[1]) . "\">" . $row[3] . "</a>";
			if ($row[4] != "") {
				echo "<br>Язык: " . (!empty($lang[mb_strtoupper($row[4])]) ? $lang[mb_strtoupper($row[4])] : "<font color=grey>неизвестно</font>");
				if (file_exists("flags/" . mb_strtolower($lang[mb_strtoupper($row[4])]) . ".gif")) echo " <img align=absmiddle src=flags/" . mb_strtolower($lang[mb_strtoupper($row[4])]) . ".gif width=16 height=12>";
			}
			echo "</td>";

			echo "<td align=left style='overflow: hidden;text-overflow: ellipsis;'>";
			if (!is_robot($row[5], $row[3])) {
				$brw = GetBrowser($row[5]);
				if ($brw != "") echo "<img src=browsers/$brw width=16 height=16 align=absmiddle> ";
			}
			echo $row[5] . "</td>";

			echo "<td align=left style='overflow: hidden;text-overflow: ellipsis;' nowrap>";
			$tu = "";
			foreach ($i2[$id] as $rw) {
				$tu = $rw[0] . " <a target=_blank href=" . $rw[1] . ">" . $rw[1] . "</a><br>" . $tu;
			}
			echo $tu;
			echo "</a></td></tr>";
		}
		echo "<tr class=h><td></td><td></td><td></td><td></td><td></td></tr></table>";
		norm(0);

	}

	$lq = $_GET['lq'];

	if (isset($lq)) {
		hdr();

		if ($_COOKIE['alogin'] <> $login or $_COOKIE['apass'] <> $pass) accdeny();

		$res = mysql_query("SELECT refer,day,dt,tm,req FROM surf WHERE (LOWER(refer) LIKE '%yand%' OR LOWER(refer) LIKE '%google.%' OR LOWER(refer) LIKE '%go.mail.ru%' OR LOWER(refer) LIKE '%rambler.%' OR LOWER(refer) LIKE '%search.yahoo%' OR LOWER(refer) LIKE '%search.msn%' OR LOWER(refer) LIKE '%bing%' OR LOWER(refer) LIKE '%search.live.com%'" . $cse_m . ") AND (" . $qse_m . ") AND LOWER(refer) NOT LIKE '%@%' AND " . $zp . " ORDER BY i DESC LIMIT " . $lq);
		echo "<table id=table align=center width=750 cellpadding=5 cellspacing=1 border=0><tr class=h><td width=80>Дата</td><td width=70>Поисковик</td><td>Последние $lq запроса</td><td nowrap>Время / Страница</td></tr>";
		$s = "s2";

		while ($ref = mysql_fetch_row($res))
		{
			$refer = Ref($ref[0]);
			if (is_array($refer)) {
				list($engine, $query) = $refer;
				if ($engine == "G" and !empty($query) and mb_stristr($ref[0], "/url?")) $ref[0] = str_replace("/url?", "/search?", $ref[0]);
				if ($s == "s2") {
					$s = "s1";
					echo "<tr class=s1>";
				} else {
					$s = "s2";
					echo "<tr class=s2>";
				}
				echo "<td nowrap title=" . $month[mb_substr($ref[2], 4, 2)] . ">" . $dday[$ref[1]] . dtconv($ref[2]) . "</td>";
				echo "<td align=center>";
				echo_se($engine);
				if (empty($query)) $query = "<font color=grey>неизвестно</font>";
				echo "</td><td align=left style='overflow: hidden;text-overflow: ellipsis;'><a target=_blank href=\"" . $ref[0] . "\">" . $query . "</a></td>";
				echo "<td align=left style='overflow: hidden;text-overflow: ellipsis;' nowrap>" . $ref[3] . " <a target=_blank href=" . $ref[4] . ">" . $ref[4] . "</a></td></tr>";
			}
		}
		echo "</tr><tr class=h><td></td><td></td><td></td><td></td></tr></table>";
		norm(750);
	}

	$ls = $_GET['ls'];

	if (isset($ls)) {
		hdr();

		if ($_COOKIE['alogin'] <> $login or $_COOKIE['apass'] <> $pass) accdeny();

		$res = mysql_query("SELECT refer,day,dt,tm,req FROM surf WHERE refer <> '' AND LOWER(refer) NOT LIKE '%://" . $site . "%' AND LOWER(refer) NOT LIKE '%://www." . $site . "%' AND LOWER(refer) NOT LIKE '" . $site . "%' AND (LOWER(refer) NOT LIKE '%yand%' AND LOWER(refer) NOT LIKE '%google.%' AND LOWER(refer) NOT LIKE '%go.mail.ru%' AND LOWER(refer) NOT LIKE '%rambler.%' AND LOWER(refer) NOT LIKE '%search.yahoo%' AND LOWER(refer) NOT LIKE '%search.msn%' AND LOWER(refer) NOT LIKE '%bing%' AND LOWER(refer) NOT LIKE '%search.live.com%' AND LOWER(refer) NOT LIKE '%&q=%' AND LOWER(refer) NOT LIKE '%?q=%' AND LOWER(refer) NOT LIKE '%query=%'" . $cot_m . ") AND " . $zp . " ORDER BY i DESC LIMIT " . $ls);
		echo "<table id=table align=center width=750 cellpadding=5 cellspacing=1 border=0><tr class=h><td width=80>Дата</td><td>Последние $ls других сайта</td><td nowrap>Время / Страница</td></tr>";
		$s = "s2";
		while ($ref = mysql_fetch_row($res))
		{
			if ($s == "s2") {
				$s = "s1";
				echo "<tr class=s1>";
			} else {
				$s = "s2";
				echo "<tr class=s2>";
			}
			echo "<td nowrap title=" . $month[mb_substr($ref[2], 4, 2)] . ">" . $dday[$ref[1]] . dtconv($ref[2]) . "</td>";
			echo "<td align=left style='overflow: hidden;text-overflow: ellipsis;'><a target=_blank href=\"" . $ref[0] . "\">";
			if (mb_stristr(urldecode($ref[0]), "xn--")) {
				$IDN = new idna_convert(array('idn_version' => 2008));
				echo $IDN->decode(urldecode($ref[0]));
			} else echo urldecode($ref[0]);
			echo "</a></td>";
			echo "<td align=left style='overflow: hidden;text-overflow: ellipsis;' nowrap>" . $ref[3] . " <a target=_blank href=" . $ref[4] . ">" . $ref[4] . "</a></td></tr>";
		}
		echo "</tr><tr class=h><td></td><td></td><td></td></tr></table>";
		norm(750);
	}


	$fix = $_GET['fix'];

	if (isset($fix)) {
		hdr();

		if ($_COOKIE['alogin'] <> $login or $_COOKIE['apass'] <> $pass) accdeny();

		$s = "s2";

		echo "<table id=table align=center width=100% cellpadding=5 cellspacing=1 border=0><tr class=h><td width=35>Время</td><td>Referer</td><td width=90>IP-адрес</td><td>Хост</td><td>User-Agent</td><td>Страница</td></tr>";

		$r = mysql_query("SELECT tm,refer,ip,proxy,host,lang,user,req FROM surf WHERE (" . $zfx . ") AND dt='" . $fix . "' AND" . $zp . " ORDER BY i DESC");

		while ($row = mysql_fetch_row($r))
		{
			if ($s == "s2") {
				$s = "s1";
				echo "<tr class=s1>";
			} else {
				$s = "s2";
				echo "<tr class=s2>";
			}
			echo "<td>" . $row[0] . "</td>";

			echo "<td align=left style='overflow: hidden;text-overflow: ellipsis;'>";
			$refer = Ref($row[1]);
			echo fixo("refer", $row[1]);
			if (is_array($refer)) {
				list($engine, $query) = $refer;
				if ($engine == "G" and !empty($query) and mb_stristr($row[1], "/url?")) $row[1] = str_replace("/url?", "/search?", $row[1]);
				echo_se($engine);
				if (empty($query)) $query = "<font color=grey>неизвестно</font>";
				echo ": <a target=_blank href=\"" . $row[1] . "\">" . $query . "</a></td>";
			} else if ($refer == "") echo "<font color=grey>неизвестно</font>"; else {
				echo "<a target=_blank href=\"" . $row[1] . "\">";
				if (mb_stristr(urldecode($row[1]), "xn--")) {
					$IDN = new idna_convert(array('idn_version' => 2008));
					echo $IDN->decode(urldecode($row[1]));
				} else echo urldecode($row[1]);
				echo "</a></td>";
			}

			echo "<td>";
			echo fixo("ip", $row[2]);
			if ($row[2] != "unknown") echo "<a target=_blank href=\"?item=ip&qs=" . $row[2] . "\">" . $row[2] . "</a>"; else echo "<font color=grey>неизвестно</font>";
			if ($row[3] != "") echo "<br><a target=_blank href=\"?item=ip&qs=" . $row[3] . "\">через proxy</a>";
			echo "</td>";

			echo "<td>";
			echo fixo("host", $row[4]);
			if ($row[4] == "") echo "<font color=grey>неизвестно</font>"; else echo "<a target=_blank href=\"http://www.tcpiputils.com/browse/ip-address/" . (($row[3] != "") ? $row[3] : $row[2]) . "\">" . $row[4] . "</a>";
			if ($row[5] != "") {
				echo "<br>Язык: " . (!empty($lang[mb_strtoupper($row[5])]) ? $lang[mb_strtoupper($row[5])] : "<font color=grey>неизвестно</font>");
				if (file_exists("flags/" . mb_strtolower($lang[mb_strtoupper($row[5])]) . ".gif")) echo " <img align=absmiddle src=flags/" . mb_strtolower($lang[mb_strtoupper($row[5])]) . ".gif width=16 height=12>";
			}
			echo "</td>";

			echo "<td align=left style='overflow: hidden;text-overflow: ellipsis;'>";
			echo fixo("user", $row[6]);
			if (!is_robot($row[6], $row[4])) {
				$brw = GetBrowser($row[6]);
				if ($brw != "") echo "<img src=browsers/$brw width=16 height=16 align=absmiddle> ";
			}
			echo $row[6] . "</td>";
			echo "<td align=left style='overflow: hidden;text-overflow: ellipsis;' nowrap>" . fixo("req", $row[7]) . "<a target=_blank href=" . $row[7] . ">" . $row[7] . "</a></td>";
			echo "</tr>";
		}
		echo "<tr class=h><td></td><td></td><td></td><td></td><td></td><td></td></tr></table>";
		norm(0);
	}

	$seek = $_GET['seek'];

	if (isset($seek)) {
		hdr();

		if ($_COOKIE['alogin'] <> $login or $_COOKIE['apass'] <> $pass) accdeny();

		echo "<table align=center width=250 cellpadding=5 cellspacing=1 border=0><tr class=h><td colspan=2 width=250>Поиск по БД статистики</td></tr>
  <tr class=s1>
  <td align=left>
  <table width=100% style=\"font-family: Tahoma, 'Lucida Grande'; font-size: 11px;\">
  <tr><form action=''>
  <tr><td><b>Период:</b></td>
  <td>
  <font color=#de3163>с</font> <input type=text name=s_date style=\"margin-left: 8px; width: 80px; font-family: Tahoma, 'Lucida Grande'; font-size: 11px;\" value=\"" . dtconv(mysql_result(mysql_query("SELECT dt FROM surf ORDER BY 1 ASC LIMIT 1"), 0)) . "\"><br>
  <font color=#de3163>до</font> <input type=text name=f_date style=\"width: 80px; font-family: Tahoma, 'Lucida Grande'; font-size: 11px;\" value=\"" . dtconv(mysql_result(mysql_query("SELECT dt FROM surf ORDER BY 1 DESC LIMIT 1"), 0)) . "\"></td></tr>
  <td nowrap><b>Искать в поле:</b></td>
  <td><select style=\"width: " . ((APPLE == 1) ? "128" : "139") . "px; font-family: Tahoma, 'Lucida Grande'; font-size: 11px;\" name=item>
          <option value=refer>Referer</option>
          <option value=ip>IP-адрес</option>
          <option value=host>Хост</option>
          <option value=user>User-Agent</option>
          <option value=req>Страница</option>
  </select>
  </td></tr>
  <tr><td nowrap><b>Строка поиска:</b></td><td> <input type=text name=qs style=\"width: " . ((APPLE == 1) ? "128" : "139") . "px; font-family: Tahoma, 'Lucida Grande'; font-size: 11px;\"></td></tr>
  <tr><td></td><td><span style='vertical-align:middle'><input name=tz type=checkbox style=\"margin-left:0px;\"></span> " . ((APPLE == 1) ? "строг. соответ-ие" : "строгое соответствие") . "</td></tr>
  <tr><td colspan=2 align=center>
  <input style=\"width: 56px; font-family: Tahoma, 'Lucida Grande'; font-size: 11px; margin-top: 2px; margin-bottom: 5px; padding: 1px; width: 100px;\" type=submit value=\"Показать!\">
  <br><font color=#de3163>*</font> Если \"Период\" не задан, то поиск<br> будет проводиться по всей базе<br>Дата задаётся в формате: дд.мм.гггг</td></form></tr></table>
  </td>
  </tr>
  </table>";
	}

	$help = $_GET['help'];
	if (isset($help)) {
		hdr();
		echo '<div align="center" style="margin-top: 24px; margin-bottom: 14px;"><img src="logo2.png" border="0" width="339" height="52"></div>';
		echo '<table align="center" style="width: ' . ((APPLE == 1) ? "770" : "660") . 'px;"><tr><td><div style="font-family: Tahoma, \'Lucida Grande\'; font-size: 11px;">Отчеты исключают из расчёта роботов (кроме TOP отчета для роботов) и игнорируемые поля. В деталях смотрится всё.';
		echo '<br><ul style="margin:0px;padding:0px;"><li><b>"Главная" страница</b> - это отчёт по всей посещаемости сайта отсортированной в порядке убывания от самой свежей даты';
		echo '<br>1) <font color="#ff4400">полоска красного цвета</font> - количество хостов, на временных графиках обозначает максимальное число';
		echo '<br>2) <font color="#ffaa00">полоска оранжевого цвета</font> - количество хитов, на временных графиках обозначает максимальное число';
		echo '<br>3) в колонках "Хосты | Хиты" - количество уникальных (хостовых) и всех (хитовых) посещений';
		echo '<br>4) в колонках "С поиска | С др. сайтов" - количество хитовых посещений с поиска и c других сайтов';
		echo '<br>5) в колонке "fix" - хиты, цели по сайту (фиксация любых: страниц, переходов, ip, хостов, User-Agent-ов)';
		echo '<br>6) в колонке "Детали" - ссылка на подробный отчёт по дню (все записи) с возможностью группировки по посетителям (ссылка <font color=#de3163;>&plusmn;</font> в колонке IP-адрес). Клик по IP адресу - показывает все его посещения за всё время, клик по Хосту - его whois инфо.';
		echo '</li><li><b>TOP отчёты</b> - это отчёты отсортированные по позициям (начиная с самой популярной) уникальных данных посещений.';
		echo '<br>ТМесяц - текущий месяц, ПМесяц - прошедший месяц, сорт. - режим сортировки (по хостам - уникальные, хитам - все), кол-во поз. - если пусто или 0, то все позиции, строка - это строка-фильтр (все вхождения) по содержимому 2й колонки (после №)';
		echo '<li><b>Страница "Поиск"</b> - это страница для прямого поиска по БД-статистики';
		echo '<li><b>Страница "Настройки"</b> - это страница обслуживания БД-статистики:';
		echo ' уменьшение размера БД (в случае необходимости),';
		echo ' добавление fix-ов, новых роботов и поисковиков, ';
		echo ' игнорирование из расчёта спамных или не нужных ip-адресов, хостов, ...';
		echo ' После внесения новых определений можно пересчитать статистику!';
		echo ' Скорость загрузки Главной страницы зависит от количества нерассчитанных (или пересчитываемых) записей и после каждого вызова сохраняется (кроме текущего дня).';
		echo ' После удаления X-дней из БД, рассчитанная сумма хитов (на главной в общей статистике) по этим дням сохраняется!</ul>';
		echo '<br><b style=color:red>Совет:</b> Если у вашего сайта большая посещаемость и вы редко заходите в статистику, то для <font color=red><b>ускорения</b></font> загрузки Главной страницы (сохранения нерассчитанных дней) рекомендую прописать её запуск по Cron (в Планировщике задач) на хостинге.';
		echo '<br><b>Пример команды</b>: запускать каждый день в 3 часа ночи (0 3 * * *) (не чаще 1 раза в день!):<br>';
		echo 'wget -O - -q -t 1 http://' . $_SERVER['SERVER_NAME'] . str_replace("index.php", "fri.php", $_SERVER['PHP_SELF']) . '?p=<font color="#675caf">ваш_пароль_в_FRI_Stats</font>';
		echo '</div></td></tr></table>';
		?>
	<style>
		a {
			font-family: Tahoma, 'Lucida Grande';
			font-size: 11px;
			color: #000000;
			text-decoration: none;
		}

		a:hover {
			color: #de3163;
			text-decoration: underline;
		}
	</style>
	<?php
	}

	if (!file_exists("fix.dat")) $fx = 1;

	$s_del = $_GET['s_del'];
	$f_del = $_GET['f_del'];
	$s_ret = $_POST['s_ret'];
	$f_ret = $_POST['f_ret'];
	$conf = $_GET['conf'];
	$grp = $_GET['grp'];
	$erd = $_GET['erd'];
	$z = $_GET['z'];
	$h = $_GET['h'];
	$utf8 = $_GET['utf8'];
	$submit = $_GET['submit'];

	if (isset($conf) || isset($f_del) || isset($grp) || isset($erd) || isset($z) || isset($h) || isset($utf8)) {
		hdr();

		if ($_COOKIE['alogin'] <> $login or $_COOKIE['apass'] <> $pass) accdeny();

		$r = mysql_query("SELECT DISTINCT dt FROM surf");
		while ($row = mysql_fetch_row($r)) $dtm[] = $row[0];
		if (isset($erd) and file_exists("errors.dat")) unlink("errors.dat");
		if (isset($grp)) {
			if ($grp == "0" and file_exists("detail.dat")) unlink("detail.dat");
			if ($grp == "1") {
				$fp = fopen("detail.dat", "w");
				fwrite($fp, "1");
				fclose($fp);
			}
		}
		if (isset($utf8)) {
			if ($utf8 == "0" and file_exists("utf8.dat")) unlink("utf8.dat");
			if ($utf8 == "1") file_put_contents("utf8.dat", "1");
			print '<script type="text/javascript">location="?conf";</script>';
		}
		if (isset($z)) {
			unlink("offset.php");
			if ($z == 1) $z = ""; else $z = "-";
			error_log("<?php \$offset = " . $z . $h . "; ?>", 3, "offset.php");
		} else if ($h == "0") unlink("offset.php");
		if (isset($f_del)) {
			$all_uniqs = 0;
			$all_hits = 0;
			$all_se = 0;
			$all_other = 0;
			$all_fix = 0;
			list($s_del, $f_del) = str_replace("+", "", array($s_del, $f_del));
			$s_del = dtconv2(trim($s_del));
			$f_del = dtconv2(trim($f_del));
			if ($total = file("total.dat")) {
				$total = explode("|", $total[0]);
				$all_uniqs += 0;
				$all_hits += $total[1];
				$all_se += $total[2];
				$all_other += $total[3];
				$all_fix += $total[4];
			}

			$ras = mysql_query("SELECT dt,cnt1,cnt2,cnt3,cnt4,cnt5 FROM mainh");
			while ($rw = mysql_fetch_assoc($ras))
			{
				$rwz[$rw["dt"]]["cnt1"] = $rw["cnt1"];
				$rwz[$rw["dt"]]["cnt2"] = $rw["cnt2"];
				$rwz[$rw["dt"]]["cnt3"] = $rw["cnt3"];
				$rwz[$rw["dt"]]["cnt4"] = $rw["cnt4"];
				$rwz[$rw["dt"]]["cnt5"] = $rw["cnt5"];
			}

			foreach ($dtm as $val)
			{
				if ($val >= $s_del and $val <= $f_del) {
					if (isset($rwz[$val]["cnt1"])) {
						$all_uniqs += $rwz[$val]["cnt1"];
						$all_hits += $rwz[$val]["cnt2"];
						$all_se += $rwz[$val]["cnt3"];
						$all_other += $rwz[$val]["cnt4"];
						$all_fix += $rwz[$val]["cnt5"];
					} else {
						list($tmp_uniqs, $tmp_hits) = c_uniqs_hits($val);
						$all_uniqs += $tmp_uniqs;
						$all_hits += $tmp_hits;
						$all_se += c_se($val);
						$all_other += c_other($val);
						if ($fx != 1) $all_fix += c_fix($val);
					}
				} else if ($val > $f_del) break;
			}
			mysql_query("DELETE FROM surf WHERE dt >= '$s_del' AND dt <= '$f_del'");
			mysql_query("DELETE FROM mainh WHERE dt >= '$s_del' AND dt <= '$f_del'");
			mysql_query("OPTIMIZE TABLE surf, mainh");

			$out = "$all_uniqs|$all_hits|$all_se|$all_other|$all_fix";
			$fp = fopen("total.dat", "w");
			fwrite($fp, $out);
			fclose($fp);
			print '<script type="text/javascript">location="./";</script>';
		}

		$s_del = mysql_result($r, 0);
		$f_del = mysql_result($r, mysql_num_rows($r) - 1);

		if ($res = mysql_query('SHOW TABLE STATUS FROM ' . $DBName)) while ($arr = mysql_fetch_assoc($res)) {
			if ($arr['Name'] == "surf") $Size = round(($arr['Data_length'] + $arr['Index_length']) / 1024);
		}
		echo "<table align=center width=500 cellpadding=5 cellspacing=1 border=0><tr class=h><td width=500>Настройки</td></tr>
       <tr class=s1><td style='line-height:21px'>";
		echo "<form style='margin:0px;padding:0px;' action=\"?conf\">Размер БД посещений: <b>" . $Size . " Kb</b><br>Уменьшить размер БД, удалив дни: ";
		echo "<font color=#de3163>с</font> <input title='ниже даты \"до\"' type=text name=s_del style=\"width: " . ((APPLE == 1) ? "80" : "70") . "px; font-family: Tahoma, 'Lucida Grande'; font-size: 11px;\" value='" . dtconv($s_del) . "'>";
		echo " &nbsp;<font color=#de3163>до</font> <input title='включительно' type=text name=f_del style=\"width: " . ((APPLE == 1) ? "80" : "70") . "px; font-family: Tahoma, 'Lucida Grande'; font-size: 11px;\"> ? ";
		echo "<input style=\"width: " . ((APPLE == 1) ? "40" : "32") . "px;\" type=submit value=\"Да!\"></form>";
		if (file_exists("detail.dat")) $sel = "checked";
		echo "<form style='margin:0px;padding:0px;' action=\"?conf\">Сразу показывать Детали >>> по дням с группировкой по IP?
      <span style='vertical-align:middle'><INPUT type=radio name=grp value=0 " . (!isset($sel) ? "checked" : "") . " onclick=\"submit();\"></span> нет
      <span style='vertical-align:middle'><INPUT type=radio name=grp value=1 " . $sel . " onclick=\"submit();\"></span> да";
		echo "</form>";
		if (file_exists("utf8.dat")) $utf = "checked";
		echo "<form style='margin:0px;padding:0px;' action=\"?conf\">Переключиться на UTF-8 версию скрипта FRI Stats (fri_utf8.php)?
      <span style='vertical-align:middle'><INPUT type=radio name=utf8 value=0 " . (!isset($utf) ? "checked" : "") . " onclick=\"submit();\"></span> нет
      <span style='vertical-align:middle'><INPUT type=radio name=utf8 value=1 " . $utf . " onclick=\"submit();\" title=\"анализ медленнее\"></span> да";
		echo "</form>";
		echo "<form style='margin:0px;padding:0px;' method=post action=\"?conf=&submit=5\">Пересчитать статистику на Главной" . ((APPLE == 1) ? ": " : " странице: ");
		echo "<font color=#de3163>с</font> <input title='ниже даты \"до\"' type=text name=s_ret style=\"width: " . ((APPLE == 1) ? "80" : "70") . "px; font-family: Tahoma, 'Lucida Grande'; font-size: 11px;\">";
		echo " &nbsp;<font color=#de3163>до</font> <input type=text name=f_ret style=\"width: " . ((APPLE == 1) ? "80" : "70") . "px; font-family: Tahoma, 'Lucida Grande'; font-size: 11px;\" value='" . dtconv($f_del) . "'> ? ";
		echo "<input style=\"width: " . ((APPLE == 1) ? "40" : "32") . "px;\" type=submit value=\"Да!\"></form>";
		if (file_exists("errors.dat") and filesize("errors.dat") > 2) {
			$errc = "есть!";
			$type = "submit";
		} else {
			$errc = "нет";
			$type = "hidden";
		}
		$offset = 0;
		@include("offset.php");
		$t = time() + 3600 * $offset;
		echo "<form style='margin:0px;padding:0px;' action=\"?conf\">Задать смещение времени? (" . ((APPLE == 1) ? "" : "серверное: ") . date("d", $t) . "." . date("m", $t) . "." . date("Y", $t) . " " . date("H", $t) . ":" . date("i", $t) . ") ";
		echo "<select id=z name=z style=\"font-family: Tahoma, 'Lucida Grande'; font-size: 11px;\" " . ((abs($offset) > 0) ? "" : "disabled") . ">
      <option value=1>+</option>
      <option value=2 " . ((abs($offset) != $offset) ? "selected" : "") . ">-</option>
      </select> ";
		echo "<select id=h name=h style=\"font-family: Tahoma, 'Lucida Grande'; font-size: 11px;\" onChange=\"selh();\">";
		echo "<option value=0 " . ((abs($offset) > 0) ? "" : "selected") . ">нет</option>";
		for ($i = 1; $i < 24; $i++) echo "<option value=$i " . ((abs($offset) == $i) ? "selected" : "") . ">$i</option>";
		echo "</select>";
		echo " <input style=\"width: " . ((APPLE == 1) ? "40" : "32") . "px;\" type=submit value=\"Да!\"></form>";
		echo "<form style='margin:0px;padding:0px;' action=\"?conf\">Есть ли ошибки записи в БД? (файл errors.dat): <b>" . $errc . "</b>";
		if ($type == "submit") {
			echo "<textarea style=\"width:400px;height:70px;\">" . file_get_contents("errors.dat") . "</textarea>";
			echo "<br><input style=\"width: " . ((APPLE == 1) ? "140" : "120") . "px;\" name=erd type=" . $type . " value=\"Очистить errors.dat!\">";
		}
		echo "</form>";
		echo "</td></tr>";
		?>
	<script type="text/javascript">
		function selh() {
			if (document.getElementById("h").value == 0) document.getElementById("z").disabled = true;
			else document.getElementById("z").disabled = false;
		}
	</script>
	<?php

		if ($submit == 1) {
			$fp = fopen("robots.dat", "w");
			$out = "";
			for ($i = 0; $i < count($robots); $i++)
			{
				if (!(($_POST['botstr' . $i] == "") && ($_POST['botnam' . $i] == ""))) $out .= $_POST['botstr' . $i] . "|" . $_POST['botnam' . $i] . "\r\n";
			}
			$out = iconv("UTF-8", "CP1251", $out);
			fwrite($fp, $out);
			fclose($fp);
			if (empty($out)) unlink("robots.dat");
		}

		if ($submit == 2) {
			$fp = fopen("robots.dat", "a");
			$string = $_POST['botstr'] . "|" . $_POST['botnam'] . "\r\n";
			$string = iconv("UTF-8", "CP1251", $string);
			fwrite($fp, $string);
			fclose($fp);
		}

		if ($submit == 8) {
			$fp = fopen("hosts.dat", "w");
			$out = "";
			for ($i = 0; $i < count($hosts); $i++)
			{
				if (!(($_POST['hoststr' . $i] == "") && ($_POST['hostusr' . $i] == ""))) $out .= $_POST['hoststr' . $i] . "|" . $_POST['hostusr' . $i] . "\r\n";
			}
			$out = iconv("UTF-8", "CP1251", $out);
			fwrite($fp, $out);
			fclose($fp);
			if (empty($out)) unlink("hosts.dat");
		}

		if ($submit == 9) {
			$fp = fopen("hosts.dat", "a");
			$string = $_POST['hoststr'] . "|" . $_POST['hostusr'] . "\r\n";
			$string = iconv("UTF-8", "CP1251", $string);
			fwrite($fp, $string);
			fclose($fp);
		}

		if ($submit == 3) {
			$fp = fopen("se.dat", "w");
			$out = "";
			for ($i = 0; $i < count($se_m); $i++)
			{
				if (!(($_POST['sen' . $i] == "") && ($_POST['ser' . $i] == "") && ($_POST['seq' . $i] == ""))) $out .= stripslashes($_POST['sen' . $i]) . "|" . $_POST['ser' . $i] . "|" . $_POST['seq' . $i] . "\r\n";
			}
			$out = iconv("UTF-8", "CP1251", $out);
			fwrite($fp, $out);
			fclose($fp);
			if (empty($out)) unlink("se.dat");
		}

		if ($submit == 11) {
			$fp = fopen("fix.dat", "w");
			$out = "";
			for ($i = 0; $i < count($fx_m); $i++)
			{
				if (!(($_POST['fxrB' . $i] == "") && ($_POST['fxrC' . $i] == ""))) $out .= stripslashes($_POST['fxrA' . $i]) . "|" . $_POST['fxrB' . $i] . "|" . $_POST['fxrC' . $i] . "\r\n";
			}
			$out = iconv("UTF-8", "CP1251", $out);
			fwrite($fp, $out);
			fclose($fp);
			if (empty($out)) unlink("fix.dat");
		}

		if ($submit == 4) {
			$fp = fopen("se.dat", "a");
			$string = $_POST['sen'] . "|" . $_POST['ser'] . "|" . $_POST['seq'] . "\r\n";
			$string = iconv("UTF-8", "CP1251", $string);
			fwrite($fp, $string);
			fclose($fp);
		}

		if ($submit == 10) {
			$fp = fopen("fix.dat", "a");
			if ($_POST['fxr1'] == "refer") {
				$IDN = new idna_convert(array('idn_version' => 2008));
				$_POST['fxr2'] = $IDN->encode($_POST['fxr2']);
			}
			$string = $_POST['fxr1'] . "|" . $_POST['fxr2'] . "|" . $_POST['fxr3'] . "\r\n";
			$string = iconv("UTF-8", "CP1251", $string);
			fwrite($fp, $string);
			fclose($fp);
		}

		if ($submit == 6) {
			$fp = fopen("skip.dat", "w");
			$out = "";
			for ($i = 0; $i < count($skip); $i++)
			{
				if (!($_POST['skpB' . $i] == "")) $out .= stripslashes($_POST['skpA' . $i]) . "|" . $_POST['skpB' . $i] . "\r\n";
			}
			fwrite($fp, $out);
			fclose($fp);
			if (empty($out)) unlink("skip.dat");
		}

		if ($submit == 7) {
			$fp = fopen("skip.dat", "a");
			if (!empty($_POST['skp2'])) {
				if ($_POST['skp1'] == "refer") {
					$IDN = new idna_convert(array('idn_version' => 2008));
					$_POST['skp2'] = $IDN->encode($_POST['skp2']);
				}
				$string = $_POST['skp1'] . "|" . $_POST['skp2'] . "\r\n";
				fwrite($fp, $string);
			}
			if (!empty($_POST['skp3'])) {
				$string = "";
				$sk = explode("\n", $_POST['skp3']);
				if ($_POST['skp1'] == "refer") {
					foreach ($sk as $val) {
						$IDN = new idna_convert(array('idn_version' => 2008));
						$val = $IDN->encode(trim($val));
						$string .= $_POST['skp1'] . "|" . $val . "\r\n";
					}
				} else foreach ($sk as $val) $string .= $_POST['skp1'] . "|" . trim($val) . "\r\n";
				fwrite($fp, $string);
			}
			fclose($fp);
		}

		if ($submit == 5) {
			list($s_ret, $f_ret) = str_replace("+", "", array($s_ret, $f_ret));
			$s_ret = dtconv2(trim($s_ret));
			$f_ret = dtconv2(trim($f_ret));
			$s_ret_dt = mb_substr($s_ret, 4, 2);
			$s_ret_god = mb_substr($s_ret, 0, 4);
			$f_ret_dt = mb_substr($f_ret, 4, 2);
			$f_ret_god = mb_substr($f_ret, 0, 4);
			mysql_query("DELETE FROM mainh WHERE dt >= '$s_ret' AND dt <= '$f_ret'");
			mysql_query("DELETE FROM mainp WHERE dt >= '$s_ret_dt' AND god >= '$s_ret_god' AND dt <= '$f_ret_dt' AND god <= '$f_ret_god'");
			print '<script type="text/javascript">location="./";</script>';
		}

		if ($robots = file("robots.dat")) ; else unset($robots);
		if ($hosts = file("hosts.dat")) ; else unset($hosts);
		if ($se_m = file("se.dat")) ; else unset($se_m);
		if ($skips = file("skip.dat")) ; else unset($skips);
		if ($fixer = file("fix.dat")) ; else unset($fixer);

		echo "<tr class=s2><td><form method=post action=\"?conf=&submit=11\"><b>Список fix-ов:</b><br><br><font color=gray>Поле &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Строка &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Описание</font>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>";
		for ($i = 0; $i < count($fixer); $i++)
		{
			$fixer[$i] = iconv("CP1251", "UTF-8", $fixer[$i]);
			$fxr = explode("|", $fixer[$i]);
			echo "<select name=fxrA$i style=\"font-family: Tahoma, 'Lucida Grande'; font-size: 11px;\">
          <option value=refer " . (($fxr[0] == "refer") ? "selected" : "") . ">Referer</option>
          <option value=ip " . (($fxr[0] == "ip") ? "selected" : "") . ">IP-адрес</option>
          <option value=host " . (($fxr[0] == "host") ? "selected" : "") . ">Хост</option>
          <option value=user " . (($fxr[0] == "user") ? "selected" : "") . ">User-Agent</option>
          <option value=req " . (($fxr[0] == "req") ? "selected" : "") . ">Страница</option>
        </select>
        <input type=text name=fxrB$i value=\"" . $fxr[1] . "\">
        <input type=text name=fxrC$i value=\"" . $fxr[2] . "\"><br>";
		}
		echo "<br><input type=submit value=Перезаписать " . (!file_exists("fix.dat") ? "disabled" : "") . "></form><font color=#de3163>*</font> Для удаления записи надо стереть все его 2 поля данных и \"Перезаписать\".<br><font color=#de3163>*</font> Если описание не задано, то fix не показывается в TOP отчёте \"fix-ы\"</td></tr>";
		echo "<tr class=s2><td><form style='margin:0px;padding:0px;' method=post action=\"?conf=&submit=10\"><b>Добавить fix:</b><br><br>
       <select name=fxr1 style=\"font-family: Tahoma, 'Lucida Grande'; font-size: 11px;\">
          <option value=refer>Referer</option>
          <option value=ip>IP-адрес</option>
          <option value=host>Хост</option>
          <option value=user>User-Agent</option>
          <option value=req selected>Страница</option>
        </select>
       <input type=text name=fxr2 value=''>
       <input type=text name=fxr3 value=''><br><br>
       <input type=submit value=Добавить></form>
       </td></tr>";

		echo "<tr class=s2><td><b>Список определенных robot-ов:</b><br><br><form method=post action=\"?conf=&submit=1\"><font color=gray>Строка из User-Agent &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Описание</font> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>";
		for ($i = 0; $i < count($robots); $i++)
		{
			$robots[$i] = iconv("CP1251", "UTF-8", $robots[$i]);
			$sbd = explode("|", $robots[$i]);
			echo "<input type=text name=botstr$i value=\"" . $sbd[0] . "\">
        <input type=text name=botnam$i value=\"" . $sbd[1] . "\"><br>";
		}
		echo "<br><input type=submit value=Перезаписать " . (!file_exists("robots.dat") ? "disabled" : "") . "></form><font color=#de3163>*</font> Для удаления записи надо стереть все его 2 поля данных и \"Перезаписать\".<br><font color=#de3163>*</font> Если описание не задано, то робот не показывается в TOP отчёте \"Роботы\"</td></tr>";
		echo "<tr class=s2><td><form style='margin:0px;padding:0px;' method=post action=\"?conf=&submit=2\"><b>Добавить robot-а:</b><br><br>
       <input type=text name=botstr value=''>
       <input type=text name=botnam value=''><br><br>
       <input type=submit value=Добавить></form>
       </td></tr>";

		echo "<tr class=s2><td><b>Список определенных robot-ов по Хосту:</b><br><br><form method=post action=\"?conf=&submit=8\"><font color=gray>Строка из Хоста &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Описание</font> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>";
		for ($i = 0; $i < count($hosts); $i++)
		{
			$hosts[$i] = iconv("CP1251", "UTF-8", $hosts[$i]);
			$sbd = explode("|", $hosts[$i]);
			echo "<input type=text name=hoststr$i value=\"" . $sbd[0] . "\">
        <input type=text name=hostusr$i value=\"" . $sbd[1] . "\"><br>";
		}
		echo "<br><input type=submit value=Перезаписать " . (!file_exists("hosts.dat") ? "disabled" : "") . "></form><font color=#de3163>*</font> Для удаления записи надо стереть все его 2 поля данных и \"Перезаписать\".<br><font color=#de3163>*</font> Если описание не задано, то робот не показывается в TOP отчёте \"Роботы\"</td></tr>";
		echo "<tr class=s2><td><form style='margin:0px;padding:0px;' method=post action=\"?conf=&submit=9\"><b>Добавить robot-а:</b><br><br>
       <input type=text name=hoststr value=''>
       <input type=text name=hostusr value=''><br><br>
       <input type=submit value=Добавить></form>
       </td></tr>";

		echo "<tr class=s2><td><form method=post action=\"?conf=&submit=3\"><b>Список определенных поисковых систем:</b><br><br>&nbsp;&nbsp;<font color=gray>Описание &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Домен &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Ключ</font>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>";
		for ($i = 0; $i < count($se_m); $i++)
		{
			$se_m[$i] = iconv("CP1251", "UTF-8", $se_m[$i]);
			$sbd = explode("|", $se_m[$i]);
			echo "<input type=text name=sen$i value=\"" . $sbd[0] . "\">
        <input type=text name=ser$i value=\"" . $sbd[1] . "\">
        <input type=text name=seq$i value=\"" . $sbd[2] . "\"><br>";
		}
		echo "<br><input type=submit value=Перезаписать " . (!file_exists("se.dat") ? "disabled" : "") . "></form><font color=#de3163>*</font> Для удаления записи надо стереть все его 3 поля данных и \"Перезаписать\".</td></tr>";
		echo "<tr class=s2><td><form style='margin:0px;padding:0px;' method=post action=\"?conf=&submit=4\"><b>Добавить поисковик:</b><br><br>
       <input type=text name=sen value=''>
       <input type=text name=ser value=''>
       <input type=text name=seq value=''><br><br>
       <input type=submit value=Добавить></form>
       </td></tr>";

		echo "<tr class=s2><td><form method=post action=\"?conf=&submit=6\"><b>Игнорировать по:</b><br><br><font color=gray>Поле &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Строка &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</font><br>";
		for ($i = 0; $i < count($skips); $i++)
		{
			$skp = explode("|", $skips[$i]);
			echo "<select name=skpA$i style=\"font-family: Tahoma, 'Lucida Grande'; font-size: 11px;\">
          <option value=refer " . (($skp[0] == "refer") ? "selected" : "") . ">Referer</option>
          <option value=ip " . (($skp[0] == "ip") ? "selected" : "") . ">IP-адрес</option>
          <option value=host " . (($skp[0] == "host") ? "selected" : "") . ">Хост</option>
          <option value=user " . (($skp[0] == "user") ? "selected" : "") . ">User-Agent</option>
          <option value=req " . (($skp[0] == "req") ? "selected" : "") . ">Страница</option>
        </select>
        <input type=text name=skpB$i value=\"" . $skp[1] . "\"><br>";
		}
		echo "<br><input type=submit value=Перезаписать " . (!file_exists("skip.dat") ? "disabled" : "") . "></form><font color=#de3163>*</font> Для удаления записи надо её просто стереть и \"Перезаписать\".</td></tr>";

		echo "<tr class=s2><td><form style='margin:0px;padding:0px;' method=post action=\"?conf=&submit=7\"><b>Добавить в игнор. по:</b><br><br>
       <select name=skp1 style=\"font-family: Tahoma, 'Lucida Grande'; font-size: 11px;\">
          <option value=refer selected>Referer</option>
          <option value=ip>IP-адрес</option>
          <option value=host>Хост</option>
          <option value=user>User-Agent</option>
          <option value=req>Страница</option>
        </select>
       <input type=text name=skp2 value=''><br> или сразу список: <br>
       <textarea name=skp3 style=\"width:400px;height:70px;\"></textarea><br><br>
       <input type=submit value=Добавить><br><br>
       </form><font color=#de3163>*</font> Список - каждая новая запись с новой строки<br>(записи для выбранного поля).
       </td></tr>";
		echo "<tr class=h><td></td></tr></table>";
	}


	$qs = $_GET['qs'];
	$brw = $_GET['brw'];
	$item = $_GET['item'];
	$s_date = $_GET['s_date'];
	$f_date = $_GET['f_date'];
	$sort = $_GET['sort'];
	$engin = $_GET['engin'];
	$pz = $_GET['pz'];
	$tz = $_GET['tz'];
	$dr = $_GET['dr'];

	if (isset($qs)) {
		hdr();
		if ($_COOKIE['alogin'] <> $login or $_COOKIE['apass'] <> $pass) accdeny();
		if ($tz == "on") $tz = 1;
		if ($dr == 1) echo "<table id=table align=center width=100% cellpadding=5 cellspacing=1 border=0><tr class=h><td>Страница</td><td width=80>Дата</td><td width=35>Время</td><td width=90>IP-адрес</td><td>Хост</td><td>User-Agent</td></tr>";
		else echo "<table id=table align=center width=100% cellpadding=5 cellspacing=1 border=0><tr class=h><td width=80>Дата</td><td width=35>Время</td><td>Referer</td><td width=90>IP-адрес</td><td>Хост</td><td>User-Agent</td><td>Страница</td></tr>";
		$cc = 0;
		$s = "s2";
		$s_date = trim($s_date);
		$f_date = trim($f_date);
		list($s_date, $f_date) = str_replace("+", "", array($s_date, $f_date));
		if (empty($s_date)) $s_date = mysql_result(mysql_query("SELECT dt FROM surf ORDER BY 1 ASC LIMIT 1"), 0); else $s_date = dtconv2($s_date);
		if (empty($f_date)) $f_date = mysql_result(mysql_query("SELECT dt FROM surf ORDER BY 1 DESC LIMIT 1"), 0); else $f_date = dtconv2($f_date);
		if ($item == "refer") {
			$IDN = new idna_convert(array('idn_version' => 2008));
			$qs = $IDN->encode($qs);
		}

		if ($tz == 3) {
			$res = mysql_query("SELECT day,dt,tm,refer,ip,proxy,host,lang,user,req FROM surf WHERE refer REGEXP '(:\/\/)*(www.)*(" . str_replace(".", "[.]", $qs) . ")' AND dt >= '$s_date' AND dt <= '$f_date' " . (($pz == 1) ? "AND" . $zp : "") . " " . (($sort == "ho") ? "GROUP BY ip,refer" : "") . " ORDER BY i DESC");
		} else
			if ($tz == 2) {
				$z = "CREATE TEMPORARY TABLE tmp_surf SELECT day,dt,tm,refer,ip,proxy,host,lang,user,req FROM surf WHERE dt >= '$s_date' AND dt <= '$f_date' " . (($pz == 1) ? "AND" . $zp : "") . " GROUP BY ip";
				$z2 = "SELECT day,dt,tm,refer,ip,proxy,host,lang,user,req FROM tmp_surf WHERE req LIKE '" . $qs . "' ORDER BY 2 DESC";
				$res = mysql_query($z);
				$res = mysql_query($z2);
			} else if ($tz == 6) {
				if (isset($engin)) {
					switch ($engin) {
						case "Y":
							$e = "LOWER(refer) LIKE '%yand%'";
							break;
						case "R":
							$e = "LOWER(refer) LIKE '%rambler.%'";
							break;
						case "G":
							$e = "LOWER(refer) LIKE '%google.%'";
							break;
						case "M":
							$e = "LOWER(refer) LIKE '%go.mail.ru%'";
							break;
						case "H":
							$e = "LOWER(refer) LIKE '%search.yahoo%'";
							break;
						case "S":
							$e = "(LOWER(refer) LIKE '%search.msn%' OR LOWER(refer) LIKE '%bing%' OR LOWER(refer) LIKE '%search.live.com%')";
							break;
						case "?":
							$e = "(LOWER(refer) LIKE '%?q=%' OR LOWER(refer) LIKE '%&q=%' OR LOWER(refer) LIKE '%query=%')";
							break;
						default :
							foreach ($se_nn as $key => $val) if (mb_stristr(strip_tags($key), strip_tags($engin))) {
								$e = "LOWER(refer) LIKE '%$val%'";
								break;
							}
							break;
					}
				} else $e = "(LOWER(refer) LIKE '%yand%' OR LOWER(refer) LIKE '%google.%' OR LOWER(refer) LIKE '%go.mail.ru%' OR LOWER(refer) LIKE '%rambler.%' OR LOWER(refer) LIKE '%search.yahoo%' OR LOWER(refer) LIKE '%search.msn%' OR LOWER(refer) LIKE '%bing%' OR LOWER(refer) LIKE '%search.live.com%' OR LOWER(refer) LIKE '%?q=%' OR LOWER(refer) LIKE '%&q=%' OR LOWER(refer) LIKE '%query=%'" . $cse_m . ")";
				$z = "SELECT day,dt,tm,refer,ip,proxy,host,lang,user,req FROM surf WHERE dt >= '$s_date' AND dt <= '$f_date' AND $e AND LOWER(refer) NOT LIKE '%@%' " . (($pz == 1) ? "AND" . $zp : "") . " " . (($sort == "ho") ? "GROUP BY ip,refer" : "") . " ORDER BY i DESC";
				$res = mysql_query($z);
			} else if ($tz == 5) {
				$z = "SELECT surf.day,surf.dt,surf.tm,surf.refer,surf.ip,surf.proxy,surf.host,surf.lang,surf.user,surf.req rq FROM surf,(SELECT day,dt,tm,refer,ip,proxy,host,lang,user,req,max(i) mx FROM surf WHERE dt >= '$s_date' AND dt <= '$f_date' " . (($pz == 1) ? "AND" . $zp : "") . " GROUP BY ip) t WHERE surf.i = t.mx AND surf.req LIKE '" . $qs . "' ORDER BY 2 DESC";
				$res = mysql_query($z);
			} else if ($tz == 4) $res = mysql_query("SELECT day,dt,tm,refer,ip,proxy,host,lang,user,req FROM surf WHERE dt >= '$s_date' AND dt <= '$f_date' " . GetBrw($qs) . (($pz == 1) ? " AND" . $zp : "") . " " . (($sort == "ho") ? "GROUP BY ip" : "") . " ORDER BY i DESC");
			else {
				if ($pz != 1 and $item == "refer") $res = mysql_query("SELECT day,dt,tm,refer,ip,proxy,host,lang,user,req FROM surf WHERE dt >= '$s_date' AND dt <= '$f_date' AND refer <> '' ORDER BY i DESC");
				else if ($item == "robot") {
					$zs = "";
					$pf = "";
					if (isset($rbdn[$qs])) foreach ($rbdn[$qs] as $vl) {
						$zs .= $pf . "LOWER(user) LIKE '%" . mb_strtolower($vl) . "%'";
						$pf = " OR ";
					}
					if (isset($hbdn[$qs])) foreach ($hbdn[$qs] as $vl) {
						$zs .= $pf . "LOWER(host) LIKE '%" . mb_strtolower($vl) . "%'";
						$pf = " OR ";
					}
					$res = mysql_query("SELECT day,dt,tm,refer,ip,proxy,host,lang,user,req FROM surf WHERE (" . $zs . ") AND " . $zp2 . " dt >= '$s_date' AND dt <= '$f_date' ORDER BY i DESC");
				} else if ($item == "fix") {
					$zs = "";
					$pf = "";
					if (isset($fxn[$qs])) foreach ($fxn[$qs] as $vl) {
						list($s1, $s2) = explode("|", $vl);
						$zs .= $pf . "LOWER(" . $s1 . ") LIKE '%" . mb_strtolower($s2) . "%'";
						$pf = " OR ";
					}
					$res = mysql_query("SELECT day,dt,tm,refer,ip,proxy,host,lang,user,req FROM surf WHERE (" . $zs . ") AND dt >= '$s_date' AND dt <= '$f_date' AND " . $zp . " " . (($sort == "ho") ? "GROUP BY ip" : "") . " ORDER BY i DESC");
				}
				else $res = mysql_query("SELECT day,dt,tm,refer,ip,proxy,host,lang,user,req FROM surf WHERE (" . $item . " LIKE '" . (($tz == 1) ? "" : "%") . $qs . (($tz == 1 or $tz == 7) ? "" : "%") . "') AND dt >= '$s_date' AND dt <= '$f_date' " . (($pz == 1) ? "AND" . $zp : "") . " " . (($sort == "ho") ? "GROUP BY " . (($tz == 7) ? "host" : "ip") : "") . " ORDER BY i DESC");
			}

		if ($dr == 1) {
			while ($r = mysql_fetch_row($res)) {
				$nff = 0;
				for ($i = 0; $i < count($row[$r[9]]); $i++) {
					if ($r[4] != $row[$r[9]][$i][3] or $r[6] != $row[$r[9]][$i][5] or $r[8] != $row[$r[9]][$i][7]) $nff++;
				}
				if ($nff == count($row[$r[9]])) $row[$r[9]][] = array($r[0], $r[1], $r[2], $r[4], $r[5], $r[6], $r[7], $r[8]);
			}
			foreach ($row as $req => $val)
			{
				if ($s == "s2") {
					$s = "s1";
					echo "<tr class=s1>";
				} else {
					$s = "s2";
					echo "<tr class=s2>";
				}

				echo "<td rowspan=" . count($val) . " align=left style='overflow: hidden;text-overflow: ellipsis;' nowrap><a target=_blank href=" . $req . ">" . $req . "</a></td>";
				$skip = 0;
				foreach ($val as $k => $rw)
				{
					if ($skip <> 0) echo "<tr class=" . $s . ">";
					$skip = 1;

					echo "<td nowrap title=" . $month[mb_substr($rw[1], 4, 2)] . ">" . $dday[$rw[0]] . dtconv($rw[1]) . "</td>";
					echo "<td>" . $rw[2] . "</td>";

					if ($rw[3] != "unknown") echo "<td><a target=_blank href=\"?item=ip&qs=" . $rw[3] . "\">" . $rw[3] . "</a>"; else echo "<td><font color=grey>неизвестно</font>";
					if ($rw[4] != "") echo "<br><a target=_blank href=\"?item=ip&qs=" . $rw[4] . "\">через proxy</a>";
					echo "</td>";

					if ($rw[5] == "") echo "<td><font color=grey>неизвестно</font>"; else echo "<td><a target=_blank href=\"http://www.tcpiputils.com/browse/ip-address/" . (($rw[4] != "") ? $rw[4] : $rw[3]) . "\">" . $rw[5] . "</a>";
					if ($rw[6] != "") {
						echo "<br>Язык: " . (!empty($lang[mb_strtoupper($rw[6])]) ? $lang[mb_strtoupper($rw[6])] : "<font color=grey>неизвестно</font>");
						if (file_exists("flags/" . mb_strtolower($lang[mb_strtoupper($rw[6])]) . ".gif")) echo " <img align=absmiddle src=flags/" . mb_strtolower($lang[mb_strtoupper($rw[6])]) . ".gif width=16 height=12>";
					}
					echo "</td>";

					echo "<td align=left style='overflow: hidden;text-overflow: ellipsis;'>";
					if (!is_robot($rw[7], $rw[5])) {
						$brw = GetBrowser($rw[7]);
						if ($brw != "") echo "<img src=browsers/$brw width=16 height=16 align=absmiddle> ";
					}
					echo $rw[7] . "</td></tr>";
				}
			}
			echo "<tr class=h><td></td><td></td><td></td><td></td><td></td><td></td></tr></table>";
			norm(0);
		} else {
			if (strip_tags($qs) == "неизвестно") $qs = "";
			while ($row = mysql_fetch_row($res))
			{
				if ($tz == 3 and $sort != "hi") {
					preg_match("/(?:[^:]+)*(?::\/\/)*(?:www.)*([^\/]+)/iu", $row[3], $m);
					if (mb_stristr($m[1], ":")) continue;
					if ($ot[$m[1]][$row[4]] != 1) $ot[$m[1]][$row[4]] = 1; else continue;
				}
				$refer = Ref($row[3]);

				if ($pz != 1 and $item == "refer") {
					$nf = 0;
					if (($tz == 1 and $row[3] != $qs) or ($tz != 1 and !mb_stristr($row[3], $qs))) $nf++;
					if (is_array($refer)) {
						list($engine, $query) = $refer;
						if (($tz != 1 and !mb_stristr($query, $qs)) or ($tz == 1 and $query != $qs)) $nf++;
						if ($nf == 2) continue;
					} else if ($nf == 1) continue;
				}

				if ($tz == 6) if (!is_array($refer)) continue; else
				{
					list($engine, $query) = $refer;
					if (isset($engin) and $engin != strip_tags($engine)) continue;
					if ($tz == 6 and mb_strtolower($query) != htmlspecialchars_decode($qs) and $qs != "allzz") continue;
				}

				$cc++;
				if ($s == "s2") {
					$s = "s1";
					echo "<tr class=s1>";
				} else {
					$s = "s2";
					echo "<tr class=s2>";
				}
				echo "<td nowrap title=" . $month[mb_substr($row[1], 4, 2)] . ">" . $dday[$row[0]] . dtconv($row[1]) . "</td>";
				echo "<td>" . $row[2] . "</td>";

				echo "<td align=left style='overflow: hidden;text-overflow: ellipsis;'>";
				if (is_array($refer)) {
					list($engine, $query) = $refer;
					if ($engine == "G" and !empty($query) and mb_stristr($row[3], "/url?")) $row[3] = str_replace("/url?", "/search?", $row[3]);
					echo_se($engine);
					if (empty($query)) $query = "<font color=grey>неизвестно</font>";
					echo ": <a target=_blank href=\"" . $row[3] . "\">" . $query . "</a></td>";
				} else if (empty($refer)) echo "<font color=grey>неизвестно</font>"; else {
					echo "<a target=_blank href=\"" . $row[3] . "\">";
					if (mb_stristr(urldecode($row[3]), "xn--")) {
						$IDN = new idna_convert(array('idn_version' => 2008));
						echo $IDN->decode(urldecode($row[3]));
					} else echo urldecode($row[3]);
					echo "</a></td>";
				}

				if ($row[4] != "unknown") echo "<td><a target=_blank href=\"?item=ip&qs=" . $row[4] . "\">" . $row[4] . "</a>"; else echo "<td><font color=grey>неизвестно</font>";
				if ($row[5] != "") echo "<br><a target=_blank href=\"?item=ip&qs=" . $row[5] . "\">через proxy</a>";
				echo "</td>";

				if (empty($row[6])) echo "<td><font color=grey>неизвестно</font>"; else echo "<td nowrap><a target=_blank href=\"http://www.tcpiputils.com/browse/ip-address/" . (($row[5] != "") ? $row[5] : $row[4]) . "\">" . $row[6] . "</a>";
				if ($row[7] != "") echo "<br>Язык: " . (!empty($lang[mb_strtoupper($row[7])]) ? $lang[mb_strtoupper($row[7])] : "<font color=grey>неизвестно</font>");
				if (file_exists("flags/" . mb_strtolower($lang[mb_strtoupper($row[7])]) . ".gif")) echo " <img align=absmiddle src=flags/" . mb_strtolower($lang[mb_strtoupper($row[7])]) . ".gif width=16 height=12>";
				echo "</td>";

				echo "<td align=left style='overflow: hidden;text-overflow: ellipsis;'>";
				if (!is_robot($row[8], $row[6])) {
					$brw = GetBrowser($row[8]);
					if ($brw != "") echo "<img src=browsers/$brw width=16 height=16 align=absmiddle> ";
				}
				echo $row[8] . "</td>";
				echo "<td align=left style='overflow: hidden;text-overflow: ellipsis;'><a target=_blank href=" . $row[9] . ">" . $row[9] . "</a></td>";
				echo "</tr>";
			}
			echo "<tr class=h><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr></table><br><div align=center style=\"font-family: Tahoma, 'Lucida Grande'; font-size: 11px;\"><b>Всего " . (($sort == "ho") ? "хостов" : "хитов") . "</b>: $cc</div>";
			norm(0);
		}
	}


	$top = $_GET['top'];
	$pos = $_GET['pos'];
	$engin = $_GET['engin'];
	$dy = $_GET['dy'];
	$domen = $_GET['domen'];
	$brw = $_GET['brw'];
	$str_f = $_GET['str_f'];
	$s_date = $_GET['s_date'];
	$f_date = $_GET['f_date'];
	$sort = $_GET['sort'];
	$qq = $_GET['qq'];

	if (isset($top)) {
		hdr();
		if ($_COOKIE['alogin'] <> $login or $_COOKIE['apass'] <> $pass) accdeny();

		$vse = 0;
		$k = 0;
		if (empty($pos)) $pos = 99999;
		$s = "s2";
		list($s_date, $f_date) = str_replace("+", "", array($s_date, $f_date));
		$s_date = dtconv2(trim($s_date));
		$f_date = dtconv2(trim($f_date));
		timefilter();
		switch ($top)
		{
			case 2:
				if ($sort == "hi") {
					$z = "SELECT req, COUNT(req) cnt FROM surf WHERE";
					if (!empty($str_f)) $z .= " req LIKE '%$str_f%' AND";
					$z .= $zp . " AND dt >= '$s_date' AND dt <= '$f_date' GROUP BY req ORDER BY 2 DESC";
					$res = mysql_query($z);

					$z2 = "SELECT SUM(t.cnt) FROM (" . $z . ") t";
					$r = mysql_query($z2);
				} else {
					$z = "CREATE TEMPORARY TABLE tmp_surf SELECT ip, req FROM surf WHERE";
					if (!empty($str_f)) $z .= " req LIKE '%$str_f%' AND";
					$z .= $zp . " AND dt >= '$s_date' AND dt <= '$f_date' GROUP BY ip, req";
					$z2 = "SELECT req, COUNT(req) cnt FROM tmp_surf GROUP BY req ORDER BY 2 DESC";
					$res = mysql_query($z);
					$res = mysql_query($z2);

					$z3 = "SELECT SUM(t.cnt) FROM (" . $z2 . ") t";
					$r = mysql_query($z);
					$r = mysql_query($z3);
				}
				$cnt = mysql_result($r, 0);

				echo "<table id=table align=center width=750 cellpadding=5 cellspacing=1 border=0><tr class=h><td width=50>№</td><td width=500>Посещаемая страница</td><td width=50>" . (($sort == "hi") ? "Хиты" : "Хосты") . "</td><td width=100>График</td><td width=50>%</td><td width=50>Детали</td></tr>";
				while ($row = mysql_fetch_row($res))
				{
					if ($k == 0) $max = $row[1];
					if ($row[0] == "") $row[0] = "<font color=grey>неизвестно</font>";
					if ($k == $pos) break;
					$k++;
					$vse += $row[1];
					if ($s == "s2") {
						$s = "s1";
						echo "<tr class=s1>";
					} else {
						$s = "s2";
						echo "<tr class=s2>";
					}
					echo "<td>$k</td>";
					echo "<td align=left style='overflow: hidden;text-overflow: ellipsis;'><a target=_blank href=\"" . $row[0] . "\">" . $row[0] . "</a></td>";
					echo "<td>" . $row[1] . "</td>";
					echo "<td><img align=left src=px" . (($sort == "hi") ? "h" : "u") . ".gif width=" . ceil(($row[1] * 100) / $max) . " height=11 border=0></td>";
					echo "<td>" . (number_format((($row[1] * 100) / $cnt), 1, ',', '')) . "</td>";
					echo "<td><a class=d target=_blank href=\"?pz=1&tz=1&item=req&s_date=" . dtconv($s_date) . "&f_date=" . dtconv($f_date) . "&qs=" . urlencode($row[0]) . "&sort=" . (empty($sort) ? "ho" : $sort) . "\">&gt;&gt;&gt;</a></td></tr>";
				}
				echo "<tr class=h><td></td><td align=left><b>Всего:</b></td><td><b>$vse</b></td><td align=left>из $cnt</td><td></td><td></td></tr></table>";
				norm(750);
				break;

			case 3:
				if ($sort == "hi") {
					$z = "SELECT refer,req FROM surf WHERE dt >= '$s_date' AND dt <= '$f_date' AND refer <> '' AND LOWER(refer) NOT LIKE '%://" . $site . "%' AND LOWER(refer) NOT LIKE '%://www." . $site . "%' AND LOWER(refer) NOT LIKE '" . $site . "%' AND (LOWER(refer) NOT LIKE '%yand%' AND LOWER(refer) NOT LIKE '%google.%' AND LOWER(refer) NOT LIKE '%go.mail.ru%' AND LOWER(refer) NOT LIKE '%rambler.%' AND LOWER(refer) NOT LIKE '%search.yahoo%' AND LOWER(refer) NOT LIKE '%search.msn%' AND LOWER(refer) NOT LIKE '%bing%' AND LOWER(refer) NOT LIKE '%search.live.com%' AND LOWER(refer) NOT LIKE '%&q=%' AND LOWER(refer) NOT LIKE '%?q=%' AND LOWER(refer) NOT LIKE '%query=%'" . $cot_m . ")";
					if (!empty($str_f)) $z .= " AND refer LIKE '%$str_f%'";
					$z .= " AND" . $zp;
					$res = mysql_query($z);
				} else {
					$z = "SELECT refer,req,ip FROM surf WHERE dt >= '$s_date' AND dt <= '$f_date' AND refer <> '' AND LOWER(refer) NOT LIKE '%://" . $site . "%' AND LOWER(refer) NOT LIKE '%://www." . $site . "%' AND LOWER(refer) NOT LIKE '" . $site . "%' AND (LOWER(refer) NOT LIKE '%yand%' AND LOWER(refer) NOT LIKE '%google.%' AND LOWER(refer) NOT LIKE '%go.mail.ru%' AND LOWER(refer) NOT LIKE '%rambler.%' AND LOWER(refer) NOT LIKE '%search.yahoo%' AND LOWER(refer) NOT LIKE '%search.msn%' AND LOWER(refer) NOT LIKE '%bing%' AND LOWER(refer) NOT LIKE '%search.live.com%' AND LOWER(refer) NOT LIKE '%&q=%' AND LOWER(refer) NOT LIKE '%?q=%' AND LOWER(refer) NOT LIKE '%query=%'" . $cot_m . ")";
					if (!empty($str_f)) $z .= " AND refer LIKE '%$str_f%'";
					$z .= " AND" . $zp . " GROUP BY ip,refer";
					$res = mysql_query($z);
				}
				while ($row = mysql_fetch_row($res))
				{
					$othmas[] = $row[0];
					if ($pages == 1) $pmas[$row[0]][] = $row[1];
				}
				if (!isset($othmas)) {
					echo "<center>Нет данных</center>";
					break;
				}
				$newmas = array_count_values($othmas);
				arsort($newmas);
				$mmx = max($newmas);
				$cnt = array_sum($newmas);
				if ($pages == 1) foreach ($pmas as $key => $value) {
					$pmas[$key] = array_count_values($pmas[$key]);
					arsort($pmas[$key]);
				}
				echo "<table id=table align=center width=" . (($pages <> 1) ? "750" : "950") . " cellpadding=5 cellspacing=1 border=0><tr class=h><td width=40>№</td><td" . (($pages <> 1) ? "" : " width=50%") . ">Переход с другого сайта" . (($pages <> 1) ? " <a class=e href=\"?" . str_replace(mb_stristr($_SERVER['QUERY_STRING'], '&pages'), "", $_SERVER['QUERY_STRING']) . "&pages=1\">+</a>" : "") . "</td>" . (($pages <> 1) ? "" : "<td width=50%>Страницы <a class=e href=\"?" . str_replace(mb_stristr($_SERVER['QUERY_STRING'], '&pages'), "", $_SERVER['QUERY_STRING']) . "&pages=0\">&ndash;</a></td>") . "<td width=50>" . (($sort == "hi") ? "Хиты" : "Хосты") . "</td><td width=100>График</td><td width=50>%</td><td width=50>Детали</td></tr>";
				while (list($other, $val) = each($newmas))
				{
					if ($k == $pos) break;
					$k++;
					$vse += $val;
					if ($s == "s2") {
						$s = "s1";
						echo "<tr class=s1>";
					} else {
						$s = "s2";
						echo "<tr class=s2>";
					}
					echo "<td>$k</td>";
					echo "<td align=left style='overflow: hidden;text-overflow: ellipsis;'><a target=_blank href=\"$other\">";
					if (mb_stristr($other, "xn--")) {
						$IDN = new idna_convert(array('idn_version' => 2008));
						echo $IDN->decode($other);
					} else echo $other;
					echo "</a></td>";
					if ($pages == 1) {
						echo "<td align=left style='overflow: hidden;text-overflow: ellipsis;'>";
						foreach ($pmas[$other] as $ks => $v) echo "<a href=\"" . $ks . "\" target=_blank>" . $ks . "</a><br>";
						echo "</td>";
					}
					echo "<td>$val</td>";
					echo "<td><img align=left src=px" . (($sort == "hi") ? "h" : "u") . ".gif width=" . ceil(($val * 100) / $mmx) . " height=11 border=0></td>";
					echo "<td>" . (number_format((($val * 100) / $cnt), 1, ',', '')) . "</td>";
					echo "<td><a class=d target=_blank href=\"?tz=1&pz=1&item=refer&s_date=" . dtconv($s_date) . "&f_date=" . dtconv($f_date) . "&qs=" . urlencode($other) . "&sort=" . (empty($sort) ? "ho" : $sort) . "\">&gt;&gt;&gt;</a></td></tr>";
				}
				echo "<tr class=h><td></td><td align=left><b>Всего:</b></td>" . (($pages <> 1) ? "" : "<td></td>") . "<td><b>$vse</b></td><td align=left>из $cnt</td><td></td><td></td></tr></table>";
				if ($pages <> 1) norm(750); else norm(950);
				break;

			case 1:
			case 4:
				if (isset($engin) or $top == 1) {
					if (isset($engin)) {
						switch ($engin) {
							case "Y":
								$e = "LOWER(refer) LIKE '%yand%'";
								break;
							case "R":
								$e = "LOWER(refer) LIKE '%rambler.%'";
								break;
							case "G":
								$e = "LOWER(refer) LIKE '%google.%'";
								break;
							case "M":
								$e = "LOWER(refer) LIKE '%go.mail.ru%'";
								break;
							case "H":
								$e = "LOWER(refer) LIKE '%search.yahoo%'";
								break;
							case "S":
								$e = "LOWER(refer) LIKE '%search.msn%' OR LOWER(refer) LIKE '%bing%' OR LOWER(refer) LIKE '%search.live.com%'";
								break;
							case "?":
								$e = "LOWER(refer) LIKE '%?q=%' OR LOWER(refer) LIKE '%&q=%' OR LOWER(refer) LIKE '%query=%'";
								break;
							default :
								foreach ($se_nn as $key => $val) if (mb_stristr(strip_tags($key), strip_tags($engin))) {
									$e = "LOWER(refer) LIKE '%$val%'";
									break;
								}
								break;
						}
					} else $e = "LOWER(refer) LIKE '%yand%' OR LOWER(refer) LIKE '%google.%' OR LOWER(refer) LIKE '%go.mail.ru%' OR LOWER(refer) LIKE '%rambler.%' OR LOWER(refer) LIKE '%search.yahoo%' OR LOWER(refer) LIKE '%search.msn%' OR LOWER(refer) LIKE '%bing%' OR LOWER(refer) LIKE '%search.live.com%' OR LOWER(refer) LIKE '%?q=%' OR LOWER(refer) LIKE '%&q=%' OR LOWER(refer) LIKE '%query=%'" . $cse_m;
					if ($sort == "hi") {
						$res = mysql_query("SELECT refer,req FROM surf WHERE dt >= '$s_date' AND dt <= '$f_date' AND ($e) AND LOWER(refer) NOT LIKE '%@%' AND" . $zp);
					} else {
						$res = mysql_query("SELECT refer,req,ip FROM surf WHERE dt >= '$s_date' AND dt <= '$f_date' AND ($e) AND LOWER(refer) NOT LIKE '%@%' AND" . $zp . " GROUP BY ip,refer");
					}
					while ($row = mysql_fetch_row($res))
					{
						$refer = Ref($row[0]);
						if (is_array($refer)) {
							list($engine, $query) = $refer;
							if ((strip_tags($engine) == $engin and $top == 4) or ($top == 1))
								if (!empty($str_f)) {
									if (mb_stristr($query, urldecode($str_f))) {
										if (empty($query)) $query = "<font color=grey>неизвестно</font>";
										$qmas[] = mb_strtolower($query, 'UTF-8');
										if ($pages == 1) $pmas[mb_strtolower($query, 'UTF-8')][] = $row[1];
									}
								}
								else {
									if (empty($query)) $query = "<font color=grey>неизвестно</font>";
									$qmas[] = mb_strtolower($query, 'UTF-8');
									if ($pages == 1) $pmas[mb_strtolower($query, 'UTF-8')][] = $row[1];
								}
						}
					}
					if (!isset($qmas)) {
						echo "<center>Нет данных</center>";
						break;
					}
					$newmas = array_count_values($qmas);
					arsort($newmas);
					$mmx = max($newmas);
					$cnt = array_sum($newmas);
					if ($pages == 1) foreach ($pmas as $key => $value) {
						$pmas[$key] = array_count_values($pmas[$key]);
						arsort($pmas[$key]);
					}
					echo "<table id=table align=center width=750 cellpadding=5 cellspacing=1 border=0><tr class=h><td width=40>№</td><td" . (($pages <> 1) ? " width=500" : " width=50%") . ">Поисковый запрос";
					if ($top == 4) {
						echo "&nbsp;<span style='background-color:#dcdcdc;'>&nbsp;&nbsp;";
						echo_se($engin);
						echo "&nbsp;&nbsp;</span>";
					}
					echo (($pages <> 1) ? " <a class=e href=\"?" . str_replace(mb_stristr($_SERVER['QUERY_STRING'], '&pages'), "", $_SERVER['QUERY_STRING']) . "&pages=1\">+</a>" : "") . "</td>" . (($pages <> 1) ? "" : "<td width=50%>Страницы <a class=e href=\"?" . str_replace(mb_stristr($_SERVER['QUERY_STRING'], '&pages'), "", $_SERVER['QUERY_STRING']) . "&pages=0\">&ndash;</a></td>") . "<td width=50>" . (($sort == "hi") ? "Хиты" : "Хосты") . "</td><td width=100>График</td><td width=50>%</td></tr>";
					while (list($query, $val) = each($newmas))
					{
						if ($k == $pos) break;
						$k++;
						$vse += $val;
						if ($s == "s2") {
							$s = "s1";
							echo "<tr class=s1>";
						} else {
							$s = "s2";
							echo "<tr class=s2>";
						}
						echo "<td>$k</td>";
						echo "<td align=left style='overflow: hidden;text-overflow: ellipsis;'><a target=_blank href=\"?tz=6" . (isset($engin) ? "&engin=" . $engin : "") . "&pz=1&s_date=" . dtconv($s_date) . "&f_date=" . dtconv($f_date) . "&qs=" . htmlspecialchars($query) . "&sort=" . (empty($sort) ? "ho" : $sort) . "\">" . $query . "</a></td>";
						if ($pages == 1) {
							echo "<td align=left style='overflow: hidden;text-overflow: ellipsis;'>";
							foreach ($pmas[$query] as $ks => $v) echo "<div><a href=" . $ks . " target=_blank>" . $ks . "</a></div>";
							echo "</td>";
						}
						echo "<td>$val</td>";
						echo "<td><img align=left src=px" . (($sort == "hi") ? "h" : "u") . ".gif width=" . ceil(($val * 100) / $mmx) . " height=11 border=0></td>";
						echo "<td>" . (number_format((($val * 100) / $cnt), 1, ',', '')) . "</td></tr>";
					}
					echo "<tr class=h><td></td><td align=left><b>Всего:</b></td>" . (($pages <> 1) ? "" : "<td></td>") . "<td><b>$vse</b></td><td align=left>из $cnt</td><td></td></tr></table>";
					norm(750);
					break;
				}
				if ($sort == "hi") {
					$res = mysql_query("SELECT refer FROM surf WHERE dt >= '$s_date' AND dt <= '$f_date' AND (LOWER(refer) LIKE '%yand%' OR LOWER(refer) LIKE '%google.%' OR LOWER(refer) LIKE '%go.mail.ru%' OR LOWER(refer) LIKE '%rambler.%' OR LOWER(refer) LIKE '%search.yahoo%' OR LOWER(refer) LIKE '%search.msn%' OR LOWER(refer) LIKE '%bing%' OR LOWER(refer) LIKE '%search.live.com%' OR LOWER(refer) LIKE '%?q=%' OR LOWER(refer) LIKE '%&q=%' OR LOWER(refer) LIKE '%query=%'" . $cse_m . ") AND LOWER(refer) NOT LIKE '%@%' AND" . $zp);
				} else {
					$res = mysql_query("SELECT refer,ip FROM surf WHERE dt >= '$s_date' AND dt <= '$f_date' AND (LOWER(refer) LIKE '%yand%' OR LOWER(refer) LIKE '%google.%' OR LOWER(refer) LIKE '%go.mail.ru%' OR LOWER(refer) LIKE '%rambler.%' OR LOWER(refer) LIKE '%search.yahoo%' OR LOWER(refer) LIKE '%search.msn%' OR LOWER(refer) LIKE '%bing%' OR LOWER(refer) LIKE '%search.live.com%' OR LOWER(refer) LIKE '%?q=%' OR LOWER(refer) LIKE '%&q=%' OR LOWER(refer) LIKE '%query=%'" . $cse_m . ") AND LOWER(refer) NOT LIKE '%@%' AND" . $zp . " GROUP BY ip,refer");
				}
				while ($row = mysql_fetch_row($res))
				{
					$refer = Ref($row[0]);
					if (is_array($refer)) {
						list($engine, $query) = $refer;
						$enmas[] = $engine;
					}
				}
				if (!isset($enmas)) {
					echo "<center>Нет данных</center>";
					break;
				}
				$newmas = array_count_values($enmas);
				arsort($newmas);
				$mmx = max($newmas);
				$cnt = array_sum($newmas);
				echo "<table id=table align=center width=750 cellpadding=5 cellspacing=1 border=0><tr class=h><td width=50>№</td><td width=440>Поисковая система</td><td width=50>" . (($sort == "hi") ? "Хиты" : "Хосты") . "</td><td width=100>График</td><td width=50>%</td><td width=50>Детали</td></tr>";
				while (list($engine, $val) = each($newmas))
				{
					if ($k == $pos) break;
					$k++;
					$vse += $val;
					if ($s == "s2") {
						$s = "s1";
						echo "<tr class=s1>";
					} else {
						$s = "s2";
						echo "<tr class=s2>";
					}
					echo "<td>$k</td><td align=left><a target=_blank href=\"?tz=6&engin=" . strip_tags($engine) . "&qs=allzz&pz=1&s_date=" . dtconv($s_date) . "&f_date=" . dtconv($f_date) . "&sort=" . (empty($sort) ? "ho" : $sort) . "\">";
					echo_se($engine);
					echo "</a></td><td>$val</td>";
					echo "<td><img align=left src=px" . (($sort == "hi") ? "h" : "u") . ".gif width=" . ceil(($val * 100) / $mmx) . " height=11 border=0></td>";
					echo "<td>" . (number_format((($val * 100) / $cnt), 1, ',', '')) . "</td>";
					echo "<td><a class=d target=_blank href=\"?top=4&pos=10&engin=" . strip_tags($engine);
					if ($_GET['dy']) echo "&dy=" . $_GET['dy']; else if ($_GET['s_date']) echo "&s_date=" . $_GET['s_date'] . "&f_date=" . $_GET['f_date'];
					echo "&sort=" . (empty($sort) ? "ho" : $sort) . "\">&gt;&gt;&gt;</a></td></tr>";
				}
				echo "<tr class=h><td></td><td align=left><b>Всего:</b></td><td><b>$vse</b></td><td align=left>из $cnt</td><td></td><td></td></tr></table>";
				break;

			case 5:
				$z = "SELECT ip, COUNT(ip) cnt FROM surf WHERE";
				if (!empty($str_f)) $z .= " ip LIKE '%$str_f%' AND";
				$z .= $zp . " AND dt >= '$s_date' AND dt <= '$f_date' GROUP BY ip ORDER BY 2 DESC";
				$res = mysql_query($z);

				$z2 = "SELECT SUM(t.cnt) FROM (" . $z . ") t";
				$r = mysql_query($z2);
				$cnt = mysql_result($r, 0);

				echo "<table id=table align=center width=750 cellpadding=5 cellspacing=1 border=0><tr class=h><td width=50>№</td><td width=500>IP-адрес</td><td width=50>Хиты</td><td width=100>График</td><td width=50>%</td></tr>";
				while ($row = mysql_fetch_row($res))
				{
					if ($k == 0) $max = $row[1];
					if ($k == $pos) break;
					$k++;
					$vse += $row[1];
					if ($s == "s2") {
						$s = "s1";
						echo "<tr class=s1>";
					} else {
						$s = "s2";
						echo "<tr class=s2>";
					}
					echo "<td>" . $k . "</td>";
					if ($row[0] != "unknown") echo "<td align=left><a target=_blank href=\"?tz=1&pz=1&item=ip&s_date=" . dtconv($s_date) . "&f_date=" . dtconv($f_date) . "&qs=" . $row[0] . "\">" . $row[0] . "</a></td>"; else echo "<td align=left>неизвестно</td>";
					echo "<td>" . $row[1] . "</td>";
					echo "<td><img align=left src=pxh.gif width=" . ceil(($row[1] * 100) / $max) . " height=11 border=0></td>";
					echo "<td>" . (number_format((($row[1] * 100) / $cnt), 1, ',', '')) . "</td></tr>";
				}
				echo "<tr class=h><td></td><td align=left><b>Всего:</b></td><td><b>$vse</b></td><td align=left>из $cnt</td><td></td></tr></table>";
				break;

			case 6:
				$z = "SELECT host, COUNT(host) cnt FROM surf WHERE";
				if (!empty($str_f)) $z .= " host LIKE '%$str_f%' AND";
				$z .= $zp . " AND dt >= '$s_date' AND dt <= '$f_date' AND host <> '' AND host NOT REGEXP '[0-9]+.[0-9]+.[0-9]+.[0-9]+' GROUP BY host ORDER BY 2 DESC";
				$res = mysql_query($z);

				$z2 = "SELECT SUM(t.cnt) FROM (" . $z . ") t";
				$r = mysql_query($z2);
				$cnt = mysql_result($r, 0);

				echo "<table id=table align=center width=750 cellpadding=5 cellspacing=1 border=0><tr class=h><td width=50>№</td><td width=500>Хост</td><td width=50>Хиты</td><td width=100>График</td><td width=50>%</td></tr>";
				while ($row = mysql_fetch_row($res))
				{
					if ($k == 0) $max = $row[1];
					if ($k == $pos) break;
					$k++;
					$vse += $row[1];
					if ($s == "s2") {
						$s = "s1";
						echo "<tr class=s1>";
					} else {
						$s = "s2";
						echo "<tr class=s2>";
					}
					echo "<td>$k</td>";
					echo "<td align=left><a target=_blank href=\"?tz=1&pz=1&item=host&s_date=" . dtconv($s_date) . "&f_date=" . dtconv($f_date) . "&qs=" . $row[0] . "\">" . $row[0] . "</a></td>";
					echo "<td>" . $row[1] . "</td>";
					echo "<td><img align=left src=pxh.gif width=" . ceil(($row[1] * 100) / $max) . " height=11 border=0></td>";
					echo "<td>" . (number_format((($row[1] * 100) / $cnt), 1, ',', '')) . "</td></tr>";
				}
				echo "<tr class=h><td></td><td align=left><b>Всего:</b></td><td><b>$vse</b></td><td align=left>из $cnt</td><td></td></tr></table>";
				break;

			case 7:
				foreach ($robo as $val)
				{
					$zs = "";
					$pf = "";
					if (empty($val)) continue;
					if (isset($rbdn[$val])) foreach ($rbdn[$val] as $vl) {
						$zs .= $pf . "LOWER(user) LIKE '%" . mb_strtolower($vl) . "%'";
						$pf = " OR ";
					}
					if (isset($hbdn[$val])) foreach ($hbdn[$val] as $vl) {
						$zs .= $pf . "LOWER(host) LIKE '%" . mb_strtolower($vl) . "%'";
						$pf = " OR ";
					}
					$z = "SELECT COUNT(i),MAX(i) FROM surf WHERE (" . $zs . ") AND " . $zp2 . " dt >= '$s_date' AND dt <= '$f_date'";
					$r = mysql_query($z);
					$d = mysql_result($r, 0, 1);
					$cnt[$val] = mysql_result($r, 0);
					if ($cnt[$val] > 0) {
						$z2 = "SELECT dt,tm FROM surf WHERE i = " . $d;
						$r2 = mysql_query($z2);
					}
					$ff_date[$val] = dtconv(mysql_result($r2, 0, 0)) . " &nbsp; <font color='#de3163'>" . mysql_result($r2, 0, 1) . "</font>";
				}
				arsort($cnt);
				echo "<table id=table align=center width=750 cellpadding=5 cellspacing=1 border=0><tr class=h><td width=50>№</td><td width=450>Поисковый робот</td><td width=150>Последний визит</td><td width=50>Кол-во<br>страниц</td><td width=100>График</td><td width=50>%</td><td width=50>Детали</td></tr>";
				$mmx = max($cnt);
				$cn = array_sum($cnt);
				foreach ($cnt as $val => $co)
				{
					if ($co <> 0) {
						if ($k == $pos) break;
						$k++;
						if ($s == "s2") {
							$s = "s1";
							echo "<tr class=s1>";
						} else {
							$s = "s2";
							echo "<tr class=s2>";
						}
						echo "<td>$k</td>";
						echo "<td align=left><a target=_blank href=\"?s_date=" . dtconv($s_date) . "&f_date=" . dtconv($f_date) . "&item=robot&qs=" . $val . "\">" . $val . "</a></td>";
						echo "<td>" . $ff_date[$val] . "</td>";
						echo "<td>$co</td>";
						echo "<td><img align=left src=pxh.gif width=" . ceil(($co * 100) / $mmx) . " height=11 border=0></td>";
						echo "<td>" . (number_format((($co * 100) / $cn), 1, ',', '')) . "</td>";
						echo "<td><a class=d target=_blank href=\"?s_date=" . dtconv($s_date) . "&f_date=" . dtconv($f_date) . "&item=robot&dr=1&qs=" . $val . "\">&gt;&gt;&gt;</a></td></tr>";
					}
				}
				echo "<tr class=h><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr></table>";
				break;

			case 8:
				if ($sort == "hi") {
					$z = "SELECT substr(tm,-5,2) FROM surf WHERE";
					$z .= $zp . " AND dt >= '$s_date' AND dt <= '$f_date'";
					$res = mysql_query($z);
				} else {
					$z = "SELECT substr(tm,-5,2),ip FROM surf WHERE";
					$z .= $zp . " AND dt >= '$s_date' AND dt <= '$f_date' GROUP BY 2,1";
					$res = mysql_query($z);
				}
				while ($row = mysql_fetch_row($res)) $tmas[$row[0]]++;
				if (!isset($tmas)) {
					echo "<center>Нет данных</center>";
					break;
				}
				arsort($tmas);
				$mmx = max($tmas);
				$cnt = array_sum($tmas);
				echo "<table id=table align=center width=750 cellpadding=5 cellspacing=1 border=0><tr class=h><td width=50>№</td><td width=500>Временной интервал</td><td width=50>" . (($sort == "hi") ? "Хиты" : "Хосты") . "</td><td width=100>График</td><td width=50>%</td></tr>";
				while (list($tm, $val) = each($tmas))
				{
					$k++;
					$vse += $val;
					if ($s == "s2") {
						$s = "s1";
						echo "<tr class=s1>";
					} else {
						$s = "s2";
						echo "<tr class=s2>";
					}
					echo "<td>$k</td>";
					if ($tm <> "23") $tm2 = $tm + 1; else $tm2 = "00";
					if (mb_strlen($tm2) == 1) $tm2 = "0" . $tm2;
					echo "<td align=left><a target=_blank href=\"?pz=1&item=tm&s_date=" . dtconv($s_date) . "&f_date=" . dtconv($f_date) . "&qs=" . $tm . ":&sort=" . (empty($sort) ? "ho" : $sort) . "\">$tm:00 - $tm2:00</a></td>";
					echo "<td>$val</td>";
					echo "<td><img align=left src=px" . (($sort == "hi") ? "h" : "u") . ".gif width=" . ceil(($val * 100) / $mmx) . " height=11 border=0></td>";
					echo "<td>" . (number_format((($val * 100) / $cnt), 1, ',', '')) . "</td></tr>";
				}
				echo "<tr class=h><td></td><td align=left><b>Всего:</b></td><td><b>$vse</b></td><td align=left>из $cnt</td><td></td></tr></table>";
				break;

			case 9:
				if ($sort == "hi") {
					$z = "SELECT lang, COUNT(lang) cnt FROM surf WHERE";
					$z .= $zp . " AND dt >= '$s_date' AND dt <= '$f_date' AND lang <> '' GROUP BY lang ORDER BY 2 DESC";
					$res = mysql_query($z);

					$z2 = "SELECT SUM(t.cnt) FROM (" . $z . ") t";
					$r = mysql_query($z2);
				} else {
					$z = "CREATE TEMPORARY TABLE tmp_surf SELECT ip, lang FROM surf WHERE";
					$z .= $zp . " AND dt >= '$s_date' AND dt <= '$f_date' AND lang <> '' GROUP BY ip, lang;";
					$z2 = "SELECT lang, COUNT(lang) cnt FROM tmp_surf GROUP BY lang ORDER BY 2 DESC";
					$res = mysql_query($z);
					$res = mysql_query($z2);

					$z3 = "SELECT SUM(t.cnt) FROM (" . $z2 . ") t";
					$r = mysql_query($z);
					$r = mysql_query($z3);
				}
				$cnt = mysql_result($r, 0);
				echo "<table id=table align=center width=750 cellpadding=5 cellspacing=1 border=0><tr class=h><td width=50>№</td><td width=500>Язык</td><td width=50>" . (($sort == "hi") ? "Хиты" : "Хосты") . "</td><td width=100>График</td><td width=50>%</td></tr>";
				while ($row = mysql_fetch_row($res))
				{
					if ($k == 0) $max = $row[1];
					if ($k == $pos) break;
					$k++;
					$vse += $row[1];
					if ($s == "s2") {
						$s = "s1";
						echo "<tr class=s1>";
					} else {
						$s = "s2";
						echo "<tr class=s2>";
					}
					echo "<td>$k</td>";
					echo "<td align=left>";
					if (file_exists("flags/" . mb_strtolower($lang[mb_strtoupper($row[0])]) . ".gif")) echo "<img align=absmiddle src=flags/" . mb_strtolower($lang[mb_strtoupper($row[0])]) . ".gif width=16 height=12> <a target=_blank href=\"?tz=1&pz=1&item=lang&s_date=" . dtconv($s_date) . "&f_date=" . dtconv($f_date) . "&qs=" . $row[0] . "&sort=" . (empty($sort) ? "ho" : $sort) . "\">" . $lang[mb_strtoupper($row[0])] . "</a>"; else
					{
						$eh = $lang[mb_strtoupper($row[0])];
						if ($eh <> '') echo "<a target=_blank href=\"?tz=1&pz=1&item=lang&s_date=" . dtconv($s_date) . "&f_date=" . dtconv($f_date) . "&qs=" . $row[0] . "&sort=" . (empty($sort) ? "ho" : $sort) . "\">" . $eh . "</a>"; else echo "<a target=_blank href=\"?tz=1&pz=1&item=lang&s_date=" . dtconv($s_date) . "&f_date=" . dtconv($f_date) . "&qs=" . $row[0] . "&sort=" . (empty($sort) ? "ho" : $sort) . "\"><font color=grey>(" . $row[0] . ") неизвестно</font></a>";
					}
					echo "</td>";
					echo "<td>" . $row[1] . "</td>";
					echo "<td><img align=left src=px" . (($sort == "hi") ? "h" : "u") . ".gif width=" . ceil(($row[1] * 100) / $max) . " height=11 border=0></td>";
					echo "<td>" . (number_format((($row[1] * 100) / $cnt), 1, ',', '')) . "</td></tr>";
				}
				echo "<tr class=h><td></td><td align=left><b>Всего:</b></td><td><b>$vse</b></td><td align=left>из $cnt</td><td></td></tr></table>";
				break;

			case 10:
				$DZone = array( // ISO 3166
					"ad" => "ANDORRA",
					"ae" => "UNITED ARAB EMIRATES",
					"af" => "AFGHANISTAN",
					"ai" => "ANGUILLA",
					"ag" => "ANTIGUA AND BARBUDA",
					"al" => "ALBANIA",
					"am" => "ARMENIA",
					"an" => "NETHERLANDS ANTILLES",
					"ao" => "ANGOLA",
					"aq" => "ANTARCTICA",
					"ar" => "ARGENTINA",
					"as" => "AMERICAN SAMOA",
					"at" => "AUSTRIA",
					"au" => "AUSTRALIA",
					"aw" => "ARUBA",
					"az" => "AZERBAIJAN",
					"ba" => "BOSNIA AND HERZEGOVINA",
					"bb" => "BARBADOS",
					"bd" => "BANGLADESH",
					"be" => "BELGIUM",
					"bf" => "BURKINA FASO",
					"bg" => "BULGARIA",
					"bh" => "BAHRAIN",
					"bi" => "BURUNDI",
					"bj" => "BENIN",
					"bl" => "Saint Barthelemy",
					"bm" => "BERMUDA",
					"bn" => "BRUNEI DARUSSALAM",
					"bo" => "BOLIVIA",
					"bs" => "BAHAMAS",
					"bq" => "Bonaire, Sint Eustatius and Saba",
					"br" => "BRAZIL",
					"bt" => "BHUTAN",
					"bw" => "BOTSWANA",
					"by" => "BELARUS",
					"bz" => "BELIZE",
					"ca" => "CANADA",
					"cc" => "COCOS (KEELING) ISLANDS",
					"cd" => "CONGO, THE DEMOCRATIC REPUBLIC OF THE",
					"cf" => "CENTRAL AFRICAN REPUBLIC",
					"cg" => "CONGO",
					"ch" => "SWITZERLAND",
					"ci" => "COTE D'IVOIRE",
					"ck" => "COOK ISLANDS",
					"cl" => "CHILE",
					"cm" => "CAMEROON",
					"cn" => "CHINA",
					"co" => "COLOMBIA",
					"cr" => "COSTA RICA",
					"cu" => "CUBA",
					"cv" => "CAPE VERDE",
					"cw" => "Curacao",
					"cx" => "CHRISTMAS ISLAND",
					"cy" => "CYPRUS",
					"cz" => "CZECH REPUBLIC",
					"de" => "GERMANY",
					"dk" => "DENMARK",
					"dm" => "DOMINICA",
					"do" => "DOMINICAN REPUBLIC",
					"dj" => "DJIBOUTI",
					"dz" => "ALGERIA",
					"ec" => "ECUADOR",
					"ee" => "ESTONIA",
					"eg" => "EGYPT",
					"eh" => "WESTERN SAHARA",
					"er" => "ERITREA",
					"es" => "SPAIN",
					"et" => "ETHIOPIA",
					"fi" => "FINLAND",
					"fj" => "FIJI",
					"fk" => "FALKLAND ISLANDS (MALVINAS)",
					"fm" => "MICRONESIA, FEDERATED STATES OF",
					"fo" => "FAROE ISLANDS",
					"fr" => "FRANCE",
					"ga" => "GABON",
					"gb" => "UNITED KINGDOM",
					"gd" => "GRENADA",
					"ge" => "GEORGIA",
					"gf" => "FRENCH GUIANA",
					"gh" => "GHANA",
					"gi" => "GIBRALTAR",
					"gl" => "GREENLAND",
					"gm" => "GAMBIA",
					"gn" => "GUINEA",
					"gp" => "GUADELOUPE",
					"gq" => "EQUATORIAL GUINEA",
					"gr" => "GREECE",
					"gs" => "SOUTH GEORGIA AND THE SOUTH SANDWICH ISLANDS",
					"gt" => "GUATEMALA",
					"gu" => "GUAM",
					"gw" => "GUINEA-BISSAU",
					"gy" => "GUYANA",
					"hk" => "HONG KONG",
					"hm" => "Heard Island and McDonald Islands",
					"hn" => "HONDURAS",
					"hr" => "CROATIA",
					"ht" => "HAITI",
					"hu" => "HUNGARY",
					"id" => "INDONESIA",
					"ie" => "IRELAND",
					"il" => "ISRAEL",
					"im" => "Isle of Man",
					"in" => "INDIA",
					"io" => "BRITISH INDIAN OCEAN TERRITORY",
					"iq" => "IRAQ",
					"ir" => "IRAN, ISLAMIC REPUBLIC OF",
					"is" => "ICELAND",
					"it" => "ITALY",
					"je" => "Jersey",
					"jm" => "JAMAICA",
					"jo" => "JORDAN",
					"jp" => "JAPAN",
					"ke" => "KENYA",
					"kg" => "KYRGYZSTAN",
					"kh" => "CAMBODIA",
					"ki" => "KIRIBATI",
					"km" => "COMOROS",
					"kn" => "SAINT KITTS AND NEVIS",
					"kp" => "KOREA, DEMOCRATIC PEOPLE'S REPUBLIC OF",
					"kr" => "KOREA, REPUBLIC OF",
					"kw" => "KUWAIT",
					"ky" => "CAYMAN ISLANDS",
					"kz" => "KAZAKHSTAN",
					"la" => "LAO PEOPLE'S DEMOCRATIC REPUBLIC",
					"lb" => "LEBANON",
					"lc" => "SAINT LUCIA",
					"li" => "LIECHTENSTEIN",
					"lk" => "SRI LANKA",
					"lr" => "LIBERIA",
					"ls" => "LESOTHO",
					"lt" => "LITHUANIA",
					"lu" => "LUXEMBOURG",
					"lv" => "LATVIA",
					"ly" => "LIBYAN ARAB JAMAHIRIYA",
					"ma" => "MOROCCO",
					"mc" => "MONACO",
					"md" => "MOLDOVA, REPUBLIC OF",
					"mg" => "MADAGASCAR",
					"mh" => "MARSHALL ISLANDS",
					"mk" => "MACEDONIA, THE FORMER YUGOSLAV REPUBLIC OF",
					"ml" => "MALI",
					"mm" => "MYANMAR",
					"mn" => "MONGOLIA",
					"mo" => "MACAO",
					"mp" => "NORTHERN MARIANA ISLANDS",
					"mq" => "MARTINIQUE",
					"mr" => "MAURITANIA",
					"ms" => "MONTSERRAT",
					"mt" => "MALTA",
					"mu" => "MAURITIUS",
					"mv" => "MALDIVES",
					"mw" => "MALAWI",
					"mx" => "MEXICO",
					"my" => "MALAYSIA",
					"mz" => "MOZAMBIQUE",
					"na" => "NAMIBIA",
					"nc" => "NEW CALEDONIA",
					"ne" => "NIGER",
					"nf" => "NORFOLK ISLAND",
					"ng" => "NIGERIA",
					"ni" => "NICARAGUA",
					"nl" => "NETHERLANDS",
					"no" => "NORWAY",
					"np" => "NEPAL",
					"nr" => "NAURU",
					"nu" => "Niue",
					"nz" => "NEW ZEALAND",
					"om" => "OMAN",
					"pa" => "PANAMA",
					"pe" => "PERU",
					"pf" => "FRENCH POLYNESIA",
					"pg" => "PAPUA NEW GUINEA",
					"ph" => "PHILIPPINES",
					"pk" => "PAKISTAN",
					"pl" => "POLAND",
					"pm" => "SAINT PIERRE AND MIQUELON",
					"pn" => "PITCAIRN",
					"pr" => "PUERTO RICO",
					"ps" => "Palestinian Territory, Occupied",
					"pt" => "PORTUGAL",
					"pw" => "PALAU",
					"py" => "PARAGUAY",
					"qa" => "QATAR",
					"re" => "REUNION",
					"ro" => "ROMANIA",
					"rs" => "Serbia",
					"ru" => "RUSSIAN FEDERATION",
					"rw" => "RWANDA",
					"sa" => "SAUDI ARABIA",
					"sb" => "SOLOMON ISLANDS",
					"sc" => "SEYCHELLES",
					"sd" => "SUDAN",
					"se" => "SWEDEN",
					"sg" => "SINGAPORE",
					"sh" => "SAINT HELENA",
					"si" => "SLOVENIA",
					"sj" => "SVALBARD AND JAN MAYEN",
					"sk" => "SLOVAKIA",
					"sl" => "SIERRA LEONE",
					"sm" => "SAN MARINO",
					"sn" => "SENEGAL",
					"so" => "SOMALIA",
					"sr" => "SURINAME",
					"ss" => "South Sudan",
					"st" => "SAO TOME AND PRINCIPE",
					"sv" => "EL SALVADOR",
					"sx" => "Sint Maarten (Dutch part)",
					"sy" => "SYRIAN ARAB REPUBLIC",
					"sz" => "SWAZILAND",
					"tc" => "TURKS AND CAICOS ISLANDS",
					"td" => "CHAD",
					"tf" => "FRENCH SOUTHERN TERRITORIES",
					"tg" => "TOGO",
					"th" => "THAILAND",
					"tj" => "TAJIKISTAN",
					"tk" => "TOKELAU",
					"tl" => "Timor-Leste",
					"tm" => "TURKMENISTAN",
					"tn" => "TUNISIA",
					"to" => "TONGA",
					"tr" => "TURKEY",
					"tt" => "TRINIDAD AND TOBAGO",
					"tv" => "TUVALU",
					"tw" => "TAIWAN, PROVINCE OF CHINA",
					"tz" => "TANZANIA, UNITED REPUBLIC OF",
					"ua" => "UKRAINE",
					"ug" => "UGANDA",
					"uk" => "UNITED KINGDOM",
					"um" => "UNITED STATES MINOR OUTLYING ISLANDS",
					"us" => "UNITED STATES",
					"uy" => "URUGUAY",
					"uz" => "UZBEKISTAN",
					"va" => "HOLY SEE (VATICAN CITY STATE)",
					"vc" => "SAINT VINCENT AND THE GRENADINES",
					"ve" => "VENEZUELA",
					"vg" => "VIRGIN ISLANDS, BRITISH",
					"vi" => "VIRGIN ISLANDS, U.S.",
					"vn" => "VIET NAM",
					"vu" => "VANUATU",
					"wf" => "WALLIS AND FUTUNA",
					"ws" => "SAMOA",
					"ye" => "YEMEN",
					"yt" => "Mayotte",
					"za" => "SOUTH AFRICA",
					"zm" => "ZAMBIA",
					"zw" => "ZIMBABWE",
					"su" => "SOVIET UNION",
					"eu" => "EUROPEAN UNION"
				);

				if (isset($domen)) {
					$z = "SELECT host, COUNT(host) cnt FROM surf WHERE";
					if (!empty($str_f)) $z .= " host LIKE '%$str_f%' AND";
					$z .= $zp . " AND dt >= '$s_date' AND dt <= '$f_date' AND host REGEXP '\." . $domen . "$' GROUP BY host ORDER BY 2 DESC";
					$res = mysql_query($z);

					$z2 = "SELECT SUM(t.cnt) FROM (" . $z . ") t";
					$r = mysql_query($z2);
					$cnt = mysql_result($r, 0);

					echo "<table id=table align=center width=750 cellpadding=5 cellspacing=1 border=0><tr class=h><td width=50>№</td><td width=500>Хост доменной зоны ." . $domen . "</td><td width=50>Хиты</td><td width=100>График</td><td width=50>%</td></tr>";
					while ($row = mysql_fetch_row($res))
					{
						if ($k == 0) $max = $row[1];
						if ($k == $pos) break;
						$k++;
						$vse += $row[1];
						if ($s == "s2") {
							$s = "s1";
							echo "<tr class=s1>";
						} else {
							$s = "s2";
							echo "<tr class=s2>";
						}
						echo "<td>$k</td>";
						echo "<td align=left><a target=_blank href=\"?tz=1&pz=1&item=host&s_date=" . dtconv($s_date) . "&f_date=" . dtconv($f_date) . "&qs=" . $row[0] . "\">" . $row[0] . "</a></td>";
						echo "<td>" . $row[1] . "</td>";
						echo "<td><img align=left src=pxh.gif width=" . ceil(($row[1] * 100) / $max) . " height=11 border=0></td>";
						echo "<td>" . (number_format((($row[1] * 100) / $cnt), 1, ',', '')) . "</td>";
					}
					echo "<tr class=h><td></td><td align=left><b>Всего:</b></td><td><b>$vse</b></td><td align=left>из $cnt</td><td></td></tr></table>";
					break;
				}

				if ($sort == "hi") {
					$z = "SELECT host FROM surf WHERE host REGEXP '\.[a-zA-Z]+\$' AND";
					$z .= $zp . " AND dt >= '$s_date' AND dt <= '$f_date'";
					$res = mysql_query($z);
				} else {
					$z = "SELECT host FROM surf WHERE host REGEXP '\.[a-zA-Z]+\$' AND";
					$z .= $zp . " AND dt >= '$s_date' AND dt <= '$f_date' GROUP BY host";
					$res = mysql_query($z);
				}
				while ($row = mysql_fetch_row($res))
				{
					if (preg_match("/\.([a-zA-Z]+)$/iu", $row[0], $match)) $dmas[mb_strtolower($match[1])]++;
				}
				if (!isset($dmas)) {
					echo "<center>Нет данных</center>";
					break;
				}
				arsort($dmas);
				$mmx = max($dmas);
				$cnt = array_sum($dmas);
				echo "<table id=table align=center width=750 cellpadding=5 cellspacing=1 border=0><tr class=h><td width=50>№</td><td width=440>Зона хоста (Страна)</td><td width=50>" . (($sort == "hi") ? "Хиты" : "Хосты") . "</td><td width=100>График</td><td width=50>%</td><td width=50>Детали</td></tr>";
				while (list($dom, $val) = each($dmas))
				{
					if ($k == $pos) break;
					$k++;
					$vse += $val;
					if ($s == "s2") {
						$s = "s1";
						echo "<tr class=s1>";
					} else {
						$s = "s2";
						echo "<tr class=s2>";
					}
					echo "<td>$k</td>";
					echo "<td align=left><a target=_blank href=\"?tz=7&pz=1&item=host&s_date=" . dtconv($s_date) . "&f_date=" . dtconv($f_date) . "&qs=" . $dom . "&sort=" . (empty($sort) ? "ho" : $sort) . "\">.<b>$dom</b></a> ";
					$wrd = ucwords(mb_strtolower($DZone[$dom]));
					if (!empty($wrd)) echo "<font color=#808080>($wrd)</font>";
					echo "</td>";
					echo "<td>$val</td>";
					echo "<td><img align=left src=px" . (($sort == "hi") ? "h" : "u") . ".gif width=" . ceil(($val * 100) / $mmx) . " height=11 border=0></td>";
					echo "<td>" . (number_format((($val * 100) / $cnt), 1, ',', '')) . "</td>";
					echo "<td><a class=d target=_blank href=\"?top=10&pos=$pos&s_date=" . dtconv($s_date) . "&f_date=" . dtconv($f_date) . "&domen=" . $dom . "\">&gt;&gt;&gt;</a></td></tr>";
				}
				echo "<tr class=h><td></td><td align=left><b>Всего:</b></td><td><b>$vse</b></td><td align=left>из $cnt</td><td></td><td></td></tr></table>";
				break;

			case 11:
				if ($sort == "hi") {
					$res = mysql_query("SELECT user FROM surf WHERE dt >= '$s_date' AND dt <= '$f_date' AND" . $zp);
					while ($row = mysql_fetch_row($res)) $bmas[GetBrowser($row[0])]++;
				} else {
					$res = mysql_query("SELECT user,ip FROM surf WHERE dt >= '$s_date' AND dt <= '$f_date' AND" . $zp . " GROUP BY ip,user");
					while ($row = mysql_fetch_row($res))
					{
						$gb = GetBrowser($row[0]);
						if (!isset($ipmas[$row[1]][$gb])) {
							$bmas[$gb]++;
							$ipmas[$row[1]][$gb] = 1;
						}
					}
				}
				if (!isset($bmas)) {
					echo "<center>Нет данных</center>";
					break;
				}
				arsort($bmas);
				$mmx = max($bmas);
				$cnt = array_sum($bmas);
				echo "<table id=table align=center width=750 cellpadding=5 cellspacing=1 border=0><tr class=h><td width=50>№</td><td width=500>Браузер</td><td width=50>" . (($sort == "hi") ? "Хиты" : "Хосты") . "</td><td width=100>График</td><td width=50>%</td><td width=50>Детали</td></tr>";
				while (list($brw, $val) = each($bmas))
				{
					$k++;
					$vse += $val;
					if ($s == "s2") {
						$s = "s1";
						echo "<tr class=s1>";
					} else {
						$s = "s2";
						echo "<tr class=s2>";
					}
					echo "<td>$k</td>";
					echo "<td align=left>";
					if (!empty($brw)) echo "<img src=browsers/$brw width=16 height=16 align=absmiddle> ";
					echo "<a target=_blank href=\"?tz=4&pz=1&item=user&s_date=" . dtconv($s_date) . "&f_date=" . dtconv($f_date) . "&qs=" . $brw . "&sort=" . (empty($sort) ? "ho" : $sort) . "\">";
					switch ($brw)
					{
						case "ie.png":
							echo "MS Internet Explorer";
							break;
						case "opera.png":
							echo "Opera";
							break;
						case "firefox.png":
							echo "Firefox";
							break;
						case "chrome.png":
							echo "Google Chrome";
							break;
						case "mozilla.gif":
							echo "Mozilla";
							break;
						case "safari.png":
							echo "Apple Safari";
							break;
						case "mac.gif":
							echo "Macintosh";
							break;
						case "maxthon.png":
							echo "Maxthon (MyIE)";
							break;
						default:
							echo "другие";
							break;
					}
					echo "</a></td>";
					echo "<td>$val</td>";
					echo "<td><img align=left src=px" . (($sort == "hi") ? "h" : "u") . ".gif width=" . ceil(($val * 100) / $mmx) . " height=11 border=0></td>";
					echo "<td>" . (number_format((($val * 100) / $cnt), 1, ',', '')) . "</td>";
					echo "<td><a class=d target=_blank href=\"?top=12&pos=10&s_date=" . dtconv($s_date) . "&f_date=" . dtconv($f_date) . "&brw=" . (empty($brw) ? "другие" : $brw) . "&sort=" . (empty($sort) ? "ho" : $sort) . "\">&gt;&gt;&gt;</a></td></tr>";
				}
				echo "<tr class=h><td></td><td align=left><b>Всего:</b></td><td><b>$vse</b></td><td align=left>из $cnt</td><td></td><td></td></tr></table>";
				break;

			case 12:
				if ($sort == "hi") {
					$z = "SELECT user, COUNT(user) cnt FROM surf WHERE";
					if (!empty($str_f)) $z .= " user LIKE '%$str_f%' AND";
					$z .= $zp . " AND dt >= '$s_date' AND dt <= '$f_date' " . (isset($brw) ? GetBrw($brw) : "") . " GROUP BY user ORDER BY 2 DESC";
					$res = mysql_query($z);

					$z2 = "SELECT SUM(t.cnt) FROM (" . $z . ") t";
					$r = mysql_query($z2);
				} else {
					$z = "CREATE TEMPORARY TABLE tmp_surf SELECT ip, user FROM surf WHERE";
					if (!empty($str_f)) $z .= " user LIKE '%$str_f%' AND";
					$z .= $zp . " AND dt >= '$s_date' AND dt <= '$f_date' " . (isset($brw) ? GetBrw($brw) : "") . " GROUP BY ip" . (!isset($brw) ? ",user" : "");
					$z2 = "SELECT user, COUNT(user) cnt FROM tmp_surf GROUP BY user ORDER BY 2 DESC";
					$res = mysql_query($z);
					$res = mysql_query($z2);

					$z3 = "SELECT SUM(t.cnt) FROM (" . $z2 . ") t";
					$r = mysql_query($z);
					$r = mysql_query($z3);
				}
				$cnt = mysql_result($r, 0);

				echo "<table id=table align=center width=750 cellpadding=5 cellspacing=1 border=0><tr class=h><td width=50>№</td><td width=500>User-Agent";
				if (!empty($brw)) {
					echo "&nbsp;<span style='background-color:#dcdcdc;'>&nbsp;&nbsp;";
					switch ($brw)
					{
						case "ie.png":
							echo "MS Internet Explorer";
							break;
						case "opera.png":
							echo "Opera";
							break;
						case "firefox.png":
							echo "Firefox";
							break;
						case "chrome.png":
							echo "Google Chrome";
							break;
						case "mozilla.gif":
							echo "Mozilla";
							break;
						case "safari.png":
							echo "Apple Safari";
							break;
						case "mac.gif":
							echo "Macintosh";
							break;
						case "maxthon.png":
							echo "Maxthon (MyIE)";
							break;
						default:
							echo "другие";
							break;
					}
					echo "&nbsp;&nbsp;</span>";
				}
				echo "</td><td width=50>" . (($sort == "hi") ? "Хиты" : "Хосты") . "</td><td width=100>График</td><td width=50>%</td></tr>";
				while ($row = mysql_fetch_row($res))
				{
					if ($row[0] == "") $row[0] = "<font color=grey>неизвестно</font>";
					if ($k == 0) $max = $row[1];
					if ($k == $pos) break;
					$k++;
					$vse += $row[1];
					if ($s == "s2") {
						$s = "s1";
						echo "<tr class=s1>";
					} else {
						$s = "s2";
						echo "<tr class=s2>";
					}
					echo "<td>$k</td>";
					echo "<td align=left style='overflow: hidden;text-overflow: ellipsis;'><a target=_blank href=\"?tz=1&pz=1&item=user&s_date=" . dtconv($s_date) . "&f_date=" . dtconv($f_date) . "&qs=" . $row[0] . "&sort=" . (empty($sort) ? "ho" : $sort) . "\">" . $row[0] . "</a></td>";
					echo "<td>" . $row[1] . "</td>";
					echo "<td><img align=left src=px" . (($sort == "hi") ? "h" : "u") . ".gif width=" . ceil(($row[1] * 100) / $max) . " height=11 border=0></td>";
					echo "<td>" . (number_format((($row[1] * 100) / $cnt), 1, ',', '')) . "</td></tr>";
				}
				echo "<tr class=h><td></td><td align=left><b>Всего:</b></td><td><b>$vse</b></td><td align=left>из $cnt</td><td></td></tr></table>";
				norm(750);
				break;

			case 13:
				$z = "SELECT proxy, COUNT(proxy) cnt FROM surf WHERE";
				if (!empty($str_f)) $z .= " proxy LIKE '%$str_f%' AND";
				$z .= $zp . " AND dt >= '$s_date' AND dt <= '$f_date' AND proxy <> '' GROUP BY proxy ORDER BY 2 DESC";
				$res = mysql_query($z);

				$z2 = "SELECT SUM(t.cnt) FROM (" . $z . ") t";
				$r = mysql_query($z2);
				$cnt = mysql_result($r, 0);

				echo "<table id=table align=center width=750 cellpadding=5 cellspacing=1 border=0><tr class=h><td width=50>№</td><td width=500>Proxy</td><td width=50>Хиты</td><td width=100>График</td><td width=50>%</td></tr>";
				while ($row = mysql_fetch_row($res))
				{
					if ($k == 0) $max = $row[1];
					if ($k == $pos) break;
					$k++;
					$vse += $row[1];
					if ($s == "s2") {
						$s = "s1";
						echo "<tr class=s1>";
					} else {
						$s = "s2";
						echo "<tr class=s2>";
					}
					echo "<td>$k</td>";
					echo "<td align=left><a target=_blank href=\"?tz=1&pz=1&item=proxy&s_date=" . dtconv($s_date) . "&f_date=" . dtconv($f_date) . "&qs=" . $row[0] . "\">" . $row[0] . "</a></td>";
					echo "<td>" . $row[1] . "</td>";
					echo "<td><img align=left src=pxh.gif width=" . ceil(($row[1] * 100) / $max) . " height=11 border=0></td>";
					echo "<td>" . (number_format((($row[1] * 100) / $cnt), 1, ',', '')) . "</td></tr>";
				}
				echo "<tr class=h><td></td><td align=left><b>Всего:</b></td><td><b>$vse</b></td><td align=left>из $cnt</td><td></td></tr></table>";
				break;

			case 14:
				$z = "CREATE TEMPORARY TABLE tmp_surf SELECT ip, req FROM surf WHERE";
				$z .= $zp . " AND dt >= '$s_date' AND dt <= '$f_date' GROUP BY ip";
				$z2 = "SELECT req, COUNT(req) cnt FROM tmp_surf " . (!empty($str_f) ? "WHERE req LIKE '%$str_f%'" : "") . " GROUP BY req ORDER BY 2 DESC";
				$res = mysql_query($z);
				$res = mysql_query($z2);

				$z3 = "SELECT SUM(t.cnt) FROM (" . $z2 . ") t";
				$r = mysql_query($z);
				$r = mysql_query($z3);
				$cnt = mysql_result($r, 0);
				echo "<table id=table align=center width=750 cellpadding=5 cellspacing=1 border=0><tr class=h><td width=50>№</td><td width=500>Точка входа на сайт</td><td width=50>Хосты</td><td width=100>График</td><td width=50>%</td><td width=50>Детали</td></tr>";
				while ($row = mysql_fetch_row($res))
				{
					if ($row[0] == "") $row[0] = "<font color=grey>неизвестно</font>";
					if ($k == 0) $max = $row[1];
					if ($k == $pos) break;
					$k++;
					$vse += $row[1];
					if ($s == "s2") {
						$s = "s1";
						echo "<tr class=s1>";
					} else {
						$s = "s2";
						echo "<tr class=s2>";
					}
					echo "<td>$k</td>";
					echo "<td align=left style='overflow: hidden;text-overflow: ellipsis;'><a target=_blank href=\"$row[0]\">$row[0]</a></td>";
					echo "<td>$row[1]</td>";
					echo "<td><img align=left src=pxu.gif width=" . ceil(($row[1] * 100) / $max) . " height=11 border=0></td>";
					echo "<td>" . (number_format((($row[1] * 100) / $cnt), 1, ',', '')) . "</td>";
					echo "<td><a class=d target=_blank href=\"?tz=2&pz=1&s_date=" . dtconv($s_date) . "&f_date=" . dtconv($f_date) . "&qs=" . urlencode($row[0]) . "&sort=ho\">&gt;&gt;&gt;</a></td></tr>";
				}
				echo "<tr class=h><td></td><td align=left><b>Всего:</b></td><td><b>$vse</b></td><td align=left>из $cnt</td><td></td><td></td></tr></table>";
				norm(750);
				break;

			case 16:
				$z = "CREATE TEMPORARY TABLE tmp_surf SELECT surf.ip, surf.req rq FROM surf,(SELECT ip, req, max(i) mx FROM surf WHERE";
				$z .= $zp . " AND dt >= '$s_date' AND dt <= '$f_date' GROUP BY ip) t WHERE surf.i = t.mx " . (!empty($str_f) ? "AND surf.req LIKE '%$str_f%'" : "") . " ORDER BY 1 DESC";
				$z2 = "SELECT rq, COUNT(rq) cnt FROM tmp_surf GROUP BY rq ORDER BY 2 DESC";
				$res = mysql_query($z);
				$res = mysql_query($z2);

				$z3 = "SELECT SUM(t.cnt) FROM (" . $z2 . ") t";
				$r = mysql_query($z);
				$r = mysql_query($z3);
				$cnt = mysql_result($r, 0);
				echo "<table id=table align=center width=750 cellpadding=5 cellspacing=1 border=0><tr class=h><td width=50>№</td><td width=500>Точка выхода с сайта</td><td width=50>Хосты</td><td width=100>График</td><td width=50>%</td><td width=50>Детали</td></tr>";
				while ($row = mysql_fetch_row($res))
				{
					if ($row[0] == "") $row[0] = "<font color=grey>неизвестно</font>";
					if ($k == 0) $max = $row[1];
					if ($k == $pos) break;
					$k++;
					$vse += $row[1];
					if ($s == "s2") {
						$s = "s1";
						echo "<tr class=s1>";
					} else {
						$s = "s2";
						echo "<tr class=s2>";
					}
					echo "<td>$k</td>";
					echo "<td align=left style='overflow: hidden;text-overflow: ellipsis;'><a target=_blank href=\"$row[0]\">$row[0]</a></td>";
					echo "<td>$row[1]</td>";
					echo "<td><img align=left src=pxu.gif width=" . ceil(($row[1] * 100) / $max) . " height=11 border=0></td>";
					echo "<td>" . (number_format((($row[1] * 100) / $cnt), 1, ',', '')) . "</td>";
					echo "<td><a class=d target=_blank href=\"?tz=5&pz=1&s_date=" . dtconv($s_date) . "&f_date=" . dtconv($f_date) . "&qs=" . urlencode($row[0]) . "&sort=ho\">&gt;&gt;&gt;</a></td></tr>";
				}
				echo "<tr class=h><td></td><td align=left><b>Всего:</b></td><td><b>$vse</b></td><td align=left>из $cnt</td><td></td><td></td></tr></table>";
				norm(750);
				break;

			case 15:
				$z = "SELECT refer,ip,req FROM surf WHERE dt >= '$s_date' AND dt <= '$f_date' AND refer <> '' AND LOWER(refer) NOT LIKE '%://" . $site . "%' AND LOWER(refer) NOT LIKE '" . $site . "%' AND LOWER(refer) NOT LIKE '%://www." . $site . "%' AND (LOWER(refer) NOT LIKE '%yand%' AND LOWER(refer) NOT LIKE '%google.%' AND LOWER(refer) NOT LIKE '%go.mail.ru%' AND LOWER(refer) NOT LIKE '%rambler.%' AND LOWER(refer) NOT LIKE '%search.yahoo%' AND LOWER(refer) NOT LIKE '%search.msn%' AND LOWER(refer) NOT LIKE '%bing%' AND LOWER(refer) NOT LIKE '%search.live.com%' AND LOWER(refer) NOT LIKE '%?q=%' AND LOWER(refer) NOT LIKE '%&q=%' AND LOWER(refer) NOT LIKE '%query=%'" . $cot_m . ") AND" . $zp . (($sort == "ho" or empty($sort)) ? "GROUP BY ip,refer" : "");
				$res = mysql_query($z);
				while ($row = mysql_fetch_row($res))
				{
					preg_match("/(?:[^:]+)*(?::\/\/)*(?:www.)*([^\/]+)/iu", $row[0], $m);
					if (isset($str_f) and !mb_stristr($m[1], $str_f) and !empty($str_f)) continue;
					if (mb_stristr($m[1], ":")) continue;
					if ($sort != "hi") if ($ot[$m[1]][$row[1]] != 1) $ot[$m[1]][$row[1]] = 1; else continue;
					$othmas[] = $m[1];
					if ($pages == 1) $pmas[$m[1]][] = $row[2];
				}
				if (!isset($othmas)) {
					echo "<center>Нет данных</center>";
					break;
				}
				$newmas = array_count_values($othmas);
				arsort($newmas);
				$mmx = max($newmas);
				$cnt = array_sum($newmas);
				if ($pages == 1) foreach ($pmas as $key => $value) {
					$pmas[$key] = array_count_values($pmas[$key]);
					arsort($pmas[$key]);
				}
				echo "<table id=table align=center width=750 cellpadding=5 cellspacing=1 border=0><tr class=h><td width=40>№</td><td nowrap" . (($pages <> 1) ? " width=500" : " width=50%") . ">Переходы с домена" . (($pages <> 1) ? " <a class=e href=\"?" . str_replace(mb_stristr($_SERVER['QUERY_STRING'], '&pages'), "", $_SERVER['QUERY_STRING']) . "&pages=1\">+</a>" : "") . "</td>" . (($pages <> 1) ? "" : "<td width=50%>Страницы <a class=e href=\"?" . str_replace(mb_stristr($_SERVER['QUERY_STRING'], '&pages'), "", $_SERVER['QUERY_STRING']) . "&pages=0\">&ndash;</a></td>") . "<td width=50>" . (($sort == "hi") ? "Хиты" : "Хосты") . "</td><td width=100>График</td><td width=50>%</td></tr>";
				while (list($other, $val) = each($newmas))
				{
					if ($k == $pos) break;
					$k++;
					$vse += $val;
					if ($s == "s2") {
						$s = "s1";
						echo "<tr class=s1>";
					} else {
						$s = "s2";
						echo "<tr class=s2>";
					}
					echo "<td>$k</td>";
					echo "<td align=left><a target=_blank href=\"?tz=3&pz=1&s_date=" . dtconv($s_date) . "&f_date=" . dtconv($f_date) . "&qs=" . $other . "&sort=" . (empty($sort) ? "ho" : $sort) . "\">";
					if (mb_stristr($other, "xn--")) {
						$IDN = new idna_convert(array('idn_version' => 2008));
						echo $IDN->decode($other);
					} else echo $other;
					echo "</a></td>";
					if ($pages == 1) {
						echo "<td align=left style='overflow: hidden;text-overflow: ellipsis;'>";
						foreach ($pmas[$other] as $ks => $v) echo "<a href=\"" . $ks . "\" target=_blank>" . $ks . "</a><br>";
						echo "</td>";
					}
					echo "<td>$val</td>";
					echo "<td><img align=left src=px" . (($sort == "hi") ? "h" : "u") . ".gif width=" . ceil(($val * 100) / $mmx) . " height=11 border=0></td>";
					echo "<td>" . (number_format((($val * 100) / $cnt), 1, ',', '')) . "</td></tr>";
				}
				echo "<tr class=h><td></td><td align=left><b>Всего:</b></td>" . (($pages <> 1) ? "" : "<td></td>") . "<td><b>$vse</b></td><td align=left>из $cnt</td><td></td></tr></table>";
				norm(750);
				break;

			case 17:
				foreach ($fxo as $val)
				{
					$zs = "";
					$pf = "";
					if (empty($val)) continue;
					if (isset($fxn[$val])) foreach ($fxn[$val] as $vl) {
						list($s1, $s2) = explode("|", $vl);
						$zs .= $pf . "LOWER(" . $s1 . ") LIKE '%" . mb_strtolower($s2) . "%'";
						$pf = " OR ";
					}
					if ($sort == "hi") {
						$z = "SELECT COUNT(ip) FROM surf WHERE (" . $zs . ") AND dt >= '$s_date' AND dt <= '$f_date' AND" . $zp;
					} else {
						$z = "SELECT COUNT(DISTINCT ip) FROM surf WHERE (" . $zs . ") AND dt >= '$s_date' AND dt <= '$f_date' AND" . $zp;
					}
					$r = mysql_query($z);
					$d = mysql_result($r, 0, 1);
					$cnt[$val] = mysql_result($r, 0);
				}
				arsort($cnt);
				echo "<table id=table align=center width=750 cellpadding=5 cellspacing=1 border=0><tr class=h><td width=50>№</td><td width=500>fix-ы</td><td width=50>" . (($sort == "hi") ? "Хиты" : "Хосты") . "</td><td width=100>График</td><td width=50>%</td><td width=50>Детали</td></tr>";
				$mmx = max($cnt);
				$cn = array_sum($cnt);
				foreach ($cnt as $val => $co)
				{
					if ($co <> 0) {
						if ($k == $pos) break;
						$k++;
						if ($s == "s2") {
							$s = "s1";
							echo "<tr class=s1>";
						} else {
							$s = "s2";
							echo "<tr class=s2>";
						}
						echo "<td>$k</td>";
						echo "<td align=left><a target=_blank href=\"?s_date=" . dtconv($s_date) . "&f_date=" . dtconv($f_date) . "&item=fix&sort=" . $sort . "&qs=" . $val . "\">" . $val . "</a></td>";
						echo "<td>$co</td>";
						echo "<td><img align=left src=px" . (($sort == "hi") ? "h" : "u") . ".gif width=" . ceil(($co * 100) / $mmx) . " height=11 border=0></td>";
						echo "<td>" . (number_format((($co * 100) / $cn), 1, ',', '')) . "</td>";
						echo "<td><a class=d target=_blank href=\"?top=18&s_date=" . dtconv($s_date) . "&f_date=" . dtconv($f_date) . "&sort=" . $sort . "&qq=" . $val . "\">&gt;&gt;&gt;</a></td></tr>";
					}
				}
				echo "<tr class=h><td></td><td></td><td></td><td></td><td></td><td></td></tr></table>";
				break;

			case 18:
				$zs = "";
				$pf = "";
				if (mb_stristr(urldecode($qq), "xn--")) {
					$IDN = new idna_convert(array('idn_version' => 2008));
					$qq = $IDN->decode(urldecode($qq));
				}
				if (isset($fxn[$qq])) foreach ($fxn[$qq] as $vl) {
					list($s1, $s2) = explode("|", $vl);
					$zs .= $pf . "LOWER(" . $s1 . ") LIKE '%" . mb_strtolower($s2) . "%'";
					$pf = " OR ";
				}
				if ($s1 == "ip") $sort = "hi";
				if ($sort == "hi") {
					$z = "SELECT $s1, COUNT($s1) cnt FROM surf WHERE";
					if (!empty($str_f)) $z .= " $s1 LIKE '%$str_f%' AND";
					$z .= " (" . $zs . ") AND " . $zp . " AND dt >= '$s_date' AND dt <= '$f_date' GROUP BY $s1 ORDER BY 2 DESC";
					$res = mysql_query($z);

					$z2 = "SELECT SUM(t.cnt) FROM (" . $z . ") t";
					$r = mysql_query($z2);
				} else {
					$z = "CREATE TEMPORARY TABLE tmp_surf SELECT ip, $s1 FROM surf WHERE";
					if (!empty($str_f)) $z .= " $s1 LIKE '%$str_f%' AND";
					$z .= " (" . $zs . ") AND " . $zp . " AND dt >= '$s_date' AND dt <= '$f_date' GROUP BY ip,$s1";
					$z2 = "SELECT $s1, COUNT($s1) cnt FROM tmp_surf GROUP BY $s1 ORDER BY 2 DESC";
					$res = mysql_query($z);
					$res = mysql_query($z2);

					$z3 = "SELECT SUM(t.cnt) FROM (" . $z2 . ") t";
					$r = mysql_query($z);
					$r = mysql_query($z3);
				}
				$cnt = mysql_result($r, 0);

				echo "<table id=table align=center width=750 cellpadding=5 cellspacing=1 border=0><tr class=h><td width=50>№</td><td width=500>fix";
				echo "&nbsp;<span style='background-color:#dcdcdc;'>&nbsp;&nbsp;$qq&nbsp;&nbsp;</span>";
				echo "</td><td width=50>" . (($sort == "hi") ? "Хиты" : "Хосты") . "</td><td width=100>График</td><td width=50>%</td></tr>";
				while ($row = mysql_fetch_row($res))
				{
					if ($row[0] == "") $row[0] = "<font color=grey>неизвестно</font>";
					if ($k == 0) $max = $row[1];
					if ($k == $pos) break;
					$k++;
					$vse += $row[1];
					if ($s == "s2") {
						$s = "s1";
						echo "<tr class=s1>";
					} else {
						$s = "s2";
						echo "<tr class=s2>";
					}
					echo "<td>$k</td>";
					echo "<td align=left style='overflow: hidden;text-overflow: ellipsis;'>";
					if ($s1 == "refer" or $s1 == "req") echo "<a target=_blank href=\"" . $row[0] . "\">" . $row[0] . "</a>"; else
						if ($s1 == "ip") echo "<a target=_blank href=\"?item=ip&qs=" . $row[0] . "\">" . $row[0] . "</a>"; else
							if ($s1 == "host") echo "<a target=_blank href=\"?item=host&qs=" . $row[0] . "\">" . $row[0] . "</a>"; else
								echo $row[0];
					echo "</td>";
					echo "<td>" . $row[1] . "</td>";
					echo "<td><img align=left src=px" . (($sort == "hi") ? "h" : "u") . ".gif width=" . ceil(($row[1] * 100) / $max) . " height=11 border=0></td>";
					echo "<td>" . (number_format((($row[1] * 100) / $cnt), 1, ',', '')) . "</td></tr>";
				}
				echo "<tr class=h><td></td><td align=left><b>Всего:</b></td><td><b>$vse</b></td><td align=left>из $cnt</td><td></td></tr></table>";
				norm(750);
				break;

		}
		?>
	<script type="text/javascript">
		clip.reposition();
	</script>
	<?php
	}

	if (empty($_SERVER['QUERY_STRING'])) {
		hdr();
		if ($_COOKIE['alogin'] == $login and $_COOKIE['apass'] == $pass) ; else
			if ($_COOKIE['alogin'] == $ldemo and $_COOKIE['apass'] == $pdemo and !empty($_COOKIE['alogin']) and !empty($_COOKIE['apass'])) ; else accdeny();

		echo "<table align=center cellpadding=0 cellspacing=2 width=950 style=\"font-family: Tahoma, 'Lucida Grande'; font-size: 11px;\"><tr>
 <td width=" . ((APPLE == 1) ? "182" : "195") . "><b>Общая статистика</b></td>
 <td width=300><b>Статистика по месяцам</b></td>
 <td width=300><b>Статистика по дням</b></td>
 <td width=" . ((APPLE == 1) ? "168" : "155") . "><b>TOP отчёты</b></td></tr>";

		$ras = mysql_query("SELECT dt,cnt1,cnt2,cnt3,cnt4,cnt5 FROM mainh ORDER BY i");
		while ($rw = mysql_fetch_assoc($ras))
		{
			$dt_i = $rwz["dt"][] = $rw["dt"];
			$rwz["cnt1"][$dt_i] = $rw["cnt1"];
			$rwz["cnt2"][$dt_i] = $rw["cnt2"];
			$rwz["cnt3"][$dt_i] = $rw["cnt3"];
			$rwz["cnt4"][$dt_i] = $rw["cnt4"];
			$rwz["cnt5"][$dt_i] = $rw["cnt5"];
		}

		$rass = mysql_query("SELECT dt,god,cnt1,cnt2,cnt3,cnt4,cnt5 FROM mainp ORDER BY i");
		while ($rww = mysql_fetch_assoc($rass))
		{
			$dt_i = $rww["dt"] . $rww["god"];
			$rwzz[$dt_i]["cnt1"] = $rww["cnt1"];
			$rwzz[$dt_i]["cnt2"] = $rww["cnt2"];
			$rwzz[$dt_i]["cnt3"] = $rww["cnt3"];
			$rwzz[$dt_i]["cnt4"] = $rww["cnt4"];
			$rwzz[$dt_i]["cnt5"] = $rww["cnt5"];
		}

		$c = 0;
		$sdate = 0;
		$all_uniqs = 0;
		$all_hits = 0;
		$all_se = 0;
		$all_other = 0;
		$all_fix = 0;

		$r = mysql_query("SELECT DISTINCT day,dt FROM surf ORDER BY i");
		$fdate = mysql_result($r, mysql_num_rows($r) - 1, "dt");
		mysql_data_seek($r, 0);
		while ($dtm = mysql_fetch_row($r))
		{
			if (mb_substr($sdate, 4, 2) <> mb_substr($dtm[1], 4, 2) and $sdate <> 0) $c++;
			$sdate = $dtm[1];
			if ($dtm[1] != $fdate and !empty($rwz["cnt2"][$dtm[1]])) {
				$m_uniqs[$dtm[1]] = $rwz["cnt1"][$dtm[1]];
				$m_hits[$dtm[1]] = $rwz["cnt2"][$dtm[1]];
			} else list($m_uniqs[$dtm[1]], $m_hits[$dtm[1]]) = c_uniqs_hits($dtm[1]);
		}

		$max_hits = max($m_hits);
		$sdate = mysql_result($r, 0, "dt");

		if (is_float((count($m_hits) + $c) / 2)) $s = "s2"; else $s = "s1";

		$i = 0;
		mysql_data_seek($r, 0);
		while ($row = mysql_fetch_row($r))
		{
			$dt = $row[1];

			if (mb_substr($dt, 4, 2) <> mb_substr($sdate, 4, 2)) {
				$god = mb_substr($sdate, 0, 4);
				$sdate = $dt;
				if ((mb_substr($dt, 4, 2) - 1) <> 0) $dtt = mb_substr($dt, 4, 2) - 1; else $dtt = 12;
				if (mb_strlen($dtt) == 1) $dtt = "0" . $dtt;
				if (isset($rwzz[$dtt . $god])) {
					$dt_k = $dtt . $god;
					$all_uniqs = $rwzz[$dt_k]["cnt1"];
					$all_hits = $rwzz[$dt_k]["cnt2"];
					$all_se = $rwzz[$dt_k]["cnt3"];
					$all_other = $rwzz[$dt_k]["cnt4"];
					$all_fix = $rwzz[$dt_k]["cnt5"];
				} else {
					$all_uniqs = mysql_fetch_row(mysql_query("SELECT COUNT(DISTINCT ip) FROM surf WHERE dt LIKE '" . $god . $dtt . "%' AND " . $zp));
					$all_uniqs = $all_uniqs[0];
					mysql_query("INSERT INTO mainp(dt,god,cnt1,cnt2,cnt3,cnt4,cnt5) VALUES('" . $dtt . "','" . $god . "','" . $all_uniqs . "','" . $all_hits . "','" . $all_se . "','" . $all_other . "','" . $all_fix . "');");
					mysql_query("DELETE me FROM mainp as me, mainp as clone WHERE me.dt = clone.dt AND me.god = clone.god AND me.i > clone.i");
					$rwzz[$dtt . $god]["cnt1"] = $all_uniqs;
					$rwzz[$dtt . $god]["cnt2"] = $all_hits;
					$rwzz[$dtt . $god]["cnt3"] = $all_se;
					$rwzz[$dtt . $god]["cnt4"] = $all_other;
					$rwzz[$dtt . $god]["cnt5"] = $all_fix;
				}
				if ($s == "s2") {
					$s = "s1";
					$line[$i] .= "<tr class=s1>";
				} else {
					$s = "s2";
					$line[$i] .= "<tr class=s2>";
				}
				$line[$i] .= "<td colspan=2 align=right><b>Всего за " . $month[$dtt] . ":</b></td>";
				$line[$i] .= "<td><b>" . $all_uniqs . "</b></td>";
				$line[$i] .= "<td><b>" . $all_hits . "</b></td>";
				$line[$i] .= "<td><b>" . $all_se . "</b></td>";
				$line[$i] .= "<td><b>" . $all_other . "</b></td>" . (!isset($fx) ? "<td><b>" . (($_COOKIE['alogin'] <> $login or $_COOKIE['apass'] <> $pass) ? "x" : (!empty($all_fix) ? $all_fix : "x")) . "<b></td>" : "") . "<td></td></tr>";
				$all_uniqs = 0;
				$all_hits = 0;
				$all_se = 0;
				$all_other = 0;
				$all_fix = 0;
				$i++;
			}

			if ($dt != $fdate and isset($rwz["cnt3"][$dt])) {
				$m_se[$dt] = $rwz["cnt3"][$dt];
				$m_other[$dt] = $rwz["cnt4"][$dt];
				$m_fix[$dt] = $rwz["cnt5"][$dt];
			} else {
				$m_se[$dt] = c_se($dt);
				$m_other[$dt] = c_other($dt);
				if ($fx != 1) $m_fix[$dt] = c_fix($dt); else $m_fix[$dt] = 0;
				if ($dt != $fdate and !in_array($dt, $rwz["dt"])) {
					mysql_query("INSERT INTO mainh(dt,cnt1,cnt2,cnt3,cnt4,cnt5) VALUES('" . $dt . "','" . $m_uniqs[$dt] . "','" . $m_hits[$dt] . "','" . $m_se[$dt] . "','" . $m_other[$dt] . "','" . $m_fix[$dt] . "')");
					mysql_query("DELETE me FROM mainh as me, mainh as clone WHERE me.dt = clone.dt AND me.i > clone.i");
				}
			}

			if (!isset($rwzz[mb_substr($dt, 4, 2) . mb_substr($dt, 0, 4)])) {
				$all_uniqs += $m_uniqs[$dt];
				$all_hits += $m_hits[$dt];
				$all_se += $m_se[$dt];
				$all_other += $m_other[$dt];
				$all_fix += $m_fix[$dt];
			}

			if ($s == "s2") {
				$s = "s1";
				$line[$i] .= "<tr class=s1>";
			} else {
				$s = "s2";
				$line[$i] .= "<tr class=s2>";
			}
			$line[$i] .= "<td title=" . $month[mb_substr($dt, 4, 2)] . " nowrap>" . $dday[$row[0]] . dtconv($dt) . "</td>";

			if ($m_uniqs[$dt] == $m_hits[$dt]) $line[$i] .= "<td align=left style=\"padding-left: 8px;\"><img src=pxu.gif width=" . ceil((372 * $m_uniqs[$dt]) / $max_hits) . " height=11 border=0></td>";
			else $line[$i] .= "<td align=left style=\"padding-left: 8px;\"><img src=pxu.gif width=" . round((372 * $m_uniqs[$dt]) / $max_hits) . " height=11 border=0><img src=pxh.gif width=" . (ceil((372 * $m_hits[$dt]) / $max_hits) - ceil((372 * $m_uniqs[$dt]) / $max_hits) - 1) . " height=11 border=0></td>";

			$line[$i] .= "<td><a target=_blank href=\"?detail_ho=" . $dt . "\">" . $m_uniqs[$dt] . "</a></td><td><a target=_blank href=\"?detail_hi=" . $dt . "\">" . $m_hits[$dt] . "</a></td><td><a class=e target=_blank href=\"?detail_se=" . $dt . "\">" . $m_se[$dt] . "</a></td><td><a class=e target=_blank href=\"?detail_other=" . $dt . "\">" . $m_other[$dt] . "</a></td>" . (!isset($fx) ? "<td><a class=e target=_blank href=\"?fix=" . $dt . "\"><b>" . (($_COOKIE['alogin'] <> $login or $_COOKIE['apass'] <> $pass) ? "x" : (!empty($m_fix[$dt]) ? $m_fix[$dt] : "x")) . "</b></a></td>" : "");
			$line[$i] .= "<td><a class=d target=_blank href=\"?detail=" . $dt . "\">&gt;&gt;&gt;</a></td></tr>";
			$i++;
		}
		$eline = "<tr class=h><td></td><td></td><td></td><td></td><td></td><td></td><td></td>" . (!isset($fx) ? "<td></td>" : "") . "</tr></table>";

		if ($total = file("total.dat")) $total = explode("|", $total[0]);

		$all_uniqs = mysql_fetch_row(mysql_query("SELECT COUNT(DISTINCT ip) FROM surf WHERE " . $zp));

		$sline = "<tr>
        <td valign=top>
        <table cellpadding=0 cellspacing=0 style=\"font-family: Tahoma, 'Lucida Grande'; font-size: 11px; line-height:15px;\">
           <tr title='Только уникальные хосты, которые есть в БД'>
                <td>Всего хостов:</td>
                <td align=right style=padding-left:10px>" . $all_uniqs[0] . "</td>
           </tr>
            <tr title='Все хиты: из БД" . (isset($total[1]) ? " + по удаленным дням из total.dat" : "") . "'>
                <td>Всего хитов:</td>
                <td align=right style=padding-left:10px>" . (array_sum($m_hits) + $total[1]) . "</td>
            </tr>
            <tr title='Все хиты с поиска: из БД" . (isset($total[2]) ? " + по удаленным дням из total.dat" : "") . "'>
                <td>Всего с поиска:</td>
                <td align=right style=padding-left:10px>" . (array_sum($m_se) + $total[2]) . "</td>
            </tr>
            <tr title='Все хиты с других сайтов: из БД" . (isset($total[3]) ? " + по удаленным дням из total.dat" : "") . "'>
                <td>Всего с " . ((APPLE == 1) ? "др." : "других") . " сайтов:</td>
                <td align=right style=padding-left:10px>" . (array_sum($m_other) + $total[3]) . "</td>
            </tr>
            <tr>
                    <td colspan=2 style=padding-top:4px><a class=e target=_blank href='?lq=100'>Последние 100 запроса</a>
                    <br><a class=e target=_blank href='?ls=100'>Последние 100 других сайта</a></td>
            </tr>
        </table>
        </td>";


		$k = count($rwzz);
		foreach ($rwzz as $key => $val) {
			if ($k < 25) {
				$m_dt[] = $key;
				$m_gd[] = mb_substr($key, 2, 4);
				$m_mu[] = $val["cnt1"];
				$m_mh[] = $val["cnt2"];
			}
			$k--;
		}

		include "graph_months_utf8.php";

		if (count($m_hits) > 24) $k = count($m_hits) - 24; else $k = 0;
		$m_hits = array_slice($m_hits, $k, 24, true);
		$m_date = array_keys($m_hits);
		$m_hits = array_values($m_hits);
		$m_uniqs = array_slice($m_uniqs, $k, 24, false);

		include "graph_days_utf8.php";

		$sline .= "<td valign=top>" . $f_months . "<img id=map_months src=" . $login . "_months.png height=98 width=288 border=0 USEMAP=\"#map_months\"></td>
        <td valign=top>" . $f_days . "<img id=map_days src=" . $login . "_days.png height=98 width=288 border=0 USEMAP=\"#map_days\"></td>
        <td width=150 valign=top>
                <table bgcolor=#dcdcdc width=100% style=\"padding: 2px; padding-top: 3px; padding-bottom: 3px;margin-bottom: 3px;font-family: Tahoma, 'Lucida Grande'; font-size: 11px;\"><tr><form target=_blank action=''><td>
                <select id=top scrolling=\"no\" style=\"overflow-y:hidden;overflow:hidden; width: " . ((APPLE == 1) ? "157" : "144") . "px; font-family: Tahoma, 'Lucida Grande'; font-size: 11px;\" name=top onChange=\"seltop();\">
                        <option value=1>Поисковые запросы</option>
                        <option value=4>Поисковые системы</option>
                        <option value=15>Переходы с доменов</option>
                        <option value=3>Переходы с др. сайтов</option>
                        <option value=14>Точки входа на сайт</option>
                        <option value=16>Точки выхода с сайта</option>
                        <option value=2>Посещаемые страницы</option>
                        <option value=7>Роботы</option>
                        <option value=5>IP-адреса</option>
                        " . ((!isset($fx) and mb_stristr($u, "opera")) ? "" : "<option value=13>Proxy</option>") . "  
                        <option value=6>Хосты</option>
                        <option value=10>Зоны хостов (Страны)</option>
                        <option value=9>Языки</option>
                        <option value=12>User-Agent'ы</option>
                        <option value=11>Браузеры</option>
                        <option value=8>Время посещений</option>
                        " . (!isset($fx) ? "<option value=17>fix-ы</option>" : "") . "
                </select>
                </td></tr>
                <tr><td valign=middle>&nbsp;<span style=vertical-align:middle>Кол-во позиций:</span>&nbsp;
                                <select id=pos style=\"vertical-align: middle; width: " . ((mb_stristr($u, "Mobi") or mb_stristr($u, "MSIE 10") or (mb_stristr($u, "firefox") and mb_stristr($u, "mac"))) ? "50" : ((APPLE == 1) ? "50" : "52")) . "px; font-family: Tahoma, 'Lucida Grande'; font-size: 11px;\" name=pos>
                                        <option value=10 selected>10</option>
                                        <option value=20>20</option>
                                        <option value=100>100</option>
                                        <option value=99999>Все</option>
                                </select>
                </td></tr>
                <tr><td valign=middle>
                <input style=\"vertical-align: middle; width: " . ((mb_stristr($u, "MSIE 10") or (mb_stristr($u, "firefox") and mb_stristr($u, "mac"))) ? "32" : ((APPLE == 1) ? "38" : "34")) . "px; font-family: Verdana, 'Lucida Grande'; font-size: " . ((APPLE == 1) ? "10" : "9") . "px; font-weight: bold;\" type=submit value=\"Ok\"> " . ((APPLE == 1) ? "" : "&nbsp;") . "&nbsp;<span style=vertical-align:middle>Дни:</span>&nbsp;
                                <select style=\"width: " . ((APPLE == 1) ? "76" : "71") . "px; font-family: Tahoma, 'Lucida Grande'; font-size: 11px; vertical-align: middle;\" name=dy>
                                        <option value=1>Сегодня</option>
                                        <option value=2>Вчера</option>
                                        <option value=3 selected>ТМесяц</option>
                                        <option value=4>ПМесяц</option>
                                        <option value=5>Все</option>
                                </select>
                </td></form></tr></table>
                <div align=center>" . ((APPLE == 1) ? "<a class=e target=_blank href=?seek>Поиск</a> | <a class=e target=_blank href=?conf>Настройки</a> | <a class=e target=_blank href=?help>Помощь</a>" : "<a class=e target=_blank href=?seek style=padding-right:1px>Поиск</a> | <a class=e target=_blank href=?conf style=padding-right:1px;padding-left:1px>Настройки</a> | <a class=e target=_blank href=?help style=padding-left:1px>Помощь</a>") . "</div>
        </td>
</tr>
</table>
<br>";

		echo $sline;
		flush();
		?>
	<script type="text/javascript">
		function seltop() {
			if (document.getElementById("top").value == 17 || document.getElementById("top").value == 11 || document.getElementById("top").value == 8 || document.getElementById("top").value == 4)
				document.getElementById("pos").disabled = true;
			else document.getElementById("pos").disabled = false;
		}
	</script>
	<?php
		echo "<table align=center width=950 cellpadding=5 cellspacing=1 border=0 style='white-space:nowrap'>
  <tr class=h>
          <td width=80>Дата</td>
          <td>График</td>
          <td width=" . (isset($fx) ? "91" : "80") . ">Хосты</td>
          <td width=" . (isset($fx) ? "91" : "80") . ">Хиты</td>
          <td width=" . (isset($fx) ? "91" : "80") . ">С поиска</td>
          <td width=" . (isset($fx) ? "91" : "80") . ">С др. сайтов</td>";
		if (!isset($fx)) echo "<td width=40 title='Всего: " . (array_sum($m_fix) + $total[4]) . "'>fix</td>";
		echo "<td width=" . (isset($fx) ? "51" : "40") . ">Детали</td>
  </tr>";
		for ($i = count($line) - 1; $i > -1; $i--) echo $line[$i];
		echo $eline;
	}

	$mr = mysql_error();
	if (!empty($mr)) echo "<br><b>MySQL error:</b> " . $mr;

	$ddd = microtime();
	$ddd = ((double)mb_strstr($ddd, ' ') + (double)mb_substr($ddd, 0, mb_strpos($ddd, ' ')));
	echo "<div align=center style=\"font-family: Tahoma, 'Lucida Grande'; margin-top: 10px; font-size: 10px; font-weight: bold; color: #696969;\"><br>2013 &copy; Copyright by <a href=http://www.fri-stats.com>www.fri-stats.com</a> &nbsp;<a href=\"http://vk.com/i_fri\" title=\"Андрей Фри\" target=_blank><img src=\"flags/vk.png\" border=0 style=\"vertical-align:middle\"></a><div style=\"margin-top:-3px;\">Page generated: <font color=black>" . (number_format(($ddd - $ttt), 3)) . "</font> sec. &nbsp; <a href=?logout>Выйти</a></div></div><br><style type=\"text/css\"> body { cursor: auto; } </style></body></html>";

}

?>