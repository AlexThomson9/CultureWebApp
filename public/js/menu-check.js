//Log url
console.log(window.location.href);
var url = window.location.href;
//If you are on the admin page then
if(!url.endsWith("/") == true){
  //add the admin css to that pages head only otherise the others will break

$('#Continent').hide();
}
