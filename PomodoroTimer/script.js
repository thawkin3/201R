function getEl() {
	min = document.getElementById("min");
	sec = document.getElementById("sec");
	startButton = document.getElementById("start");
	stopButton = document.getElementById("stop");
	okButton = document.getElementById("ok");
	numMinButton = document.getElementById("numMin");
	stopButton.disabled = true;
}

function startTimer() {

	startButton.disabled = true;
	okButton.disabled = true;
	numMinButton.disabled = true;
	stopButton.disabled = false;

	timer = setInterval(function(){
		if (sec.innerHTML != 00) {
			sec.innerHTML = parseInt(sec.innerHTML) - 1;
			if (sec.innerHTML.length == 1) {
				sec.innerHTML = "0" + sec.innerHTML;
			}
		} else {
			if (min.innerHTML != 00) {
				sec.innerHTML = 59;
				min.innerHTML = parseInt(min.innerHTML) - 1;
				if (min.innerHTML.length == 1) {
					min.innerHTML = "0" + min.innerHTML;
				}
			} else {
				clearInterval(timer);
				sec.innerHTML = "00";
				min.innerHTML = "25";
				startButton.disabled = false;
				okButton.disabled = false;
				numMinButton.disabled = false;
				stopButton.disabled = true;
				alert("Time is up!");
			}
		}

	}, 1000);

}

function stopTimer(timer) {
	clearInterval(timer);
	startButton.disabled = false;
	okButton.disabled = false;
	numMinButton.disabled = false;
	stopButton.disabled = true;
}

function changeMin() {
	min.innerHTML = document.getElementById("numMin").value;
	if (min.innerHTML.length == 1) {
		min.innerHTML = "0" + min.innerHTML;
	}
	sec.innerHTML = "00";
}



