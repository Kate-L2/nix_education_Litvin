import { events } from "./events.js";

const containerWidth = 600;

let eventsContainer = document.getElementById("events");
const createEvent = (height, top, left, units) => {
  let newEvent = document.createElement("div");
  newEvent.innerHTML = eventEl.innerHTML;
  newEvent.className = "calendar__event";
  newEvent.innerHTML = "<span class='calendar__descr'></span>";
  newEvent.style.width = containerWidth / units + "px";
  newEvent.style.height = height + "px";
  newEvent.style.top = top + "px";
  newEvent.style.left = left + "px";
  eventsContainer.appendChild(newEvent);
};
createEvent(events);
eventEl.classList.add("hidden");
