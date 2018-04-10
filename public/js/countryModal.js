// Get modal element
var modal = document.getElementById('infoModal');
//Get open modal button
//var modalBtn = document.getElementById('modalBtn'); For testing modal functionality
//Get close button
var closeBtn = document.getElementsByClassName('country-close')[0];
//Get modal content
var modalContent = document.getElementsByClassName('country-modal-content')[0];

var serverContent = document.getElementsByClassName('serverContent')[0];

var testArray = [];

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
console.log(testArray[0]);
    }
  });
    console.log(testArray);
    console.log(testArray[0]);
    $(".serverContent").empty().append(testArray.customs);

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
            $(".restLanguage").empty().append(result[c].languages[0].name);
            $(".restCurrency").empty().append(result[c].currencies[0].name, result[0].currencies[0].code, result[0].currencies[0].symbol);
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
