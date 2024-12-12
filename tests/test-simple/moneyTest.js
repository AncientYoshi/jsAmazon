import { formatCurrency } from "../../scripts/utils/money.js";
console.log("test suite: formatCurrency");
console.log("test work with 0");
if (formatCurrency(0) === "0.00") {
  console.log("passed");
} else {
  console.log("failed");
}
console.log("change to nearly cents");
if (formatCurrency(1000.5) === "10.01") {
  console.log("passed");
} else {
  console.log("failed");
}
