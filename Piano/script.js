$(document).ready(function(){
			
	$(document).keydown(function(key) {
		switch (parseInt(key.which,10)) {					
			// A is pressed to play the "C" note
			case 65:
				$('#C').show()
				$('#CKey').addClass('press');
				document.getElementById("CSound").currentTime = 0;
				document.getElementById("CSound").play();
				break;
			
			// S is pressed to play the "D" note
			case 83:
				$('#D').show();
				$('#DKey').addClass('press');
				document.getElementById("DSound").currentTime = 0;
				document.getElementById("DSound").play();
				break;
			
			// D is pressed to play the "E" note
			case 68:
				$('#E').show();
				$('#EKey').addClass('press');
				document.getElementById("ESound").currentTime = 0;
				document.getElementById("ESound").play();
				break;
			
			// F is pressed to play the "F" note
			case 70:
				$('#F').show();
				$('#FKey').addClass('press');
				document.getElementById("FSound").currentTime = 0;
				document.getElementById("FSound").play();
				break;
				
			// G is pressed to play the "G" note
			case 71:
				$('#G').show();
				$('#GKey').addClass('press');
				document.getElementById("GSound").currentTime = 0;
				document.getElementById("GSound").play();
				break;
			
			// H is pressed to play the "A" note
			case 72:
				$('#A').show();
				$('#AKey').addClass('press');
				document.getElementById("ASound").currentTime = 0;
				document.getElementById("ASound").play();
				break;
			
			// J is pressed to play the "B" note
			case 74:
				$('#B').show();
				$('#BKey').addClass('press');
				document.getElementById("BSound").currentTime = 0;
				document.getElementById("BSound").play();
				break;
			
			// K is pressed to play the "C" note
			case 75:
				$('#CUpper').show();
				$('#CUpperKey').addClass('press');
				document.getElementById("CUpperSound").currentTime = 0;
				document.getElementById("CUpperSound").play();
				break;
				
			// L is pressed to play the "D" note
			case 76:
				$('#DUpper').show();
				$('#DUpperKey').addClass('press');
				document.getElementById("DUpperSound").currentTime = 0;
				document.getElementById("DUpperSound").play();
				break;
			
			// ; is pressed to play the "E" note
			case 186:
				$('#EUpper').show();
				$('#EUpperKey').addClass('press');
				document.getElementById("EUpperSound").currentTime = 0;
				document.getElementById("EUpperSound").play();
				break;
			
			// ' is pressed to play the "F" note
			case 222:
				$('#FUpper').show();
				$('#FUpperKey').addClass('press');
				document.getElementById("FUpperSound").currentTime = 0;
				document.getElementById("FUpperSound").play();
				break;
				
			// W is pressed to play the "C#" note
			case 87:
				$('#CSharp').show();
				$('#CSharpKey').addClass('press');
				document.getElementById("C#Sound").currentTime = 0;
				document.getElementById("C#Sound").play();
				break;
				
			// E is pressed to play the "D#" note
			case 69:
				$('#DSharp').show();
				$('#DSharpKey').addClass('press');
				document.getElementById("D#Sound").currentTime = 0;
				document.getElementById("D#Sound").play();
				break;
			
			// T is pressed to play the "F#" note
			case 84:
				$('#FSharp').show();
				$('#FSharpKey').addClass('press');
				document.getElementById("F#Sound").currentTime = 0;
				document.getElementById("F#Sound").play();
				break;
			
			// Y is pressed to play the "G#" note
			case 89:
				$('#GSharp').show();
				$('#GSharpKey').addClass('press');
				document.getElementById("G#Sound").currentTime = 0;
				document.getElementById("G#Sound").play();
				break;
			
			// U is pressed to play the "A#" note
			case 85:
				$('#ASharp').show();
				$('#ASharpKey').addClass('press');
				document.getElementById("A#Sound").currentTime = 0;
				document.getElementById("A#Sound").play();
				break;
				
			// O is pressed to play the "C#" note
			case 79:
				$('#CSharpUpper').show();
				$('#CSharpUpperKey').addClass('press');
				document.getElementById("C#UpperSound").currentTime = 0;
				document.getElementById("C#UpperSound").play();
				break;
			
			// P is pressed to play the "D#" note
			case 80:
				$('#DSharpUpper').show();
				$('#DSharpUpperKey').addClass('press');
				document.getElementById("D#UpperSound").currentTime = 0;
				document.getElementById("D#UpperSound").play();
				break;
				
			// ] is pressed to play the "F#" note
			case 221:
				$('#FSharpUpper').show();
				$('#FSharpUpperKey').addClass('press');
				document.getElementById("F#UpperSound").currentTime = 0;
				document.getElementById("F#UpperSound").play();
				break;
		};
	});
	
	$(document).keyup(function(key) {
		switch (parseInt(key.which,10)) {					
			// A is pressed to play the "C" note
			case 65:
				$('#C').hide()
				$('#CKey').removeClass('press');
				break;
			
			// S is pressed to play the "D" note
			case 83:
				$('#D').hide();
				$('#DKey').removeClass('press');

				break;
			
			// D is pressed to play the "E" note
			case 68:
				$('#E').hide();
				$('#EKey').removeClass('press');
				break;
			
			// F is pressed to play the "F" note
			case 70:
				$('#F').hide();
				$('#FKey').removeClass('press');
				break;
				
			// G is pressed to play the "G" note
			case 71:
				$('#G').hide();
				$('#GKey').removeClass('press');
				break;
			
			// H is pressed to play the "A" note
			case 72:
				$('#A').hide();
				$('#AKey').removeClass('press');
				break;
			
			// J is pressed to play the "B" note
			case 74:
				$('#B').hide();
				$('#BKey').removeClass('press');
				break;
			
			// K is pressed to play the "C" note
			case 75:
				$('#CUpper').hide();
				$('#CUpperKey').removeClass('press');
				break;
				
			// L is pressed to play the "D" note
			case 76:
				$('#DUpper').hide();
				$('#DUpperKey').removeClass('press');
				break;
			
			// ; is pressed to play the "E" note
			case 186:
				$('#EUpper').hide();
				$('#EUpperKey').removeClass('press');
				break;
			
			// ' is pressed to play the "F" note
			case 222:
				$('#FUpper').hide();
				$('#FUpperKey').removeClass('press');
				break;
				
			// W is pressed to play the "C#" note
			case 87:
				$('#CSharp').hide();
				$('#CSharpKey').removeClass('press');
				break;
				
			// E is pressed to play the "D#" note
			case 69:
				$('#DSharp').hide();
				$('#DSharpKey').removeClass('press');
				break;
			
			// T is pressed to play the "F#" note
			case 84:
				$('#FSharp').hide();
				$('#FSharpKey').removeClass('press');
				break;
			
			// Y is pressed to play the "G#" note
			case 89:
				$('#GSharp').hide();
				$('#GSharpKey').removeClass('press');
				break;
			
			// U is pressed to play the "A#" note
			case 85:
				$('#ASharp').hide();
				$('#ASharpKey').removeClass('press');
				break;
				
			// O is pressed to play the "C#" note
			case 79:
				$('#CSharpUpper').hide();
				$('#CSharpUpperKey').removeClass('press');
				break;
			
			// P is pressed to play the "D#" note
			case 80:
				$('#DSharpUpper').hide();
				$('#DSharpUpperKey').removeClass('press');
				break;
				
			// ] is pressed to play the "F#" note
			case 221:
				$('#FSharpUpper').hide();
				$('#FSharpUpperKey').removeClass('press');
				break;
		};
	});

});