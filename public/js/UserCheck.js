$(function() {
//localStorage.setItem("user_id", user_id);
//localStorage.setItem("User_Permission", User_Permission);
if (localStorage.getItem("user_id") == ""){
  console.log("no one is logged in");
}else{
  console.log("you logged in Successfully");
  console.log(localStorage.getItem("user_id"));
  console.log(localStorage.getItem("User_Permission"));
  console.log(localStorage.getItem("username"));
  var elem = document.getElementById('LoggedIn');
  elem.style.display = 'none'; // hide
  $('#LoggedIn').hide();

  $('#LoggedIn1').hide();
  $('#Suggest').show();
  if(localStorage.getItem("User_Permission") == "Admin" ){
    $('#Admin').show();
  }
}
});
