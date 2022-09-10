import { events } from "./events.js";

let eventEl = document.getElementById("eventEl");
let container = document.getElementById("container");
function createEvent(plans) {
  plans.map((el) => {
    let newElem = document.createElement("div");
    newElem.innerHTML = eventEl.innerHTML;
    newElem.className = "calendar__event";
    let descr = newElem.getElementsByClassName("calendar__descr");
    descr[0].textContent = el.title;
    container.appendChild(newElem);
  });
}
createEvent(events);
eventEl.classList.add("hidden");

// let time = document.getElementsByClassName("calendar__time-item");
// function fillingTable(plans) {
//   [...time];
//   for (let i = 0; i < plans.length; i++) {
//     if (plans.start === time[i].textContent) {
//       createEvent(plans);
//     }
//   }
// }
