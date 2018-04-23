//Log url
console.log(window.location.href);
var url = window.location.href;
//If you are on the admin page then
if(url.indexOf("Admin") != -1){
  //add the admin css to that pages head only otherise the others will break
  $('head').append('<link rel="stylesheet" href="/css/admin.css" type="text/css" />');
}
