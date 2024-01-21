const map = L.map('map').setView([35.800700, -78.641004], 13);

var Esri_WorldGrayCanvas = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
    maxZoom: 16
}).addTo(map);


function addGeoJSON(geojsonFeature, isRoad) {
    let myStyle = {
        "color": "blue",
        "stroke-width": 0.1
    };
    if (isRoad) {
        myStyle = {
            "color": "black"
        };
    }
    newLayer = L.geoJSON(geojsonFeature, { style: myStyle }).addTo(map);
}