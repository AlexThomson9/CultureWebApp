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
  $('#LoggedIn').hide();
  $('#LoggedIn1').hide();
  $('#Logout').show();
  $('#Suggest').show();
  if(localStorage.getItem("User_Permission") == "Admin" ){
    $('#Admin').show();
  }
}


$('#Logout').click(function(){

  localStorage.clear();
  $('#LoggedIn').show();
  $('#LoggedIn1').show();
  $('#Logout').hide();
  $('#Suggest').hide();
    $('#Admin').hide();


});
});
