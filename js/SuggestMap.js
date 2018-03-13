var menu = document.getElementById('Continent');
menu.addEventListener('change', getContinent);

var maxiBounds =  L.latLngBounds
(
L.latLng(-80.83930574607542, -166.5000021457672),
L.latLng(84.32308710686083, 186.4687478542328)
);
var map = L.map('map', 
{
  minZoom: 2.6,
  'maxBounds': maxiBounds
}).fitBounds(maxiBounds);

map.createPane('labels');
// This pane is above markers but below popups
map.getPane('labels').style.zIndex = 650;
// Layers in this pane are non-interactive and do not obscure mouse/touch events
map.getPane('labels').style.pointerEvents = 'none';
var cartodbAttribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>';
var positron = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', 
{
    attribution: cartodbAttribution
}).addTo(map);

/*var positronLabels = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png', {
    attribution: cartodbAttribution,
    pane: 'labels'
}).addTo(map);*/

geojson = L.geoJson(world).addTo(map);

geojson.eachLayer(function (layer) 
{
    layer.bindPopup(
    '<div id="Popup"><h4 id="title"> Country: ' + layer.feature.properties.name + '</h4>'+ 
    '<h3>Upload Information</h3><p id="test">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer commodo tellus ut suscipit malesuada. '+
    '</p>'+
    '<div class="rTable">'+
    '<div class="rTableRow">'+
    '<div class="rTableHead"><strong>Customs:</strong></div>'+
    '<div class="rTableCell"><a href="#"id="Customs">Update Customs</a></div>'+
    '</div>'+
    '<section class="Customs-Hide">'+
    '<button type="button" class="Submit">Submit</button>'+
    '</section>'+
    '<div class="rTableRow">'+
    '<div class="rTableHead"><strong>Gestures:</strong></div>'+
    '<div class="rTableCell"><a href="#" id="Gestures">Update Gestures</a></div>'+
    '</div>'+
    '<section class="Gestures-Hide">'+
    '<button type="button" class="Submit">Submit</button>'+
    '</section>'+
    '<div class="rTableRow">'+
    '<div class="rTableHead"><strong>Cultural Differences:</strong></div>'+
    '<div class="rTableCell"><a href="#" id="Cultures">Update Culture</a></div>'+
    '<section class="Cultures-Hide" >'+
    '<button type="button" class="Submit">Submit</button>'+
    '</section>'+
    '</div>'+
    '<div class="rTableRow">'+
    '<div class="rTableHead"><strong>Laws:</strong></div>'+
    '<div class="rTableCell"><a href="#" id="Laws">Update Laws</a></div>'+
    '<section class="Laws-Hide">'+
    '<button type="button" class="Submit">Submit</button>'+
    '</section>'+
    '</div>'+
    '</div>'+
    '</div>'
    );
});
    /*  $.getJSON("map.geojson",function(data){
    // add GeoJSON layer to the map once the file is loaded
   geojson = L.geoJson(data).addTo(map);
   geojson.setStyle({
    fillOpacity: 1,
    color: "#D46A6A",
    weight: 1
});*/
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
/* $.getJSON('world.geo.json-master/world.geo.json-master/countries.geo.json', function (geojson) { // load file
L.geoJson(geojson, { // initialize layer with data
style: function (feature) { // Style option
    return {
        'weight': 1,
        'color': '#D46A6A',
        'fillColor': '#D46A6A'
    }
}
}).addTo(map); // Add layer to map

geojson.eachLayer(function (layer) {
layer.bindPopup(layer.feature.properties.name);
});
});
*/
function style(feature) 
{
    return{
        fillColor: '#D46A6A',
        weight: 2,
        opacity: 1,
        color: 'red',
        dashArray: '3',
        fillOpacity: 0.7
    };
}
var gl = L.mapboxGL(
{
    accessToken: '{token}',
    style: 'https://openmaptiles.github.io/osm-bright-gl-style/style-cdn.json'
}).addTo(map);

function getContinent()
{
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

$(function()
{
    console.log('Jquery is working');
    var test = 0;
$(document).on('click', "#Customs, #Gestures, #Cultures, #Laws",function()
{
    var mme = $("#title").text();
    var country = mme.split(" ");
    var ctry = country[2];
	var id = $(this).attr('id');
    console.log(mme);
    console.log(country);
    console.log(ctry);
    console.log("."+id+"-Hide");
	$("."+id).html("add more");
    test++;
    $("."+id+"-Hide").show("fast").prepend("<div id ="+test+"><textarea class='Textarea'></textarea><a href='#' id='minus' class='minus'>rem</a></div>");
    if($("."+id+"-Hide").find(".Submit").length)
    {
    console.log("button exists");
    }
    else 
    {
    $("."+id+"-Hide").append("<button type='button' class='Submit'>Submit</button>");
    }

});
$(document).on('click', ".Customs-Hide, .Gestures-Hide, .Cultures-Hide, .Laws-Hide",function(evt)
{
    if($(evt.target).is('.Textarea')) 
    {
        //event handling code
    }
    else if($(evt.target).is('#minus'))
    {
        $(this).find('textarea').last().remove();
        $(this).find('a').last().remove();
        
        if($(this).find('textarea').length == 0)
        {
   		$(this).find('button').last().remove();
        }
   //alert($(this).find('textarea').length);
    } 
    else if(($(evt.target).is('.Submit')))
    {  
        var numItems = $(this).find('textarea').length;
        //alert(numItems);
        $(this).find('textarea').each(function()
        {
            //This variable is the Content for the textarea
           var Textarea = $(this).val();
           var Class_Name_Raw = $(this).closest('section').attr('class');
           var Class_Name_Array = Class_Name_Raw.split("-");
           var Class_Name = Class_Name_Array[0];
           console.log("Textarea value is " + Textarea);
           console.log("Section Identifier is " + Class_Name);
        });
        $(this).find('textarea, a, button').each(function()
        {
        $(this).remove();
        });
   
  
   
   }
});
});