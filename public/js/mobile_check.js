//If statement that occurs if the user is on a mobile device
console.log(window.location.href);
if(window.location.href == "http://flood-toyota-8080.codio.io"){


if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
  //Redirects the user to the mobile version of the website
  $(location).attr('href', 'Mobile')
}
}
