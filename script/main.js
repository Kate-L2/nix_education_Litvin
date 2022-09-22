import { events } from "./events.js";
import { LocalStorageClass } from "./localStorage.js";
const getTime = document.getElementById("container");
const getModal = document.getElementById("event-modal");
const body = document.getElementsByTagName("body")[0];
const containerWidth = 800;
let collisions = [];
let width = [];
let leftOffSet = [];
const eventsContainer = document.getElementById("events");
const timePeriod = 20;
let isSaveMode;

// Local storage
const LS = new LocalStorageClass();

let eventsInStorage = LS.get("events")
  ? LS.get("events")
  : updateStorage(events);

function updateStorage(events) {
  events.sort((a, b) => {
    a.start - b.start;
  });
  LS.set("events", events);
}

// append one event to calendar
let createEvent = (height, top, left, units, title) => {
  let newEl = document.createElement("div");
  newEl.className = "calendar__event";
  newEl.innerHTML = `<span class='calendar__descr'>${title}</span>`;
  newEl.style.width = containerWidth / units + "px";
  newEl.style.height = height + "px";
  newEl.style.top = top + "px";
  newEl.style.left = left + "px";
  newEl.addEventListener("click", (event) => {
    updateEvent(event);
  });
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

  events.forEach((event, id) => {
    event.id = id;
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
    createEvent(height, top, left, units, title, id);
  });
  console.log(events);
};

FillOutDay(eventsInStorage);

// Modal
const submitBtn = document.getElementById("submit-btn");
const closeBtn = document.getElementById("close-modal");

closeBtn.addEventListener("click", hideModal);
submitBtn.addEventListener("click", () => {
  hideModal("click", true);
});

getTime.addEventListener("click", (event) => {
  console.log(event);
  showModal(event);
});

function showModal(event) {
  getModal.classList.add("show-modal");
  body.classList.add("bg-lock");
}

function hideModal(event, isSaveMode = false) {
  if (isSaveMode) {
    let title = document.getElementById("event-title").value;
    let fromTime = document.getElementById("time-from").value;
    let toTime = document.getElementById("time-to").value;
    let eventsInStorage = LS.get("events");

    let fromHH = fromTime.split(":")[0];
    let fromMM = fromTime.split(":")[1];
    fromTime = Number(fromHH) * 60 + Number(fromMM);
    let toHH = toTime.split(":")[0];
    let toMM = toTime.split(":")[1];
    toTime = Number(toHH) * 60 + Number(toMM);
    console.log(fromTime, toTime);
    let newTime = fromTime - 480;
    let newDuration = toTime - fromTime;
    let newEvent = {
      start: newTime,
      duration: newDuration,
      title: title,
    };
    eventsInStorage.push(newEvent);
    updateStorage(eventsInStorage);
    FillOutDay(eventsInStorage);

    getModal.classList.remove("show-modal");
    body.classList.remove("bg-lock");
  }
  getModal.classList.remove("show-modal");
  body.classList.remove("bg-lock");
  console.log(eventsInStorage);
}

function updateEvent(event) {
  console.log("test");
  event.stopPropagation();
  showModal(event);
}

eventsInStorage.splice(10, 1);
LS.set('questions',JSON.stringify(eventsInStorage));
