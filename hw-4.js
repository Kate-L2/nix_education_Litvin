import { studentArr } from "./Users.js";

// Task 1
let counter = 1;
class Student {
  static list = [];
  constructor(enrolle) {
    this.id = counter++;
    this.name = enrolle.name;
    this.surname = enrolle.surname;
    this.ratingPoint = enrolle.ratingPoint;
    this.schoolPoint = enrolle.schoolPoint;
    this.course = enrolle.course;
    this.isSelfPayment = true;
    Student.list.push(this);
    Student.calcSelfPayment();
  }
  static listOfStudents() {
    return this.list;
  }
  static calcSelfPayment() {
    Student.list.slice(0, 5);
  }
}

// Sorting array
function sortArray() {
  studentArr.sort((a, b) => {
    if (a.ratingPoint === b.ratingPoint) {
      return b.schoolPoint - a.schoolPoint;
    }
    return b.ratingPoint - a.ratingPoint;
  });
}
sortArray();
// Creating separate Students
studentArr.map((el) => {
  let obj = new Student(el);
  console.log(obj);
});

console.log(Student.listOfStudents);

// Task 2
class CustomString {
  reverse(string) {
    return [...string].reverse().join("");
  }
  // reverse(string) {
  //   var a = "";
  //   for (i = 0; i < str.length; i++) {
  //     a += str[str.length - 1 - i];
  //   }
  //   return a;
  // }
  ucFirst(str) {
    if (!str) return str;

    return str[0].toUpperCase() + str.slice(1);
  }
  ucWords(str) {
    str
      .split("")
      .map((word) => word[0].toUpperCase() + word.substring(1))
      .join(" ");
  }
}

const myString = new CustomString();

console.log(myString.reverse("qwerty")); //выведет 'ytrewq'
console.log(myString.ucFirst("qwerty")); //выведет 'Qwerty'
console.log(myString.ucWords("qwerty qwerty qwerty")); //выведет 'Qwerty Qwerty Qwerty
