$('#submitBtn').click(function(){
/* Why me */
  var obj = {};
  var form = document.getElementById("logForm");
  user = $('#userField').val();
  email = $('#emailField').val();
  password = $('#passField').val();


  obj.email = email;
  obj.username = user;
  obj.password = password


  $.ajax({
      type: "GET",
      url: "https://trumail.io/json/"+email +"";
      success: function(data){
        console.log("success", data);


      }

  });

  $.ajax({
        type: "POST",
        data: JSON.stringify(obj),
        contentType: "application/json",
        url: "/register",

        success: function(data){
        console.log(user)
          if(data.length > 0){
            $('.login-box').find("h5").remove();
            $('.login-box').append("<h5>Username or Email already in use : <h5>");

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
});
