// Task 1
for (i = 1; i < 10; i++) {
  if (i % 3 === 0) {
    console.log("FizBuz");
    continue;
  }
  if (i % 2 === 0) {
    console.log("Fiz");
    continue;
  }
  if (i % 2 !== 0) {
    console.log("Buz");
    continue;
  }
}

// Task 2
function factorial(n) {
  let answer = 1;
  if (n == 0 || n == 1) {
    return answer;
  } else {
    for (let i = n; i > 1; i--) {
      answer = answer * i;
    }
    return answer;
  }
}
console.log(factorial(10));

// Task 3
const sheetsInReamPaper = 500;
const consumptionPerWeek = 1200;
const weeksAmount = 8;

let consumptionPerWeeks = consumptionPerWeek * weeksAmount;
let result = consumptionPerWeeks / sheetsInReamPaper;
console.log(result);

// Task 4
// const roomsOnFloor = 3;
// const floors = 9;
// const roomNumber = 456;

// const porch = 0;
// const floor = 0;

// function find() {
//     roomsInPorch = roomsOnFloor * floors;
//     porch = (roomNumber - 1) / (roomsInPorch + 1);
// }

// Task 5
let n = 8;
let string = "";
for (let i = 1; i <= n; i++) {
  for (let j = 1; j <= n - i; j++) {
    string += " ";
  }
  for (let k = 0; k < 2 * i - 1; k++) {
    string += "*";
  }
  string += "\n";
}
console.log(string);
