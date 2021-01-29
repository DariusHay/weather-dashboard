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



searchBtn.on("click", function(){

    contentArea.empty();
    day1.empty();
    day2.empty();
    day3.empty();
    day4.empty();
    day5.empty();
    searchHistBtn.attr("style", "visibility: visible")
    

var city = userSearch.val().trim()    
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=c4d189dbd561321cb5a567d4c5e8970b";

$.ajax({
    url: queryURL,
    method: "GET"
  })
    .then(function(response) {
        console.log(response);
        // var cityN = response.name
        // console.log(cityN)
        var cityStore = JSON.parse(localStorage.getItem("cities")) || [];
        var list = {
            city : response.name
        };
        cityStore.push(list);
        localStorage.setItem("cities", JSON.stringify(cityStore));
        var newStore = JSON.parse(localStorage.getItem("cities"))
        var htmlString = "";
        for (var i = newStore.length - 1; i < newStore.length; i++) {
            htmlString = newStore[i].city;
            var newBtn = $("<button>");
            newBtn.addClass("newSearch")
            newBtn.text(htmlString);
            searchHistBtn.append(newBtn);
        }
        console.log(htmlString)
       
        localStorage.setItem("cities", JSON.stringify(cityStore));
        console.log(response.main.temp);
        forecastHead.text("5 Day forecast :");
        line.attr("style", "display: block");
        fiveDay.attr("style", "visibility: visible");
        var tempK = response.main.temp
        var tempF = ((tempK-273.15)*1.8)+32
        var time = moment().format("LL");
        var nextDay = moment().add(1, 'd');
        var twoDays = moment().add(2, 'd');
        var threeDays = moment().add(3, 'd');
        var fourDays = moment().add(4, 'd');
        var fiveDays = moment().add(5, 'd');
        var oneAhead = nextDay.format("LL");
        var twoAhead = twoDays.format("LL");
        var threeAhead = threeDays.format("LL");
        var fourAhead = fourDays.format("LL");
        var fiveAhead = fiveDays.format("LL");
        var todayDiv = $("<div>");
        var cityName = $("<h2>");
        var info = $("<p>");
        var temp = tempF.toFixed(1);
        cityName.text(response.name + " (" + time + ")");
        cityName.attr("style", "margin: 2%;");
        todayDiv.attr("style", "margin: 7%")
        var iconCode = response.weather[0].icon;
        var icontop = $("<img>");
        icontop.attr("src", "http://openweathermap.org/img/wn/" + iconCode + "@2x.png");
        icontop.attr("style", "background-color: #2196F3; border-radius: 10px; margin: 1%");
        info = "<br>" + "Temperature: " + temp + " F" + "<br>" + "Humidity: " + response.main.humidity + "%" + "<br>"
         + "Wind speed: " + response.wind.speed + " MPH";
        
        
        todayDiv.append(cityName);
        todayDiv.append(icontop);
        todayDiv.append(info);

        contentArea.append(todayDiv);
        var queryURL3 = "http://api.openweathermap.org/data/2.5/uvi?lat=" + response.coord.lat + "&lon=" + response.coord.lon + 
        "&appid=c4d189dbd561321cb5a567d4c5e8970b";
        $.ajax({
            url: queryURL3,
            method: "GET"
          })
            .then(function(response) {
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
                .then(function(response) {
                    var p1 = $("<p>");
                    var p2 = $("<p>");
                    var p3 = $("<p>");
                    var p4 = $("<p>");
                    var p5 = $("<p>");
                    var tempke = response.daily[0].temp.day;
                    var tempFa = ((tempke-273.15)*1.8)+32;
                    tempFa = tempFa.toFixed(1);
                    console.log(tempFa) 
                    var iconc = response.daily[0].weather[0].icon;
                    var iconOne = $("<img>");
                    iconOne.attr("src", "http://openweathermap.org/img/wn/" + iconc + "@2x.png");
                    p1 = oneAhead + "<br>" + "Temp: " + tempFa + " F" + "<br>" + "Humidity: " + response.daily[0].humidity
                     + "%";
                    console.log(p1);
                    day1.append(p1)
                    day1.append(iconOne);
                    console.log(response);
                    var tempkel = response.daily[1].temp.day;
                    var tempFah = ((tempkel-273.15)*1.8)+32;
                    tempFah = tempFah.toFixed(1);
                    var iconco = response.daily[1].weather[0].icon;
                    var iconTwo = $("<img>");
                    iconTwo.attr("src", "http://openweathermap.org/img/wn/" + iconco + "@2x.png");
                    p2 = twoAhead + "<br>" + "Temp: " + tempFah + " F" + "<br>" + "Humidity: " + response.daily[1].humidity
                     + "%";
                     day2.append(p2);
                     day2.append(iconTwo);
                     var tempkelv = response.daily[2].temp.day;
                     var tempFahr = ((tempkelv-273.15)*1.8)+32;
                     tempFahr = tempFahr.toFixed(1);
                     var iconcod = response.daily[2].weather[0].icon;
                    var iconThree = $("<img>");
                    iconThree.attr("src", "http://openweathermap.org/img/wn/" + iconcod + "@2x.png");
                    p3 = threeAhead + "<br>" + "Temp: " + tempFahr + " F" + "<br>" + "Humidity: " + response.daily[2].humidity
                    + "%";
                    day3.append(p3);
                    day3.append(iconThree);
                    var tempkelvi = response.daily[3].temp.day;
                    var tempFahre = ((tempkelvi-273.15)*1.8)+32;
                    tempFahre = tempFahre.toFixed(1);
                    var iconcode4 = response.daily[3].weather[0].icon;
                   var iconFour = $("<img>");
                   iconFour.attr("src", "http://openweathermap.org/img/wn/" + iconcode4 + "@2x.png");
                   p4 = fourAhead + "<br>" + "Temp: " + tempFahre + " F" + "<br>" + "Humidity: " + response.daily[3].humidity
                   + "%";
                   day4.append(p4);
                   day4.append(iconFour);
                  var tempkelvin = response.daily[4].temp.day;
                  var tempFahren = ((tempkelvin-273.15)*1.8)+32;
                  tempFahren = tempFahren.toFixed(1);
                  var iconcode5 = response.daily[4].weather[0].icon;
                 var iconFive = $("<img>");
                 iconFive.attr("src", "http://openweathermap.org/img/wn/" + iconcode5 + "@2x.png");
                 p5 = fiveAhead + "<br>" + "Temp: " + tempFahren + " F" + "<br>" + "Humidity: " + response.daily[4].humidity
                 + "%";
                 day5.append(p5);
                 day5.append(iconFive);









                    
                });
        

    })

 



    newCity();
    
})

function newCity () {

    userSearch.val("");
}

$(document).on("click", ".newSearch", function() {
    contentArea.empty();
    day1.empty();
    day2.empty();
    day3.empty();
    day4.empty();
    day5.empty();
    var city = $(this)[0].firstChild.data;
    console.log(city);
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=c4d189dbd561321cb5a567d4c5e8970b";

$.ajax({
    url: queryURL,
    method: "GET"
  })
    .then(function(response) {
        forecastHead.text("5 Day forecast :");
        line.attr("style", "display: block");
        fiveDay.attr("style", "visibility: visible");
        var tempK = response.main.temp
        var tempF = ((tempK-273.15)*1.8)+32
        var time = moment().format("LL");
        var nextDay = moment().add(1, 'd');
        var twoDays = moment().add(2, 'd');
        var threeDays = moment().add(3, 'd');
        var fourDays = moment().add(4, 'd');
        var fiveDays = moment().add(5, 'd');
        var oneAhead = nextDay.format("LL");
        var twoAhead = twoDays.format("LL");
        var threeAhead = threeDays.format("LL");
        var fourAhead = fourDays.format("LL");
        var fiveAhead = fiveDays.format("LL");
        var todayDiv = $("<div>");
        var cityName = $("<h2>");
        var info = $("<p>");
        var temp = tempF.toFixed(1);
        cityName.text(response.name + " (" + time + ")");
        cityName.attr("style", "margin: 2%;");
        todayDiv.attr("style", "margin: 7%")
        var iconCode = response.weather[0].icon;
        var icontop = $("<img>");
        icontop.attr("src", "http://openweathermap.org/img/wn/" + iconCode + "@2x.png");
        icontop.attr("style", "background-color: #2196F3; border-radius: 10px; margin: 1%");
        info = "<br>" + "Temperature: " + temp + " F" + "<br>" + "Humidity: " + response.main.humidity + "%" + "<br>"
         + "Wind speed: " + response.wind.speed + " MPH";
        
        
        todayDiv.append(cityName);
        todayDiv.append(icontop);
        todayDiv.append(info);

        contentArea.append(todayDiv);
        var queryURL3 = "http://api.openweathermap.org/data/2.5/uvi?lat=" + response.coord.lat + "&lon=" + response.coord.lon + 
        "&appid=c4d189dbd561321cb5a567d4c5e8970b";
        $.ajax({
            url: queryURL3,
            method: "GET"
          })
            .then(function(response) {
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
                .then(function(response) {
                    var p1 = $("<p>");
                    var p2 = $("<p>");
                    var p3 = $("<p>");
                    var p4 = $("<p>");
                    var p5 = $("<p>");
                    var tempke = response.daily[0].temp.day;
                    var tempFa = ((tempke-273.15)*1.8)+32;
                    tempFa = tempFa.toFixed(1);
                    console.log(tempFa) 
                    var iconc = response.daily[0].weather[0].icon;
                    var iconOne = $("<img>");
                    iconOne.attr("src", "http://openweathermap.org/img/wn/" + iconc + "@2x.png");
                    p1 = oneAhead + "<br>" + "Temp: " + tempFa + " F" + "<br>" + "Humidity: " + response.daily[0].humidity
                     + "%";
                    console.log(p1);
                    day1.append(p1)
                    day1.append(iconOne);
                    console.log(response);
                    var tempkel = response.daily[1].temp.day;
                    var tempFah = ((tempkel-273.15)*1.8)+32;
                    tempFah = tempFah.toFixed(1);
                    var iconco = response.daily[1].weather[0].icon;
                    var iconTwo = $("<img>");
                    iconTwo.attr("src", "http://openweathermap.org/img/wn/" + iconco + "@2x.png");
                    p2 = twoAhead + "<br>" + "Temp: " + tempFah + " F" + "<br>" + "Humidity: " + response.daily[1].humidity
                     + "%";
                     day2.append(p2);
                     day2.append(iconTwo);
                     var tempkelv = response.daily[2].temp.day;
                     var tempFahr = ((tempkelv-273.15)*1.8)+32;
                     tempFahr = tempFahr.toFixed(1);
                     var iconcod = response.daily[2].weather[0].icon;
                    var iconThree = $("<img>");
                    iconThree.attr("src", "http://openweathermap.org/img/wn/" + iconcod + "@2x.png");
                    p3 = threeAhead + "<br>" + "Temp: " + tempFahr + " F" + "<br>" + "Humidity: " + response.daily[2].humidity
                    + "%";
                    day3.append(p3);
                    day3.append(iconThree);
                    var tempkelvi = response.daily[3].temp.day;
                    var tempFahre = ((tempkelvi-273.15)*1.8)+32;
                    tempFahre = tempFahre.toFixed(1);
                    var iconcode4 = response.daily[3].weather[0].icon;
                   var iconFour = $("<img>");
                   iconFour.attr("src", "http://openweathermap.org/img/wn/" + iconcode4 + "@2x.png");
                   p4 = fourAhead + "<br>" + "Temp: " + tempFahre + " F" + "<br>" + "Humidity: " + response.daily[3].humidity
                   + "%";
                   day4.append(p4);
                   day4.append(iconFour);
                  var tempkelvin = response.daily[4].temp.day;
                  var tempFahren = ((tempkelvin-273.15)*1.8)+32;
                  tempFahren = tempFahren.toFixed(1);
                  var iconcode5 = response.daily[4].weather[0].icon;
                 var iconFive = $("<img>");
                 iconFive.attr("src", "http://openweathermap.org/img/wn/" + iconcode5 + "@2x.png");
                 p5 = fiveAhead + "<br>" + "Temp: " + tempFahren + " F" + "<br>" + "Humidity: " + response.daily[4].humidity
                 + "%";
                 day5.append(p5);
                 day5.append(iconFive);









                    
                });
        

    })
});