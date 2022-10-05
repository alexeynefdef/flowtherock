function isLoggedIn() {
  if (getCookie("loggedin") != "true") {
    window.open("./login.html", "_self");
  } else {
    let code = getCode();
    if(code != null && code != "") {
      loadAllPlaylists(code);
    } else {
      getAllPlaylists();
    }
  }
}

function getCode() {
  let query = window.location.search;
  const urlParams = new URLSearchParams(query);
  return urlParams.get("code");
}

function getAllPlaylists() {
  const opt = {
    method: "GET",
    headers: new Headers({
      "Access-Control-Allow-Origin": "http://164.90.185.125:8080",
    }),
  };
  fetch("http://164.90.185.125:8080/flowtherock/playlists", opt)
    .then((response) => response.json())
    .then((json) => parsePlaylists(json));
}

function loadAllPlaylists(code) {
  document.getElementById("loader_wrapper").classList.add("loading");
  const opt = {
    method: "GET",
    headers: new Headers({
      "Access-Control-Allow-Origin": "http://164.90.185.125:8080",
    }),
  };
  fetch("http://164.90.185.125:8080/flowtherock/playlists/load?code=" + code, opt)
    .then((response) => response.json())
    .then((json) => parsePlaylists(json));
}

function parsePlaylists(json) {
  json.forEach((entry) => {
    appendPlaylist(entry);
  });
  document.getElementById("loader_wrapper").classList.remove("loading");
}

function appendPlaylist(playlist) {
  let id = playlist.id;
  let img = playlist.imageUrl;
  let title = playlist.title;
  let info = "Total tracks: " + playlist.count;
  let item =
    "<dd " +
    'id="' + id + '"' +
    ' playlistid="' + id + '"' +
    ' class="playlist-list"' +
    " onclick=\"openPlaylist('" +
    id +
    "')\"" +
    ">" +
    '<div class="playlist-item-wrapper">' +
    '<img src="' +
    img +
    '"' +
    ' alt="playlist cover" class="playlist-item" />' +
    '<div class="playlist-item">' +
    "<h3>" +
    title +
    "</h3>" +
    "<p>" +
    info +
    "</p>" +
    "</div>" +
    "</div>" +
    "</dd>";
  document.getElementById("playlists").innerHTML += item;
}

function openPlaylist(playlistId) {
  window.open("./index.html?playlistId=" + playlistId + "&code=" + getCode(), "_self");
}

//Get cookie
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

//toggle
const chk = document.getElementById("chk");

chk.addEventListener("change", () => {
  document.body.classList.toggle("dark");
  document.getElementById("main-heading").classList.toggle("light");
  let buttons = document.getElementsByTagName("button");
  for (const button of buttons) {
    button.classList.toggle("dark");
  }

  let isDark = false;
  let bodyClassList = document.body.classList;
  bodyClassList.forEach((className) => {
    if (className === "dark") {
      isDark = true;
    }
  });

  let items = document.getElementsByTagName("dd");
  for (const item of items) {
    item.classList.toggle("dark");
  }
  document.cookie = "dark=true";  
});


function changeBorderIfDark() {
  let isDark = false;
  let bodyClassList = document.body.classList;
  bodyClassList.forEach((className) => {
    if (className === "dark") {
      isDark = true;
    }
  });

  let items = document.getElementsByTagName("dd");

  if (isDark) {
    for (const item of items) {
      item.classList.add("dark");
    }
  }
}

if (getCookie("dark") != "true") {
  document.body.classList.add("dark");
  document.getElementById("tracklist-head").classList.add("dark");
  document.getElementById("main-heading").classList.add("light");
  let buttons = document.getElementsByTagName("button");
  for (const button of buttons) {
    button.classList.add("dark");
  }

  let isDark = false;
  let bodyClassList = document.body.classList;
  bodyClassList.forEach((className) => {
    if (className === "dark") {
      isDark = true;
    }
  });

  let items = document.getElementsByTagName("dd");
  for (const item of items) {
    item.classList.add("dark");
  }
  
} 