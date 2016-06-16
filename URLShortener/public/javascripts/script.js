var theSpots = document.getElementsByClassName("currentAddress");

for (var i = 0; i < theSpots.length; i++) {
	theSpots[i].innerHTML = window.location.href;
}
