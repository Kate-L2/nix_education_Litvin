import { studentArr } from "./Users.js";

let counter = 1;
class Student {
  constructer(enrolle) {
    this.id = enrolle.counter++;
    this.name = enrolle.name;
    this.surname = enrolle.surname;
    this.ratingPoint = enrolle.ratingPoint;
    this.schoolPoint = enrolle.schoolPoint;
    this.isSelfPayment = enrolle.isSelfPayment;
  }
  // getId() {
  //   return Student.#id;
  // }
}
// let sortedArray = studentArr.sort((a, b) => a.ratingPoint - b.ratingPoint);
// console.log(sortedArray.reverse());

studentArr.map((el) => {
  let singleStudent = new Student(el);
  console.log(singleStudent);
});