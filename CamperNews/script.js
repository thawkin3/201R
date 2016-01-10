$(document).ready(function(){

	$.getJSON("http://www.freecodecamp.com/news/hot").done(function(data) {

		var nestArray = [];
		for (var i = 0; i < data.length; i++) {
			nestArray.push([i, data[i].rank]);
		}
		
		nestArray = nestArray.sort(function(a,b){
		  return b[1] - a[1];
		});
		
		for (var i = 0; i < nestArray.length; i++) {
			var curStory = data[nestArray[i][0]];
			var title = curStory.headline;
			if (title.length > 40) {
				title = title.substr(0,37) + "...";
			}
			$("#container").append("<div class='story'><a target='_blank' href='" + curStory.link + "'><img class='profile' src='" + curStory.author.picture + "'/></a><p><a target='_blank' href='" + curStory.link + "'>" + title + "</a></p><p><i>by: " + curStory.author.username + "</i></p><p>Posted on: " + new Date(curStory.timePosted).toDateString() + "</p><p><img src='thumbs_up.png' alt='Likes' height='14px'/>&nbsp;" + curStory.rank + "</p></div>");
		}

	}).fail(function(){
		$("#container").html("Sorry! Something's not working right now. Please check back later.");
	});

});