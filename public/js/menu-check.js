//Log url
console.log(window.location.href);
var url = window.location.href;
//If you are not on the index page
if(url.endsWith("/") == false){
  //hide the contitent dropdown 
$('#Continent').hide();
}
