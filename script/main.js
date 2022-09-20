import { events } from "./events.js";

const containerWidth = 800;
let collisions = [];
let width = [];
let leftOffSet = [];
const eventsContainer = document.getElementById("events");
const timePeriod = 20;

// append one event to calendar
let createEvent = (height, top, left, units, title) => {
  let newEl = document.createElement("div");
  newEl.className = "calendar__event";
  newEl.innerHTML = `<span class='calendar__descr'>${title}</span>`;
  newEl.style.width = containerWidth / units + "px";
  newEl.style.height = height + "px";
  newEl.style.top = top + "px";
  newEl.style.left = left + "px";

  eventsContainer.appendChild(newEl);
};

function getEventAppears(events) {
  //resets storage
  collisions = [];

  for (let i = 0; i < timePeriod; i++) {
    let time = [];
    for (var j = 0; j < events.length; j++) {
      time.push(0);
    }
    collisions.push(time);
    console.log(collisions);
  }

  events.forEach((event, index) => {
    let end = event.duration + event.start;
    let start = event.start;
    let order = 1;

    while (start < end) {
      let timeIndex = Math.floor(start / 30);

      while (order < events.length) {
        if (collisions[timeIndex].indexOf(order) === -1) {
          break;
        }
        order++;
      }

      collisions[timeIndex][index] = order;
      start = start + 30;
    }

    collisions[Math.floor((end - 1) / 30)][index] = order;
  });
}

function getAttributes(events) {
  width = [];
  leftOffSet = [];

  for (let i = 0; i < events.length; i++) {
    width.push(0);
    leftOffSet.push(0);
  }
  // number of events in the each period
  collisions.forEach((period) => {
    let count = period.reduce((a, b) => {
      return b ? a + 1 : a;
    });

    if (count > 1) {
      period.forEach((event, index) => {
        if (period[index]) {
          if (count > width[index]) {
            width[index] = count;
          }
        }
        if (period[index] && !leftOffSet[index]) {
          leftOffSet[index] = period[index];
        }
      });
    }
  });
}

let FillOutDay = (events) => {
  eventsContainer.innerHTML = "";

  getEventAppears(events);
  getAttributes(events);
  addEvent();

  events.forEach((event, id) => {
    let height = event.duration;
    let top = event.start;
    let title = event.title;
    let units = width[id];
    if (!units) {
      units = 1;
    }
    let left = (containerWidth / width[id]) * (leftOffSet[id] - 1) + 10;
    if (!left || left < 0) {
      left = 10;
    }
    createEvent(height, top, left, units, title);
  });
};

FillOutDay(events);

// Modal
function addEvent() {
  const getTime = document.getElementById("container");
  const getModal = document.getElementById("event-modal");
  const body = document.getElementsByTagName('body')[0];
  getTime.addEventListener("click", (event) => {
    const newEvent = document.createElement("div");
    let position = event.clientY - 20;
    newEvent.classList.add("calendar__event");
    newEvent.style = `
      top:${position}px;
      left: 10px;
      height: 30px;
      width:800px;
    `;
    console.log(newEvent);
    newEvent.addEventListener("click", () => {
    if (!getModal.classList.contains("show-item")) {
      getModal.classList.add("show-item");
      body.classList.add("bg-lock");
    } else {
      getModal.classList.remove("show-item");
      body.classList.remove("bg-lock");
    }
    console.log(getModal.classList);
    });
    eventsContainer.appendChild(newEvent);
  });
}
