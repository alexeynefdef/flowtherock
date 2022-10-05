const CLIENT_ID = "";

function loginWithSpotify() {

  let params = new URLSearchParams({
    response_type: "code",
    client_id: CLIENT_ID,
    scope: "user-library-read",
    redirect_uri: "http://164.90.185.125/playlists.html"
  });

  let uri = "https://accounts.spotify.com/authorize?" + params.toString();

  document.cookie = "loggedin=true";
  window.open(uri, "_self");

}