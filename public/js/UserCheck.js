
//localStorage.setItem("user_id", user_id);
//localStorage.setItem("User_Permission", User_Permission);
if (localStorage.getItem("user_id") == ""){
  console.log("no one is logged in");
}else{
  $('.LoggedIn').hide();
  $('Suggest').show();
  if(localStorage.getItem("User_Permission") == "Admin" ){
    $('.Admin').show();
  }
}
