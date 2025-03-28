/* Some quick and dirty JS that makes it look like the calendar is interactive */
/* If you want a real working calendar, find a proper calendar component */
let days = document.querySelectorAll(".week-table td:not(.inactive-day)");
let datespan = document.getElementById("this-date-span");
let datebutton = document.getElementById("calendar-button");
let dayName = "";
days.forEach( function(d) {
  d.addEventListener("click", function(e) {
    days.forEach(function(f) {
      f.classList.remove("selected-day");
    });
    d.classList.add("selected-day");
    dayName = d.textContent + " " + d.parentElement.parentElement.parentElement.parentElement.children[0].textContent;
    datespan.textContent = dayName;
    datebutton.disabled = false;
  }, false);
});
datebutton.addEventListener('click', function() {
  document.getElementById('messagefield').textContent = "Hi, I would like to leave on " + dayName + "!";
});
