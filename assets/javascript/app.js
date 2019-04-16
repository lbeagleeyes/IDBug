
function createGoogleMapsLink(destination) {

    //direction query URL that takes the user to Google Maps with origin and destination already plugged into the search. Also includes travelmode (ie. walking, driving, bicycle)
    var directionQuery = "https://www.google.com/maps/dir/?api=1&origin=" + usrLctn.longitude +','+ usrLctn.latitude+ "&destination=" + replaceSpace(destination) + "&travelmode=driving";

    return directionQuery;
    
}

//function to replace space with + for the url
function replaceSpace(loc) {
    return loc.split(' ').join('+');
}





