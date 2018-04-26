//JQuery Validate library
$("#logForm").validate({
  rules: {
    //username and password are required fields
    username: "required",
    password: "required",
  },
  messages: {
    //feedback messages for the user
     username: "Please enter your username",
     password: "Please enter your password"
   }
})

$('#submitBtn').click(function(){
  //check if form has been validated
  $("#logForm").valid();

  if($("#logForm").valid() == false){
    return;
  }


  var obj = {};
  var form = document.getElementById("regForm");
  //get details from the inputs
  user = $('#userField').val();
  password = $('#passField').val();
  //set them in jquery
  obj.username = user;
  obj.password = password;
  //if they are null then do nothing
  if(obj.username == null || obj.password == null){
    return;
  }

  else{

    //post the login information to the database
  $.ajax({
        type: "POST",
        data: JSON.stringify(obj),
        contentType: "application/json",
        url: "/login",

        success: function(data){
        console.log(user);
          //if there is a response then they have an account
          if(data.length > 0){
            console.log(data);
            var delayInMilliseconds = 2000; //2 second
            //set the timeout to run the function
            setTimeout(function()
            {
            //remove the feedback and take them to the home page
            $('.login-box').find("h5").remove();
            window.location.replace("/");
            //set the timeout to use the 2 second's defined previously
          }, delayInMilliseconds);
            if(typeof(Storage) != "undefined"){


            //localstorage for the login session
            //set user variables to the variables retrieved from the database
            localStorage.setItem("user_id", data[0]._id);
            localStorage.setItem("User_Permission", data[0].perm);
            localStorage.setItem("username", data[0].username);
            //log to check that it is working properly
            console.log(localStorage.getItem("user_id"));
            console.log(localStorage.getItem("User_Permission"));
            console.log(localStorage.getItem("username"));
                }

            $('.login-box').find("h5").remove();
            //feedback to user
            $('.login-box').append("<h5>Logging in..<h5>");

          }else{
            //login unsuccessful
            $('.login-box').find("h5").remove();
            $('.login-box').append("<h5>User details entered incorrect, please try again!</h5>");
                //set the var to 2 sectons
                //clear the inputs
            $('#userField').val("");
            $('#passField').val("");

          }
        }
  });
 }
});
