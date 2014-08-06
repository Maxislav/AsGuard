function azimut_ico(azimut){
var n_ico;
if (parseFloat(azimut)==0){
n_ico=0;    
}else{
n_ico = parseFloat(azimut)/15;
}
n_ico=n_ico+1;
//alert(parseInt(n_ico, 10));
//alert(parseInt(n_ico, 10));
return parseInt(n_ico, 10);
}