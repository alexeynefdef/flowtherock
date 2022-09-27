function loadPlaylist() {
  document.getElementById("loader_wrapper").classList.add("loading");
  document.getElementById("footer").classList.remove("loaded");
  const opt = {
    method: "GET",
    headers: new Headers({
      "Access-Control-Allow-Origin": "http://164.90.185.125:8080",
    }),
  };
  fetch("http://164.90.185.125:8080/flowtherock/playlist", opt)
    .then((response) => response.json())
    .then((json) => parseResponse(json));
}

function reloadPlaylist() {
  const opt = {
    method: "GET",
    headers: new Headers({
      "Access-Control-Allow-Origin": "http://164.90.185.125:8080",
    }),
  };
  document.getElementById("loader_wrapper").classList.add("loading");
  fetch("http://164.90.185.125:8080/flowtherock/playlist/reload", opt)
    .then((response) => response.json())
    .then((json) => parseResponse(json));
}

function sortPlaylist(trackId) {
  showNowPlaying(trackId);
  const opt = {
    method: "GET",
    headers: new Headers({
      "Access-Control-Allow-Origin": "http://164.90.185.125:8080",
    }),
  };
  document.getElementById("loader_wrapper").classList.add("loading");
  document.getElementById("footer").classList.remove("loaded");
  document.getElementById("tracklist").innerHTML =
    "<dt id='tracklist-head' class='tracklist_item tracklist_item-head'>" +
    "<div class='tracklist_item-head-data'>Title</div>" +
    "<div class='tracklist_item-head-data'>Artist</div>" +
    "<div class='tracklist_item-head-data'>BPM</div>" +
    "<div class='tracklist_item-head-data'>Key</div>" +
    "</dt>";
  fetch(
    "http://164.90.185.125:8080/flowtherock/playlist/sort?trackId=" + trackId,
    opt
  )
    .then((response) => {
      return response.json();
    })
    .then((json) => parseResponse(json));
}

function parseResponse(responseData) {
  responseData.forEach((entry) => {
    appendListItemToTrackList(entry);
  });

  document.getElementById("loader_wrapper").classList.remove("loading");
  document.getElementById("footer").classList.add("loaded");
  changeBorderIfDark();
}

async function showNowPlaying(trackId) {
  const track = document.getElementById(trackId);
  document.getElementById("now_playing").innerHTML = "";
  document.getElementById("now_playing").appendChild(track);
  const node =
    "<dd " +
    'class="tracklist_item"' +
    ' track_id="' +
    trackId +
    '"' +
    ' id="' +
    trackId +
    '">' +
    "<div>" +
    track.childNodes[0].textContent +
    "</div>" +
    "<div>" +
    track.childNodes[1].textContent +
    "</div>" +
    "</dd>";
  document.getElementById("played").innerHTML += node;
}

function appendListItemToTrackList(item) {
  let tracklist = document.getElementById("tracklist");
  let matched = item.matched ? "matched" : "";
  let trackId = item.id;
  const node =
    "<dd " +
    'class="tracklist_item ' +
    matched +
    '"' +
    ' track_id="' +
    trackId +
    '"' +
    ' id="' +
    trackId +
    '"' +
    " onclick=\"sortPlaylist('" +
    trackId +
    "')\"" +
    '">' +
    "<div class='track_title'>" +
    item.title +
    "</div>" +
    "<div class='track_artist'>" +
    item.artist +
    "</div>" +
    "<div  class='track_key'>" +
    item.key +
    "</div>" +
    "<div  class='track_bpm'>" +
    item.bpm +
    "</div>" +
    "</dd>";
  tracklist.innerHTML += node;
}

function clearPlaylist() {
  document.getElementById("played").innerHTML = "";
}

function savePlaylist() {
  const playlistToSave = document.getElementById("played");
  let tracksIds = [];
  for (const track of playlistToSave.childNodes) {
    console.log(track);
  }
}

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

//toggle
const chk = document.getElementById("chk");

chk.addEventListener("change", () => {
  document.body.classList.toggle("dark");
  document.getElementById("tracklist-head").classList.toggle("dark");
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
});

//side card
document.getElementById("side_button").addEventListener("click", () => {
  document.getElementById("side-card").classList.toggle("hide");
  let sideButton = document.getElementById("side_button-link");
  if (sideButton.textContent == "<") {
    sideButton.textContent = ">";
  } else {
    sideButton.textContent = "<";
  }
});
