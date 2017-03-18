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
	text = "<h2><b>ID Menara: " + feature.properties.id + "</b></h2>";
	text += "<p>Pemilik: " + feature.properties.pemilik + "</p>";
	
	layer.bindPopup(text);
}

info.onAdd = function (map) {
	this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
	this._div.innerHTML = '<h4><b>Visualisasi Lokasi Menara Kota Bandung Kota Bandung</b></h4>';
	return this._div;
};
info.addTo(map);

optionData.onAdd = function (map) {
	this._div = L.DomUtil.create('div', 'info');
	this._div.innerHTML = '<h4>Pemilik: <select id="pemilik">' + 
		'<option value="">-- Pemilik -- </option>' +
		'<option value="protelindo">PROTELINDO</option>' +
		'<option value="mitratel">MITRATEL</option>' +
		'<option value="indosat">INDOSAT</option>' +
		'<option value="tbg">TBG</option>' +
		'<option value="dayamitra03">PT. DAYAMITRA TELEKOMUNIKASI ( TELKOMSEL RESELLER )</option>' +
		'<option value="axis">AXIS</option>' +
		'<option value="telkomsel">TELKOMSEL</option>' +
		'<option value="stp">STP</option>' +
		'<option value="ibs">IBS</option>' +
		'<option value="java-indoku">JAVA INDOKU</option>' +
		'<option value="dayamitra01">PT. DAYAMITRA TELEKOMUNIKASI</option>' +
		'<option value="smi">SMI</option>' +
		'<option value="naragita-dinamika-kumunika">PT. NARAGITA DINAMIKA KUMUNIKA</option>' +
		'<option value="dayamitra02">PT. DAYAMITRA TELEKOMUNIKASI ( TELKOM )</option>' +
		'<option value="global-indonesia-komunikatama">PT. GLOBAL INDONESIA KOMUNIKATAMA</option>' +
		'<option value="sarana-inti-persada">PT. SARANA INTI PERSADA</option>' +
		'<option value="netwave">NETWAVE</option>' +
		'<option value="retower">PT.RETOWER</option>' +
		'<option value="naragita">NARAGITA</option>' +
		'<option value="komet">PT. KOMET</option>' +
		'<option value="tritunggal-pp">PT. TRITUNGGAL PUTERA PERKASA</option>' +
		'<option value="dtf">DTF</option>' +
		'<option value="sti">PT.STI</option>' +
		'<option value="moratel">MORATEL</option>' +
		'<option value="retower-asia">RETOWER ASIA</option>' +
		'<option value="telcoindo">TELCOINDO</option>' + 
		'</select></h4>';
	return this._div;
};
optionData.addTo(map);

function setMap(shortname){
	$.getJSON('src/json/menara_data_2017.json', function(data) {
		geojson = L.geoJson(data, {
			pointToLayer: function (feature, latlng) {
				return L.marker(latlng, {
					icon: L.MakiMarkers.icon({icon: "triangle", color: "#2095F2", size: "m"})
				});
			},
			onEachFeature: onEachFeature,
			filter: function (feature, layer) {
				return feature.properties.shortname == shortname;
			}
		});

		// Clustering Pointer
		// cluster.addLayer(geojson);
		// map.addLayer(cluster);
		map.addLayer(geojson);

		tileLayer.addTo(map);
	});

	// console.log(pemilik);
};

$("#pemilik").change(function() {
	map.eachLayer(function (layer) {
		map.removeLayer(layer);
	});
	setMap(this.value);
});

map.attributionControl.addAttribution('<a href="http://portal.bandung.go.id/">Pemerintah Kota Bandung</a> &copy; 2016');
map.attributionControl.addAttribution('Dinas Komunikasi dan Informatika');