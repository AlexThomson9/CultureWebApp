//This JS file is responsable for the addition of the marker when a new
//country is approved on the admin page
//If the suggestion is approved
$('#Accept').click(function(){
//Get country from the text retrieved from the mongoDB
var Country = $('#CountryTitle').text();
//log to check that its functioning
console.log(Country);
//define the array for use later
    var testingarray = [];
    //get json from the origional map file to check if country already exists
  $.getJSON("map.geojson",function(data){
    //reset array to avoid issues
  testingarray = [];
  //Get json from the Mongo db again to check if country exists
      $.getJSON("/Country_Map",function(data2){
        //For each data retrieved then log and add to array
        $.each(data.features, function(key, value){
          console.log(value.properties.Country);
          //Push each existing country from the file to the array
          testingarray.push(value.properties.Country)
        });
        console.log(data2);
        //For each data retrieved then log and add to array
        $.each(data2, function(key, value){
          console.log(value);
          console.log(value.Country);
          //Push each existing country from the mongoDB to the array
          testingarray.push(value.Country)
        });
        //Log array to check if null
        console.log(testingarray);
        //log to test what index is returned
        console.log($.inArray(Country, testingarray));
        //Check array that contains all existing countries if the Suggestion
        //approved's country already exists
        if($.inArray(Country, testingarray) != -1){
          //Log already exists
          console.log("Country already exists");
        }else{
          var c_nowhitespace = encodeURIComponent(Country.trim()); //"Test%20-%20Text"
          //if the country doesn't aleady exist then set url to contain the selected country
          if(c_nowhitespace.indexOf("Congo") != -1){

            c_nowhitespace = "Congo";
          }
                var countryPicked = 'https://restcountries.eu/rest/v2/name/' + c_nowhitespace+ '?fields=name;capital;';
                //perform an ajax request to the url above to get
                //the country capital from the restcountries API
              $.ajax({
                    url:countryPicked,
                    dataType:'json',
                    //upon success
                    success: function(result, data){
                      //Capital = capital retrieved
                      var capital  = result[0].capital;

                      //Set url to contain capital recieved
                      var capital_URL = "https://nominatim.OpenStreetMap.org/?format=json&addressdetails=1&q=" + capital + "&format=json&limit=1";
                      //Log to ensure its not null
                      console.log(capital);
                      //Perform another ajax request but this time to get the lat and lon
                      //of the capital from the capital provided
                      $.ajax({
                            url:capital_URL,
                            dataType:'json',
                            //upon success
                            success: function(cords, data){
                                //Lat = lat Lon = Lon retrieved
                                var c_lat = cords[0].lat;
                                var c_lon = cords[0].lon;
                                console.log(c_lat + " " + c_lon);
                                //Construct a json object that contains the country and the lat and lon retrieved from
                                //the API'S but flip the lat and lon to lon/lat for leaflet ..takes it other way round
                                    var newCountry = {"type":"Feature","properties":{"marker-color":"#7e7e7e","marker-size":"medium","marker-symbol":"",
                                    "Country":Country},"geometry":{"type":"Point","coordinates":[c_lon,c_lat]}};
                                    //performs the last ajax request in this file to add the object to the mongodb
                                    $.ajax({
                                          type: "POST",
                                          //stringify the object
                                          data: JSON.stringify(newCountry),
                                          contentType: "application/json",
                                          //Goes to the server file and saves the new country in the MongoDB
                                          url: "/savefile"
                                          });
                            }
                    });
            }
      });
        }
    });
  });
});
