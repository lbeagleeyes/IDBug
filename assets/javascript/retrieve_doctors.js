
//get user's geousrLctn
var usrLctn = { latitude: "", longitude: "" };
function geoFindMe(practice) {
  const status = document.querySelector('#status');
  const mapLink = document.querySelector('#map-link');
  mapLink.href = '';
  mapLink.textContent = '';

  function success(position) {
    usrLctn.latitude = position.coords.latitude;
    usrLctn.longitude = position.coords.longitude;
    console.log(usrLctn.latitude);
    console.log(usrLctn.longitude);
    status.textContent = '';
    // mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    mapLink.textContent = `Latitude: ${usrLctn.latitude} °, Longitude: ${usrLctn.longitude} °`;
    localStorage.setItem("latitude", position.coords.latitude);
    localStorage.setItem("longitude", position.coords.longitude)

    getDoctor(practice);




  }
  function error() {
    $("$location-status").show
    status.textContent = 'Unable to retrieve your usrLctn';
  }
  if (!navigator.geolocation) {
    status.textContent = 'geolocation is not supported by your browser';
  } else {
    status.textContent = 'Locating…';
    navigator.geolocation.getCurrentPosition(success, error);
  }

}





//console.log(geoFindMe);


//Better doctor API





var getDoctor = function (practice) {
  var limit = 10
  var distance = 10
  var queryURL = "https://api.betterdoctor.com/2016-03-01/practices?name=" + practice +
    "&location=" + usrLctn.latitude + "%2C" + usrLctn.longitude + "%2C" + + distance +
    "&user_location=" + usrLctn.latitude + "%2C" + usrLctn.longitude +
    "&skip=0&limit=" + limit +
    "&user_key=7e08d09b7f6c0a16e0d23968b6669bd7"

  console.log(queryURL);


  $.ajax({
    url: queryURL,
    method: "GET"
  })
    .then(function (response) {
      console.log(response)

      var data = response.data;
      console.log(data, " ", response);
      console.log(data[1].name);
      console.log(data[1].distance);
      console.log(data[1].visit_address.street);

      //Loop through and build elements
      for (var i = 0; i < data.length; i++) {
        var name = data[i].name;
        var distance = parseInt(data[i].distance);

        var address = data[i].visit_address.street + "," + data[i].visit_address.city + " " + data[i].visit_address.state + " " + data[i].visit_address.zip

        var newRow = $("<tr>").append(
          $("<td>").text(name),
          $("<td>").text(distance),
          $("<td>").text(address)
        );
        $("#doctorsList").append(newRow);
      }

    });

}


$(document).ready(function () {
  geoFindMe("dermatology");
  
  //document.querySelector('#user_location').addEventListener('click', geoFindMe("dermatology"));


});
