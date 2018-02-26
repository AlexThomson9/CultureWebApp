//If statement that occurs if the user is on a mobile device
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
  //Redirects the user to the mobile version of the website
  $(location).attr('href', 'mobile/mobile.html')
}
