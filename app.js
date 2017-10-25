//object of background images
var bg = {
    "beach": "url(beach.jpg)",
    "dojo": "url(dojo.jpg)",
    "earth": "url(earth.jpg)",
    "matrix": "url(matrix.jpg)",
    "snow": "url(snow.jpg)",
    "forest": "url(forest.jpg)"
};

//object of different available players
var players = {
    "Leo": "url(leo.png)",
    "Mikey": "url(mikey.png)",
    "Raphael": "url(raphael.png)",
    "Donny": "url(donny.png)"
};

//formats an inputed string to be ready to get injected into the DOM
function formatOption(str) {
    var s = '<option value="' + str + '">';
    s += str;
    s += '</option>'
    return s;
}

//formats the current players to be injected into the DOM
function formatSelection() {
    var HTML = '<h1 id="select_title">Select Players</h1>';
    var select1HTML = '<select name="player1" value="select ninja">';
    var select2HTML = '<select name="player2">';
    var selectClose = '</select>';
    var dummyOption = '<option disabled selected hidden>Select Ninja...</option>';
    select1HTML += dummyOption;
    select2HTML += dummyOption;
    for (var i = 0; i < Object.keys(players).length; i++) {
        select1HTML += formatOption(Object.keys(players)[i]);
        select2HTML += formatOption(Object.keys(players)[i]);
    }
    select1HTML += selectClose;
    select2HTML += selectClose;
    HTML += select1HTML + select2HTML;
    return HTML;
}

//this handler makes sure that jQuery notices that there is a select tag that was 
//dynamically chosen
function selectionHandler() {
    $('select').click(function () {
        var ninja = $(this).val();
        if (ninja != null) ninja = ninja.toLowerCase() + '.png';
        var curPlayer = $(this).attr('name');
        if (curPlayer === 'player1') {
            if($('#left_player').attr('src') == ninja) return;
            $('#left_player').fadeOut(function(){
                $('#left_player').attr('src', ninja);
                $('#left_player').attr('alt', ninja);
                $(this).fadeIn();
            });
        } else {
            if($('#right_player').attr('src') == ninja) return;
            $('#right_player').fadeOut(function(){
                $('#right_player').attr('src', ninja);
                $('#right_player').attr('alt', ninja);
                $('#right_player').fadeIn();
            });
        }
        console.log($('#left_player').attr('src'), $('#right_player').attr('src'));
        if ($('#left_player').attr('src') !== '' && $('#right_player').attr('src') !== ''
            && $('#left_player').attr('src') !== undefined && $('#right_player').attr('src') !== undefined) {
            $('#selector').remove();
        }
    });
}

$(document).ready(function () {

    //changes original black background when hovering on and off
    $('button').hover(function () {
        var att = $(this).attr('id');
        $(this).parent().parent().css('background', bg[$(this).attr('id')]);
        //size is 116% to adjust for some images not being the correct width:height ratio
        $(this).parent().parent().css('background-size', '116%');
    }, function () {
        $(this).parent().parent().css('background', 'black');
        $(this).parent().parent().css('background-size', '116%');
    });

    //when a button is clicked, its permanently sets the background and
    //injects the html required for the selection tags
    $('button').click(function () {
        var t = $(this);
        var parent = $(this).parent();
        parent.children('button').fadeOut(function () {
            $(this).parent().parent().css('background', bg[t.attr('id')]);
            $(this).parent().parent().css('background-size', '116%');
            $(this).remove();
            var html = formatSelection();
            parent.html(html);
            selectionHandler();
        });
    });
});