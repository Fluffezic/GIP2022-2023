let map;
var latc;
var lngc;
var country;
function initMap() {
	geocoder = new google.maps.Geocoder();
	var randomlat = (Math.random()*180) - 90
	var randomlng = (Math.random()*360) - 180
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

window.initMap = initMap;

var app = new Vue({
  el: '#app',
  data: {
	messages:"placeholder",
	city:"",
  },
  methods: {
    Guess: function () {
	country = this.city;
     geocoder.geocode( {'address' : country}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
	var resultset = results[0].geometry.location;
 app.messages = resultset  }
});

    }
}
 })

