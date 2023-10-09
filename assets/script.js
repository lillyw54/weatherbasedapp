window.addEventListener("DOMContentLoaded", function() {
  var inputElement = document.querySelector("#searchInput");
  var weatherContainer = document.querySelector("#weatherContainer");

  function getGenreByTemperature(temperature) { // This code grabs the artists and all of their information through the Spotify API
    if (temperature >= 85) { // and dynamically changes our HTML to easily provide that information based on temp from our weather API
      return "4Z8W4fKeB5YxbusRsdQVPb";
    } else if (temperature >= 65) {
      return "7FBcuc1gsnv6Y1nwFtNRCb";
    } else if (temperature >= 45) {
      return "2iEvnFsWxR0Syqu2JNopAd";
    } else {
      return "Classical";
    }
  }

  function handleSearch(event) {
    event.preventDefault(); // This prevents the page from refreshing when we submit our search
  
    var cityName = inputElement.value;
    var encodedCityName = encodeURIComponent(cityName); // This translates the submitted information into URL compatible text
    var apiKey = 'fec6f8cea37f79992e917dea61f6b1a6';
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + encodedCityName + '&appid=' + apiKey;
  
    console.log(apiUrl); // This let's us view the API in our console log
  
    fetch(apiUrl) // This is how we grab our data from the API
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        var temperature = (data.main.temp - 273.15) * 9/5 + 32;
        var genres = getGenreByTemperature(temperature); // This grabs the appropriate artist and their genres, music, information (check console log for more info)
        console.log(genres);
        console.log(data);
  
        // This let's us handle the information we've received and add it to our HTML while formatting it properly from the API and
        // translating Kelvin to Fahrenheit
        document.getElementById("searchedCity").textContent = data.name;
        document.getElementById("todayDate").textContent = new Date().toLocaleDateString();
        document.getElementById("todayTemp").textContent = ((data.main.temp - 273.15) * 9/5 + 32).toFixed(2);
        document.getElementById("todayHumidity").textContent = data.main.humidity;
        document.getElementById("todayWind").textContent = data.wind.speed;
      
      });
  }

  var searchForm = document.querySelector("#formCity");
  searchForm.addEventListener("submit", handleSearch);
});

var spotifyUrl = 'https://accounts.spotify.com/api/token'; // This lets us generate an authorization token for Spotify to use its API
var headers = {
  'Content-Type': 'application/x-www-form-urlencoded'
};
var spotifyData = 'grant_type=client_credentials&client_id=a053bd798ca34bea8a7d671eba17b396&client_secret=85e76203126d455fbc7b336103339c4a';

fetch(spotifyUrl, { // This code grabs the token and saves it to our local storage so we don't require authorization every time the page reloads
  method: 'POST',
  headers: headers,
  body: spotifyData
})
  .then(function(response) {
    return response.json();
  })
  .then(function(data) { // This grabs us the information from the Spotify API giving us our artists, genres, and much more information on them.
    var accessToken = data.access_token;
    console.log(accessToken);
    console.log(data);
    
    var spotifyUrl = 'https://api.spotify.com/v1/artists?ids=7FBcuc1gsnv6Y1nwFtNRCb%2C2iEvnFsWxR0Syqu2JNopAd%2C67qogtRNI0GjUr8PlaG6Zh';
    var headers = {
      'Authorization': `Bearer ${accessToken}` // This is the API call to grab artists from spotify with our token generated earlier
    };

    fetch(spotifyUrl, {
      headers: headers
    })
      .then(function(response) { 
        return response.json(); // This saves our Spotify information to local storage
      })
      .then(function(data) { // This logs the data we've grabbed from the artists and all of their relevenat info into an array
        console.log(data);
        
      })
      .catch(function(error) { // This takes handles errors within our promises and console logs the details so we can debug any issues
        console.error(error);
      });
  })
  .catch(function(error) { // Same as above
    console.error(error);
  });

  