$('#submitBtn').click(function(){
/*Why o why kill me now */
  var obj = {};
  var form = document.getElementById("regForm");
  user = $('#userField').val();
  password = $('#passField').val();



  obj.username = user;
  obj.password = password;

  $.ajax({
        type: "POST",
        data: JSON.stringify(obj),
        contentType: "application/json",
        url: "/login",

        success: function(data){
        console.log(user);

          if(data.length > 0){
            console.log(data);
            var delayInMilliseconds = 2000; //2 second
            //set the timeout to run the function
            setTimeout(function()
            {
            //remove the submission successful as it only needs to be there for a little bit
            $('.login-box').find("h5").remove();
            window.location.replace("/");
            //set the timeout to use the 2 second's defined previously
          }, delayInMilliseconds);
            if(typeof(Storage) != "undefined"){



            localStorage.setItem("user_id", data[0]._id);
            localStorage.setItem("User_Permission", data[0].perm);
            localStorage.setItem("username", data[0].username);
            console.log(localStorage.getItem("user_id"));
            console.log(localStorage.getItem("User_Permission"));
            console.log(localStorage.getItem("username"));
                }

            $('.login-box').find("h5").remove();
            $('.login-box').append("<h5>Logging in..<h5>");

          }else{
            $('.login-box').find("h5").remove();
            $('.login-box').append("<h5>User details entered incorrect, please try again!</h5>");
                //set the var to 2 sectons

                  form.reset();
          }
        }
  });
});
