window.addEventListener("DOMContentLoaded", function() {
  var inputElement = document.querySelector("#searchInput");
  var weatherContainer = document.querySelector("#weatherContainer");

  function getGenreByTemperature(temperature) {
    if (temperature >= 30) {
      return "7FBcuc1gsnv6Y1nwFtNRCb";
    } else if (temperature >= 20) {
      return "2iEvnFsWxR0Syqu2JNopAd";
    } else if (temperature >= 10) {
      return "67qogtRNI0GjUr8PlaG6Zh";
    } else {
      return "Classical";
    }
  }

  function handleSearch(event) {
    event.preventDefault();

    var cityName = inputElement.value;
    var encodedCityName = encodeURIComponent(cityName);
    var apiKey = 'fec6f8cea37f79992e917dea61f6b1a6';
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + encodedCityName + '&appid=' + apiKey;

    console.log(apiUrl);

    fetch(apiUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        var temperature = (data.main.temp - 273.15) * 9/5 + 32;
        var genres = getGenreByTemperature(temperature);

        console.log(genres);
        console.log(data);

        document.getElementById("searchedCity").textContent = data.name;
        document.getElementById("todayDate").textContent = new Date().toLocaleDateString();
        document.getElementById("todayTemp").textContent = ((data.main.temp - 273.15) * 9/5 + 32).toFixed(2);
        document.getElementById("todayHumidity").textContent = data.main.humidity;
        document.getElementById("todayWind").textContent = data.wind.speed;

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

            var spotifyUrl = 'https://api.spotify.com/v1/artists/' + genres + '/related-artists';
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

                var apiArray = data.artists; // Assuming data.artists is the correct array

                if (Array.isArray(apiArray) && apiArray.length > 0) {
                var randomIndex = Math.floor(Math.random() * apiArray.length);
                var randomArtist = apiArray[randomIndex];
                var randomString = randomArtist.name; // Access the 'name' property of the object
                var artistTitleElement = document.getElementById("artistTitle");
                artistTitleElement.textContent = randomString;
                } else {
                  console.log("The artists array is empty or undefined.");
                }

                var likeButton = document.getElementById('like-button');
                var likedMusicList = document.getElementById('liked-music-list');

                likeButton.addEventListener('click', function() { 
                  var songTitle = document.querySelector('.title').textContent;
                  var artistName = document.querySelector('.subtitle').textContent;
  
  // Create a new list item
  var listItem = document.createElement('li');
                  listItem.textContent = `${songTitle} - ${artistName}`;
  
  // Append the list item to the liked music list
                  likedMusicList.appendChild(listItem);
                  });
              })
              .catch(function(error) {
                console.error(error);
              });
          })
          .catch(function(error) {
            console.error(error);
          });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  var searchForm = document.querySelector("#formCity");
  searchForm.addEventListener("submit", handleSearch);
});