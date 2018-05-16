$(document).ready(function() {
    $.ajax({
        url: '/gethighscores',
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
    })
        .done(function(data, textStatus) {
            var html = '';
            for (var i = 0; i < data.length; i++) {
                html += '<tr><td>' + data[i].Username + '</td><td>' + data[i].Score + '</td></tr>';
            }
            $('#highScoresTable tbody').append(html);
        })
        .fail(function(error) {
            $('#highScoresTable tbody').empty();
            $('#highScoresTable').after('<p>Sorry, there was an error fetching high scores.</p>');
        });
});
