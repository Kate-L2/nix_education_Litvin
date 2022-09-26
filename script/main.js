import { events } from "./events.js";
import { LocalStorageClass } from "./localStorage.js";
const getTime = document.getElementById("container");
const getModal = document.getElementById("event-modal");
const body = document.getElementsByTagName("body")[0];
const eventsContainer = document.getElementById("events");
let title = document.getElementById("event-title");
let fromTime = document.getElementById("time-from");
let toTime = document.getElementById("time-to");

var rootElement = document.querySelector(":root");

const containerWidth = 800;
let collisions = [];
let width = [];
let leftOffSet = [];
const timePeriod = 20;
let isSaveMode;
// fromTime.addEventListener("blur", (event) => {
//   console.log(typeof fromTime.value);
// });

// Color
function getColor(color) {
  var rootStyles = getComputedStyle(rootElement);
  return rootStyles.getPropertyValue(color);
}
// Local storage
const LS = new LocalStorageClass();

let eventsInStorage = LS.get("events")
  ? LS.get("events")
  : updateStorage(events);

function updateStorage(events) {
  events.sort((a, b) => {
    return a.start - b.start;
  });
  LS.set("events", events);
}

// append one event to calendar
let createEvent = (height, top, left, units, title, id) => {
  let newEl = document.createElement("div");
  newEl.className = "calendar__event";
  newEl.innerHTML = `<span class='calendar__descr'>${title}</span>`;
  newEl.style.width = containerWidth / units + "px";
  newEl.style.height = height + "px";
  newEl.style.top = top + "px";
  newEl.style.left = left + "px";
  newEl.addEventListener("click", (event) => {
    setNewData(event, top, height, title, id, true, false);
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
const deleteBtn = document.getElementById("delete-btn");

const closeBtn = document.getElementById("close-modal");

closeBtn.addEventListener("click", hideModal);
deleteBtn.addEventListener("click", hideModal);

submitBtn.addEventListener("click", () => {
  hideModal("click", true);
});
// updateBtn.addEventListener("click", () => {
//   hideModal("click", true);
// });

getTime.addEventListener("click", (event) => {
  title.value = "";
  fromTime.value = "";
  toTime.value = "";
  console.log(event);
  showModal(event);
});

function showModal(event) {
  getModal.classList.add("show-modal");
  body.classList.add("bg-lock");
}

function hideModal(event, isSaveMode = false) {
  if (isSaveMode) {
    let eventsInStorage = LS.get("events");
    if (checkEventName(title) && checkEventTime(fromTime, toTime)) {
      title.style.borderColor = getColor("--grey");
      let fromHH = fromTime.value.split(":")[0];
      let fromMM = fromTime.value.split(":")[1];
      fromTime = Number(fromHH) * 60 + Number(fromMM);
      let toHH = toTime.value.split(":")[0];
      let toMM = toTime.value.split(":")[1];
      toTime = Number(toHH) * 60 + Number(toMM);
      console.log(fromTime, toTime);
      let newTime = fromTime - 480;
      let newDuration = toTime - fromTime;
      let newEvent = {
        start: newTime,
        duration: newDuration,
        title: title.value,
      };
      eventsInStorage.push(newEvent);
      updateStorage(eventsInStorage);
      FillOutDay(eventsInStorage);
      console.log(eventsInStorage);
      getModal.classList.remove("show-modal");
      body.classList.remove("bg-lock");
    } else {
      console.log("Try again");
    }
  } else {
    getModal.classList.remove("show-modal");
    body.classList.remove("bg-lock");
  }
}

function setNewData(event, start, duration, eventTitle, id) {
  console.log(event, start, duration, eventTitle, id);
  let newTitle = eventTitle;
  let newFromTime = start + 480;
  let newToTime = newFromTime + duration;
  newFromTime = fromMinToTime(newFromTime);
  newToTime = fromMinToTime(newToTime);

  title.value = newTitle;
  fromTime.value = newFromTime;
  toTime.value = newToTime;

  console.log("test");
  console.log(title, fromTime, toTime);
  event.stopPropagation();
  showModal(event);
  submitBtn.addEventListener(
    "click",
    updateEvent(fromTime, toTime, title, id)
  );
  deleteBtn.addEventListener("click", deleteEvent(id));
}

function updateEvent(start, end, title, id) {
  let newTime, newDuration;
  if (checkEventName(title) && checkEventTime(fromTime, toTime)) {
    title.style.borderColor = getColor("--grey");
    let fromHH = fromTime.value.split(":")[0] || start.split(":")[0];
    let fromMM = fromTime.value.split(":")[1] || start.split(":")[1];
    fromTime = Number(fromHH) * 60 + Number(fromMM);
    let toHH = toTime.value.split(":")[0] || end.split(":")[0];
    let toMM = toTime.value.split(":")[1] || end.split(":")[1];
    toTime = Number(toHH) * 60 + Number(toMM);
    console.log(fromTime, toTime);
    newTime = fromTime - 480;
    newDuration = toTime - fromTime;
    console.log(eventsInStorage);
  } else {
    console.log("Try again");
  }
  eventsInStorage.find((el) => {
    if (el.id === id) {
      el.start = newTime;
      el.duration = newDuration;
      el.title = title;
    }
  });
  LS.set("events", eventsInStorage);
  updateStorage(eventsInStorage);
  FillOutDay(eventsInStorage);
}

function deleteEvent(id) {
  for (let i in events) {
    if (events[i].id == id) {
      events.splice(i, 1);
    }
  }
  updateStorage(eventsInStorage);
  FillOutDay(eventsInStorage);
}

function checkEventName(eventName) {
  if (eventName.value.length > 0) {
    return true;
  } else {
    eventName.style.borderColor = getColor("--red");
    alert("Please write a name of event");
    return false;
  }
}
function checkEventTime(fromTime, toTime) {
  let fromHH = Number(fromTime.value.split(":")[0]);
  let fromMM = Number(fromTime.value.split(":")[1]);

  let toHH = Number(toTime.value.split(":")[0]);
  let toMM = Number(toTime.value.split(":")[1]);
  if (
    fromHH >= 8 &&
    fromHH <= 16 &&
    toHH >= 8 &&
    toHH <= 17 &&
    fromTime.value.length > 0 &&
    toTime.value.length > 0
  ) {
    return true;
  } else {
    fromTime.style.borderColor = getColor("--red");
    toTime.style.borderColor = getColor("--red");
    alert(
      "Please enter correct time: \n1) From 8:00 to 17:00 \n2) Don`t leave an empty field"
    );
    return false;
  }
}
function fromMinToTime(inputMinutes) {
  let min_num = parseInt(inputMinutes, 10);
  let hours = Math.floor(min_num / 60);
  let minutes = Math.floor(min_num - hours * 60);

  if (hours < 10) {
    hours = "0" + hours;
  } else if (minutes < 10) {
    minutes = "0" + minutes;
  }
  return hours + ":" + minutes;
}
