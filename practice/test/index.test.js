import * as assert from "assert";
import { Calculator } from "../src/scripts/index.js";
import { describe } from "mocha";

describe("Test of calculation method", function () {
  const calculator = new Calculator();

  it("calculation +", function () {
    assert.strictEqual(calculator.calculation(2, 6, "+"), 8);
  });

  it("calculation -", function () {
    assert.strictEqual(calculator.calculation(8, 1, "-"), 7);
  });

  it("calculation *", function () {
    assert.strictEqual(calculator.calculation(5, 8, "*"), 40);
  });

  it("calculation /", function () {
    assert.strictEqual(calculator.calculation(30, 6, "/"), 5);
  });
});
