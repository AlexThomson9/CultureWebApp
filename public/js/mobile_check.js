//Log what the URl is for the site to get what page its on
console.log(window.location.href);
//If the window url (page) is equal to the home page or index then continue
if(window.location.href == "http://flood-toyota-8080.codio.io/"){

//if the device is mobile then continue
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
  //Redirects the user to the mobile version of the website
  $(location).attr('href', 'Mobile-index')
}
}
