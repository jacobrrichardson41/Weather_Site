(function () {
    $("#submit").click(function () {
        //Get the value the user has entered in the search bar and store it
        const searchLocation = $("#searchBar").val();
        //Call the geocode function and pass in the value
        geocode(searchLocation);
        //Clear out the search bar 
        $("#searchBar").val("");
    });

    //When a button is clicked with the ID of remove in the document, call the function.
    $(document).on("click", "button#remove", function () {
        //Get the parent element of the button
        let parentDiv = $(this).parent(); //This refers to the element that triggered the event handler ( in this case the button that was clicked)
        //Get the parent of the div containing the button
        let weatherCardContainer = parentDiv.parent();
        //Remove the container and all of its contents 
        weatherCardContainer.remove();
    })
})();

//Function to connect to the Dark Sky API and get weather data 
function getWeatherInfo(latitude, longitude, city, state) {

    //Base-URL/APIKey/Latitude,Longitude
    $.ajax("https://api.darksky.net/forecast/" + darkSkyKey + "/" + latitude + "," + longitude, { dataType: "jsonp" })
        .done(function (data) {
            console.log(data);
            //Get the HTML from the div with the ID template.
            let templateHTML = $("#template").html();



            //We need to get the temperature from the Dark Sky data 
            let temperature = data.currently.temperature;
            let conditions = data.currently.summary;
            let weatherIcon = data.currently.icon;


            let currentDayInfo = data.daily.data[0];
            let highTemp = currentDayInfo.temperatureHigh;
            let lowTemp = currentDayInfo.temperatureLow;
            let precipChance = currentDayInfo.precipProbability * 100;

            //Replace the string "@@city@@" with the city we pass into this function in the HTML
            templateHTML = templateHTML.replace("@@city@@", city);



            //Replace the string"@@currentTemp@@" with the temperature we get back from the API call
            templateHTML = templateHTML.replace("@@currentTemp@@", Math.round(temperature));

            //Replace the string "@@cityState@@ with the city and state we get back from the API call"
            templateHTML = templateHTML.replace("@@cityState@@", city + " " + state);

            //Replace the string "@@conditions@@" with the current conditions that we get back from the API call
            templateHTML = templateHTML.replace("@@conditions@@", conditions);

            //Replace the string "@@highTemp@@" with the highest temperature for the day that we get back from the API call.
            templateHTML = templateHTML.replace("@@highTemp@@", Math.round(highTemp));

            //Replace the string "@@lowTemp@@" with the lowest temperature for the day that we get back from the API call.
            templateHTML = templateHTML.replace("@@lowTemp@@", + Math.round(lowTemp));

            //Replace the string "@@precipChance@@" with the chance of precipitation call that we get back from the API.
            templateHTML = templateHTML.replace("@@precipChance@@", + Math.round(precipChance));

            templateHTML = templateHTML.replace("@@imageURL@@", getBackgroundPath(weatherIcon));

            for (var i =0;i < 5; i++) {
                //Set the date for the each day
                if (i > 0) {
                    //Get the current date, and add i days to it 
                    let date = new Date ();
                    date.setDate(date.getDate() + i);
                    
                    //Get the month (0-11) from the date and add 1 to it for accuracy 
                    let month = date.getMonth() + 1;
                    //Get the day from the date 
                    let day =date.getDate();

                    //Replace the placeholder text in the template for date i 

                    templateHTML = templateHTML.replace("@@date" + i + "@@", month + "/" + day);



                }
                //Get the weather data for the day based on i
                let currentDayWeatherData = data.daily.data[i];

                templateHTML = templateHTML.replace("@@max" + i + "@@", Math.round(currentDayWeatherData.temperatureMax));
                templateHTML = templateHTML.replace("@@low" + i + "@@", Math.round(currentDayWeatherData.temperatureMin));
                templateHTML = templateHTML.replace("@@precip" + i + "@@", Math.round (currentDayWeatherData.precipProbability * 100));


            } 



            //Add the configured template HTML to our row in the card container.
            $(".row").append(templateHTML);

        })
        .fail(function (error) {
            console.log(error);
        })
        .always(function () {
            console.log("Weather Call complete ")
        })
}

//Function to connect to the MapQuest Geocoding API and get geocoding data 
function geocode(location) {
    //Base-URL + API Key + &location= + Address   
    $.ajax("http://www.mapquestapi.com/geocoding/v1/address?key=" + mapQuestKey + "&location=" + location)
        .done(function (data) {
            console.log(data);
            //Get the lat and log from the response 
            let templateHTML = $("#template").html();
            console.log(templateHTML);
            let locations = data.results[0].locations[0];

            let lat = locations.latLng.lat;
            let lng = locations.latLng.lng;

            console.log(lat);
            console.log(lng);
            //Get the city and state so we can display it to the user later 
            let city = locations.adminArea5;
            let state = locations.adminArea3;



            console.log(city);
            console.log(state);
            //Pass the lat and log to our getWeatherInfo funciton
            getWeatherInfo(lat, lng, city, state);



            //Pass the lat and log to our getWeatherInfo function
        })
        .fail(function (error) {
            console.log(error);
        })
        .always(function () {
            console.log("GeoCoding call completed ");
        })
}

function getBackgroundPath(iconString) {
    //Create a switch statement that switches based on the value of iconString. For each case, it should return the path to the appropriate image for that iconString value. By default, it should return the path to the clear-day image.
    switch (iconString) {
        case "clear-day":
            return "../clear-day.jpg";
        case "clear-night":
            return "../clear-night.jpg";
        case "cloudy":
            return "../cloudy.jpg";
        case "fog":
            return "../fog.jpg";
        case "partly-cloudy-day":
            return "../partly-cloudy-day.jpg";
        case "partly-cloudy-night":
            return "partly-cloudy-night.jpg";
        case "rain":
            return "../rain.jpg";
        case "sleet":
            return "../sleet.jpg";
        case "snow":
            return "../snow.jpg";
        case "wind":
            return "../wind.jpg";
        default:
            return "../clear-day.jpg";



    }

}






