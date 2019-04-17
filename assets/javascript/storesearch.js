
var email;
var database = firebase.database();

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    // var displayName = user.displayName;
    // var email = user.email;
    // var emailVerified = user.emailVerified;
    // var photoURL = user.photoURL;
    // var isAnonymous = user.isAnonymous;
    // var uid = user.uid;
    // var providerData = user.providerData;
    // console.log(user.email);
    // ...
  } else {
    window.location.replace('index.html');
  }

  // console.log(database)

  email = user.email;
  // console.log(email);

  // variable user to keep track of connected users
  var connectionsRef = database.ref("/connections");
  // reference to the firebase built in user presence tracking
  var connectedRef = database.ref(".info/connected");

  connectedRef.on("value", function (snap) {
    // If they are connected..
    if (snap.val()) {
      // Add user to the connections list.
      var con = connectionsRef.push(true);
      // Remove user from the connection list when they disconnect.
      con.onDisconnect().remove();
    }
  });
});


function saveSearch() {


  var symptomsIds = $("#symptomsSelect").val();
  var gender = $('input[name="inlineGenderOptions"]:checked').val();
  var birthYear = $("#inputYearOfBirth").val();
  //var date = moment();

  var names = [];
  $('#symptomsSelect option:selected').each(function () { names.push($(this).text()); });
  var symptomsNames = names.join(', ');
  console.log(symptomsNames)

  database.ref('/userDB').push({
    //date: date,
    email: email,
    symptomsIds: symptomsIds,
    symptomsNames: symptomsNames,
    gender: gender,
    birthYear: birthYear
  })
}



database.ref("/userDB").on("child_added", function (snap) {
  $("#searchList").children().empty();
   createHistoryRows(snap);
});

// Display user's past symptoms
function showPastSearches() {

  database.ref("/userDB").on("value", function (snap) {
    snap.forEach(function (childSnapshot) {

      createHistoryRows(childSnapshot);
    })
  })
}

function createHistoryRows(childSnapshot) {


  var userEmail = childSnapshot.child("email").val()
  if (userEmail === email) {
    var userSymptoms = (childSnapshot.child("symptomsNames").val());
    var userGender = (childSnapshot.child("gender").val());
    var userBirthYear = (childSnapshot.child("birthYear").val());
    var symptomsIds = (childSnapshot.child("symptomsIds").val());
    //var date = (childSnapshot.child("date").val());

    var row = $("<tr>");
    //row.append("<td>" + date + "</td>");

    row.append("<td>" + userGender + "</td>");
    row.append("<td>").text(userBirthYear);
    var symptomsCol = $("<td>");

    var symCol = $('<div>')

    for (var i = 0; i < userSymptoms.length; i++) {
      symCol.append(userSymptoms[i])
    }

    var searchBtn = new $('<button>', {
      class: "btn btn-light searchBtn",
      text: "Search",
      click: function () {
        searchDiagnosis(symptomsIds, userGender, userBirthYear);
      }
    });

    symptomsCol.append(symCol);
    row.append(symptomsCol);
    row.append(searchBtn);

    $("#searchList").append(row);
  }
}



