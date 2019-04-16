
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


  var database = firebase.database();

  // console.log(database)

  var email = user.email;
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

  $(document).on("click", "#searchBtn", saveSearch)

  function saveSearch() {
    var symptomsIds = $("#symptomsSelect").val();
    var gender = $('input[name="inlineGenderOptions"]:checked').val();
    var birthYear = $("#inputYearOfBirth").val();

    var userList = database.ref('/userDB/');
    database.ref('/userDB/').push({
      email: email,
      symptomsIds: symptomsIds,
      gender: gender,
      birthYear: birthYear
    })
  }


  // database.ref("/userDB").on("value", function (snap) {
  //   snap.forEach(function (childSnapshot) {
  //     var userList = childSnapshot.child("email").val()
  //     console.log(userList);
  //   })
  // })

  // Display user's past symptoms
  function pastSearches() {
    database.ref("/userDB").on("value", function (snap) {
      snap.forEach(function (childSnapshot) {
        var userEmail = childSnapshot.child("email").val()
        if (userEmail === user.email) {
          console.log(childSnapshot.child("symptomsIds").val())
          console.log(childSnapshot.child("gender").val())
          console.log(childSnapshot.child("birthYear").val())
          
        }

      })
    })
  }

pastSearches();

});



