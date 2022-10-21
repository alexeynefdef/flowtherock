function loginWithSpotify() {
  document.cookie = "loggedin=true";
  window.open("http://164.90.185.125:8080/flowtherock/api/authorize", "_self");
}