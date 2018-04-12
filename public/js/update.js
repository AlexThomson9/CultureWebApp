$('#madeup').click(function(){

//  $('#CountryTitle').val();
    var testingarray = [];
  $.getJSON("map.geojson",function(data){
  testingarray = [];
      $.getJSON("/Country_Map",function(data2){
        $.each(data.features, function(key, value){
          console.log(value.properties.Country);
          testingarray.push(value.properties.Country)



        });
        console.log(data2);
        $.each(data2, function(key, value){
          console.log(value);
          console.log(value.Country);
          testingarray.push(value.Country)



        });


        console.log(testingarray);

    });

  });
  console.log(testingarray);
    var response = "";
  $.ajax({
        type: "GET",
        url: "/country",
        data: JSON.stringify(Country),
        contentType: "application/json",
        url: "/suggest",
        success: function (data) {
        console.log('success', data);
        response = data;
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
       console.log('error', errorThrown);
     }
        });
      console.log(response);

      if(response != ""){

        console.log("wot");
      }else if (response == ""){

          var countryPicked = 'https://restcountries.eu/rest/v2/name/' + country+ '?fields=name;capital;';

        $.ajax({
              url:countryPicked,
              dataType:'json',
              success: function(result, data){

                var capital  = result[0].capital;
                var capital_URL = "https://nominatim.OpenStreetMap.org/?format=json&addressdetails=1&q=" + capital + "&format=json&limit=1";
                console.log(capital);
                $.ajax({
                      url:capital_URL,
                      dataType:'json',
                      success: function(cords, data){

                          var c_lat = cords[0].lat;
                          var c_lon = cords[0].lon;
                          console.log(c_lat + " " + c_lon);
                          var marker = L.marker([c_lat,c_lon], { Country:country}).addTo(map);

                          $.getJSON( "./map.geojson", function( data ) {
                              // now data is JSON converted to an object / array for you to use.
                              console.log(data.features[1].properties.Country);

                              var newMovie = {"type":"Feature","properties":{"marker-color":"#7e7e7e","marker-size":"medium","marker-symbol":"",
                              "Country":country},"geometry":{"type":"Point","coordinates":[c_lon,c_lat]}};

                              // add a new movie to the set
                            //  data.features.push(newMovie);

                            /*  jQuery.post("/savefile", {
                                  NewData: JSON.stringify(newMovie)
                              }, function(res){
                                  // response could contain the url of the newly saved file
                                  console.log(res);
                              })*/




                              $.ajax({
                                    type: "POST",
                                    data: JSON.stringify(newMovie),
                                    contentType: "application/json",
                                    url: "/savefile"
                                    });

                            });






                      }
              });





      }






});
}



});
