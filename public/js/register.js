
$('#submitBtn').click(function(){

  var obj = {};
  var form = document.getElementById("regForm");

  obj.email = $('#emailField').val();
  obj.username = $('#userField').val();
  obj.password = $('#passField').val();

  $.ajax({
        type: "POST",
        data: JSON.stringify(obj),
        contentType: "application/json",
        url: "/register"
        });




  $('#login-box').append("<h3>Registration Successful!</h3>");
      //set the var to 2 sectons
          var delayInMilliseconds = 2000; //2 second
          //set the timeout to run the function
          setTimeout(function()
          {
          //remove the submission successful as it only needs to be there for a little bit
          $('#login-box').find("h3").remove();
          //set the timeout to use the 2 second's defined previously
        }, delayInMilliseconds);



  form.reset();

});
