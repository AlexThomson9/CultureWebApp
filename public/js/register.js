//JQuery Validate library
$("#regForm").validate({
  rules: {
    //require username to not be null, and have a min and max length
    username:{
      required: true,
      minlength: 5,
      maxlength: 14
    },
    //require password to be true and have a min and max length
    password:{
     required: true,
     minlength: 8,
     maxlength: 15,
   },
   //require email to be true and for it to be a valid email
    email: {
      required: true,
      email: true
    },
  },
  //feedback messages for the user
  messages: {
     username: "Please enter a username that is between 5-14 characters long",
     password: "Please enter a password that is between 8-15 characters long",
     email: "Please enter a valid email address"
   }
});

$('#r_submitBtn').click(function(){
  //check the form was validated
  $("#regForm").valid();

  if($("#regForm").valid() == false){
    return;
  }

  var obj = {};
  var form = document.getElementById("logForm");
  //get the variables from the inputs
  user = $('#userField').val();
  email = $('#emailField').val();
  password = $('#passField').val();

  //put them into jquery
  obj.email = email;
  obj.username = user;
  obj.password = password
  //if any of the inputs is null then stop
  if(obj.email == null || obj.username == null || obj.password == null){
    return;
  }
  else{
    //post the data to the mongodb
  $.ajax({
        type: "POST",
        data: JSON.stringify(obj),
        contentType: "application/json",
        url: "/register",

        success: function(data){
        console.log(user)
        //if data is retrieved from the mongodb
          if(data.length > 0){
            $('.login-box').find("h5").remove();
            //user feedback
            $('.login-box').append("<h5>Username or Email already in use <h5>");

          }else{
            //username not taken if data.length is 0
            $('.login-box').find("h5").remove();
            //user feedback
            $('.login-box').append("<h5>Registration Successful, Now you will be redirected to the login page.</h5>");
                //set the var to 2 sectons
                    var delayInMilliseconds = 2000; //2 second
                    //set the timeout to run the function
                    setTimeout(function()
                    {
                    //after delay remove the feedback and redirect to the login page
                    $('.login-box').find("h5").remove();
                    window.location.replace("login.html");
                    //set the timeout to use the 2 second's defined previously
                  }, delayInMilliseconds);
                  //clear the form
                  form.reset();
                  //squiggly boi
          }
        }
  });
 }
});
