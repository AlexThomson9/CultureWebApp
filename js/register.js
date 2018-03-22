//On click function when the submit button is clicked
$('#submitBtn').click(function () {
  //When backend is being done, the validation for checking entry will be moved into
  // it's own function which will be refered to here

  //JQuery Validate library
  $("#regForm").validate({
  rules: {
    username: "required",
    password: "required",
    email: {
      required: true,
      email: true
    },
  }
})
  //Boolean variable for ensuring validation has been met

  /*
  if (!$.trim($('#emailField').val())) {
          //If true message displayed to the user
           alert("Please enter your username");
           noIssue = false;
       }
  //Checks if anything has been entered into the username field
  if (!$.trim($('#userField').val())) {
          //If true message displayed to the user
           alert("Please enter your username");
           noIssue = false;
       }

  //Checks if anything has been entered into the password field
  if (!$.trim($('#passField').val())) {
          //If true message displayed to the user
           alert("Please enter your password");
           noIssue = false;
      }

  //If validation fails the page does not submit
  if (noIssue == false){
    return false;
  }*/

});
