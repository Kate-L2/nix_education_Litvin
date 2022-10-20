export class Calculator {
  constructor() {}
  calculation(num1, num2, op) {
    switch (op) {
      case "+":
        return num1 + num2;
      case "-":
        return num1 - num2;
      case "*":
        return num1 * num2;
      case "/":
        return num1 / num2;
      default:
        console.log("Unknown symbol. Input: +-*/");
        break;
    }
    return result;
  }
}
