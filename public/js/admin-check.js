//Log url
console.log(window.location.href);
//If you are on the admin page then
if(window.location.href == "http://flood-toyota-8080.codio.io/Admin"){
  //add the admin css to that pages head only otherise the others will break
  $('head').append('<link rel="stylesheet" href="/css/admin.css" type="text/css" />');
}
