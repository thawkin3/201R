$(document).ready(function(){

    $("#commentForm").submit(function(){
        var theName = $("#name").val();
        if (theName == undefined) {
            theName = "Anonymous";
        }

        var theComment = $("#comment").val();
        if (theComment == undefined) {
            theComment = "No Comment";
        }

        var myobj = {Name: theName, Comment: theComment};
        jobj = JSON.stringify(myobj);
        $("#json").text("Your JSON stringified comment: " + jobj);
    
    	var url = "comment";
		$.ajax({
  			url:url,
  			type: "POST",
  			data: jobj,
  			contentType: "application/json; charset=utf-8",
  			success: function(data,textStatus) {
      				$("#done").html("Submitting your comment: " + textStatus + "!");
  			}
		});
	});

    $("#getThem").click(function() {
        $.getJSON('comments', function(data) {
            console.log(data);
            $("#comments").html("");
            for(var comment in data) {
              var com = data[comment];
              var output = "<div class='singleComment'><span class='comComment'>\"" + com.Comment + "\"</span><br/><span class='comName'>- " + com.Name + "</span></div>";
              $("#comments").prepend(output);
            }
        });
    });

});
