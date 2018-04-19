// Get modal element
var modal = document.getElementById('infoModal');
//Get open modal button
//var modalBtn = document.getElementById('modalBtn'); For testing modal functionality
//Get close button
var closeBtn = document.getElementsByClassName('country-close')[0];
//Get modal content
var modalContent = document.getElementsByClassName('country-modal-content')[0];

var serverContent = document.getElementsByClassName('serverContent')[0];

<<<<<<< HEAD
var testArray = [];

=======
>>>>>>> origin/Olek
//When one of the tabs are clicked, the following occurs
//When the backend is implemented, more will done here
$('#customsClick, #gesturesClick, #cultureClick, #lawClick').click(function(event){
  serverContent.style.display = "block";
});

<<<<<<< HEAD
$('#customsClick').click(function(event){
  serverContent.style.display = "block";
  $('.serverContent').empty().append(testArray[0].customs);
});

$('#gesturesClick').click(function(event){
  serverContent.style.display = "block";
  $('.serverContent').empty().append(testArray[0].gestures);
});

$('#cultureClick').click(function(event){
  serverContent.style.display = "block";
  $('.serverContent').empty().append(testArray[0].traditions);
});

$('#lawClick').click(function(event){
  serverContent.style.display = "block";
  $('.serverContent').empty().append(testArray[0].laws);
});
=======
>>>>>>> origin/Olek
//When the user clicks on a country on the map the following occurs
$(document).on("click", ".leaflet-marker-icon.leaflet-zoom-animated.leaflet-interactive", function(){
    //Sets variable to the name of the country clicked on
    var ctry = $(".leaflet-popup-content").text();
<<<<<<< HEAD

=======
>>>>>>> origin/Olek
    //Test to check it works
    console.log(ctry);
    //Sets the hidden tag to the name of the country for the modal to use
    $('#Country').text(ctry);
   // alert($('#Country').text());
<<<<<<< HEAD
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
serverContent.style.display = "block";
$(".serverContent").empty().append(testArray[0].customs);
    }
  });
    console.log(testArray);
    console.log(testArray[0]);


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
=======
     map.closePopup();
    // $(".leaflet-popup-content").empty();

     var countryPicked = 'https://restcountries.eu/rest/v2/name/' + ctry + '?fields=name;capital;languages;currencies;flag';

     $.ajax({
           url:countryPicked,
           dataType:'json',
           success: function(result, data){

             /*if(ctry == "India"){
               $(".restName").empty().append(result[1].name);
               $(".restLanguage").empty().append(result[1].languages[0].name);
               $(".restCurrency").empty().append(result[1].currencies[0].name, result[0].currencies[0].code, result[0].currencies[0].symbol);
               $(".flagImage").attr("src", result[1].flag);
               console.log(result[1].capital);


             }else{

               //In here loop through JSON file to display info
               $(".restName").empty().append(result[0].name);
               $(".restLanguage").empty().append(result[0].languages[0].name);
               $(".restCurrency").empty().append(result[0].currencies[0].name, result[0].currencies[0].code, result[0].currencies[0].symbol);
               $(".flagImage").attr("src", result[0].flag);
               console.log(result[0].capital);
             }*/
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


   // var test = feature.properties.Country;
    //console.log(test);
});
>>>>>>> origin/Olek
//Listen for open click
//modalBtn.addEventListener('click', openModal); For testing purposes
//Listen for close click
closeBtn.addEventListener('click', closeModal);

//Function to open modal
function openModal(ctry){
<<<<<<< HEAD
  //Displays modal on the screen
  modal.style.display = "block";

   };

=======

  //Displays modal on the screen
  modal.style.display = "block";
  //Only started will be done when Front end is done
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
>>>>>>> origin/Olek

//returnToMapButton.addEventListener('click', closeModal); for testing the modal

//Function to close modal
function closeModal(){
  delete ctry;
  modal.style.display = "none";
}
