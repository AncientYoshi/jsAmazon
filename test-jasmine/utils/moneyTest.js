import { formatCurrency } from "../../scripts/utils/money.js";

describe("test suite: formatCurrency", () => {
  it("cent to dolar with 0", () => {
    expect(formatCurrency(0)).toEqual("0.00");
  });
  it("change to nearly cent", () => {
    expect(formatCurrency(1000.5)).toEqual("10.01");
  });
});