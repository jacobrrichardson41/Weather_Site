(function () {
 $("#submit").click(function() {
     //Get the value the user has entered in the search bar and store it
    const searchLocation = $("#searchBar").val();
     //Call the geocode function and pass in the value
    geocode (searchLocation);
     //Clear out the search bar 
     $("#searchBar").val("");
    

 });
})();

//Function to connect to the Dark Sky API and get weather data 
function getWeatherInfo(latitude, longitude, city, state){
   
    //Base-URL/APIKey/Latitude,Longitude
   $.ajax("https://api.darksky.net/forecast/" + darkSkyKey + "/" + latitude +  "," + longitude,{ dataType:"jsonp" })
   .done(function(data){
    console.log(data);
   })
   .fail(function(error) {
       console.log(error);
   })
   .always(function(){
       console.log("Weather Call complete ")
   })

   //See if you can get the following data from the JSON:

   //1: Get the current temperature

   //2: Get the probability of precipitation
   //3: Get the high and low temperature for the current day (first element in the data array in the daily object)
}

//Function to connect to the MapQuest Geocoding API and get geocoding data 
function geocode(location) {
    //Base-URL + API Key + &location= + Address   
     $.ajax("http://www.mapquestapi.com/geocoding/v1/address?key=" + mapQuestKey + "&location=" + location)
    .done(function(data){
        console.log(data);
        //Get the lat and log from the response 
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
        getWeatherInfo(lat,lng, city, state);
    
       
        //Pass the lat and log to our getWeatherInfo function
    })
    .fail(function(error) {
        console.log(error);
    })
    .always(function(){
        console.log("GeoCoding call completed ");
    })
}
   

    



