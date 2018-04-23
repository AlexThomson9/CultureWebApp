//Define countno, testjson array and suggestion which are used for
//displaying the appropriate information
    var countno = 0;
    var testjson = [];
    var Suggestion;
    //Ajax request To get all of the countries from the mongoDB
    //that have a suggestion
    $.ajax({
          type: "GET",
          contentType: "application/json",
          url: "/Countries",
          //IF success
          success: function (data) {
          console.log('success', data);
          response = data;
          //set sugegstion = data for use later
          Suggestion = data;
          //For each country retrieved(Distinct)
          $.each(data, function (i, item) {
            console.log(i, item);
            //Put the country retirved into the dropdown, set both value and text
            //to the country
            $('#infoUpdate').prepend($('<option>', {
                value: item,
                text : item
            }));
    });
    //Log the array
    console.log(Suggestion);
    //if the suggestion array length = 0 then
    if(Suggestion.length == 0){
    //hide the dropdown
    $('#infoUpdate').hide();
    //display a message stating there are no current suggestions
    $('.contentContainer').prepend("<h3>There are currently no Suggestions!</h3>");
    }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
         console.log('error', errorThrown);
       }
          });
//Upon the dropwdown change
$('#infoUpdate').change(function(){
  //set country selected to the dropdown menu chosen
  var countrySelected = $(this).val();
  //Log for testing
  console.log(countrySelected);
  //Put the country selected into the format i need for json/mongodb
  var countrySel = {"Country":countrySelected};
  console.log(JSON.stringify(countrySel));
  //set a small delay of 0.1 seconds
var delayInMilliseconds = 100;
//set the timeout to run the function
setTimeout(function()
{
  //on each change
  $(this).each(function(){
    //reset the array
    testjson = [];
    //set country title to the one selected in the dropdown
    $('#CountryTitle').text(countrySelected);
    //Ajax request to get suggestions from the server/mongodb
    $.ajax({
          type: "POST",
          data: JSON.stringify(countrySel),
          contentType: "application/json",
          //Get /Suggestion from the server
          url: "/Suggestion",
          //If success
          success: function (data) {
          console.log('success', data);
          //For each row retrieved put key and value into the function
          $.each(data, function(k, v) {
                var suggest_array = {};
                /// do stuff k number , v = data
                console.log(k, v);
                suggest_array.array = [];
                //suggest_array.array[k] = v;
                suggest_array.array.push(v);
                //push the value into the array
                testjson.push(v);

          });
              //log to check that it works
              console.log(testjson);
              console.log(testjson[1]);

  //set c_length to the array length so the total number of the suggestions for
  //that specific country
  var c_length = testjson.length;
  //set the to display the number of suggestions
  $('#Suggest_Number').text(c_length);
  //Log to check that its functioning
  console.log(testjson[1]);
  console.log(testjson[countno].Identifier);
  console.log(testjson[countno].Suggestion);
  //Set to display the data retrieved for each suggestion retrieved.
  $('#Identifier').text(testjson[countno].Identifier);
  $('.textArea').text(testjson[countno].Suggestion);
  $('#country_id').text(testjson[countno]._id);
  //Log json.length
  console.log(testjson.length);
  //console.log(response[0]);
        },
        //if ajax request errors
        error: function (XMLHttpRequest, textStatus, errorThrown) {
         console.log('error', errorThrown);
       }
          });
  });
}, delayInMilliseconds);
});
//when back is clicked
$('#back').click(function(){
  //get the length of the array to a variable again
  var c_length = testjson.length;
  //count -1
  countno--;
  //can't go below 0
  if(countno <0){
    countno = 0;
  }
  //Log output data
  console.log(testjson[countno].Country);
  console.log(testjson[countno].Identifier);
  console.log(testjson[countno].Suggestion);
  //empty the two variables that will change to ensure no merging issues
  $('#Identifier').empty();
  $('.textArea').empty();
  //set a 0.1 second delay before changing the data
  var delayInMilliseconds = 100;
  //set the timeout to run the function
  setTimeout(function()
  {
  //set the variables to the new suggestion, when they have went back
  $('#Identifier').text(testjson[countno].Identifier);
  $('.textArea').text(testjson[countno].Suggestion);
  $('#country_id').text(testjson[countno]._id);
  //set the timeout to use the 0.1 second's defined previously
  }, delayInMilliseconds);

});
//If next is clicked
 $('#next').click(function() {
   //get array length
  var c_length = testjson.length;
  //count +1
    countno++;
    //can't go above the number of suggestions
    if(countno > c_length){

        countno = c_length;

    }
    //Log everything for testing
    console.log(countno);
    console.log(testjson);
    console.log(testjson.length);
    console.log(testjson[1]);
    console.log(testjson[countno].Country);
    console.log(testjson[countno].Identifier);
    console.log(testjson[countno].Suggestion);
    //Empty the suggestion data that doesn't change
    $('#Identifier').empty();
    $('.textArea').empty();
    //0.1 second delay
    var delayInMilliseconds = 100;
    //set the timeout to run the function
    setTimeout(function()
    {
    //set the suggestion the next one from the array
    $('#Identifier').text(testjson[countno].Identifier);
    $('.textArea').text(testjson[countno].Suggestion);
      $('#country_id').text(testjson[countno]._id);
    //set the timeout to use the 2 second's defined previously
    }, delayInMilliseconds);
  });
      //If submission is approved
      $('#Accept').click(function(){
        //get the id for the database
        var c_id = $('#country_id').text();
        //set the id to the json object
/*
        var c_verified = {};
        c_verified._id = c_id;
        c_verified.name = $('#CountryTitle').text();
        c_verified.Identifier =   $('#Identifier').text();
        c_verified.Suggestion =   $('.textArea').text();
        */
        var c_name = $('#CountryTitle').text();
        var Suggestion = $('.textArea').text();
         var Identifier = $('#Identifier').text();

        var c_verified = {"_id":c_id, "name":c_name, $('#Identifier').text(); :Suggestion};
        //Yet another ajax request to the verified
        $.ajax({
              type: "POST",
              data: JSON.stringify(c_verified),
              contentType: "application/json",
              url: "/verified",
              //if success
              success: function (data) {
                //Put feedback to show that record is approved
                $('#Customs').append("<h3>Record Approved Successfully!</h3>");
                var delayInMilliseconds = 2000; //2 second
                //set the timeout to run the function
                setTimeout(function()
                {
                //remove the feedback after 2 seconds
                $('#Customs').find("h3").remove();
                //set the timeout to use the 2 second's defined previously
              }, delayInMilliseconds);
              console.log('success', data);},
              //if it errors
              error: function (XMLHttpRequest, textStatus, errorThrown) {
               console.log('error', errorThrown);
             }
              });
              //clear all the data to show it was deleted
              $('#Identifier').text("");
              $('.textArea').text("");
              $('#country_id').text("");
              //log array lenght
              console.log(testjson.length);
              //if array is longer than 1
              if(testjson.length >1){
                //count +1
                countno ++;
                var delayInMilliseconds = 1000; //1 second
                //set the timeout to run the function
                setTimeout(function()
                {
                //set the data to the next array entry
                $('#Identifier').text(testjson[countno].Identifier);
                $('.textArea').text(testjson[countno].Suggestion);
                  $('#country_id').text(testjson[countno]._id);
                //set the timeout to use the 1 second's defined previously
                }, delayInMilliseconds);
              }
      });
      //If submission is rejected
      $('#Reject').click(function(){
        //get the country _id
        var c_id = $('#country_id').text();
        //put variable into json format
        var c_delete = {"_id":c_id};
        //oh whats this? your right another ajax request, but this time its to delete
        //the rejected suggestion
        $.ajax({
              type: "POST",
              data: JSON.stringify(c_delete),
              contentType: "application/json",
              //delete
              url: "/delete",
              //if success
              success: function (data) {
                //set feedback to show it was deleted
                $('#Customs').append("<h3>Record Deleted Successfully!</h3>");
                var delayInMilliseconds = 2000; //2 seconds
                //set the timeout to run the function
                setTimeout(function()
                {
                //remove the feedback after 2 seconds
                $('#Customs').find("h3").remove();
                //set the timeout to use the 2 second's defined previously
              }, delayInMilliseconds);
              console.log('success', data);},
              //get errors if the ajax request fails
              error: function (XMLHttpRequest, textStatus, errorThrown) {
               console.log('error', errorThrown);
             }
              });
              //clear the suggestion information
              $('#Identifier').text("");
              $('.textArea').text("");
              $('#country_id').text("");
              //log arary length
              console.log(testjson.length);
              //if array is longer than 1
              if(testjson.length >1){
                //count +1
                countno ++;
                var delayInMilliseconds = 1000; //1 second
                //set the timeout to run the function
                setTimeout(function()
                {
                //set the suggestion to the next one in the array
                $('#Identifier').text(testjson[countno].Identifier);
                $('.textArea').text(testjson[countno].Suggestion);
                  $('#country_id').text(testjson[countno]._id);
                //set the timeout to use the 1 second defined previously
                }, delayInMilliseconds);


              }


      });
