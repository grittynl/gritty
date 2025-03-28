/* This JavaScript code initializes the map and makes it interactive.
   This is based on examples from the Bootstrap and Leaflet documentation
      See https://leafletjs.com/
      See https://getbootstrap.com/docs/5.1/components/navs-tabs/#via-javascript
*/

/* The line below initializes the map with a given center point and zoom level */
let map = L.map('map').setView([30, 0], 2);

/* The line below shows the (free) OpenStreetMap tiles. An alternative is Mapbox */
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

/* Now we go over each tab and show the destination as a marker on the map */
let tabList = document.querySelectorAll("#destinationTab button");

tabList.forEach(tabTriggerEl => {
  /* The coordinates for each destination are inside the HTML code above, let's retrieve them */
  let latlng = tabTriggerEl.attributes.getNamedItem("data-coords").value.split(",").map(c => c.trim());

  /* We also need the ID name of the tab for later on */
  let targetHash = tabTriggerEl.attributes.getNamedItem("data-bs-target").value;

  /* We now create a marker with these coordinates and show it on the map */
  let marker = L.marker(latlng).addTo(map);

  /* Using Bootstrap's tab system, we make sure that, when a tab is selected:
      1. the map is zoomed in to the associated location
      2. the URL in the browser fits the location too.
  */
  tabTriggerEl.addEventListener('shown.bs.tab', function (event) {
    map.setView(latlng, 5);
    document.location.hash = targetHash;
  });

  /* Let's define a function that shows the tab, we'll need it in several places */
  function openThisTab() {
    bootstrap.Tab.getOrCreateInstance(tabTriggerEl).show();
  }

  /* We add an interactive behaviour to the map marker, so that the associated tab is opened when the marker is clicked */
  marker.on('click', openThisTab);

  /* If the tab location is already in the URL, let's open it */
  if (document.location.hash === targetHash) {
    openThisTab();
  }

  /* Let's also have this behaviour in the dropdown menu at the top */
  document.querySelector("#destinationDropdown [href$='" + targetHash + "']").addEventListener('click', openThisTab);

  /* We also want the "quote" button to populate the message */
  let destinationName = document.querySelector(targetHash + ' h3').textContent;
  document.querySelector(targetHash + ' button').addEventListener('click', function() {
    document.getElementById('messagefield').textContent = "Hi, I would like to travel to " + destinationName + "!";
  });


}); // end of the "for each tab" loop
