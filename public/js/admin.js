//Opens the customs tab by default
//document.getElementById("defaultOpen").click();

//Change the content depending on selected tab (placeholder function)
/*function category(evt, category) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(category).style.display = "block";
    evt.currentTarget.className += " active";
}
*/
//Displays the country picked on the dropdown
  var countno = 0;
    var testjson = [];
    var Suggestion;
$('#infoUpdate').change(function(){


  var countrySelected = $(this).val();
  console.log(countrySelected);
var countrySel = {"Country":countrySelected};
console.log(JSON.stringify(countrySel));
var delayInMilliseconds = 100; //1 second
//set the timeout to run the function
setTimeout(function()
{
  $(this).each(function(){
    testjson = [];

    $('#CountryTitle').text(countrySelected);
    $.ajax({
          type: "POST",
          data: JSON.stringify(countrySel),
          contentType: "application/json",
          url: "/Suggestion",
          success: function (data) {
          console.log('success', data);
          //response = JSON.parse(data);
          $.each(data, function(k, v) {
    var suggest_array = {};
    /// do stuff k number , v = data
    console.log(k, v);
    suggest_array.array = [];
    //suggest_array.array[k] = v;
    suggest_array.array.push(v);

    testjson.push(v);

  });
  console.log(testjson);
  console.log(testjson[1]);

  //here

  var c_length = testjson.length;
  //$('.textArea').text(testjson[countno].Country);
  $('#Suggest_Number').text(c_length);
  console.log(testjson[1]);
  console.log(testjson[countno].Identifier);
  console.log(testjson[countno].Suggestion);
  $('#Identifier').text(testjson[countno].Identifier);
  $('.textArea').text(testjson[countno].Suggestion);
  $('#country_id').text(testjson[countno]._id);
  console.log(testjson.length);
  //console.log(response[0]);


        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
         console.log('error', errorThrown);
       }


          });


  });
}, delayInMilliseconds);




});

$('#back').click(function(){
  var c_length = testjson.length;
  countno--;
  if(countno <0){


    countno = 0;
  }
//  $('.textArea').text(data);
  console.log(testjson[countno].Country);
  console.log(testjson[countno].Identifier);
  console.log(testjson[countno].Suggestion);
  $('#Identifier').empty();
  $('.textArea').empty();
  var delayInMilliseconds = 100; //1 second
  //set the timeout to run the function
  setTimeout(function()
  {
  //remove the submission successful as it only needs to be there for a little bit
  $('#Identifier').text(testjson[countno].Identifier);
  $('.textArea').text(testjson[countno].Suggestion);
    $('#country_id').text(testjson[countno]._id);
  //set the timeout to use the 2 second's defined previously
  }, delayInMilliseconds);

});
//console.log(testjson[1]);
 $('#next').click(function() {
  var c_length = testjson.length;
    countno++;
    if(countno > c_length){

        countno = c_length;

    }
    console.log(countno);
    console.log(testjson);
    console.log(testjson.length);
    //$('.textArea').text(data[countno]);
    console.log(testjson[1]);
    console.log(testjson[countno].Country);
    console.log(testjson[countno].Identifier);
    console.log(testjson[countno].Suggestion);
    $('#Identifier').empty();
    $('.textArea').empty();
    var delayInMilliseconds = 100; //1 second
    //set the timeout to run the function
    setTimeout(function()
    {
    //remove the submission successful as it only needs to be there for a little bit
    $('#Identifier').text(testjson[countno].Identifier);
    $('.textArea').text(testjson[countno].Suggestion);
      $('#country_id').text(testjson[countno]._id);
    //set the timeout to use the 2 second's defined previously
    }, delayInMilliseconds);

  //  console.log(response[1]);
  });
/* var Suggestions = 0;
 var array = [];
$.ajax({
      type: "GET",
      contentType: "application/json",
      url: "/all",
      success: function (data) {
      console.log('success', data);
      response = data;
      $.each(data, function(k, v) {
/// do stuff k number , v = data
console.log(k, v);
Suggestions++;
console.log(Suggestions);
array.push(v);

});

    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
     console.log('error', errorThrown);
   }


 });*/

      $.ajax({
            type: "GET",
            contentType: "application/json",
            url: "/Countries",
            success: function (data) {
            console.log('success', data);
            response = data;
            Suggestion = data;
            $.each(data, function (i, item) {
              console.log(i, item);
      $('#infoUpdate').prepend($('<option>', {
          value: item,
          text : item
      }));
  });
  console.log(Suggestion);

  if(Suggestion == NULL){


    $('#infoUpdate').hide();
    $('.contentContainer').append("<h3>There are currently no Suggestions!</h3>");
  }

          },
          error: function (XMLHttpRequest, textStatus, errorThrown) {
           console.log('error', errorThrown);
         }


            });


      //console.log(array);
      //console.log(array.length);



      $('#Accept').click(function(){
        var c_id = $('#country_id').text();
        var c_verified = {"_id":c_id};
        $.ajax({
              type: "POST",
              data: JSON.stringify(c_verified),
              contentType: "application/json",
              url: "/verified",
              success: function (data) {
              console.log('success', data);},
              error: function (XMLHttpRequest, textStatus, errorThrown) {
               console.log('error', errorThrown);
             }
              });

              $('#Identifier').text("");
              $('.textArea').text("");
              $('#country_id').text("");

              console.log(testjson.length);

              if(testjson.length >1){
                countno ++;
                var delayInMilliseconds = 1000; //1 second
                //set the timeout to run the function
                setTimeout(function()
                {
                //remove the submission successful as it only needs to be there for a little bit
                $('#Identifier').text(testjson[countno].Identifier);
                $('.textArea').text(testjson[countno].Suggestion);
                  $('#country_id').text(testjson[countno]._id);
                //set the timeout to use the 2 second's defined previously
                }, delayInMilliseconds);


              }

      });
      $('#Reject').click(function(){
        var c_id = $('#country_id').text();
        var c_delete = {"_id":c_id};
        $.ajax({
              type: "POST",
              data: JSON.stringify(c_delete),
              contentType: "application/json",
              url: "/delete",
              success: function (data) {
              console.log('success', data);},
              error: function (XMLHttpRequest, textStatus, errorThrown) {
               console.log('error', errorThrown);
             }
              });

              $('#Identifier').text("");
              $('.textArea').text("");
              $('#country_id').text("");

              console.log(testjson.length);

              if(testjson.length >1){
                countno ++;
                var delayInMilliseconds = 1000; //1 second
                //set the timeout to run the function
                setTimeout(function()
                {
                //remove the submission successful as it only needs to be there for a little bit
                $('#Identifier').text(testjson[countno].Identifier);
                $('.textArea').text(testjson[countno].Suggestion);
                  $('#country_id').text(testjson[countno]._id);
                //set the timeout to use the 2 second's defined previously
                }, delayInMilliseconds);


              }


      });
