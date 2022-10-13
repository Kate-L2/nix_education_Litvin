export class Calculator {
  result;
  constructor() {}
  calculation(num1, num2, op) {
    switch (op) {
      case "+":
        this.result = num1 + num2;
        break;
      case "-":
        this.result = num1 + num2;
        break;
      case "*":
        this.result = num1 + num2;
        break;
      case "/":
        this.result = num1 + num2;
        break;
      default:
        console.log("Unknown symbol. Input: +-*/");
        break;
    }
    return result;
  }
}

