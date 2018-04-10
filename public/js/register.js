
$('#submitBtn').click(function(){

  var obj = {};

  obj.email = $('#emailField').val();
  obj.username = $('#userField').val();
  obj.password = $('#passField').val();

  $.ajax({
        type: "POST",
        data: JSON.stringify(obj),
        contentType: "application/json",
        url: "/register"
        });

});
