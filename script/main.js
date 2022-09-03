const copyItems = items;
const cardsContainer = document.getElementById("cards__wrapper");
const card = document.getElementById("itemId");
let newCardElements = copyItems.map((el) => {
  let newElement = document.createElement("div");
  newElement.innerHTML = card.innerHTML;
  newElement.className = "card";
  let itemName = newElement.getElementsByClassName("item__name");
  itemName[0].textContent = el.name;
  let itemImg = newElement.getElementsByClassName("item-img");
  itemImg[0].src = `img/${el.imgUrl}`;

  let itemAmount = newElement.getElementsByClassName("item__amount-in-stock");
  itemAmount[0].textContent = el.orderInfo.inStock;

  let itemPrice = newElement.getElementsByClassName("item-price");
  itemPrice[0].textContent = el.price;

  let itemReview = newElement.getElementsByClassName("footer-item__review");
  itemReview[0].textContent = el.orderInfo.reviews;

  let itemOrders = newElement.getElementsByClassName("footer-item__orders-num");
  itemOrders[0].textContent = getRndInteger(300, 1000);
  cardsContainer.appendChild(newElement);
});
card.classList.add("hidden");
console.log(newCardElements);
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

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
// Filter functionality
// Price

const cardItems = document.querySelectorAll(".card"); //Cards
const fromPrice = document.getElementById("price-field-start");
const toPrice = document.getElementById("price-field-end");
const priceInputBlock = document.getElementById("item-filter__body");
const setUpPrice = (itemsArray) => {
  let minPrice = itemsArray.map((product) => product.price);
  minPrice = Math.min(...minPrice);
  fromPrice.value = minPrice;
  let maxPrice = itemsArray.map((product) => product.price);
  maxPrice = Math.max(...maxPrice);
  toPrice.value = maxPrice;
  fromPrice.addEventListener("blur", priceSortArray);
  toPrice.addEventListener("blur", priceSortArray);
  function priceSortArray() {
    if (parseInt(fromPrice.value) > parseInt(toPrice.value)) {
      let temp;
      temp = toPrice.value;
      toPrice.value = fromPrice.value;
      fromPrice.value = temp;
    }
    let sortItems = itemsArray.filter((product) => {
      parseInt(fromPrice.value) <= parseInt(product.price) &&
        parseInt(product.price) <= parseInt(toPrice.value);
    });
    console.log(sortItems);
  }
  // display(sortItems, cardsContainer);
};
function display(items, container) {
  const sortedItems = items.map((person) => {});
}
setUpPrice(copyItems);
// console.log(fromPrice.value);

// NO BODY SCROLL
const body = document.querySelector("body");
const modal = document.getElementById("modal");
console.log(cardItems);

// Modal window
cardItems.forEach((item) => {
  item.addEventListener("click", () => {
    modal.classList.add("show-modal");
    body.classList.add("bg-lock");
    const getImg = document.getElementById("getImg");
    const getName = document.getElementById("getName");
    const getColor = document.getElementById("getColor");
    const getOs = document.getElementById("getOs");
    const getChip = document.getElementById("getChip");
    const getHeight = document.getElementById("getHeight");
    const getWidth = document.getElementById("getWidth");
    const getDepth = document.getElementById("getDepth");
    const getWeight = document.getElementById("getWeight");
    const getPrice = document.getElementById("getPrice");
    const getStock = document.getElementById("getStock");
    const getBtn = document.getElementById("getBtn");

    copyItems.find((el) => {
      if (parseInt(el.id) === parseInt(item.id)) {
        getImg.src = `img/${el.imgUrl}`;
        getName.textContent = el.name;
        getColor.textContent = el.color;
        getOs.textContent = el.os;
        getChip.textContent = el.chip.name;
        getHeight.textContent = el.size.height;
        getWidth.textContent = el.size.width;
        getDepth.textContent = el.size.depth;
        getWeight.textContent = el.size.weight;
        getPrice.textContent = el.price;
        getStock.textContent = el.orderInfo.inStock;
        console.log(getName);
        if (elem.orderInfo.inStock == 0) {
          getBtn.setAttribute("disabled", "disabled");
        } else {
          getBtn.removeAttribute("disabled");
        }
      }
    });
  });
});
modal.addEventListener("click", (event) => {
  if (event.target.className === modal.className) {
    event.stopPropagation();
    modal.classList.remove("show-modal");
    body.classList.remove("bg-lock");
  }
});
// function toggleModal() {
//   modal.classList.toggle("show-modal");
// }

// function windowOnClick(event) {
//   if (event.target === modal) {
//     toggleModal();
//   }
// }

// cardItem.addEventListener("click", toggleModal);
// window.addEventListener("click", windowOnClick);

// not exactly vanilla as there is one lodash function

// var allCheckboxes = document.querySelectorAll("input[type=checkbox]");
// var allCards = Array.from(document.querySelectorAll(".card"));//Создаем массив из обектно подобного или итерируемого обьекта
// var checked = {};

// getChecked("color");
// getChecked("memory");
// getChecked("os");

// Array.prototype.forEach.call(allCheckboxes, function (el) {
//   el.addEventListener("change", toggleCheckbox);
// });

// function toggleCheckbox(e) {
//   getChecked(e.target.name);
//   setVisibility();
// }

// function getChecked(name) {
//   checked[name] = Array.from(
//     document.querySelectorAll("input[name=" + name + "]:checked")
//   ).map(function (el) {
//     return el.value;
//   });
// }

// function setVisibility() {
//   allCards.map(function (el) {
//     let color = checked.color.length
//       ? _.intersection(Array.from(el.classList), checked.color)
//           .length
//       : true;
//     let memory = checked.memory.length
//       ? _.intersection(Array.from(el.classList), checked.memory).length
//       : true;
//     let os = checked.os.length
//       ? _.intersection(Array.from(el.classList), checked.os).length
//       : true;
//     if (startingReserves && injured && position && nbaTeam && conference) {
//       el.style.display = "block";
//     } else {
//       el.style.display = "none";
//     }
//   });
// }
