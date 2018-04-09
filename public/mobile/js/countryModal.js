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

//When the user clicks on a country on the map the following occurs
$(document).on("click", ".leaflet-marker-icon.leaflet-zoom-animated.leaflet-interactive", function(){
  var ctry = $(".leaflet-popup-content").text();
  //Test to check it works
  console.log(ctry);
  //Sets the hidden tag to the name of the country for the modal to use
  $('#Country').text(ctry);
 // alert($('#Country').text());

  $(".leaflet-popup-content").remove();

  var countryPicked = 'https://restcountries.eu/rest/v2/name/' + ctry + '?fields=name;capital;languages;currencies;flag';

   $.ajax({
         url:countryPicked,
         dataType:'json',
         success: function(result){
           //In here loop through JSON file to display info
           $(".restName").empty().append(result[0].name);
           $(".restLanguage").empty().append(result[0].languages[0].name);
           $(".restCurrency").empty().append(result[0].currencies[0].name, result[0].currencies[0].code, result[0].currencies[0].symbol);
           $(".flagImage").attr("src", result[0].flag);
           console.log(result[0].capital);
       }
     });
  //Calll for openModal function
  openModal(ctry);
 // var test = feature.properties.Country;
  //console.log(test);
});

//Listen for open click
//modalBtn.addEventListener('click', openModal); - For testing the modal
//Listen for close click
closeBtn.addEventListener('click', closeModal);

//Function to open modal
function openModal(){
  modal.style.display = "block";
  var countryRequest = new XMLHttpRequest();
  countryRequest.open('GET', 'https://restcountries.eu/rest/v2/name/France?fields=name;capital;languages;currencies;flag')
  countryRequest.onload = function(){
    var countryData = JSON.parse(countryRequest.responseText);
    renderHTML(countryData);
   };
}

//Currently not finished - will get back to once Front end is done
function renderHTML(data){
  var htmlString = "this is a test";
  modalContent.insertAdjacentHTML('beforeend', htmlString);
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
  delete ctry;
  modal.style.display = "none";
}
