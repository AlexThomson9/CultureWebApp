// Get modal element
var modal = document.getElementById('infoModal');
//Get open modal button
var modalBtn = document.getElementById('modalBtn');
//Get close button
var closeBtn = document.getElementsByClassName('country-close')[0];
//Get modal content
var modalContent = document.getElementsByClassName('country-modal-content')[0];

var serverContent = document.getElementsByClassName('serverContent')[0];

//var returnToMapButton = document.getElementsByClassName('returnBtn')[0]; For testing purposes

$('#customsClick, #gesturesClick, #cultureClick, #lawClick').click(function(event){
  serverContent.style.display = "block";

});

$(document).on("click", ".leaflet-marker-icon.leaflet-zoom-animated.leaflet-interactive", function(){
    var ctry = $(".leaflet-popup-content").text();
    console.log(ctry);
    $('#Country').text(ctry);
   // alert($('#Country').text());
     $(".leaflet-popup-content").remove();
    console.log('i work');
    openModal(ctry);
   // var test = feature.properties.Country;
    //console.log(test);
});
//Listen for open click
modalBtn.addEventListener('click', openModal);
//Listen for close click
//closeBtn.addEventListener('click', closeModal); For testing the modal

//Function to open modal
function openModal(){
  modal.style.display = "block";  
  var countryRequest = new XMLHttpRequest();
  var countryPicked = 'https://restcountries.eu/rest/v2/name/' + ctry + '?fields=name;capital;languages;currencies;flag';
  console.log(countryPicked);
  countryRequest.open('GET', countryPicked)
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
