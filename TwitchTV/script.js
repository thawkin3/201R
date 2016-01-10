$(document).ready(function(){

	// array of channels to use
	var channels = ["freecodecamp", "TR7K", "ESL_SC2", "OgamingSC2", "cretetion", "storbeck", "terakilobyte", "habathcx", "RobotCaleb", "thomasballinger", "noobs2ninjas", "beohoff", "brunofin", "comster404"];

	// build the table
	channels.forEach(function(element, index, array) {
		var logo, display_name, game, status;
		var rowShade = "normal";
		$.getJSON("https://api.twitch.tv/kraken/streams/" + element).done(function(data) {
			if (data.stream != null) {
				logo = data.stream.channel.logo;
				if (logo == null) {
					logo = "unknown.png";
				}
				display_name = data.stream.channel.display_name;
				game = data.stream.channel.game;
				status = data.stream.channel.status;
				$("tbody").prepend("<tr class='normal'><td><img class='logo' src='" + logo + "'/></td><td><a target='_blank' href='http://www.twitch.tv/" + display_name + "'>" + display_name + "</a></td><td>" + game + ": " + status + "</td></tr>");
			} else if (data.stream == null) {
				$.getJSON("https://api.twitch.tv/kraken/channels/" + element, function(data) {
					logo = data.logo;
					if (logo == null) {
						logo = "unknown.png";
					}
					display_name = data.display_name;
					status = "Offline";
					rowShade = "offline";
					$("tbody").append("<tr class='offline'><td><img class='logo' src='" + logo + "'/></td><td><a target='_blank' href='http://www.twitch.tv/" + display_name + "'>" + display_name + "</a></td><td>" + status + "</td></tr>");
				});
			}
		}).fail(function(){
			console.log("failed!");
			logo = "unknown.png";
			display_name = element;
			status = "Account Closed";
			rowShade = "offline";
			$("tbody").append("<tr class='closed'><td><img class='logo' src='" + logo + "'/></td><td><a target='_blank' href='http://www.twitch.tv/" + display_name + "'>" + display_name + "</a></td><td>" + status + "</td></tr>");
		});
	});

	// filter the table
	$("span").click(function(){
		$("span").removeClass("active");
		$(this).addClass("active");
		if (this.innerHTML == "All") {
			$("tr").show();
		} else if (this.innerHTML == "Online") {
			$("tr").hide();
			$("tr.normal").show();
		} else {
			$("tr").hide();
			$("tr.offline, tr.closed").show();
		}
	});

});





