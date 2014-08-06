<?php

$im = ImageCreateTrueColor(288, 98);
if (function_exists('imageantialias')) imageantialias($im, true); 

$s1 = ImageColorAllocate($im, 220, 220, 220);
$s2 = ImageColorAllocate($im, 237, 237, 237);
$white = ImageColorAllocate($im, 255, 255, 255);
$black = ImageColorAllocate($im, 0, 0, 0);
$uniqs = ImageColorAllocate($im, 255, 69, 0);
$hits = ImageColorAllocate($im, 255, 169, 0);

ImageFilledRectangle($im, 0, 0, 287, 97, $white);

ImageRectangle($im, 0, 0, 287, 97, $s1);

for ($i = 1; $i < 24; $i++) ImageLine($im, ($i*12)-1, 1, ($i*12)-1, 96, $s2);
for ($i = 1; $i < 7; $i++) ImageLine($im, 1, ($i*14)-1, 286, ($i*14)-1, $s2);

if (count($m_mh) > 0)
{
 imagestring($im, 1, 4, 3, "Monitoring: ".date('F',mktime(0,0,0,substr($m_dt[0],0,2),1,0))." ".$m_gd[0]." - ".date('F',mktime(0,0,0,substr($m_dt[count($m_dt)-1],0,2),1,0))." ".$m_gd[count($m_gd)-1], $black);
 $mmx = max($m_mh);

if (count($m_mu) > 1)
{
 ImageLine($im, 4, 18, 4, 23, $hits); ImageLine($im, 5, 18, 5, 23, $hits);
 imagestring($im, 1, 8, 17, $mmx, ImageColorAllocate($im, 160, 160, 160));

 $ymx = round(97-round((84*$mmx)/$mmx)*(max($m_mu)/$mmx));
 if ($ymx < 39) $ymx = 39;
 ImageLine($im, 4, $ymx-3, 4, $ymx-8, $uniqs); ImageLine($im, 5, $ymx-3, 5, $ymx-8, $uniqs);
 imagestring($im, 1, 8, $ymx-9, max($m_mu), ImageColorAllocate($im, 160, 160, 160));
}

 $x1 = $x2 = 0;
 $y1 = 97-round((84*$m_mh[0])/$mmx);
 $y2 = round(97-round((84*$m_mh[0])/$mmx)*($m_mu[0]/$m_mh[0]));

 $f_months .= "<MAP id=map_months NAME=map_months>";
 for ($i = 1; $i < count($m_mh); $i++)
 {
  $x11 = ($i*12)-1; $y11 = 97-round((84*$m_mh[$i])/$mmx); $m = $month[substr($m_dt[$i-1],0,2)];
  ImageLine($im, $x1, $y1, $x11, $y11, $hits);
  $f_months .= "\n<AREA SHAPE=\"CIRC\" COORDS=\"$x1,$y1,4\" title=\"".$m." ".$m_gd[$i-1]." - ".$m_mh[$i-1]." хитов\" href=\"javascript:void(0);\">";
  $y22 = round(97-round((84*$m_mh[$i])/$mmx)*($m_mu[$i]/$m_mh[$i]));
  ImageLine($im, $x2, $y2, $x11, $y22, $uniqs);
  $f_months .= "\n<AREA SHAPE=\"CIRC\" COORDS=\"$x2,$y2,4\" title=\"".$m." ".$m_gd[$i-1]." - ".$m_mu[$i-1]." хостов\" href=\"javascript:void(0);\">";
  $x1 = $x2 = ($i*12)-1;
  $y1 = 97-round((84*$m_mh[$i])/$mmx);
  $y2 = round(97-round((84*$m_mh[$i])/$mmx)*($m_mu[$i]/$m_mh[$i]));
 } $m = $month[substr($m_dt[$i-1],0,2)];
 $f_months .= "\n<AREA SHAPE=\"CIRC\" COORDS=\"$x1,$y1,4\" title=\"".$m." ".$m_gd[$i-1]." - ".$m_mh[$i-1]." хитов\" href=\"javascript:void(0);\">";
 $f_months .= "\n<AREA SHAPE=\"CIRC\" COORDS=\"$x2,$y2,4\" title=\"".$m." ".$m_gd[$i-1]." - ".$m_mu[$i-1]." хостов\" href=\"javascript:void(0);\">";
 $f_months .= "\n</MAP>";
} else imagestring($im, 1, 4, 3, "Monitoring: ".date("F o"), $black);

ImagePNG($im, $login."_months.png");
imagedestroy($im);

?>