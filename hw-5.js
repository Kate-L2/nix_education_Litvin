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
// const getTime = () => {
//   let start = new Date();
//   let startSec = start.getSeconds();
//   console.log("Enabled");
//   return function () {
//     let end = new Date();
//     let endSec = end.getSeconds();
//     console.log(endSec - startSec);
//   };
// };

// let func2 = getTime();
// func2();


// let start = new Date();
// let startSec = start.getSeconds();
// console.log(startSec);
