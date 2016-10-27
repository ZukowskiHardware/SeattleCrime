function sendRequest() {

	var latitude = document.getElementById("latitude").value;


	var longitude = document.getElementById("longitude").value;


	//convert miles to km
	var radius = document.getElementById("radius").value * 1609.34;

	$.ajax({
		url: "https://data.seattle.gov/resource/pu5n-trf4.json?$where=within_circle(incident_location, "
		+ latitude + ", " + longitude + ", " + radius + ")",
    type: "GET",
    data: {
      "$limit" : 10000,
    }
	}).done( function(data) {
		var theMap = new Object();

		var theTable = "";

		alert("Retrieved " + data.length + " records from the dataset!");

		var inString;

		for (i = 0; i < data.length; i++) {

			inString = JSON.stringify(data[i].event_clearance_description);

			//create and store the new latLon objects in the array
			latLon.push(new google.maps.LatLng(data[i].latitude, data[i].longitude));

			if (inString in theMap) {
				theMap[inString] += 1;
			} else {
				theMap[inString] = 1;
			}
		}

		//checking if the hashmap is shorter than the request size
	  //document.write("total length of the map " + "<br />");
  	//document.write(Object.keys(theMap).length + "<br />" );


	  //produces and easily itterable object to display all
	  // category names
	  var theCategories = Object.getOwnPropertyNames(theMap);


	  //print out all of the values of the hashMap, or in this case
	  // the categories from the object you created in tabular
		// format.

		theTable += "<table>";
		theTable += "<tr><td>";
		theTable += "Crime Category";
		theTable += "</td><td>";
		theTable += "Occurances";
		theTable += "</td></tr>";

	  for (i = 0; i < theCategories.length; i++){
			var number = theMap[theCategories[i]];

			theTable += "<tr><td>";

			theTable += theCategories[i];

			theTable += "</td><td>";

	    theTable += number;

			theTable += "</td></tr>";
	  }

		theTable += "</table>";

		//bring back this data later
		//document.write(theTable);
	});


}
