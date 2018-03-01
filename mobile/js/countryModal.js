// Get modal element
var modal = document.getElementById('infoModal');
//Get open modal button
var modalBtn = document.getElementById('modalBtn');
//Get close button
var closeBtn = document.getElementsByClassName('country-close')[0];
//Get modal content
var modalContent = document.getElementsByClassName('country-modal-content')[0];



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

//Function to close modal
function closeModal(){
  modal.style.display = "none";
}


function renderHTML(data){
  var htmlString = "this is a test";
  modalContent.insertAdjacentHTML('beforeend', htmlString);
  }
