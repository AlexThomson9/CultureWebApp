var menu = document.getElementById('Continent');
menu.addEventListener('change', getContinent);

var maxiBounds =  L.latLngBounds(
L.latLng(-80.83930574607542, -166.5000021457672),
L.latLng(84.32308710686083, 186.4687478542328)
);
var map = L.map('map', {
  minZoom: 2.6,
  'maxBounds': maxiBounds
}).fitBounds(maxiBounds);
	map.createPane('labels');
	// This pane is above markers but below popups
	map.getPane('labels').style.zIndex = 650;
	// Layers in this pane are non-interactive and do not obscure mouse/touch events
	map.getPane('labels').style.pointerEvents = 'none';
	var cartodbAttribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>';
	var positron = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
		attribution: cartodbAttribution
	}).addTo(map);

/*	var positronLabels = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png', {
		attribution: cartodbAttribution,
		pane: 'labels'
	}).addTo(map);*/
      $.getJSON("map.geojson",function(data){
    // add GeoJSON layer to the map once the file is loaded
   geojson = L.geoJson(data).addTo(map);
   geojson.setStyle({
    fillOpacity: 1,
    color: "#D46A6A",
    weight: 1
    ,noWrap: true
});
          
          
          var layerGroup = L.geoJSON(data, {
  onEachFeature: function (feature, layer) {
    layer.bindPopup(feature.properties.Country);
      
      
  }
}).addTo(map);
          
          
$(document).on("click", ".leaflet-marker-icon.leaflet-zoom-animated.leaflet-interactive", function(){
    var ctry = $(".leaflet-popup-content").text();
    console.log(ctry);
     $(".leaflet-popup-content").remove();
    console.log('i work');
    var test = feature.properties.Country;
    console.log(test);
    
    
});

        /*  geojson.eachLayer(function (layer) {
		layer.bindPopup(layer.feature.properties.Country + '<button type="button" id="btn">Click Me!</button>');
        
            var popup = layer.getPopup();
            var content = popup.getContent();
              console.log(content);
              

              
    /*  $.ajax({
          
          url:"https://restcountries.eu/rest/v2/name/" + test,
          dataType:'json',
          success: function(result){
            $("#div1").html(result);
        }
          
          
          
        
          
          
      });
            */  
      /*  layer.bindPopup(layer.feature.properties.Country + '<div class="tab"> <button class="tablinks" onclick="openCity(event, "London")" id="defaultopen">London</button>'+
                                                                        '<button class="tablinks" onclick="openCity(event, "Paris")">Paris</button>'  +
                                                                         '<button class="tablinks" onclick="openCity(event, "Tokyo")">Tokyo</button>' +
                                                                        '</div>' +
                                                                       '<div id="London" class="tabcontent">'+
                                                                         ' <h3>London</h3>'+
                                                                          '<p>London is the capital city of England.</p>'+
                                                                        '</div>'+

                                                                        '<div id="Paris" class="tabcontent">'+
                                                                          '<h3>Paris</h3>'+
                                                                         ' <p>Paris is the capital of France.</p> '+
                                                                       ' </div>'+

                                                                        '<div id="Tokyo" class="tabcontent">'+
                                                                          '<h3>Tokyo</h3>'+
                                                                          '<p>Tokyo is the capital of Japan.</p>'+
                                                                        '</div> ');*/



	//});
  });

      $('#btn').click(function(){
          
       var value = $('.leaflet-popup-content').val();
          console.log(value);
          
          
    //Some code
});

    $.getJSON('world.geo.json-master/world.geo.json-master/countries.geo.json', function (geojson) { // load file
    L.geoJson(geojson, { // initialize layer with data
        style: function (feature) { // Style option
            return {
                'weight': 1,
                'color': '#D46A6A',
                'fillColor': '#D46A6A'
            }
        }
    }).addTo(map); // Add layer to map
});


    function style(feature) {
    return {
        fillColor: '#D46A6A',
        weight: 2,
        opacity: 1,
        color: 'red',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

    var gl = L.mapboxGL({
    accessToken: '{token}',
    style: 'https://openmaptiles.github.io/osm-bright-gl-style/style-cdn.json'
}).addTo(map);




    function getContinent(){
     var c = document.getElementById("Continent").selectedIndex;
     //   var strUser = c.options[c.selectedIndex].value;
    var jsontest =  '{ "countries" : [' +
                    '{ "C_ID":0 , "Lat1":5.499550, "Long1":-167.276413, "Lat2":83.162102, "Long2":-52.233040},' +
                    '{ "C_ID":1 , "Lat1":34.95799531086792, "Long1":-22.148437499999996, "Lat2":66.26685631430843, "Long2":41.66015625, "geo1":50.51342652633956, "geo2": 13.0078125 },' +
                    '{ "C_ID":2 , "Lat1":5.499550, "Long1":-167.276413, "Lat2":83.162102, "Long2":-52.233040, "geo1":39.639537564366684, "geo2":-99.84374999999999},' +
                    '{ "C_ID":3 , "Lat1":5.499550, "Long1":-167.276413, "Lat2":83.162102, "Long2":-52.233040, "geo1":-14.689881366618762, "geo2":-60.1171875},' +
                    '{ "C_ID":4 , "Lat1":5.499550, "Long1":-167.276413, "Lat2":83.162102, "Long2":-52.233040, "geo1":18.979025953255267, "geo2":97.998046875},' +
                    '{ "C_ID":5 , "Lat1":5.499550, "Long1":-167.276413, "Lat2":83.162102, "Long2":-52.233040, "geo1":4.740675384778373, "geo2":21.4453125},' +
                    '{ "C_ID":6 , "Lat1":5.499550, "Long1":-167.276413, "Lat2":83.162102, "Long2":-52.233040, "geo1":-24.926294766395582, "geo2":137.900390625}]}';
    var obj = JSON.parse(jsontest);
      //  alert(c);
        if(c != null)
        {
        //    alert(obj.countries[c].C_ID);
            if(obj.countries[c].C_ID == c)
            {
              var arraytest = obj.countries[c].C_ID;
            //  alert(arraytest);
                  var cord_lat1 = obj.countries[c].Lat1;
                  var cord_long1 = obj.countries[c].Long1;
                  var cord_lat2 = obj.countries[c].Lat2;
                  var cord_long2 = obj.countries[c].Long2;
              //    alert(cord_lat1 + "" + cord_long1 + "" + cord_lat2 +"" + cord_long2);
                  var maxBounds = L.latLngBounds(
                  L.latLng(cord_lat1, cord_long1),
                  L.latLng(cord_lat2, cord_long2)
                  );
                  var cord_geo1 = obj.countries[c].geo1;
                  var cord_geo2 = obj.countries[c].geo2;
                  c_cords = L.latLng(
                      L.latLng(cord_geo1, cord_geo2),
                  );
                  console.log(c_cords);
            }
            map.panTo(c_cords);
            delete c_cords;
            map.setZoom(3.4);
        }
      //  map.panTo(new L.LatLng( 39.639537564366684, -99.84374999999999,));
      //  map.setZoom(8);
       //map.setView(c_cords, 8);
      //  map.fitBounds(maxBounds);
    }
  //  geojson = L.geoJson({style: style}).addTo(map);
	// geojson = L.geoJson(euCountries).addTo(map);

	map.setView({ lat: 47.040182144806664, lng: 9.667968750000002 }, 0);


