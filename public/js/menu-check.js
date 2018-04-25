//Log url
console.log(window.location.href);
var url = window.location.href;
//If you are on the index page then
if(url.endsWith("/") == false){
  //hide the contitent dropdown 
$('#Continent').hide();
}
