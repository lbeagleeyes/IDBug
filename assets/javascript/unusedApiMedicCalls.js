function getSymptomsList() {
  var queryURL = apiURL + "/symptoms?language=en-gb";
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
  var queryURL = apiURL + "/body/locations";
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
  var queryURL = apiURL + '/diagnosis?&symptoms=' + JSON.stringify(symptomIdList) + '&gender=' + gender + '&year_of_birth=' + birthYear;
  getApiData(queryURL, showProposedSymptoms);
}

function showProposedSymptoms(response) {

  for (var i = 0; i < response.length; i++) {
    console.log(response.ID);
    console.log(response.Name);
  }
}

function getSpecializations(symptomsList, gender, birthYear) {

  var queryURL = apiURL + "/diagnosis/specialisations?&symptoms=" + JSON.stringify(symptomsList) + "&gender=" + gender + "&year_of_birth=" + birthYear;
  getApiData(queryURL, showSpecializations);
}

function showSpecializations(response) {

  console.log(response);
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

function readSymptoms() {

  database.ref('/symptoms/').on("value", function (snapshot) {
    console.log(snapshot.val());
    var symptoms = snapshot.val();

    Object.keys(symptoms).forEach(function (symptomId) {
      var symptom = symptoms[symptomId];

      console.log(symptom.name);
      console.log(symptom.id);

    })
  });
}