// Initialize Firebase
// var config = {
//   apiKey: "AIzaSyC2CVjUtfs2e7MwrZ0Lt4EEGVVMZA9MLEg",
//   authDomain: "idbug-cb853.firebaseapp.com",
//   databaseURL: "https://idbug-cb853.firebaseio.com",
//   projectId: "idbug-cb853",
//   storageBucket: "idbug-cb853.appspot.com",
//   messagingSenderId: "345341406873"
// };
// firebase.initializeApp(config);


// Call Sign up button function when the signup button is clicked 
// or when the user hit the Enter key
$(document).on("click", "#signupbtn", createNewuser);
$(document).on("keyup", "#confirmpassword", function(event){
  if (event.key == "Enter") {
      $("#signupbtn").click();
  }
})
$(document).on("keyup", "#signuppassword", function(event){
  if (event.key == "Enter") {
      $("#signupbtn").click();
  }
})

$(document).on("keyup", "#signupemail", function(event){
  if (event.key == "Enter") {
      $("#signupbtn").click();
  }
})

// Create new user function is called when sign up button is clicked
function createNewuser() {
  event.preventDefault();
  var email = $("#signupemail").val().trim();
  var password = $("#signuppassword").val().trim();
  var confirmpassword = $("#confirmpassword").val().trim();
  var displayName = $("#name").val().trim();

  console.log(email);
  console.log(password);

  if (email === "") {
    alert("Email cannot be blank");
  }
  if (password != confirmpassword) {
    alert("Passwords don't match");
  }
  if (password === "" || confirmpassword === "") {
    alert("Please enter a password")
  }
  if (password.length < 6 && confirmpassword.length < 6) {
    alert("Password must have at least 6 characters")
  }
  if (password.length >= 6 && password === confirmpassword && email != "" && password != "" && confirmpassword != "") {
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
  }

}

// Call function to login user when login is clicked
// or when the user hit the Enter key
$(document).on("click", "#login", signinUser);
$(document).on("keyup", "#loginpassword", function(event){
  if (event.key == "Enter") {
      $("#login").click();
  }
})
$(document).on("keyup", "#loginemail", function(event){
  if (event.key == "Enter") {
      $("#login").click();
  }
})

// Sign in user when the login button is clicked
function signinUser() {
  event.preventDefault();

  var email = $("#loginemail").val().trim();
  var password = $("#loginpassword").val().trim();
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    $('#loginerror').modal('show');


    // ...

  });
}

// Listener for authentication and redirects when login is successful
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    window.location.replace("app.html");
    // console.log(user);
    // ...
  } else {

    // User is signed out.
    // ...
  }
});

