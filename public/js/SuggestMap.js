//Set Option selected to menu var and add event listener
var menu = document.getElementById('Continent');
menu.addEventListener('change', getContinent);

//Set the max bounds for the map so that it doesnt duplicate the world
var maxiBounds =  L.latLngBounds(
//Northwest coordinate
L.latLng(-80.83930574607542, -166.5000021457672),
//Southeast
L.latLng(84.32308710686083, 186.4687478542328)
);
//define the map , and set the options
var map = L.map('map',
{
    //Minimum Zoom so that they can not zoom out to far which would distort the map
    minZoom: 2.6,
    //Set maxbounds to the maxbounds value created above
    'maxBounds': maxiBounds,
    //No zoom buttons on the map, so it looks a bit more professional
    zoomControl:false,
    //No attributes on the map , so the leaflet information in the bottom right
    attributionControl: false
    //Fit the maxbounds to the map
}).fitBounds(maxiBounds);
//create a pane for the labels
map.createPane('labels');
// This pane is above markers but below popups
map.getPane('labels').style.zIndex = 650;
// Layers in this pane are non-interactive and do not obscure mouse/touch events
map.getPane('labels').style.pointerEvents = 'none';
//Get the relevent map information
var cartodbAttribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>';
var positron = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png',
{
    attribution: cartodbAttribution
}).addTo(map);
//get the geojson information for the countries
geojson = L.geoJson(world).addTo(map);
//Log for testing purposes
console.log("hello");
//for each layer make the function below
geojson.eachLayer(function (layer)
{
    //Log for testing
    console.log("test");
    //Bind popup upon the clicking of a tile, then feed the country name from the properties layer for use later
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
 //This is a function to create the map pane colour
function style(feature)
{
    return{
        //set the colour, weight and opactity of the colour
        fillColor: '#D46A6A',
        weight: 2,
        opacity: 1,
        color: 'red',
        dashArray: '3',
        fillOpacity: 0.7
    };
}
//This is for the ocean so that its not just grey like in the base leaflet js Then add to map
var gl = L.mapboxGL(
{
    accessToken: '{token}',
    style: 'https://openmaptiles.github.io/osm-bright-gl-style/style-cdn.json'
}).addTo(map);
//This function is for the dropdown continent selector, this will when called upon pan the map to the selected region
function getContinent()
{
    //Get the selection index of the Continent from the dropdown
    var c = document.getElementById("Continent").selectedIndex;
     //   var strUser = c.options[c.selectedIndex].value;
    //Have to use a json because no multidimensional arrays in Javascript .......
    var jsontest =  '{ "countries" : [' +
                    '{ "C_ID":0 , "Lat1":5.499550, "Long1":-167.276413, "Lat2":83.162102, "Long2":-52.233040},' +
                    '{ "C_ID":1 , "Lat1":34.95799531086792, "Long1":-22.148437499999996, "Lat2":66.26685631430843, "Long2":41.66015625, "geo1":50.51342652633956, "geo2": 13.0078125 },' +
                    '{ "C_ID":2 , "Lat1":5.499550, "Long1":-167.276413, "Lat2":83.162102, "Long2":-52.233040, "geo1":39.639537564366684, "geo2":-99.84374999999999},' +
                    '{ "C_ID":3 , "Lat1":5.499550, "Long1":-167.276413, "Lat2":83.162102, "Long2":-52.233040, "geo1":-14.689881366618762, "geo2":-60.1171875},' +
                    '{ "C_ID":4 , "Lat1":5.499550, "Long1":-167.276413, "Lat2":83.162102, "Long2":-52.233040, "geo1":18.979025953255267, "geo2":97.998046875},' +
                    '{ "C_ID":5 , "Lat1":5.499550, "Long1":-167.276413, "Lat2":83.162102, "Long2":-52.233040, "geo1":4.740675384778373, "geo2":21.4453125},' +
                    '{ "C_ID":6 , "Lat1":5.499550, "Long1":-167.276413, "Lat2":83.162102, "Long2":-52.233040, "geo1":-24.926294766395582, "geo2":137.900390625}]}';
    //..parse the variable with the information into JSON
    var obj = JSON.parse(jsontest);
      //  alert(c);
    //if the index is not equal to null then continue
    if(c != null)
    {
            //while the Id in the json object is equal to the object selected
            if(obj.countries[c].C_ID == c)
            {
                //set coordinates to Each value within the JSON object
                  var cord_lat1 = obj.countries[c].Lat1;
                  var cord_long1 = obj.countries[c].Long1;
                  var cord_lat2 = obj.countries[c].Lat2;
                  var cord_long2 = obj.countries[c].Long2;
              //    alert(cord_lat1 + "" + cord_long1 + "" + cord_lat2 +"" + cord_long2);
                //Set the max Bounds for the map from the coordiantes gathered
                  var maxBounds = L.latLngBounds(
                  L.latLng(cord_lat1, cord_long1),
                  L.latLng(cord_lat2, cord_long2)
                  );
                //Get the rough Middle of each region from the JSON
                  var cord_geo1 = obj.countries[c].geo1;
                  var cord_geo2 = obj.countries[c].geo2;
                //Make vairable c_cords which is the centre point of the region to pan to
                  c_cords = L.latLng(
                      L.latLng(cord_geo1, cord_geo2),
                  );
                //Log it to ensure that its functioning properly
                  console.log(c_cords);
            }
            //Set the Zoom on the map so that it zooms before panning, otherwise it will clash with the maxbounds set before
            map.setZoom(3.55);
            //Time delay to prevent/fix bug in the panning
            var delayInMilliseconds = 1000; //1 second
            //Make the timeout and set the function to pan the map to the coordiates selected in the above function
            setTimeout(function()
            {
            map.panTo(c_cords);
            //clear the c_cords after its been used to decrease the chance of bugs.
            delete c_cords;
            //Preform the delay set before
            }, delayInMilliseconds);
        }
    }

//Set the Original Map view to the centre of the map
map.setView({ lat: 47.040182144806664, lng: 9.667968750000002 }, 0);
