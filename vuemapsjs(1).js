var mLocation;
var gamefinished = false;
var panorama;
var highD = 30000000000000;
var timersec = 0;
var timermin = 5;
var timertick;
var pointtotal = 0;
var flightPath;
var STREETVIEW_MAX_DISTANCE = 50;
var foundcity;
var guessmade = false;
var Timeup = false;
var markerguess= [];
var activegues = false;
var polyline;
var resultset;
var distanceP;
var mLocations = [];
var Melevation;
var Search ;
var latc;
var lngc;
var country;
var Validlocation = false;
var randomcity;
var randomlat;
var randomlng;
function initMap() {
	timertick = setInterval(timerticking, 1000)
	geocoder = new google.maps.Geocoder();
	streetViewService = new google.maps.StreetViewService();
 RandomCheck();


}
var app = new Vue({
  el: '#app',
  data: {
	messages:"Guess where you are",
	timer:"5:00",
	scorehigh:"",
	city:"",
  },
  methods: {
	  
    Guess: function () {
		if(gamefinished == false) {
	if(guessmade == true) {
		app.messages ="Guess where you are";
	flightPath.setMap(null);
		clearMarkers();
	markerguess= [];
	 latc = 0;
     lngc = 0;
    activegues = false;
    guessmade =false;
	polyline = null;
	console.log("reset");
	RandomCheck();
	document.getElementById("button").innerHTML = "Submit";
	}
else {	if(activegues == true){
 resultset =  new google.maps.LatLng(latc, lngc);
	distanceP = google.maps.geometry.spherical.computeDistanceBetween(mLocation, resultset);
	var distancezoom = ((Math.floor(12756000/distanceP)+7)/7)*2;
	document.getElementById("button").innerHTML = "Again";
	polyline = [{ lat: randomlat, lng: randomlng }, resultset];
	console.log(polyline)
	map.set('zoom',distancezoom);
	map.set('center', mLocation)
	 flightPath = new google.maps.Polyline({
		
    path: polyline,
    geodesic: true,
    strokeColor: "#FF0000",
    strokeOpacity: 1.0,
    strokeWeight: 5,
  });
 var markerR = new google.maps.Marker({
    position: mLocation,
    map,
    title: "Real location",
  });
 var markerG = new google.maps.Marker({
    position: resultset,
    map,
    title: "Guessed location",
  });
flightPath.setMap(map);
guessmade =true;
	 markerguess.push(markerR);
	 markerguess.push(markerG);
markerguess.push(flightPath);
	pointtotal = pointtotal + Math.round(300000000/ distanceP);
 app.messages = "Distance: " + Math.round(distanceP/1000) + " Km, your points: " + Math.round((300000000/ distanceP))
 if(highD > Math.round(distanceP/1000)) {
	 highD = Math.round(distanceP/1000);
	 
	 
 }
  }
 else{
	 app.messages = "Please select a location";
	 
	 }
 }
 }
 else{
	 location.reload()
 }
}
  }
  })  

function RandomCheck() {
if(gamefinished == false) {
	console.log("test1");
		 randomcity = Math.floor(Math.random()*150389)+1;
axios.get('http://localhost:8080/byid?id=' + randomcity)
  .then(function (response) {
	  console.log("test2")
 foundcity = response.data;
 randomlat = parseFloat(response.data.latitude);
 randomlng = parseFloat(response.data.longitude);
 console.log(randomlat);
 console.log(randomlng);
 console.log(foundcity);
    console.log(response);
mLocation =  new google.maps.LatLng(randomlat, randomlng);
streetViewService.getPanoramaByLocation(mLocation, STREETVIEW_MAX_DISTANCE, function (StreetViewPanoramaData, status) {
    if (status === google.maps.StreetViewStatus.OK) {
		console.log("test sucess")
mLocations.push(mLocation);
 		GenerateMap();
		window.initMap = initMap;
 
 
    } else {
		console.log("test fail")
		console.log(status);
		setTimeout(RandomCheck, 5);
    }
    });
geocoder.geocode( {location : mLocation}, function(status) {
					Validlocation = true;

}	    );


  })
  .catch(function (error) {
    // handle error
    console.log(error);
    setTimeout(RandomCheck, 5)
  })

		

			
	console.log("test3");


		}
}
		
		
		





function GenerateMap() {
	  map = new google.maps.Map(document.getElementById("map"), {
	
    center: { lat: 0, lng: 0 },
    zoom: 3,
    scrollwheel: false,
    navigationControl: true,
  zoomControl: true,
keyboardShortcuts: false,
    mapTypeControl: false,
    scaleControl: false,
    draggable: true,

disableDefaultUI: true,

  });
  console.log("test 4");
    map.addListener("click", (mapsMouseEvent) => {
		if(gamefinished == false) {
		if(guessmade != true) {
		if(markerguess != null) {
	clearMarkers();
      markers = [];}
	  console.log(mapsMouseEvent.latLng.lat() + " " + mapsMouseEvent.latLng.lng());
	  latc = mapsMouseEvent.latLng.lat();
	  lngc = mapsMouseEvent.latLng.lng();
	  activegues = true;
	 var markerguesssed = new google.maps.Marker({
    position: { lat: latc, lng: lngc},
    map,
    title: "active guess",
  });
	markerguess.push(markerguesssed)}
	}
	
 })
    panorama = new google.maps.StreetViewPanorama(
    document.getElementById("pano"),
    {
      position: { lat: randomlat, lng: randomlng },
      pov: {
        heading: 0,
        pitch: 0,
      },
       showRoadLabels: false,
      addressControl: false,
      linksControl: false,
      panControl: false,
      enableCloseButton: false,
    }
  );
  console.log("test 5");

var customStyled = [ {
    featureType: "all",
    elementType: "labels",
    stylers: [
      { visibility: "on" }
    ]
  }];
map.set('styles',customStyled);
map.setStreetView(panorama);
  console.log("test 6");
	
	
}
function setMapOnAll(map) {
for (var i = 0; i < markerguess.length; i++) {
markerguess[i].setMap(map);
}}
function clearMarkers() {
setMapOnAll(null);
}
function timerticking() {
 if(timersec == 0 && timermin == 0) {
	 gamefinished = true;
document.getElementById("map").remove();
document.getElementById("pano").remove();
document.getElementById("button").innerHTML = "Retry";
document.getElementById("viewtimer").remove();
	  app.messages = "GAME OVER ";
	  app.scorehigh ="Final Score: " + pointtotal+ "   Best guess: " + highD + "Km";
	 clearInterval(timertick);
	 
		
	}
else if(timersec == 0) {
	timersec = 59;
	timermin = timermin - 1;
	}

	else {
		timersec = timersec - 1
		
	}
	if(timersec < 10) {
		app.timer = timermin +":0" + timersec
		
	}
	else{
	app.timer = timermin +":" + timersec}
	
}
function guessset() {
	guessmade = true;
	
}
