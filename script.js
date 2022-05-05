var userSearch = $("input")
var searchBtn = $("#searchbutton");
var contentArea = $("#weatherInfoArea");
var forecastHead = $("#forecastHeader");
var line = $("#line");
var fiveDay = $("#forecast");
var pTags = $("p");
var day1 = $("#dayOne");
var day2 = $("#dayTwo");
var day3 = $("#dayThree");
var day4 = $("#dayFour");
var day5 = $("#dayFive");
var searchHistBtn = $("section");
var btnclass = $(".btns")
var searchBtns = $("#searchBtns")

var cityStore = JSON.parse(localStorage.getItem("cities")) || [];

createSearchBtns()

function createSearchBtns() {
    searchBtns.empty();
    for (var i = 0; i < cityStore.length; i++) {
        var city = cityStore[i];
        var newBtn = $("<button>");
        newBtn.addClass("newSearch");
        newBtn.attr("data-name", city);
        newBtn.text(city);
        searchBtns.prepend(newBtn);
    }
    if (cityStore.length > 0)
        searchHistBtn.attr("style", "visibility: visible");
        var newBtn = $("<button>");
        newBtn.attr("style", " width: 75%; margin: 2%; background-color: #2196F3; color: white; outline: none;")
        newBtn.text("Clear Search History");
        searchBtns.append(newBtn);
        newBtn.on("click", function(){
            localStorage.clear();
            window.location.reload();
        })

}

searchBtn.on("click", letsGo);
document.body.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
        letsGo();
    }
})

function letsGo () {

    contentArea.empty();
    day1.empty();
    day2.empty();
    day3.empty();
    day4.empty();
    day5.empty();
    $(".fiveDay").remove();




    var city = userSearch.val().trim()
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=c4d189dbd561321cb5a567d4c5e8970b";



    $.ajax({
        url: queryURL,
        method: "GET",
        success: function (response) {
            console.log(response);

            if (cityStore.indexOf(response.name) === -1) {
                cityStore.push(response.name)
                localStorage.setItem("cities", JSON.stringify(cityStore));
                createSearchBtns();
            }




            localStorage.setItem("cities", JSON.stringify(cityStore));
            console.log(response.main.temp);
            forecastHead.text("5 Day forecast :");
            line.attr("style", "display: block");
            fiveDay.attr("style", "visibility: visible");
            var tempK = response.main.temp
            var tempF = ((tempK - 273.15) * 1.8) + 32
            var time = moment().format("LL");
            var todayDiv = $("<div>");
            var cityName = $("<h2>");
            var info = $("<p>");
            var temp = tempF.toFixed(1);
            cityName.text(response.name + " (" + time + ")");
            cityName.attr("style", "margin: 2%;");
            todayDiv.attr("style", "margin: 7%")
            var iconCode = response.weather[0].icon;
            var icontop = $("<img>");
            icontop.attr("src", "https://openweathermap.org/img/wn/" + iconCode + "@2x.png");
            icontop.attr("style", "background-color: #2196F3; border-radius: 10px; margin: 1%");
            info = "<br>" + "Temperature: " + temp + " F" + "<br>" + "Humidity: " + response.main.humidity + "%" + "<br>"
                + "Wind speed: " + response.wind.speed + " MPH";


            todayDiv.append(cityName);
            todayDiv.append(icontop);
            todayDiv.append(info);

            contentArea.append(todayDiv);
            var queryURL3 = "https://api.openweathermap.org/data/2.5/uvi?lat=" + response.coord.lat + "&lon=" + response.coord.lon +
                "&appid=c4d189dbd561321cb5a567d4c5e8970b";
            $.ajax({
                url: queryURL3,
                method: "GET"
            })
                .then(function (response) {
                    console.log(response)
                    var uvIndex = $("<p>");
                    var indexVal = response.value
                    uvIndex.text("UV Index: " + indexVal);
                    uvIndex.attr("style", "color: white");
                    if (indexVal <= 2) {
                        uvIndex.attr("style", "color: white; background-color: green; width: 110px");
                    } else if (indexVal = 3 - 5) {
                        uvIndex.attr("style", "background-color: yellow; width: 110px");
                    } else if (indexVal = 6 - 7) {
                        uvIndex.attr("style", "color: white; background-color: orange; width: 110px");
                    } else if (indexVal = 8 - 10) {
                        uvIndex.attr("style", "colro: white; background-color: red; width: 110px");
                    } else if (indexVal > 11) {
                        uvIndex.attr("style", "colro: white; background-color: purple; width: 110px");
                    }
                    todayDiv.append(uvIndex);
                });
            var queryURL2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + response.coord.lat + "&lon=" + response.coord.lon + "&exclude=minute,hourly" + city + "&APPID=c4d189dbd561321cb5a567d4c5e8970b";

            $.ajax({
                url: queryURL2,
                method: "GET"
            })
                .then(function (response) {
                    for (var i = 0; i < 5; i++) {
                        var nextDay = moment().add(i + 1, 'd');
                        var oneDayAhead = nextDay.format("LL");

                        var p1 = $("<p>");
                        var newDiv = $("<div>");
                        newDiv.addClass("fiveDay");
                        newDiv.attr("style", "border-radius: 5px; background-color: aliceblue; height: 175px; width: 18%; margin: 1%; color: #2196F3; font-size: small;")
                        var tempke = response.daily[i].temp.day;
                        var tempFa = ((tempke - 273.15) * 1.8) + 32;
                        tempFa = tempFa.toFixed(1);
                        console.log(tempFa)
                        var iconc = response.daily[i].weather[0].icon;
                        var iconOne = $("<img>");
                        iconOne.attr("src", "https://openweathermap.org/img/wn/" + iconc + "@2x.png");
                        p1 = oneDayAhead + "<br>" + "Temp: " + tempFa + " F" + "<br>" + "Humidity: " + response.daily[0].humidity
                            + "%";
                        console.log(p1);
                        newDiv.append(p1)
                        newDiv.append(iconOne);
                        fiveDay.append(newDiv);
                        console.log(response);
                    }

                });
        }, error: forecastHead.text("Please choose a city (Check your spelling)")


    })

    newCity();

}

function newCity() {

    userSearch.val("");
}

$(document).on("click", ".newSearch", function () {
    contentArea.empty();
    $(".fiveDay").remove();
    var city = $(this).attr("data-name");
    console.log(city);
    console.log(city);
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=c4d189dbd561321cb5a567d4c5e8970b";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            forecastHead.text("5 Day forecast :");
            line.attr("style", "display: block");
            fiveDay.attr("style", "visibility: visible");
            var tempK = response.main.temp
            var tempF = ((tempK - 273.15) * 1.8) + 32
            var time = moment().format("LL");
            var todayDiv = $("<div>");
            var cityName = $("<h2>");
            var info = $("<p>");
            var temp = tempF.toFixed(1);
            cityName.text(response.name + " (" + time + ")");
            cityName.attr("style", "margin: 2%;");
            todayDiv.attr("style", "margin: 7%")
            var iconCode = response.weather[0].icon;
            var icontop = $("<img>");
            icontop.attr("src", "https://openweathermap.org/img/wn/" + iconCode + "@2x.png");
            icontop.attr("style", "background-color: #2196F3; border-radius: 10px; margin: 1%");
            info = "<br>" + "Temperature: " + temp + " F" + "<br>" + "Humidity: " + response.main.humidity + "%" + "<br>"
                + "Wind speed: " + response.wind.speed + " MPH";


            todayDiv.append(cityName);
            todayDiv.append(icontop);
            todayDiv.append(info);

            contentArea.append(todayDiv);
            var queryURL3 = "https://api.openweathermap.org/data/2.5/uvi?lat=" + response.coord.lat + "&lon=" + response.coord.lon +
                "&appid=c4d189dbd561321cb5a567d4c5e8970b";
            $.ajax({
                url: queryURL3,
                method: "GET"
            })
                .then(function (response) {
                    console.log(response)
                    var uvIndex = $("<p>");
                    var indexVal = response.value
                    uvIndex.text("UV Index: " + indexVal);
                    uvIndex.attr("style", "color: white");
                    if (indexVal <= 2) {
                        uvIndex.attr("style", "color: white; background-color: green; width: 110px");
                    } else if (indexVal = 3 - 5) {
                        uvIndex.attr("style", "background-color: yellow; width: 110px");
                    } else if (indexVal = 6 - 7) {
                        uvIndex.attr("style", "color: white; background-color: orange; width: 110px");
                    } else if (indexVal = 8 - 10) {
                        uvIndex.attr("style", "colro: white; background-color: red; width: 110px");
                    } else if (indexVal > 11) {
                        uvIndex.attr("style", "colro: white; background-color: purple; width: 110px");
                    }
                    todayDiv.append(uvIndex);
                });
            var queryURL2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + response.coord.lat + "&lon=" + response.coord.lon + "&exclude=minute,hourly" + city + "&APPID=c4d189dbd561321cb5a567d4c5e8970b";

            $.ajax({
                url: queryURL2,
                method: "GET"
            })
                .then(function (response) {
                    for (var i = 0; i < 5; i++) {
                        var nextDay = moment().add(i + 1, 'd');
                        var oneDayAhead = nextDay.format("LL");

                        var p1 = $("<p>");
                        var newDiv = $("<div>");
                        newDiv.addClass("fiveDay");
                        newDiv.attr("style", "border-radius: 5px; background-color: aliceblue; height: 175px; width: 18%; margin: 1%; color: #2196F3; font-size: small;")
                        var tempke = response.daily[i].temp.day;
                        var tempFa = ((tempke - 273.15) * 1.8) + 32;
                        tempFa = tempFa.toFixed(1);
                        console.log(tempFa)
                        var iconc = response.daily[i].weather[0].icon;
                        var iconOne = $("<img>");
                        iconOne.attr("src", "https://openweathermap.org/img/wn/" + iconc + "@2x.png");
                        p1 = oneDayAhead + "<br>" + "Temp: " + tempFa + " F" + "<br>" + "Humidity: " + response.daily[0].humidity
                            + "%";
                        console.log(p1);
                        newDiv.append(p1)
                        newDiv.append(iconOne);
                        fiveDay.append(newDiv);
                        console.log(response);
                    }

                });


        })
});