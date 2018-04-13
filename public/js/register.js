
$('#submitBtn').click(function(){

  var obj = {};
  var form = document.getElementById("regForm");
  user = $('#userField').val();
  email = $('#emailField').val();

  obj.email = $('#emailField').val();
  obj.username = $('#userField').val();
  obj.password = $('#passField').val();

  $.ajax({
        type: "POST",
        data: JSON.stringify(obj),
        contentType: "application/json",
        url: "/register",
        success: function(data){
          if(user == data[0].username.empty() ){
            console.log('Username already exists, username: ' + user);
            $('.login-box').find("h5").remove();
            $('.login-box').append('<h5>Username already exists, username: ' + user + "<h5>");

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
          }
        }
  });
});
