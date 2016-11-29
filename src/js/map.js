L.mapbox.accessToken = 'pk.eyJ1IjoidHJ5ZmF0dXIiLCJhIjoiY2lxdDJ5d3R1MDAydmZybmh3a3VtcmFvMiJ9.lL9RoXOtTscOHiSvOCrL-Q';

var map        = L.mapbox.map('map').setView([-6.909620, 107.634553], 13);
var tileLayer  = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=' + L.mapbox.accessToken);
var info       = L.control();
var optionData = L.control();
var marker     = L.FeatureGroup();
var cluster    = L.markerClusterGroup();
var geojson;
var text;

tileLayer.addTo(map);
L.MakiMarkers.accessToken = L.mapbox.accessToken;

function onEachFeature(feature, layer) {
	text = "<h2><b>" + feature.properties.nama_site + "</b></h2>";
	text += "<p>" + feature.properties.lokasi + "</p>";
	text += "<p>" + "Kel." + feature.properties.kelurahan + ", Kec. " + feature.properties.kecamatan + "</p>";
	text += "<p><b>Nama Perusahaan:</b></p>";
	text += "<p>" + feature.properties.nama_perusahaan + "</p>";
	text += "<p><b>Alamat Perusahaan:</b></p>";
	text += "<p>" + feature.properties.alamat_perusahaan_menara + "</p>";
	text += "<p><b>Tipe Menara:</b></p>";
	text += "<p>" + feature.properties.type_menara + "</p>";
	text += "<p><b>Tinggi Menara:</b></p>";
	text += "<p>" + feature.properties.tower_height + "</p>";
	
	layer.bindPopup(text);
}

info.onAdd = function (map) {
	this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
	this._div.innerHTML = '<h4><b>Visualisasi Lokasi Menara Kota Bandung</b></h4>';
	return this._div;
};

$.getJSON('src/json/menara_data.json', function(data) {
	geojson = L.geoJson(data, {
		pointToLayer: function (feature, latlng) {
			return L.marker(latlng, {
				icon: L.MakiMarkers.icon({icon: "triangle", color: "#2095F2", size: "m"})
			});
		},
		onEachFeature: onEachFeature
	});

	// Clustering Pointer
	cluster.addLayer(geojson);
	map.addLayer(cluster);

	tileLayer.addTo(map);

	// Show marker
	//geojson.addTo(map);
});

map.attributionControl.addAttribution('<a href="http://portal.bandung.go.id/">Pemerintah Kota Bandung</a> &copy; 2016');
map.attributionControl.addAttribution('Dinas Komunikasi dan Informatika');