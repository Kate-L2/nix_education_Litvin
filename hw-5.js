// Task 1
const Sum = () => {
  let counter = 0;
  return function (num) {
    return (counter += num);
  };
};

let func = Sum();
console.log(func(5));
console.log(func(7));

// Task 2
const addStr = () => {
  let str = "";
  return function (el) {
    if (typeof el == "string") {
      str += el;
      console.log(str.split("").sort().join(""));
    } else if (
      typeof el == "number" ||
      typeof el == "object" ||
      typeof el == "boolean" ||
      typeof el == "function"
    ) {
      console.log("----------Please enter only text----------");
    } else {
      str = "";
      console.log("----------String is empty now----------");
    }
  };
};

let func1 = addStr();
func1("hello");
func1("hello");
func1("hello");
func1("hello");
func1();
func1(777);
func1(777);
func1([999]);
func1("4he6llo");

// Task 3
const getTime = () => {
  let create = false;
  let start = new Date().getTime();
  return function () {
    if (!create) {
      create = true;
      console.log("Enabled");
    }
    let end = new Date().getTime();
    console.log((end - start) / 1000);
    start = new Date().getTime();
  };
};

let func2 = getTime();
func2();
setTimeout(func2, 3000);
setTimeout(func2, 6000);


// Task 4
function clock() {
  myTimer = setInterval(myClock, 1000);
  let time = 20; //Initially set to 1 hour

  function myClock() {
    --time;
    let seconds = time % 60; // Seconds that cannot be written in minutes
    let secondsInMinutes = (time - seconds) / 60; // Gives the seconds that COULD be given in minutes
    let minutes = secondsInMinutes % 60; // Minutes that cannot be written in hours
    let hours = (secondsInMinutes - minutes) / 60;
    console.clear();
    console.log(hours + ":" + minutes + ":" + seconds);
    if (time == 0) {
      clearInterval(myTimer);
      console.log("Time End");
    }
  }
}

// clock();
