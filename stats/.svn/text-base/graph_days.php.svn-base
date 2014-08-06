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

$x1 = $x2 = 0;
$y1 = $y2 = 97;

imagestring($im, 1, 4, 3, "Monitoring: ".dtconv($m_date[0])." - ".dtconv($m_date[count($m_date)-1]), $black);

$mmx = max($m_hits);

if (count($m_uniqs) > 1)
{
 ImageLine($im, 4, 18, 4, 23, $hits); ImageLine($im, 5, 18, 5, 23, $hits);
 imagestring($im, 1, 8, 17, $mmx, ImageColorAllocate($im, 160, 160, 160));

 $ymx = round(97-round((84*$mmx)/$mmx)*(max($m_uniqs)/$mmx));
 if ($ymx < 39) $ymx = 39;
 ImageLine($im, 4, $ymx-3, 4, $ymx-8, $uniqs); ImageLine($im, 5, $ymx-3, 5, $ymx-8, $uniqs);
 imagestring($im, 1, 8, $ymx-9, max($m_uniqs), ImageColorAllocate($im, 160, 160, 160));

 $x1 = $x2 = 0;
 $y1 = 97-round((84*$m_hits[0])/$mmx);
 $y2 = round(97-round((84*$m_hits[0])/$mmx)*($m_uniqs[0]/$m_hits[0]));

 $f_days = "<MAP id=map_days NAME=map_days>";
 $dday = array(0=>"ВС:",1=>"ПН:",2=>"ВТ:",3=>"СР:",4=>"ЧТ:",5=>"ПТ:",6=>"СБ:");
 for ($i = 1; $i < count($m_hits); $i++)
 {
  $x11 = ($i*12)-1; $y11 = 97-round((84*$m_hits[$i])/$mmx); $d = dtconv($m_date[$i-1]);
  ImageLine($im, $x1, $y1, $x11, $y11, $hits); 
  $f_days .= "\n<AREA SHAPE=\"CIRC\" COORDS=\"$x1,$y1,4\" title=\"".$dday[date('w',strtotime($d))]." ".$d." - ".$m_hits[$i-1]." хитов\" href=\"javascript:void(0);\">";
  $y22 = round(97-round((84*$m_hits[$i])/$mmx)*($m_uniqs[$i]/$m_hits[$i]));
  ImageLine($im, $x2, $y2, $x11, $y22, $uniqs);
  $f_days .= "\n<AREA SHAPE=\"CIRC\" COORDS=\"$x2,$y2,4\" title=\"".$dday[date('w',strtotime($d))]." ".$d." - ".$m_uniqs[$i-1]." хостов\" href=\"javascript:void(0);\">";
  $x1 = $x2 = ($i*12)-1;
  $y1 = 97-round((84*$m_hits[$i])/$mmx);
  $y2 = round(97-round((84*$m_hits[$i])/$mmx)*($m_uniqs[$i]/$m_hits[$i])); 
 } $d = dtconv($m_date[$i-1]);
 $f_days .= "\n<AREA SHAPE=\"CIRC\" COORDS=\"$x1,$y1,4\" title=\"".$dday[date('w',strtotime($d))]." ".$d." - ".$m_hits[$i-1]." хитов\" href=\"javascript:void(0);\">";
 $f_days .= "\n<AREA SHAPE=\"CIRC\" COORDS=\"$x2,$y2,4\" title=\"".$dday[date('w',strtotime($d))]." ".$d." - ".$m_uniqs[$i-1]." хостов\" href=\"javascript:void(0);\">";
 $f_days .= "\n</MAP>";
}
 
ImagePNG($im, $login."_days.png");
imagedestroy($im);

?>