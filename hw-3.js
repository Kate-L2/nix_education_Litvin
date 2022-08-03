import { emplyeeArr } from "./testArray.js";

class Employee {
  constructor(employee) {
    this.id = employee.id;
    this.name = employee.name;
    this.surname = employee.surname;
    this.salary = employee.salary;
    this.workExperience = employee.workExperience;
    this.isPrivileges = employee.isPrivileges;
    this.gender = employee.gender;
  }
}

// Task 1
function Task1() {
  emplyeeArr.map((el) => {
    let obj = new Employee(el);
    console.log(obj);
  });
}
Task1();
console.log("--------------------------------------");
// Task 2
function Task2() {
  Employee.prototype.getFullName = function () {
    return this.surname + " " + this.name;
  };
  emplyeeArr.map((el) => {
    let obj = new Employee(el);
    console.log(obj.getFullName());
  });
}
Task2();
console.log("--------------------------------------");

function Task3() {
  let obj;
  let createEmployesFromArr = (array) => {
    array.map((item) => {
      obj.push(new Employee(item));
    });

    return employeeObjArr;
  };
  const emplyeeConstructArr = createEmployesFromArr(emplyeeArr);
  console.log(emplyeeConstructArr);
}
Task3();
