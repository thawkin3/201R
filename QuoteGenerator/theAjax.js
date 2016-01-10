var xhr = new XMLHttpRequest();

var theIndex = Math.floor(Math.random()*15);

xhr.onload = function() {
	if (xhr.status === 200) {
		
		// parse the JSON
		var responseObject = JSON.parse(xhr.responseText);

		// change the index for the quote
		if (theIndex != responseObject.quotes.length - 1) {
			theIndex++;
		} else {
			theIndex = 0;
		}
	
		// build a string
		var newContent = "";
		newContent += "<h4 class='quote'>" + responseObject.quotes[theIndex].quote + "</h4>";
		newContent += "<h6 class='owner'><i>- " + responseObject.quotes[theIndex].owner + "</i></h6>";

		// update the page with new content
		document.getElementById("quoteHolder").innerHTML = newContent;

	}
};


function generate() {
	xhr.open('GET', 'quotes.json', true);	// prepare the request
	xhr.send(null);							// send the request
}