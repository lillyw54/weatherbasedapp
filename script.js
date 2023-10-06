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
