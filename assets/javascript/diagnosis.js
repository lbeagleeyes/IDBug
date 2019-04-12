


// function getToken() {

//     var uri = "https://authservice.priaid.ch/login";
//     var api_key = "Qx6s7_GMAIL_COM_AUT";
//     var secret_key = "Nm7o6S3Lqt9AJb84X";

//hass the key--

//     $.ajax({
//                 url: queryURL,
//                 method: "GET",
//                 data: {
//                     symptoms: symptomIdList,
//                     gender: gender,
//                     year_of_birth: birthYear
//                 },
            
//             }).then(function (response) {
//                 console.log(response);
//             });
//     }




// var apiKey = "528gfZGJfl2XSAJ9jFxVzudrMlCD4JFF";
// function getDiagnosis(symptomIdList, gender, birthYear) {

//     var queryURL = 'https://healthservice.priaid.ch/diagnosis?language=en-gb';

//     console.log(queryURL);


//     $.ajax({
//         url: queryURL,
//         method: "GET",
//         data: {
//             symptoms: symptomIdList,
//             gender: gender,
//             year_of_birth: birthYear
//         },
//         headers: {
//             "X-RapidAPI-Key": apiKey,
//             "X-RapidAPI-Host": "priaid-symptom-checker-v1.https://rapidapi.p.rapidapi.com"
//         }
//     }).then(function (response) {
//         console.log(response);
//         // showDiagnosis(emotion, response);
//     });


// }

// var test = [234, 235, 236];

//     var diagnosis = getDiagnosis(test, "female", 1980);