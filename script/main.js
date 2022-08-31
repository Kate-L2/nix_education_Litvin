let cardsContainer = document.getElementById("cards__wrapper");
// let card = document.getElementById("itemId");
// items.map((el) => {
//   let newElement = document.createElement("div");
//   newElement.innerHTML = card.innerHTML;
//   newElement.className = "card";
//   let itemName = document.getElementById("item-name");
//   //   itemName.innerHTML = el.name;
//   itemName.className = "item__name";
//   itemName = document.createTextNode(el.name);
//   console.log(itemName);
//   cardsContainer.appendChild(itemName);
//   cardsContainer.appendChild(newElement);
// });

items.forEach((el) => {
  el.imgUrl = "img/".concat(el.imgUrl);
});
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
items.forEach((el) => {
  const content = `
    <div id="itemId" class="cards__card card">
                    <div class="card__item item">
                      <div class="item__header">
                        <a class="item__icon-like_empty" href="#"
                          ><i class="icon-like_empty"></i
                        ></a>
                        <a class="item__img" href="#"
                          ><img height="200px" src="${el.imgUrl}" alt=""
                        /></a>
                        <a id="item-name" class="item__name" href="#">${
                          el.name
                        }</a>
                        <div class="item__left-in-stock">
                          <i></i><span>${
                            el.orderInfo.inStock
                          }</span> left in stock
                        </div>
                        <div class="item__price">Price: <span>${
                          el.price
                        } $</span></div>
                        <a class="item__btn btn" href="#">Add to cart</a>
                      </div>
                      <footer class="item__footer footer-item">
                        <div class="footer-item__percent">
                          <p><span>${
                            el.orderInfo.reviews
                          }%</span> Positive reviews</p>
                          <p>Above avarage</p>
                        </div>
                        <div class="footer-item__orders">
                          <p>${getRndInteger(300, 1000)}</p>
                          <p>orders</p>
                        </div>
                      </footer>
                    </div>
                </div>
    `;
  cardsContainer.innerHTML += content;
});

// Acordion
const item = document.getElementsByClassName("item-filter__header");

for (let i = 0; i < item.length; i++) {
  item[i].addEventListener("click", function () {
    this.classList.toggle("active");
    let panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}

// Display filter
let displayFliter = document.getElementById("filter-icon");
let filter = document.getElementById("filter");
let filterCards = document.getElementById("filterCards");

displayFliter.addEventListener("click", (event) => {
  event.preventDefault();
  filter.classList.toggle("active");
  filterCards.classList.toggle("active");
});
// Price
// const startPrice = document.getElementById("price-field-start");
// const endPrice = document.getElementById("price-field-end");
// startPrice.addEventListener("blur", (event) => );
// if (startPrice < endPrice) {
// }

// Filling filter dynamicely
// Color
const copyItems = items;
const colorItems = {};
copyItems.map((el) => {
  for (let i = 0; i < el.color.length; i++) {
    if (!colorItems[el.color[i]]) {
      colorItems[el.color[i]] = [el];
    } else {
      colorItems[el.color[i]].push(el);
    }
  }
});
console.log(colorItems);

let colorFilter = document.getElementById("filter-color");
let colorItem = document.getElementById("filter-color-item");
for (key in colorItems) {
  let colorLines = document.createElement("div");
  colorLines.innerHTML = colorItem.innerHTML;
  colorLines.className = "item-filter__checkbox-item";
  let colorName = colorLines.getElementsByClassName("item-filter__check-name");
  colorName[0].textContent = key;
  colorFilter.appendChild(colorLines);
}
colorItem.classList.add("hidden");

// Memory
const memoryItems = {};
copyItems.forEach((el) => {
  if (!memoryItems[el.storage]) {
    if (
      el.storage === null ||
      Math.round(el.storage) !== el.storage ||
      typeof el.storage === "undefined"
    ) {
      delete el.storage;
    } else {
      memoryItems[el.storage] = [el];
    }
  } else {
    memoryItems[el.storage].push(el);
  }
});

let memoryFilter = document.getElementById("filter-memory");
let memoryItem = document.getElementById("filter-memory-item");
for (key in memoryItems) {
  let memoryLines = document.createElement("div");
  memoryLines.innerHTML = memoryItem.innerHTML;
  memoryLines.className = "item-filter__checkbox-item";
  let memoryName = memoryLines.getElementsByClassName("memory");
  memoryName[0].textContent = key;
  memoryFilter.appendChild(memoryLines);
}
console.log(memoryItems);
memoryItem.classList.add("hidden");

// OS
const osItems = {};
copyItems.forEach((el) => {
  if (!osItems[el.os]) {
    if (el.os === null) {
      delete el.os;
    } else {
      osItems[el.os] = [el];
    }
  } else {
    osItems[el.os].push(el);
  }
});

let osFilter = document.getElementById("filter-os");
let osItem = document.getElementById("filter-os-item");
for (key in osItems) {
  let osLines = document.createElement("div");
  osLines.innerHTML = osItem.innerHTML;
  osLines.className = "item-filter__checkbox-item";
  let osName = osLines.getElementsByClassName("os");
  osName[0].textContent = key;
  osFilter.appendChild(osLines);
}
console.log(osItems);
osItem.classList.add("hidden");

// Display
const sortArr = (a, b) => {
  const a1 = a.toString().match("/[0-9]+/");
  const b1 = b.toString().match("/[0-9]+/");
  return a1 - b1;
};
const displayArray = ["2 - 5", "5 - 7", "7 - 12", "12 - 16", "16+"].sort(
  sortArr
);
console.log(displayArray);
let displayFilter = document.getElementById("filter-display");
let displayItem = document.getElementById("filter-display-item");

displayArray.forEach((el) => {
  let displayLines = document.createElement("div");
  displayLines.innerHTML = displayItem.innerHTML;
  displayLines.className = "item-filter__checkbox-item";
  let displayName = displayLines.getElementsByClassName("display");
  displayName[0].textContent = el + " inch";
  displayFilter.appendChild(displayLines);
});
displayItem.classList.add("hidden");
