'use strict';


var data = [];

$('#start').click(function() {

    $("#start").hide();
    $("#message").css("display", "inline");
    setTimeout(function(){
        $("#message").hide();
        $("#play, #question").css("display", "inline");
    }, 2000);
});

$('#play').click(function() {
    /*
    $("#start").hide();
    $("#message").css("display", "inline");

    
    $("#message").hide();
    $("#play").css("display", "inline");
    */

    $("ul").empty();

    var url = 'https://api.census.gov/data/2014/acs1?get=NAME,B01001_001E';
    var API_URL = {
        all: url + '&for=place:*',
        single: url + '&for=place:07000&in=state:01'
    };


    if (data.length === 0) {

        $.ajax(API_URL.all).done(function(mainArray) {

            for (var i = 0; i < mainArray.length; i++) {
                console.log(mainArray[i]);
                data.push(mainArray[i]);
            }

        }).fail(function(error) {
            console.log(error);
        });
    }

    function getPlace() {

        var rand = data[Math.floor(Math.random() * data.length)];
        var place = {};

        rand.map(function(current, index) {

            if (data[0][index] === 'B01001_001E') {
                data[0][index] = 'population';
            }

            if (data[0][index] === 'NAME') {
                data[0][index] = 'name';
            }

            place[data[0][index]] = current;

        });

        return place;

    }


    var place_1 = getPlace(),
        place_2 = getPlace();


    $("ul").append("<li value=" + place_1.population + " id='A'>" + place_1.name + "</li> <span id='or'>    ...or...    </span><li value= " + place_2.population + " id='B'>" + place_2.name + "</li>")
        .on('click', 'li', function() {

            var p1 = parseInt(place_1.population),
                p2 = parseInt(place_2.population);
            console.log(p1 + " " + p2);

            // compare value which is clicked to another value
            // you can do it either by $(this).val()
            // or the way beneath

            //correct
            if ($(this).attr('id') === 'A' && $(this).val() > $('#B').val()) {
                $(".answer").empty();
                $("ul").append("<span class='answer'><br><br>Correct!<br><br>" + place_1.name + " has a population of " + place_1.population + ".<br> While " + place_2.name + " has a population of " + place_2.population + ".</span>");
                console.log('place 1 is greater');
            //incorrect
            } else if ($(this).attr('id') === 'A' && $(this).val() < $('#B').val()) {
                $(".answer").empty();
                $("ul").append("<span class='answer'><br><br>Incorrect. Try the other one.<br><br>");
                console.log("incorrect");
            //correct
            } else if ($(this).attr('id') === 'B' && $(this).val() > $('#A').val()) {
                $(".answer").empty();
                $("ul").append("<span class='answer'><br><br>Correct!<br><br>" + place_2.name + " has a population of " + place_2.population + ".<br> While " + place_1.name + " has a population of " + place_1.population + ".</span>");
                console.log('place 2 is greater');
            //incorrect
            } else if ($(this).attr('id') === 'B' && $(this).val() < $('#A').val()) {
                $(".answer").empty();
                $("ul").append("<span class='answer'><br><br>Incorrect. Try the other one.<br><br>");
                console.log("incorrect");
            }

        });

});
