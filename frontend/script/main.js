const copyItems = items;
const cardsContainer = document.getElementById("cards__wrapper");
const card = document.getElementById("itemId");
let form = document.getElementById("form");

const baseUrl = "https://mac-outlet-store.herokuapp.com/products";

// let productsFromDB = [];

// async function fetchDemo() {
//   return fetch(baseUrl)
//     .then((res) => {
//       return res.json();
//     })
//     .then((json) => {
//       return json;
//     });
// }
// fetchDemo().then((result) => {
//   console.log(result);
//   result.forEach((product) => {
//     productsFromDB.push(product);
//   });
//   createCards(productsFromDB);
// });

// console.log(productsFromDB);
// let copyItems = productsFromDB;

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
  addToCartLoop();
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
      let name = element.getElementsByClassName("item-filter__check-name");
      //Assign an id(key value)
      if (checkbox.classList.contains("color-checkbox")) {
        checkbox.setAttribute("id", key);
        name[0].textContent = key;
      } else if (checkbox.classList.contains("memory-checkbox")) {
        checkbox.setAttribute("id", key);
        name[0].textContent = key + " gb";
      } else if (checkbox.classList.contains("os-checkbox")) {
        checkbox.setAttribute("id", key);
        name[0].textContent = key;
      }
      container.appendChild(element);
    }
  } else if (Array.isArray(arrayOrObj) && arrayOrObj !== null) {
    arrayOrObj.forEach((el) => {
      let element = document.createElement("div");
      element.innerHTML = item.innerHTML;
      element.className = "item-filter__checkbox-item";
      let name = element.getElementsByClassName("item-filter__check-name");
      let checkbox = element.getElementsByClassName(nameOfClass)[0];
      if (checkbox.classList.contains("display-checkbox")) {
        checkbox.setAttribute("id", el);
        name[0].textContent = el + " inch";
      }
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

filterFill(memoryObj, memoryFilter, memoryItem, "memory-checkbox");

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

filterFill(osObj, osFilter, osItem, "os-checkbox");

// Display
const displayArray = ["2 - 5", "5 - 7", "7 - 12", "12 - 16", "16+"];

let displayFilter = document.getElementById("filter-display");
let displayItem = document.getElementById("filter-display-item");

filterFill(displayArray, displayFilter, displayItem, "display-checkbox");

// Filter functionality

const sortedByPrice = copyItems.sort(function (a, b) {
  return a.price - b.price;
});
const cardItems = document.querySelectorAll(".card"); //Cards

// Search bar
const nameSearch = document.getElementById("search-bar__input");
const nameSearchValue = nameSearch.value.toUpperCase();
nameSearch.addEventListener("keyup", (e) => {
  const searchString = e.target.value.toLowerCase();
  const filteredByName = sortedByPrice.filter((item) => {
    return item.name.toLowerCase().includes(searchString);
  });
  outputItems(filteredByName);
});

// Price
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
    switchPrice();
  } else if (event) {
    switchPrice();
  }
}
const switchPrice = () => {
  let filteredPrice = [];
  if (+fromPrice.value > +toPrice.value) {
    let temp;
    temp = toPrice.value;
    toPrice.value = fromPrice.value;
    fromPrice.value = temp;
  }
};

filter.addEventListener("input", filterItems);

function filterItems() {
  const color = [...filter.querySelectorAll("#color input:checked")].map(
      (n) => n.id
    ),
    memory = [...filter.querySelectorAll("#memory input:checked")].map(
      (n) => n.id
    ),
    os = [...filter.querySelectorAll("#os input:checked")].map((n) => n.id),
    display = [...filter.querySelectorAll("#filter-display input:checked")].map(
      (n) => {
        return {
          id: n.id,
          from: n.id.split("-")[0],
          to: n.id.split("-")[1],
        };
      }
    ),
    priceMin = document.querySelector("#price-field-start").value,
    priceMax = document.querySelector("#price-field-end").value;

  console.log(color, memory, os, display);

  let filteredItems = sortedByPrice.filter((n) => {
    let isColorExist = n.color.findIndex((item) => color.includes(item));
    let isDisplayExist = display.findIndex((item) => {
      return item.from > n.display && item.to > n.display;
    });
    return (
      (!color.length || isColorExist !== -1) &&
      (!memory.length ||
        memory.find((item) => {
          return parseInt(item) === parseInt(n.storage);
        })) &&
      (!os.length ||
        os.find((item) => {
          return item === n.os;
        })) &&
      (!display.length || isDisplayExist !== -1) &&
      (!priceMin || priceMin <= n.price) &&
      (!priceMax || priceMax >= n.price)
    );
  });
  console.log(filteredItems);
  outputItems(filteredItems);
}

function outputItems(filteredItems) {
  // cardsContainer.innerHTML = " ";
  createCards(filteredItems);
}

// Modal window
const body = document.querySelector("body");
const modal = document.getElementById("modal");

function showModal(element) {
  modal.classList.add("show-item");
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
  addToCartLoopForModal();
}

modal.addEventListener("click", (event) => {
  if (event.target.className === modal.className) {
    event.stopPropagation();
    modal.classList.remove("show-item");
    body.classList.remove("bg-lock");
  }
});

// Shopping cart

let cartCounter = document.querySelector("#cart-counter");
let insideCartCounter = document.querySelector("#footer-cart__amount");

cartCounter.innerHTML = "0";

let cart = document.getElementById("cart");
let cartOpenBtn = document.getElementById("cart-open-btn");

const cartItemsContainer = document.getElementById("cart__items");
const cartItemsRow = cartItemsContainer.getElementsByClassName("item-cart");

cartOpenBtn.addEventListener("click", (event) => {
  if (!cart.classList.contains("show-item")) {
    cart.classList.add("show-item");
  } else {
    cart.classList.remove("show-item");
  }
  console.log(cart.classList);
});

const removeItemBtn = document.getElementsByClassName("remove-btn");
for (let i = 0; i < removeItemBtn.length; i++) {
  let button = removeItemBtn[i];
  button.addEventListener("click", removeCartItem);
}

const quantytiInputs = document.getElementsByClassName("item-cart__amount");
for (let i = 0; i < quantytiInputs.length; i++) {
  let input = quantytiInputs[i];
  input.addEventListener("change", quantityChanged);
}

function addToCartLoop() {
  const addItemBtn = document.getElementsByClassName("item__btn");
  for (let i = 0; i < addItemBtn.length; i++) {
    let button = addItemBtn[i];
    button.addEventListener("click", (event) => {
      addToCartClicked(event);
      event.stopPropagation();
    });
  }
}
function addToCartLoopForModal() {
  const addItemBtn = document.getElementsByClassName("item__btn");
  for (let i = 0; i < addItemBtn.length; i++) {
    let button = addItemBtn[i];
    button.addEventListener("click", (event) => {
      addToCartFromModal(event);
      event.stopPropagation();
    });
  }
}

document
  .getElementsByClassName("footer-cart__btn")[0]
  .addEventListener("click", purchaseClicked);
  
function purchaseClicked() {
  alert("Thank you for your purchase");
  while (cartItemsContainer.hasChildNodes()) {
    cartItemsContainer.removeChild(cartItemsContainer.firstChild);
  }
  updateCartTotal();
}

function removeCartItem(event) {
  let btnClicked = event.target;
  btnClicked.parentElement.parentElement.remove();
  updateCartTotal();
}

function quantityChanged(event) {
  let input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  console.log(event.target);
  updateCartTotal();
}

function addToCartClicked(event) {
  let btn = event.target;
  let shopItem = btn.parentElement.parentElement;
  const getImg = shopItem.getElementsByClassName("item-img")[0].src;
  const getName = shopItem.getElementsByClassName("item__name")[0].innerText;
  const getPrice = shopItem.getElementsByClassName("item-price")[0].innerText;
  console.log(getImg, getName, getPrice);
  addItemToCart(getImg, getName, getPrice);
  updateCartTotal();
}
function addToCartFromModal(event) {
  let btn = event.target;
  let shopItem = btn.parentElement.parentElement.parentElement;
  const getImg = shopItem.getElementsByClassName("item-img")[0].src;
  const getName = shopItem.getElementsByClassName("item__name")[0].innerText;
  const getPrice = shopItem.getElementsByClassName("item-price")[0].innerText;
  console.log(getImg, getName, getPrice);
  addItemToCart(getImg, getName, getPrice);
  updateCartTotal();
}

function addItemToCart(getImg, getName, getPrice) {
  let newCartItem = document.createElement("div");
  let cartItemsNames = cartItemsContainer.querySelectorAll(".item-cart__name");
  for (let i = 0; i < cartItemsNames.length; i++) {
    if (cartItemsNames[i].innerText === getName) {
      alert("This item is already in the cart");
      return;
    }
  }
  let newCartItemContent = `<li class="cart__item item-cart">
  <div class="item-cart__img">
    <img src="${getImg}" alt="Items img" />
  </div>
  <div class="item-cart__info">
    <h5 class="item-cart__name">${getName}</h5>
    <div class="item-cart__price">${getPrice}</div>
  </div>
  <input placeholder="1" value = '1' class="item-cart__amount" type="text"/>
  <a class="item-cart__delete-icon remove-btn">
    <i class="icon-close"></i>
  </a>
</li>`;
  newCartItem.innerHTML = newCartItemContent;
  cartItemsContainer.appendChild(newCartItem);
  newCartItem
    .getElementsByClassName("remove-btn")[0]
    .addEventListener("click", removeCartItem);
  newCartItem
    .getElementsByClassName("item-cart__amount")[0]
    .addEventListener("change", quantityChanged);
}

function updateCartTotal() {
  let total = 0;
  let totalQuantity = 0;
  for (let i = 0; i < cartItemsRow.length; i++) {
    let cartItem = cartItemsRow[i];
    let priceEl = cartItem.getElementsByClassName("item-cart__price")[0];
    let quantityEl = cartItem.getElementsByClassName("item-cart__amount")[0];
    let price = parseFloat(priceEl.innerHTML.replace("$", ""));
    let quantity = parseInt(quantityEl.value);
    total += price * quantity;
    totalQuantity += quantity;
  }
  cartCounter.innerText = totalQuantity;
  insideCartCounter.innerText = totalQuantity;
  document.getElementsByClassName("footer-cart__price")[0].innerText =
    total + "$";
}
