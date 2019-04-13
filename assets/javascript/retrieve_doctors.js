






//get user's geolocation
var location = { latitude: "", longitude: "" };
function geoFindMe(practice) {
  const status = document.querySelector('#status');
  const mapLink = document.querySelector('#map-link');
  mapLink.href = '';
  mapLink.textContent = '';
  function success(position) {
    location.latitude = position.coords.latitude;
    location.longitude = position.coords.longitude;
    console.log(location.latitude);
    console.log(location.longitude);
    status.textContent = '';
    // mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    // mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
    localStorage.setItem("latitude", position.coords.latitude);
    localStorage.setItem("longitude", position.coords.longitude)

    getDoctor(practice);




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

}





//console.log(geoFindMe);


//Better doctor API





var getDoctor = function (practice) {
  var limit = 10
  var distance = 10
  var queryURL = "https://api.betterdoctor.com/2016-03-01/practices?name=" + practice +
    "&location=" + userlat + "%2C" + userlon + "%2C" + + distance +
    "&user_location=" + userlat + "%2C" + userlon +
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
        $("#doctorsList").append(newRow)
      }

    });
}


$(document).ready(function () {
  geoFindMe("dermatology");

  //document.querySelector('#user_location').addEventListener('click', geoFindMe);


});
