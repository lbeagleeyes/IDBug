// Initialize Firebase
var config = {
  apiKey: "AIzaSyC2CVjUtfs2e7MwrZ0Lt4EEGVVMZA9MLEg",
  authDomain: "idbug-cb853.firebaseapp.com",
  databaseURL: "https://idbug-cb853.firebaseio.com",
  projectId: "idbug-cb853",
  storageBucket: "idbug-cb853.appspot.com",
  messagingSenderId: "345341406873"
};
firebase.initializeApp(config);

// Call Sign up button function when the signup button is clicked
$(document).on("click", "#signupbtn", createNewuser);


// Create new user function is called when sign up button is clicked
function createNewuser() {
  event.preventDefault();
  var email = $("#signupemail").val().trim();
  var password = $("#signuppassword").val().trim();

  console.log(email);
  console.log(password);

  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });
}

// Call function to login user when login is clicked
$(document).on("click", "#login", signinUser);

// Sign in user when the login button is clicked
function signinUser() {
  event.preventDefault();

  var email = $("#loginemail").val().trim();
  var password = $("#loginpassword").val().trim();
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(error.message)
    alert("Incorrect login")
    // ...

  });
}

// Listener for authentication and redirects when login is successful
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    window.location.replace("app.html");
    console.log(user);
    // ...
  } else {
    
    // User is signed out.
    // ...
  }
});