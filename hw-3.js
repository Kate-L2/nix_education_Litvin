import { emplyeeArr } from "testArray.js";

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
  getFullName() {
    return this.surname + " " + this.name;
  }
}

emplyeeArr.map((el) => {
  let obj = new Employee(el);
  console.log(obj);
});

// const employeeObj = new Employee(obj);
// console.log(employeeObj.getFullName());
