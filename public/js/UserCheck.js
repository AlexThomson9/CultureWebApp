$(function() {
//localStorage.setItem("user_id", user_id);
//localStorage.setItem("User_Permission", User_Permission);
if (localStorage.getItem("user_id") == null){
  console.log("no one is logged in");
}else{
  console.log("you logged in Successfully");
  console.log(localStorage.getItem("user_id"));
  console.log(localStorage.getItem("User_Permission"));
  console.log(localStorage.getItem("username"));
  //as you are logged in , hide the options that are no longer
  //required and show new ones
  $('#LoggedIn').hide();
  $('#LoggedIn1').hide();
  $('#Logout').show();
  $('#Suggest').show();
  //if the user permission Admin
  if(localStorage.getItem("User_Permission") == "Admin" ){
    //show the link to the admin page
    $('#Admin').show();
  }
}

//if they click logout
$('#Logout').click(function(){
  //clear the session information
  localStorage.clear();
  //restore the menu back to default
  $('#LoggedIn').show();
  $('#LoggedIn1').show();
  $('#Logout').hide();
  $('#Suggest').hide();
    $('#Admin').hide();

window.location.replace("/");

});
});
