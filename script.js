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


searchBtn.on("click", function(){

    contentArea.empty();
    day1.empty();
    

var city = userSearch.val().trim()    
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=c4d189dbd561321cb5a567d4c5e8970b";

$.ajax({
    url: queryURL,
    method: "GET"
  })
    .then(function(response) {
        console.log(response);
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
        var threeAheard = threeDays.format("LL");
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
                
                    // var day1 = $("#dayOne");
                    // var day2 = $("#dayTwo");
                    // var day3 = $("#dayThree");
                    // var day4 = $("#dayFour");
                    // var day5 = $("#dayFive");
                    var p1 = $("<p>");
                    var p2 = $("<p>");
                    var p3 = $("<p>");
                    var p4 = $("<p>");
                    var p5 = $("<p>");
                    var tempke = response.daily[0].temp.day;
                    var tempFa = ((tempke-273.15)*1.8)+32
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
                    
                });

    })

 



    newCity();
    
})

function newCity () {

    userSearch.val("");
}
