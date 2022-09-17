import { events } from "./events.js";

const containerHeight = 720;
const containerWidth = 800;
const minutesinDay = 60 * 12;
let collisions = [];
let width = [];
let leftOffSet = [];

// append one event to calendar
var createEvent = (height, top, left, units, title) => {
  let newEl = document.createElement("div");
  newEl.className = "calendar__event";
  newEl.innerHTML = `<span class='calendar__descr'>${title}</span>`;
  // Customized CSS to position each event
  newEl.style.width = containerWidth / units + "px";
  newEl.style.height = height + "px";
  newEl.style.top = top + "px";
  newEl.style.left = left + "px";

  document.getElementById("events").appendChild(newEl);
};

function getEventAppears(events) {
  //resets storage
  collisions = [];

  for (var i = 0; i < 24; i++) {
    var time = [];
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

function getStyleVlues(events) {
  width = [];
  leftOffSet = [];

  for (var i = 0; i < events.length; i++) {
    width.push(0);
    leftOffSet.push(0);
  }
  collisions.forEach((period) => {
    let count = period.reduce((a, b) => {
      return b ? a + 1 : a;
    });
    console.log(count);

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

var FillOutDay = (events) => {
  var elements = document.getElementById("events");
  elements.innerHTML = "";

  getEventAppears(events);
  getStyleVlues(events);

  events.forEach((event, id) => {
    let height = (event.duration / minutesinDay) * containerHeight;
    let top = (event.start / minutesinDay) * containerHeight;
    let units = width[id];
    let title = event.title;
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
