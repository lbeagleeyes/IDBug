var config = {
  apiKey: "AIzaSyC2CVjUtfs2e7MwrZ0Lt4EEGVVMZA9MLEg",
  authDomain: "idbug-cb853.firebaseapp.com",
  databaseURL: "https://idbug-cb853.firebaseio.com",
  projectId: "idbug-cb853",
  storageBucket: "idbug-cb853.appspot.com",
  messagingSenderId: "345341406873"
};
firebase.initializeApp(config);

// Listener for authentication
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
    console.log(user.email);
    // ...
 //} else {
 //  window.location.replace('index.html');
  //}
//});


// Logout function
$(document).on("click", "#logout", function () {
  firebase.auth().signOut().then(function () {
    // Sign-out successful.
    console.log("logout")

  }).catch(function (error) {
    // An error happened.
  });
})
