//Get country selected
var countrySelected = document.getElementById('country');

// Get modal element
var modal = document.getElementById('infoModal');
//Get open modal button
var modalBtn = document.getElementById('modalBtn');
//Get close button
var closeBtn = document.getElementsByClassName('country-close')[0];
//Get modal content
var modalContent = document.getElementsByClassName('country-modal-content')[0];

var hideTop = document.getElementsByClassName('top-display')[0];
var hideMiddle = document.getElementsByClassName('middle-display')[0];
var serverContent = document.getElementsByClassName('serverContent')[0];
var returnToMapButton = document.getElementsByClassName('returnBtn')[0];
var returnToPopupMenu = document.getElementsByClassName('popReturn')[0];


$('#customsClick, #gesturesClick, #cultureClick, #lawClick').click(function(event){

  hideTop.style.display = "none";
  hideMiddle.style.display = "none";
  returnToMapButton.style.display = "none";

  returnToPopupMenu.style.display = "block";
  serverContent.style.display = "block";

});

if (countrySelected.length > 0){
  function openModal();
}
//Listen for open click
modalBtn.addEventListener('click', openModal);
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

function renderHTML(data){
  var htmlString = "this is a test";
  modalContent.insertAdjacentHTML('beforeend', htmlString);
  }

returnToPopupMenu.addEventListener('click', closeInfo);
returnToMapButton.addEventListener('click', closeModal);

function closeInfo(){
  returnToPopupMenu.style.display = "none";
  serverContent.style.display = "none";

  hideTop.style.display = "block";
  hideMiddle.style.display = "block";
  returnToMapButton.style.display = "block";
}

//Function to close modal
function closeModal(){
  modal.style.display = "none";
  countrySelected = NULL;
}
