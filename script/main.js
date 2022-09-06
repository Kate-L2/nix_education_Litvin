const copyItems = items;
const cardsContainer = document.getElementById("cards__wrapper");
const card = document.getElementById("itemId");
function createCards(items) {
  cardsContainer.innerHTML = "";
  items.map((el) => {
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

    let itemOrders = newElement.getElementsByClassName(
      "footer-item__orders-num"
    );
    itemOrders[0].textContent = getRndInteger(300, 1000);

    newElement.addEventListener("click", (event) => {
      showModal(el);
    });
    cardsContainer.appendChild(newElement);
  });
  card.classList.add("hidden");
}
createCards(copyItems);

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
// Filling filter

function filterFill(arrayOrObj, container, item, nameOfClass) {
  if (
    typeof arrayOrObj === "object" &&
    !Array.isArray(arrayOrObj) &&
    arrayOrObj !== null
  ) {
    for (key in arrayOrObj) {
      let element = document.createElement("div");
      element.innerHTML = item.innerHTML;
      element.className = "item-filter__checkbox-item";
      let checkbox = element.getElementsByClassName(nameOfClass)[0];
      if (nameOfClass.length) {
        checkbox.setAttribute("id", key);
      }
      let name = element.getElementsByClassName("item-filter__check-name");
      // if (name.classList.contains("memory")) {
      //   name[0].textContent = key + " gb";
      // }
      name[0].textContent = key;
      container.appendChild(element);
    }
  } else if (Array.isArray(arrayOrObj) && arrayOrObj !== null) {
    arrayOrObj.forEach((el) => {
      let element = document.createElement("div");
      element.innerHTML = item.innerHTML;
      element.className = "item-filter__checkbox-item";
      let name = element.getElementsByClassName("item-filter__check-name");
      name[0].textContent = el + " inch";
      container.appendChild(element);
    });
  }
  item.classList.add("hidden");
}
// Color
const colorObj = {};
copyItems.map((el) => {
  for (let i = 0; i < el.color.length; i++) {
    if (!colorObj[el.color[i]]) {
      colorObj[el.color[i]] = [];
    }
  }
});
console.log(colorObj);

let colorFilter = document.getElementById("filter-color");
let colorItem = document.getElementById("filter-color-item");

filterFill(colorObj, colorFilter, colorItem, "color-checkbox");
// Memory
const memoryObj = {};
copyItems.forEach((el) => {
  if (!memoryObj[el.storage]) {
    if (
      el.storage === null ||
      Math.round(el.storage) !== el.storage ||
      typeof el.storage === "undefined"
    ) {
      delete el.storage;
    } else {
      memoryObj[el.storage] = [];
    }
  }
});

let memoryFilter = document.getElementById("filter-memory");
let memoryItem = document.getElementById("filter-memory-item");

filterFill(memoryObj, memoryFilter, memoryItem, "");

// OS
const osObj = {};
copyItems.forEach((el) => {
  if (!osObj[el.os]) {
    if (el.os === null) {
      delete el.os;
    } else {
      osObj[el.os] = [];
    }
  }
});

let osFilter = document.getElementById("filter-os");
let osItem = document.getElementById("filter-os-item");

filterFill(osObj, osFilter, osItem, "");

// Display
// const sortArr = (a, b) => {
//   const a1 = a.toString().match("/[0-9]+/");
//   const b1 = b.toString().match("/[0-9]+/");
//   return a1 - b1;
// };
const displayArray = ["2 - 5", "5 - 7", "7 - 12", "12 - 16", "16+"];

let displayFilter = document.getElementById("filter-display");
let displayItem = document.getElementById("filter-display-item");

filterFill(displayArray, displayFilter, displayItem, "");

// Filter functionality
// Price
const sortedByPrice = copyItems.sort(function (a, b) {
  return a.price - b.price;
});

const cardItems = document.querySelectorAll(".card"); //Cards
const fromPrice = document.getElementById("price-field-start");
const toPrice = document.getElementById("price-field-end");
const priceInputBlock = document.getElementById("item-filter__body");
const allPrice = sortedByPrice.map((el) => el.price);
let minPrice = Math.min(...allPrice);
let maxPrice = Math.max(...allPrice);
fromPrice.value = minPrice;
toPrice.value = maxPrice;

fromPrice.addEventListener("keyup", priceEvent);
toPrice.addEventListener("keyup", priceEvent);
fromPrice.addEventListener("blur", priceEvent);
toPrice.addEventListener("blur", priceEvent);

function priceEvent(event) {
  if (event.code === "Enter") {
    filterPrice(sortedByPrice);
  } else if (event) {
    filterPrice(sortedByPrice);
  }
}
const filterPrice = (itemsArray) => {
  let filteredPrice = [];
  if (+fromPrice.value > +toPrice.value) {
    let temp;
    temp = toPrice.value;
    toPrice.value = fromPrice.value;
    fromPrice.value = temp;
  }
  itemsArray.filter((product) => {
    if (+fromPrice.value <= product.price && product.price <= +toPrice.value) {
      filteredPrice.push(product);
      createCards(filteredPrice);
    }
  });
  console.log(filteredPrice);
};
// Color filter
let checkboxColor = colorFilter.querySelectorAll("input");
let checkboxColorLabel = colorFilter.querySelectorAll("label");
console.log(checkboxColor);
console.log(checkboxColorLabel);

let checkboxValues = [];

checkboxProperty.forEach((box) => {
  box.checked = false;
  box.addEventListener("change", () => filterColorCards());
});

checkboxProperty.forEach((box) => {
  box.checked = false;
  box.addEventListener("change", () => filterColorCards());
});

checkboxProperty.forEach((box) => {
  box.checked = false;
  box.addEventListener("change", () => filterColorCards());
});

function grabCheckboxValues(checkboxes) {
  let checkboxValues = [];
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) checkboxValues.push(checkbox.id);
  });
  return checkboxValues;
}

function filterColorCards(property) {
  cardsContainer.innerHTML = "";
  let sortedCards = [];
  checkboxValues = grabCheckboxValues(checkboxColor);
  copyItems.forEach((item) => {
    let property = item.property;
    let result = (arr, target) => target.every((v) => arr.includes(v));
    let isMatch = result(property, checkboxValues);
    if (isMatch) {
      sortedCards.push(item);
      createCards(sortedCards);
    }
  });
  console.log(sortedCards);
}

// Modal window
const body = document.querySelector("body");
const modal = document.getElementById("modal");

function showModal(element) {
  modal.classList.add("show-modal");
  body.classList.add("bg-lock");
  const getImg = document.getElementById("getImg");
  const getName = document.getElementById("getName");
  const getReview = document.getElementById("getReview");
  const getOrders = document.getElementById("getOrders");
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

  getImg.src = `img/${element.imgUrl}`;
  getName.textContent = element.name;
  getReview.textContent = element.orderInfo.reviews;
  getOrders.textContent = getRndInteger(300, 1000);
  getColor.textContent = element.color;
  getOs.textContent = element.os;
  getChip.textContent = element.chip.name;
  getHeight.textContent = element.size.height;
  getWidth.textContent = element.size.width;
  getDepth.textContent = element.size.depth;
  getWeight.textContent = element.size.weight;
  getPrice.textContent = element.price;
  getStock.textContent = element.orderInfo.inStock;
  if (element.orderInfo.inStock === 0) {
    getBtn.setAttribute("disabled", "disabled");
  } else {
    getBtn.removeAttribute("disabled");
  }
}

modal.addEventListener("click", (event) => {
  if (event.target.className === modal.className) {
    event.stopPropagation();
    modal.classList.remove("show-modal");
    body.classList.remove("bg-lock");
  }
});
