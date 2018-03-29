// Get modal element
var modal = document.getElementById('infoModal');
//Get open modal button
//var modalBtn = document.getElementById('modalBtn'); For testing modal functionality
//Get close button
var closeBtn = document.getElementsByClassName('country-close')[0];
//Get modal content
var modalContent = document.getElementsByClassName('country-modal-content')[0];

var serverContent = document.getElementsByClassName('serverContent')[0];

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
  modal.style.display = "none";
}
