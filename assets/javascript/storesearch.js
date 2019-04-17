
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
          var userSymptoms = (childSnapshot.child("symptomsIds").val())
          var userGender = (childSnapshot.child("gender").val())
          var userBirthYear = (childSnapshot.child("birthYear").val())


          var row = $("<tr>");

          row.append("<td>" + userGender + "</td>");
          row.append("<td>").text(userBirthYear);
          var symptomsCol = $("<td>");

          var symCol = $('<div>')

          // const specialisations = response[i].Specialisation;
          // for (var j = 0; j < specialisations.length; j++) {
          //   const specialisationName = specialisations[j].Name;
          //   var specializationBtn = new $('<button>', {
          //     class: "btn btn-light specializationBtn",
          //     'data-specialisation': specialisationName,
          //     text: specialisationName,
          //     click: function () {
          //       //CALL find doctors method 
          //       geoFindMe(specialisationName);
          //       currentPractice = specialisationName;

          //     }
          //   });

          for(var i = 0; i < userSymptoms.length; i++){
            symCol.append(userSymptoms[i])
          }

          symptomsCol.append(symCol);
          row.append(symptomsCol);

          // $("#searchList").append("<tr><td>"+userGender+"</td><td>"+userBirthYear+"</td><td>"+userSymptoms+"</td></tr>");

          $("#searchList").append(row);

          //   $("#searchdisplay").append("<div class='modal fade' id='exampleModalLong' tabindex='-1' role='dialog' aria-labelledby='exampleModalLongTitle' aria-hidden='true'>" + "<div class='modal-dialog' role='document'>" +
          //     "<div class='modal-content'>" +
          //     "<div class='modal-header'>" +
          //     "<h5 class='modal-title' id='exampleModalLongTitle'>" + "Modal title" + "</h5>" +
          //     "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>" +
          //     "<span aria-hidden='true'>" + "&times;" + "</span>" +
          //         "</button >" +
          //       "</div >" +
          //     "<div class='modal-body'>"
          //       + modal body +
          //       "</div>" +
          //     "<div class='modal-footer'>" +
          //       <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          //       <button type="button" class="btn btn-primary">Save changes</button>
          //     </div>
          //     </div >
          //   </div >
          // </div > ")

        }



      })
    })
  }

  pastSearches();

});



