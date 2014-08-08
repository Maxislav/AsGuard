<?php
require_once('Browser.php');
$browser = new Browser();
$brr = $browser->getBrowser();
echo $brr;
include("index.html");
?>






