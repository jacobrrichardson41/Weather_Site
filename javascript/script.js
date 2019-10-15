(function() {
    geocode();
})();

//Function to connect to the Dark Sky API and get weather data 
function getWeatherInfo(){
   
    //Base-URL/APIKey/Latitude,Longitude
   $.ajax("https://api.darksky.net/forecast/ " + darkSkyKey + -"122.4233", { dataType:"jsonp" })
   .done(function(data){
    console.log(data);
   })
   .fail(function(error) {
       console.log(error);
   })
   .always(function(){
       console.log("Weather Call complete ")
   })
}

//Function to connect to the MapQuest Geocoding API and get geocoding data 
function geocode() {
    //Base-URL + API Key + &location= + Address   
     $.ajax("http://www.mapquestapi.com/geocoding/v1/address?key=" + mapKeyQuest + "&location=Washington,DC")
    .done(function(data){
        console.log(data);
    })
    .fail(function(error) {
        console.log(error);
    })
    .always(function(){
        console.log("GeoCoding call completed ");
    })
}
   

    



