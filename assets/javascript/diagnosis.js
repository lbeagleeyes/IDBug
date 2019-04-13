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

var database = firebase.database();

function getApiData(queryURL, callBack) {
  var api_key = "Qx6s7_GMAIL_COM_AUT";
  var uri = "https://authservice.priaid.ch/login";
  var secret_key = "Nm7o6S3Lqt9AJb84X";
  var computedHash = CryptoJS.HmacMD5(uri, secret_key);
  var computedHashString = computedHash.toString(CryptoJS.enc.Base64);

  $.ajax({
    url: uri,
    method: "POST",
    headers:
      { 'Authorization': "Bearer " + api_key + ":" + computedHashString }
  }).then(function (tokenresponse) {

    var token = tokenresponse.Token;

    $.ajax({
      url: queryURL,
      method: "GET",
      data: {
        token: token,
        language: "en-gb"
      }
    }).then(callBack);
  });
}

function getDiagnosis(symptomIdList, gender, birthYear) {
  var queryURL = 'https://healthservice.priaid.ch/diagnosis?symptoms=' + JSON.stringify(symptomIdList) + 'gender=' + gender + 'year_of_birth=' + birthYear;
  getApiData(queryURL, showDiagnosis);
}

function getSymptomsList() {
  var queryURL = "https://healthservice.priaid.ch/symptoms?language=en-gb";
  getApiData(queryURL, saveSymptomList);
}

function saveSymptomList(response) {
  for (var i = 0; i < response.length; i++) {
    console.log(response[i].ID);
    console.log(response[i].Name);

    writeToDB('/symptoms/', response[i].Name, response[i].ID)
  }
}

function getBodyLocations() {
  var queryURL = "https://healthservice.priaid.ch/body/locations";
  getApiData(queryURL, setBodyLocations);
}

function setBodyLocations(response) {
  for (var i = 0; i < response.length; i++) {
    console.log(response[i].ID);
    console.log(response[i].Name);

    writeToDB('/bodyLocations/', response[i].Name, response[i].ID)
  }
}

function getProposedSymptoms() {
  var queryURL = 'https://healthservice.priaid.ch/diagnosis?&symptoms=' + JSON.stringify(symptomIdList) + '&gender=' + gender + '&year_of_birth=' + birthYear;
  getApiData(queryURL, showProposedSymptoms);
}

function showProposedSymptoms(response) {

  for (var i = 0; i < response.length; i++) {
    console.log(response.ID);
    console.log(response.Name);
  }
}

function getSpecializations(symptomsList, gender, birthYear) {

  var queryURL = "https://healthservice.priaid.ch/diagnosis/specialisations?&symptoms=" + JSON.stringify(symptomsList) + "&gender=" + gender + "&year_of_birth=" + birthYear;
  getApiData(queryURL, showSpecializations);
}

function showSpecializations(response) {
  for (var i = 0; i < response.length; i++) {
    console.log(response.ID);
    console.log(response.Name);
    console.log(response.Accuracy);
  }
}


function writeToDB(tableName, name, id) {
  database.ref(tableName).push({
    name: name,
    id: id
  });

}

$(document).ready(function () {

  // var test = [234, 235, 236];

  // getDiagnosis(test, "female", 1980);

  // getSymptomsList();

  //writeToDBTest();

  //getBodyLocations();

  readSymptoms();

});


function readSymptoms() {

  database.ref('/symptoms').on("value", function (snapshot) {
    console.log(snapshot.val());
    var symptoms = snapshot.val();

    Object.keys(symptoms).forEach(function (symptomId) {
      var symptom = symptoms[symptomId];

      console.log(symptom.name);
      console.log(symptom.id);

      //Add your list box code here
      //creatListBoxItem(symptom);
    })
  });
}