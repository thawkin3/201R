$(document).ready(function(){
	
	var storedAnswer = 0;
	var mathOpInProg = "";
	var beginMathOp = false;
	var lastOp = "";
	var lastNum = 0;
	var answer = document.getElementById("answer");

	$("button").click(function(){
		var that = this;
		
		if ( (parseInt(that.value) >= 0 && parseInt(that.value) <= 9) || that.value == "." ) {
			var hasDecimal = answer.innerHTML.indexOf(".");
			if ( ( answer.innerHTML.length < 8 || (answer.innerHTML.length < 9 && hasDecimal != -1) ) && !beginMathOp ) {
				if (answer.innerHTML != "0") {
					if (that.value != "." || (that.value == "." && hasDecimal == -1) ) {
						answer.innerHTML += that.value;
					}
				} else {
					answer.innerHTML = that.value;
					if (that.value == ".") {
						answer.innerHTML = "0.";
					}
				}
			} else if (beginMathOp) {
				answer.innerHTML = that.value;
				if (that.value == ".") {
					answer.innerHTML = "0.";
				}
				beginMathOp = false;
			}
		} else {
			switch (that.value) {
				case 'AC':
					answer.innerHTML = "0";
					storedAnswer = 0;
					beginMathOp = false;
					lastOp = "";
					lastNum = 0;
					break;

				case 'CE':
					answer.innerHTML = "0";
					break;

				case '%':
					storedAnswer = parseFloat(answer.innerHTML) / 100;
					if (storedAnswer.toString().indexOf(".") == -1) {
						answer.innerHTML = storedAnswer.toString().substr(0,8);
					} else {
						answer.innerHTML = storedAnswer.toString().substr(0,9);
					}
					break;

				case '÷':
					storedAnswer = parseFloat(answer.innerHTML);
					mathOpInProg = "/";
					beginMathOp = true;
					break;

				case 'x':
					storedAnswer = parseFloat(answer.innerHTML);
					mathOpInProg = "*";
					beginMathOp = true;
					break;

				case '-':
					storedAnswer = parseFloat(answer.innerHTML);
					mathOpInProg = "-";
					beginMathOp = true;
					break;

				case '+':
					storedAnswer = parseFloat(answer.innerHTML);
					mathOpInProg = "+";
					beginMathOp = true;
					break;

				case '=':
					if (!beginMathOp) {

						switch(mathOpInProg) {
							case '/':
								lastOp = mathOpInProg;
								lastNum = parseFloat(answer.innerHTML);
								storedAnswer /= parseFloat(answer.innerHTML);
								break;

							case '*':
								lastOp = mathOpInProg;
								lastNum = parseFloat(answer.innerHTML);
								storedAnswer *= parseFloat(answer.innerHTML);
								break;

							case '-':
								lastOp = mathOpInProg;
								lastNum = parseFloat(answer.innerHTML);
								storedAnswer -= parseFloat(answer.innerHTML);
								break;

							case '+':
								lastOp = mathOpInProg;
								lastNum = parseFloat(answer.innerHTML);
								storedAnswer += parseFloat(answer.innerHTML);
								break;

							case '':
								switch(lastOp) {
									case '/':
										storedAnswer /= lastNum;
										break;

									case '*':
										storedAnswer *= lastNum;
										break;

									case '-':
										storedAnswer -= lastNum;
										break;

									case '+':
										storedAnswer += lastNum;
										break;

									default: // do nothing
								}
								break;

							default: // do nothing
						}

						if (storedAnswer.toString().indexOf(".") == -1) {
							answer.innerHTML = storedAnswer.toString().substr(0,8);
						} else {
							answer.innerHTML = storedAnswer.toString().substr(0,9);
						}

						if (answer.innerHTML == "Infinity" || answer.innerHTML == "NaN") {
							answer.innerHTML = "ERROR";
						}

					}

					mathOpInProg = "";
					beginMathOp = false;
					break;

				default: // do nothing
			}
		}
	});

});