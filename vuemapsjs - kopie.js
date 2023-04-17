var mLocation;
var resultset;
var distanceP;
var mLocations = [];
var Melevation;
var Search ;
var latc;
var lngc;
var country;
var Validlocation = false;
var randomlat;
var randomlng;
function initMap() {
	geocoder = new google.maps.Geocoder();
	elevator = new google.maps.ElevationService();
 Search = setInterval(RandomCheck, 500);

}



var app = new Vue({
  el: '#app',
  data: {
	messages:"Guess where you are",
	city:"",
  },
  methods: {
    Guess: function () {
	country = this.city;
     geocoder.geocode( {'address' : country}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
 resultset = results[0].geometry.location;
	latc = resultset.lat;
	lngc = resultset.lng;
	 distanceP = google.maps.geometry.spherical.computeDistanceBetween(mLocation, resultset);

	
	
 app.messages = "your points: " + Math.round((19134300 - distanceP)/100)/1000 };
});
  
    }
}
 })
function RandomCheck() {
	console.log("test1");
		 randomlat = (Math.random()*160 + 10) - 90;
	 randomlng = (Math.random()*360) - 180;
mLocation=  new google.maps.LatLng(randomlat, randomlng);
mLocations.push(mLocation) ;
geocoder.geocode( {location : mLocation}, function(status) {
	    if (status == google.maps.GeocoderStatus.OK) {
		}
			elevator.getElevationForLocations({locations: mLocations,}, function(results, status) {
				Melevation = results;

}			

			);
	console.log("test3");
			console.log(Melevation[0].elevation);
		if (Melevation[0].elevation > 90){
;
					Validlocation = true;
		  clearInterval(Search);
		GenerateMap();
		window.initMap = initMap;
		}
else {
	mLocations = [];
	console.log("test5");
	Validlocation = false ;

	}
		
		
		
});


}

function GenerateMap() {
	  map = new google.maps.Map(document.getElementById("map"), {
	
    center: { lat: randomlat, lng: randomlng },
    zoom: 6,
    scrollwheel: false,
    navigationControl: false,
    mapTypeControl: false,
    scaleControl: false,
    draggable: false,
    mapTypeId: 'satellite',
disableDefaultUI: true,

  });


var customStyled = [ {
    featureType: "all",
    elementType: "labels",
    stylers: [
      { visibility: "off" }
    ]
  }];//(array shown above)
map.set('styles',customStyled);
latc = map.getCenter().lat();
lngc = map.getCenter().lng();
console.log(latc + " " + lngc);
	
	
}
