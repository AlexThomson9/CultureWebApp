// Get modal element
var modal = document.getElementById('infoModal');
//Get open modal button
//var modalBtn = document.getElementById('modalBtn'); - For testing purposes
//Get close button
var closeBtn = document.getElementsByClassName('country-close')[0];
//Get modal content
var modalContent = document.getElementsByClassName('country-modal-content')[0];

//Get the top display and middle display divs
var hideTop = document.getElementsByClassName('top-display')[0];
var hideMiddle = document.getElementsByClassName('middle-display')[0];

//Get the server content div
var serverContent = document.getElementsByClassName('serverContent')[0];
//Get the buttons used in the modal
var returnToMapButton = document.getElementsByClassName('returnBtn')[0];
var returnToPopupMenu = document.getElementsByClassName('popReturn')[0];

var testArray = [];

//When one of the images is clicked on, the following occurs
$('#customsClick, #gesturesClick, #cultureClick, #lawClick').click(function(event){

  //Sets the top and middle display divs and the map return button to none
  hideTop.style.display = "none";
  hideMiddle.style.display = "none";
  returnToMapButton.style.display = "none";

  //Sets the return popup button and the content retrieved from the server to visible
  returnToPopupMenu.style.display = "block";
  serverContent.style.display = "block";
});


$('#customsClick').click(function(event){
  serverContent.style.display = "block";
  console.log(testArray);
   if(testArray.length == 0 || testArray[0].customs == null ){
    $('.serverContent').empty().append("We are sorry we do not have the information that you are looking for. If you would like to help us and fellow visitors, please login and provide us with new information by going to the Suggest page");
    }
   else{
    console.log("I got here wahoo");
    $('.serverContent').empty().append(testArray[0].customs);
    console.log("hi");
  }
 });

$('#gesturesClick').click(function(event){
  serverContent.style.display = "block";
  if(testArray.length == 0 || testArray[0].gestures == null ){
   $('.serverContent').empty().append("We are sorry we do not have the information that you are looking for. If you would like to help us and fellow visitors, please login and provide us with new information by going to the Suggest page");
   }
  else{
   $('.serverContent').empty().append(testArray[0].gestures);
 }


});

$('#cultureClick').click(function(event){
  serverContent.style.display = "block";
  if(testArray.length == 0 || testArray[0].traditions == null ){
   $('.serverContent').empty().append("We are sorry we do not have the information that you are looking for. If you would like to help us and fellow visitors, please login and provide us with new information by going to the Suggest page");
   }
  else{
   $('.serverContent').empty().append(testArray[0].traditions);
 }
});

$('#lawClick').click(function(event){
  serverContent.style.display = "block";
  if(testArray.length == 0 || testArray[0].laws == null ){
   $('.serverContent').empty().append("We are sorry we do not have the information that you are looking for. If you would like to help us and fellow visitors, please login and provide us with new information by going to the Suggest page");
   }
  else{
   $('.serverContent').empty().append(testArray[0].laws);
 }
});

//When the user clicks on a country on the map the following occurs
$(document).on("click", ".leaflet-marker-icon.leaflet-zoom-animated.leaflet-interactive", function(){
    //Sets variable to the name of the country clicked on
    var ctry = $(".leaflet-popup-content").text();
    console.log(ctry);
    //Sets the hidden tag to the name of the country for the modal to use
    $('#Country').text(ctry);
   // alert($('#Country').text());
   var country = {};
   country.name = ctry;

   $.ajax({
     type: "POST",
     data: JSON.stringify(country),
     contentType: "application/json",
     url: "/country",
     success: function(result){
       testArray = [];
       console.log(result);
       $.each(result, function(k, v) {
       var suggest_array = {};
       /// do stuff k number , v = data
       console.log(k, v);
       suggest_array.array = [];
       //suggest_array.array[k] = v;
       suggest_array.array.push(v);

       testArray.push(v);

     });

     console.log(testArray);
     serverContent.style.display = "block";
}});
    map.closePopup();
    var countryPicked = 'https://restcountries.eu/rest/v2/name/' + ctry + '?fields=name;capital;languages;currencies;flag';

    $.ajax({
            url:countryPicked,
            dataType:'json',
            success: function(result, data){

            var c = 0 ;
            if(ctry =="India"){
               c++
            }
            console.log(c);
            $(".restName").empty().append(result[c].name);
            $(".restLanguage").empty().append("Official Language: ", result[c].languages[0].name);
            $(".restCurrency").empty().append("Currency: ", result[0].currencies[0].symbol, " ", result[c].currencies[0].name);
            $(".flagImage").attr("src", result[c].flag);
            console.log(result[c].capital);
            //Calll for openModal function
            var delayInMilliseconds = 100; //1 second
            //set the timeout to run the function
            setTimeout(function()
            {
            //remove the submission successful as it only needs to be there for a little bit
              openModal(ctry);
            //set the timeout to use the 2 second's defined previously
            }, delayInMilliseconds);
          },
            error: function (data)
          {
            alert("Something went wrong, Please Try Again!");
          }

});
});
//Listen for open click
//modalBtn.addEventListener('click', openModal); - For testing the modal
//Listen for close click
closeBtn.addEventListener('click', closeModal);

//Function to open modal
function openModal(){
  modal.style.display = "block";
  serverContent.style.display = "none";
}


//The event listeners that check when the button has been clicked
returnToPopupMenu.addEventListener('click', closeInfo);
returnToMapButton.addEventListener('click', closeModal);

//Resets the modal divs when the user returns to the first menu of the modal
function closeInfo(){
  //Sets this to invisble again
  returnToPopupMenu.style.display = "none";
  serverContent.style.display = "none";

  //Sets the images to visible and the return to map button to visible again
  hideTop.style.display = "block";
  hideMiddle.style.display = "block";
  returnToMapButton.style.display = "block";
}

//Function to close modal
function closeModal(){
  modal.style.display = "none";
}
