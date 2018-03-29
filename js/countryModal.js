// Get modal element
var modal = document.getElementById('infoModal');
//Get open modal button
//var modalBtn = document.getElementById('modalBtn'); For testing modal functionality
//Get close button
var closeBtn = document.getElementsByClassName('country-close')[0];
//Get modal content
var modalContent = document.getElementsByClassName('country-modal-content')[0];

var serverContent = document.getElementsByClassName('serverContent')[0];

//Variable that stores the country name
var ctry = "";
//When one of the tabs are clicked, the following occurs
//When the backend is implemented, more will done here
$('#customsClick, #gesturesClick, #cultureClick, #lawClick').click(function(event){
  serverContent.style.display = "block";
});

//When the user clicks on a country on the map the following occurs
$(document).on("click", ".leaflet-marker-icon.leaflet-zoom-animated.leaflet-interactive", function(){
    //Sets variable to the name of the country clicked on
    var ctry = $(".leaflet-popup-content").text();
    //Test to check it works
    console.log(ctry);
    //Sets the hidden tag to the name of the country for the modal to use
    $('#Country').text(ctry);
   // alert($('#Country').text());

     $(".leaflet-popup-content").remove();
    //Calll for openModal function
    openModal(ctry);
   // var test = feature.properties.Country;
    //console.log(test);
});
//Listen for open click
//modalBtn.addEventListener('click', openModal); For testing purposes
//Listen for close click
closeBtn.addEventListener('click', closeModal);

//Function to open modal
function openModal(){
  //Displays modal on the screen
  modal.style.display = "block";
  //Only started will be done when Front end is done
  var countryRequest = new XMLHttpRequest();
  var countryPicked = 'https://restcountries.eu/rest/v2/name/' + ctry + '?fields=name;capital;languages;currencies;flag';
  console.log(countryPicked);
  countryRequest.open('GET', countryPicked)
  console.log(countryRequest);
  countryRequest.onload = function(){
    var countryData = JSON.parse(countryRequest.responseText);
    renderHTML(countryData);
   };
}

function renderHTML(data){
  var htmlString = "this is a test";
  modalContent.insertAdjacentHTML('beforeend', htmlString);
  }

//returnToMapButton.addEventListener('click', closeModal); for testing the modal

//Function to close modal
function closeModal(){
  modal.style.display = "none";
}
