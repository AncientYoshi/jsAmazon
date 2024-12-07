import {
  cart,
  cartCheckMark,
  addToCart,
  elementTimeouts,
} from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

let productHtml = "";

products.forEach((product) => {
  productHtml += `
    <div class="product-container">
          <div class="product-image-container">
            <img
              class="product-image"
              src="${product.image}"
            />
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img
              class="product-rating-stars"
              src="images/ratings/rating-${product.rating.star}.png"
            />
            <div class="product-rating-count link-primary">${
              product.rating.count
            }</div>
          </div>

          <div class="product-price">$${formatCurrency(
            product.priceCents
          )}</div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart cart-${product.id}">
            <img src="images/icons/checkmark.png" />
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id= "${
            product.id
          }">Add to Cart</button>
        </div>    `;
});
let cartQuantity = 0;

cart.forEach((item) => {
  cartQuantity += item.quantity;
});

//showCartQuantity(productId);
if (cartQuantity === 0) {
  cartQuantity = "";
}
document.querySelector(
  ".js-cart-link"
).innerHTML = `<img class="cart-icon" src="images/icons/cart-icon.png" />
          <div class="cart-quantity js-cart-quantity">${cartQuantity}</div>`;
function saveQuantityToStorage() {
  localStorage.setItem("cartQuantity", cartQuantity);
}

document.querySelector(".js-products-grid").innerHTML = productHtml;

function showCartQuantity(productId) {
  cartQuantity = Number(localStorage.getItem("cartQuantity")) || 0;

  const element = document.querySelector(`.cart-${productId}`);
  //console.log(element);
  element.classList.add("cart-showing");

  const previousTimeoutId = elementTimeouts[productId];
  if (previousTimeoutId) {
    // Clear the existing timeout to avoid conflicts
    clearTimeout(previousTimeoutId);
  }

  // Create a new timeout to hide the "added-to-cart-visible" message
  const timeoutId = setTimeout(() => {
    element.classList.remove("cart-showing");
  }, 2000);

  // Save the new timeout ID for this product
  elementTimeouts[productId] = timeoutId;

  cart.forEach((item) => {
    cartQuantity += item.quantity;
  });
  saveQuantityToStorage();
  console.log("cartQuantity: " + cartQuantity);
  console.log(localStorage);
  localStorage.removeItem("cartQuantity");
  document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
  //return cartQuantity;
  //console.log(localStorage);
}
//document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;

document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.dataset.productId;
    const element = document.querySelector(`.cart-${productId}`);
    cartCheckMark(productId, element);
    addToCart(productId);
    showCartQuantity(productId);
  });
});
