'use strict';


var data = [];

$('#start').click(function() {

    $("#start").hide();
    $("#message").css("display", "inline");

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

            $('#play').click(function() {
                $("ul").empty();
                $("#question").css("display", "block");

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


                $("ul").append("<li value=" + place_1.population + " id='A'>" + place_1.name + "</li> <span id='or'></span><li value= " + place_2.population + " id='B'>" + place_2.name + "</li>")
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
                            $("ul").append("<div class='answer'><h3>Correct!</h3><p>" + place_1.name + " has a population of <span>" + place_1.population + "</span>.</p><p> While " + place_2.name + " has a population of <span>" + place_2.population + "</span>.</p></div>");
                            console.log('place 1 is greater');
                            //incorrect
                        } else if ($(this).attr('id') === 'A' && $(this).val() < $('#B').val()) {
                            $(".answer").empty();
                            $("ul").append("<div class='answer'><h3>Incorrect.</h3><p>Try the other one.</p>");
                            console.log("incorrect");
                            //correct
                        } else if ($(this).attr('id') === 'B' && $(this).val() > $('#A').val()) {
                            $(".answer").empty();
                            $("ul").append("<div class='answer'><h3>Correct!</h3><p>" + place_2.name + " has a population of <span>" + place_2.population + "</span>.</p><p> While " + place_1.name + " has a population of <span>" + place_1.population + "</span>.</p></div>");
                            console.log('place 2 is greater');
                            //incorrect
                        } else if ($(this).attr('id') === 'B' && $(this).val() < $('#A').val()) {
                            $(".answer").empty();
                            $("ul").append("<div class='answer'><h3>Incorrect.</h3><p> Try the other one.</p></div>");
                            console.log("incorrect");
                        }

                    });

            });

        }).fail(function(error) {
            console.log(error);
        });
    }


    $("#message").hide();
    $("#play").css("display", "inline");
});