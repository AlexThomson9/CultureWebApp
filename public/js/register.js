//JQuery Validate library
$("#regForm").validate({
  rules: {
    username:{
      required: true,
      minlength: 5,
      maxlength: 14
    },
    password:{
     required: true,
     minlength: 8,
     maxlength: 15,
   },
    email: {
      required: true,
      email: true
    },
  },
  messages: {
     username: "Please enter a username that is between 5-14 characters long",
     password: "Please enter a password that is between 8-15 characters long",
     email: "Please enter a valid email address"
   }
})

$('#submitBtn').click(function(){
  $("#regForm").valid();

  if($("#regForm").valid() == false){
    return;
  }

  var obj = {};
  var form = document.getElementById("logForm");
  user = $('#userField').val();
  email = $('#emailField').val();
  password = $('#passField').val();


  obj.email = email;
  obj.username = user;
  obj.password = password

  if(obj.email == null || obj.username == null || obj.password == null){
    return;
  }
  else{

  $.ajax({
        type: "POST",
        data: JSON.stringify(obj),
        contentType: "application/json",
        url: "/register",

        success: function(data){
        console.log(user)
          if(data.length > 0){
            $('.login-box').find("h5").remove();
            $('.login-box').append("<h5>Username or Email already in use <h5>");

          }else{
            $('.login-box').find("h5").remove();
            $('.login-box').append("<h5>Registration Successful, Now you will be redirected to the login page.</h5>");
                //set the var to 2 sectons
                    var delayInMilliseconds = 2000; //2 second
                    //set the timeout to run the function
                    setTimeout(function()
                    {
                    //remove the submission successful as it only needs to be there for a little bit
                    $('.login-box').find("h5").remove();
                    window.location.replace("login.html");
                    //set the timeout to use the 2 second's defined previously
                  }, delayInMilliseconds);
                  form.reset();
                  //squiggly boi
          }
        }
  });
 }
});
