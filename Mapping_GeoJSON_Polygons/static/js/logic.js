// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    accessToken: API_KEY
});

let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/satellite-streets-v11',
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
    "Streets": streets,
    "Satellite Streets": satelliteStreets
};

let map = L.map('mapid', {
    center: [43.7, -79.3],
    zoom: 11,
    layers: [satelliteStreets]
});

L.control.layers(baseMaps).addTo(map); 

// Accessing the Toronto airline routes GeoJSON URL.
let torontoHoods = "https://raw.githubusercontent.com/ksommerdorf/Mapping_Earthquakes/Mapping_GeoJSON_Polygons/torontoNeighborhoods.json";


// Create a style for the lines.
let myStyle = {
    color: "blue",
    weight: 1
}

// Grabbing our GeoJSON data.
d3.json(torontoHoods).then(function(data) {
        console.log(data);
    L.geoJson(data,{
      style : myStyle,
      onEachFeature : function(feature,layer) {
        layer.bindPopup("<h3> Area Name: "+ feature.properties.AREA_NAME + "</h3> <hr> <h3>Area ID: " 
        + feature.properties.AREA_S_CD + "</h3>");
    }
    })
    .addTo(map);
});
