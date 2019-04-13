<<<<<<< HEAD
//global variables
var destination;
var origin;
var travelmode;

=======

//global variables
var destination;
var origin;
var travelmode;

>>>>>>> bd12d5b4c64c207e17cdbdd66c7206c8c36da33f
//direction query URL that takes the user to Google Maps with origin and destination already plugged into the search. Also includes travelmode (ie. walking, driving, bicycle)
var directionQuery = "https://www.google.com/maps/dir/?api=1&origin=" + replaceSpace(origin) + "&destination=" + replaceSpace(destination) + "&travelmode=" + travelmode;

//function to replace space with + for the url
function replaceSpace(location){
    return location.split(' ').join('+');
}
<<<<<<< HEAD
=======

$(document).ready(function () {
>>>>>>> bd12d5b4c64c207e17cdbdd66c7206c8c36da33f



