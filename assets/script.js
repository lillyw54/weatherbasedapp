window.addEventListener("DOMContentLoaded", function() {
  var inputElement = document.querySelector("#searchInput");
  var weatherContainer = document.querySelector("#weatherContainer");

  function getGenreByTemperature(temperature) {
    if (temperature >= 30) {
      return "4Z8W4fKeB5YxbusRsdQVPb";
    } else if (temperature >= 20) {
      return "Pop";
    } else if (temperature >= 10) {
      return "Hip Hop";
    } else {
      return "Classical";
    }
  }

  function handleSearch(event) {
    event.preventDefault(); // Prevent the form from submitting and refreshing the page
  
    var cityName = inputElement.value;
    var encodedCityName = encodeURIComponent(cityName);
    var apiKey = 'fec6f8cea37f79992e917dea61f6b1a6';
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + encodedCityName + '&appid=' + apiKey;
  
    console.log(apiUrl); // Log the apiUrl variable to the console
  
    // Make the API request using fetch
    fetch(apiUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        var temperature = (data.main.temp - 273.15) * 9/5 + 32;
        var genres = getGenreByTemperature(temperature);
        console.log(genres);
  
        // Handle the API response data
        console.log(data);
  
        // Update the weather data in the HTML elements
        document.getElementById("searchedCity").textContent = data.name;
        document.getElementById("todayDate").textContent = new Date().toLocaleDateString();
        document.getElementById("todayTemp").textContent = ((data.main.temp - 273.15) * 9/5 + 32).toFixed(2);
        document.getElementById("todayHumidity").textContent = data.main.humidity;
        document.getElementById("todayWind").textContent = data.wind.speed;
  
        // Fetch artist based on genre from Spotify API
        var spotifyUrl = 'https://api.spotify.com/v1/artists/' + genres;
        var headers = {
          'Authorization': 'Bearer BQDi57z44FuD6QMtOP0N1thRPUpTvbSvX5-2cO5uheLbQz_fnabBLaTPa8kcahkgMP00PFfo7KpNuysRNrYkzXxcmj4xpViPth8xDbTmjGRZBzAW_60'
        };

        fetch(spotifyUrl, {
          headers: headers
        })
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
          console.log(data);
          // Handle the Spotify API response data for the artist
        })
        .catch(function(error) {
          console.error(error);
        });
      })
      .catch(function(error) {
        // Handle any errors that occur during the API request
        console.log(error);
      });
  }

  var searchForm = document.querySelector("#formCity");
  searchForm.addEventListener("submit", handleSearch);
});

var spotifyUrl = 'https://accounts.spotify.com/api/token';
var headers = {
  'Content-Type': 'application/x-www-form-urlencoded'
};
var spotifyData = 'grant_type=client_credentials&client_id=a053bd798ca34bea8a7d671eba17b396&client_secret=85e76203126d455fbc7b336103339c4a';

var spotifyUrl = 'https://accounts.spotify.com/api/token';
var headers = {
  'Content-Type': 'application/x-www-form-urlencoded'
};
var spotifyData = 'grant_type=client_credentials&client_id=a053bd798ca34bea8a7d671eba17b396&client_secret=85e76203126d455fbc7b336103339c4a';

fetch(spotifyUrl, {
  method: 'POST',
  headers: headers,
  body: spotifyData
})
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    var accessToken = data.access_token;
    console.log(accessToken);
    console.log(data);

    var spotifyUrl = 'https://api.spotify.com/v1/artists/4Z8W4fKeB5YxbusRsdQVPb';
    var headers = {
      'Authorization': `Bearer ${accessToken}`
    };

    fetch(spotifyUrl, {
      headers: headers
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        console.log(data);
      })
      .catch(function(error) {
        console.error(error);
      });
  })
  .catch(function(error) {
    console.error(error);
  });

  