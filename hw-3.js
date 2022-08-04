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

// Task 3
function Task3() {
  let createEmployesFromArr = (array) => {
    return array.map((item) => new Employee(item));
  };
  const emplyeeConstructArr = createEmployesFromArr(emplyeeArr);
  console.log(emplyeeConstructArr);
}
Task3();

// Task 4
function Task4() {
  let fullNameArr = [];
    
  const getFullNamesFromArr = () => {
      Employee.prototype.getFullName = function() {
          return this.surname + ' ' + this.name;
      }
      
      emplyeeArr.map((item) => {
          let obj = new Employee(item);
          fullNameArr.push(obj.getFullName());
      });

      return fullNameArr;
  }
      
  console.log(getFullNamesFromArr(emplyeeArr));
}
Task4();

// Task 5
function Task5() {
    let sum = 0;
    let MiddleSalary;

    emplyeeArr.map((item) => {
        sum += new Employee(item).salary;
    });

    MiddleSalary = Math.round(sum / emplyeeArr.length)
    console.log(MiddleSalary);
}
Task5();


