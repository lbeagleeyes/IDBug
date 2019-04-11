$(document).ready(function () {




  //get user's geolocation

  var latitude = ""
  var longitude = ""

  function geoFindMe() {

    const status = document.querySelector('#status');
    const mapLink = document.querySelector('#map-link');

    mapLink.href = '';
    mapLink.textContent = '';

    function success(position) {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;

      console.log(latitude);
      console.log(longitude);

      status.textContent = '';
      mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
      mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
    }

    function error() {
      status.textContent = 'Unable to retrieve your location';
    }

    if (!navigator.geolocation) {
      status.textContent = 'Geolocation is not supported by your browser';
    } else {
      status.textContent = 'Locating…';
      navigator.geolocation.getCurrentPosition(success, error);
    }

    getDoctor(latitude,longitude);

  }

  document.querySelector('#user_location').addEventListener('click', geoFindMe);



  //Better doctor API


  var limit = 10
  //var practice = ""


  
  var distance = 10

var getDoctor = function (userlat, userlon){

  //https://api.betterdoctor.com/2016-03-01/practices?name=obgyn&location=47.69053%2C-122.11711%2C10&user_location=47.69053%2C-122.11711&skip=0&limit=10&user_key=7e08d09b7f6c0a16e0d23968b6669bd7
  var queryURL = "https://api.betterdoctor.com/2016-03-01/practices?name=obgyn" + "&location=" + userlat + "%2C" + userlon + "%2C" + distance + "&user_location=" +
    userlat + "%2C" + userlon + "&skip=0&limit=" + limit + "&user_key=7e08d09b7f6c0a16e0d23968b6669bd7"
  //var queryURL = "https://api.betterdoctor.com/2016-03-01/practices?name=obgyn&location=47.69053%2C-122.11711%2C10&user_location=47.69053%2C-122.11711&skip=0&limit=10&user_key=7e08d09b7f6c0a16e0d23968b6669bd7"

  $.ajax({
    url: queryURL,
    method: "GET"
  })
    .then(function (response) {

      console.log(response);
    });


  }









});

