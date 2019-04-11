
var apiKey = "528gfZGJfl2XSAJ9jFxVzudrMlCD4JFF";
function getDiagnosis(symptomIdList, gender, birthYear) {

    var queryURL = 'https://healthservice.priaid.ch/diagnosis?token=${apiKey}&language=en-gb&symptoms=${symptomIdList}&gender=${gender}&year_of_birth=${birthYear}';

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        // showDiagnosis(emotion, response);
    });


}

var test = [234,235,236];

var diagnosis = getDiagnosis(test, "female", 1980);