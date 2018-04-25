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

//Array that will store the information of country retreived from database
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

//On click event for when the customs image is clicked by the user
$('#customsClick').click(function(event){
  //The server content div can now be seen again
  serverContent.style.display = "block";
  console.log(testArray);
  //Checks whether the array is empty or null: Means there is no customs info on the specified country
   if(testArray.length == 0 || testArray[0].customs == null ){
    //Message displayed to user to inform them what has happened
    $('.serverContent').empty().append("We are sorry we do not have the information that you are looking for. If you would like to help us and fellow visitors, please login and provide us with new information by going to the Suggest page");
    }
   //If something has been retrieved the following occurs
   else{
    console.log("I got here wahoo");
    //Displays the customs info retrieved from the database
    $('.serverContent').empty().append(testArray[0].customs);
    console.log("hi");
  }
 });

//On click event for when the gestures image is clicked by the user
$('#gesturesClick').click(function(event){
  //The server content div can now be seen again
  serverContent.style.display = "block";
  //Checks whether the array is empty or null: Means there is no gestures info on the specified country
  if(testArray.length == 0 || testArray[0].gestures == null ){
    //Message displayed to the user to inform them what has happened
   $('.serverContent').empty().append("We are sorry we do not have the information that you are looking for. If you would like to help us and fellow visitors, please login and provide us with new information by going to the Suggest page");
   }
   //IF something has been retrived, the following occurs
  else{
    //Displays the gestures info retrieved from the database
   $('.serverContent').empty().append(testArray[0].gestures);
 }
});

//On click event for when the culture image is clicked by the user
$('#cultureClick').click(function(event){
  //The server content div can now be seen again
  serverContent.style.display = "block";
  //Checks whether the array is empty or null: Means there is no culture info on the specified country
  if(testArray.length == 0 || testArray[0].cultures == null ){
   //Message displayed to the user to inform them what has happened
   $('.serverContent').empty().append("We are sorry we do not have the information that you are looking for. If you would like to help us and fellow visitors, please login and provide us with new information by going to the Suggest page");
   }
  //If something has been retrieved, the following occurs
  else{
    //Displays the culture info retrieved from the database
   $('.serverContent').empty().append(testArray[0].cultures);
 }
});

//On click event for when the law image is clicked by the user
$('#lawClick').click(function(event){
  //The server content div can now be seen again
  serverContent.style.display = "block";
  //Checks whether the array is empty or null: Means there is no law info on the specified country
  if(testArray.length == 0 || testArray[0].laws == null ){
   //Message displayed to the user to inform them what has happened
   $('.serverContent').empty().append("We are sorry we do not have the information that you are looking for. If you would like to help us and fellow visitors, please login and provide us with new information by going to the Suggest page");
   }
   //If something has been retrieved, the following occurs
  else{
   //Displays the law info retrieved from the database
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

//AJAX request that gets the country information from the database
   $.ajax({
     type: "POST",
     data: JSON.stringify(country),
     contentType: "application/json",
     url: "/country",
     //If successful, the data retrieved is inserted into the testArray variable
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

}});
    //Closes popup to prevent the information being carried over to the next one
    map.closePopup();
    //Variable that stores the url request for the REST COUNTRIES API
    var countryPicked = 'https://restcountries.eu/rest/v2/name/' + ctry + '?fields=name;capital;languages;currencies;flag';

    //AJAX request to retrieve data from the external API
    $.ajax({
            url:countryPicked,
            dataType:'json',

            //If something is returned, the following occurs
            success: function(result, data){

            //Workaround as the API returns India as a overseas territory
            var c = 0 ;
            if(ctry =="India"){
               c++
            }
            console.log(c);
            //Appends the country name retrieved from the API
            $(".restName").empty().append(result[c].name);
            //Appends the language retrieved from API
            $(".restLanguage").empty().append("Official Language: ", result[c].languages[0].name);
            //Appends the currency used by the country from the API
            $(".restCurrency").empty().append("Currency: ", result[0].currencies[0].symbol, " ", result[c].currencies[0].name);
            //Changes the stock image to the image of the country selected via the API
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
  //This is done in the event that an error occured
  //So that every time the modal opens, you will only see
  //the images of culture, laws, etc...
  serverContent.style.display = "none";
  hideTop.style.display = "block";
  hideMiddle.style.display = "block";

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
  serverContent.style.display = "none";
  hideTop.style.display = "block";
  hideMiddle.style.display = "block";
  returnToMapButton.style.display = "block";
  modal.style.display = "none";

}
