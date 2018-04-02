$('#madeup').click(function(){

    var country = "Mexico";//$('Country').text();
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
                              "Country":country},"geometry":{"type":"Point","coordinates":[c_lat,c_lon]}};

                              // add a new movie to the set
                              data.features.push(newMovie);

                              jQuery.post("/savefile", {
                                  NewData: JSON.stringify(newMovie)
                              }, function(res){
                                  // response could contain the url of the newly saved file
                                  console.log(res);
                              })

                            });


                            $.getJSON("/mapinfo",function(data){
                                    // add GeoJSON layer to the map once the file is loaded
                                   geojson = L.geoJson(data).addTo(map);
                                   geojson.setStyle({
                                    fillOpacity: 1,
                                    color: "#D46A6A",
                                    weight: 1
                                    ,noWrap: true
                                    });
                                    //Bind the popup to just display the country, it doesnt actually popup but we use the value
                                    var layerGroup = L.geoJSON(data, {
                                        onEachFeature: function (feature, layer) {
                                        layer.bindPopup(feature.properties.Country);
                                      }
                                    }).addTo(map);
                            });



                      }
              });





      }






});
}



});
