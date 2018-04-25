// Get modal element
var modal = document.getElementById('infoModal');
//Get open modal button
//var modalBtn = document.getElementById('modalBtn'); For testing modal functionality
//Get close button
var closeBtn = document.getElementsByClassName('country-close')[0];
//Get modal content
var modalContent = document.getElementsByClassName('country-modal-content')[0];
//The server content div that will contain info retrieved from database
var serverContent = document.getElementsByClassName('serverContent')[0];
//Array that stores the array retrieved from the database
var testArray = [];

//When one of the tabs are clicked, the following occurs
$('#customsClick, #gesturesClick, #cultureClick, #lawClick').click(function(event){
  serverContent.style.display = "block";
});

//On click event for when the customs tab is clicked by the user
$('#customsClick').click(function(event){
  //The server content div is now shown.
  serverContent.style.display = "block";
  console.log(testArray);
  //Checks whether the array is empty or null: Means there is no customs info on the specified country
  if(testArray.length == 0 || testArray[0].customs == null || testArray[0].customs == "" ){
    //Message displayed to the user to inform them what has happened
    $('.serverContent').empty().append("We are sorry we do not have the information that you are looking for. If you would like to help us and fellow visitors, please login and provide us with new information by going to the Suggest page");
    }
    //If something has been retrieved, the following occurs,
   else{
    //Displays the customs info retrieved from the database
    $('.serverContent').empty().append(testArray[0].customs);
  }
 });

//On click event for when the gestures tab is clicked by the user
$('#gesturesClick').click(function(event){
  serverContent.style.display = "block";
  //Checks whether the array is empty or null: Means there is no gestures info on the specified country
  if(testArray.length == 0 || testArray[0].gestures == null || testArray[0].gestures == "" ){
   //Message displayed to the user to inform them what has happened
   $('.serverContent').empty().append("We are sorry we do not have the information that you are looking for. If you would like to help us and fellow visitors, please login and provide us with new information by going to the Suggest page");
   }
  //If something has been retreived, the following occurs
  else{
    //Displays the gestures info retrieved from the database
   $('.serverContent').empty().append(testArray[0].gestures);
 }
});

//On click event for when the culture tab is clicked by the user
$('#cultureClick').click(function(event){
  serverContent.style.display = "block";
  //Checks whether the array is empty or null: Means there is no culture info on the specified country
  if(testArray.length == 0 || testArray[0].cultures == null || testArray[0].cultures == ""  ){
  //Message displayed to the user to inform them what has happened
   $('.serverContent').empty().append("We are sorry we do not have the information that you are looking for. If you would like to help us and fellow visitors, please login and provide us with new information by going to the Suggest page");
   }
  //If something has been retrieved, the following occurs
  else{
    //Displays the culture info retrieved from the database
   $('.serverContent').empty().append(testArray[0].cultures);
 }
});

//On click event for when the law tab is clicked by the user
$('#lawClick').click(function(event){
  serverContent.style.display = "block";
  //Checks whether the array is empty or null: Means there is no law info on the specified country
  if(testArray.length == 0 || testArray[0].laws == null || testArray[0].laws == ""  ){
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
    //Test to check it works
    console.log(ctry);
    //Sets the hidden tag to the name of the country for the modal to use
    $('#Country').text(ctry);

    //Workaround for Congo due to API
    if(ctry.indexOf("Congo") != -1){
      ctry = "Congo";
    }
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
     serverContent.style.display = "block";
     //This is done so that when the modal opens, there is already information displayed
     if(testArray.length == 0 || testArray[0].customs == null ){
       //If there are no information for customs retrieved from the database, this message displays
       $('.serverContent').empty().append("We are sorry we do not have the information that you are looking for. If you would like to help us and fellow visitors, please login and provide us with new information by going to the Suggest page");
     }
     //Something retrieved from database, the following occurs
     else{
       //Displays the customs information retrieved from the database
       $('.serverContent').empty().append(testArray[0].customs);
     }
   }
  });


    map.closePopup();
    //Variable that stores the url request for the REST COUNTRIES API
    var countryPicked = 'https://restcountries.eu/rest/v2/name/' + ctry + '?fields=name;capital;languages;currencies;flag';

    //AJAX request to retrieve data from the external API
    $.ajax({
            url:countryPicked,
            dataType:'json',
            success: function(result, data){
            /*here we have a little bug fix, basically for the rest api, if you search india and Korea
            the first resonse so 0 is not what we want for india its a territory and for korea it brings
            the north back so this little ingenious counter fixes that by if country is india or Korea
            then count ++ so it = 1 then it will take the result[c] which is the count number.
            Alex 1 API 0*/
            var c = 0 ;
            if(ctry =="India" || ctry == "Korea"){
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
//modalBtn.addEventListener('click', openModal); For testing purposes
//Listen for close click
closeBtn.addEventListener('click', closeModal);

//Function to open modal
function openModal(ctry){
  //Displays modal on the screen
  modal.style.display = "block";
   };


//returnToMapButton.addEventListener('click', closeModal); for testing the modal

//Function to close modal
function closeModal(){
  delete ctry;
  modal.style.display = "none";
}
