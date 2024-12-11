import { renderCheckoutHeader } from "../scripts/checkout/checkoutHeader.js";
import { renderPaySummary } from "../scripts/checkout/paymentSummary.js";
import { renderSummary } from "../scripts/checkout/orderSummary.js";

export const elementTimeouts = {};

export let cart;
loadFromStorage();
export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem("cart"));
  if (!cart) {
    cart = [
      {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2,
        deliveryOptionId: "1",
      },
      {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1,
        deliveryOptionId: "2",
      },
    ];
  }
}

export function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}
export function cartCheckMark(productId, element) {
  //const element = document.querySelector(`.cart-${productId}`);
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
}
export function addToCart(productId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += 1;
  } else {
    cart.push({
      productId: productId,
      quantity: 1,
      deliveryOptionId: "1",
    });
  }

  saveToStorage();
}
/*
export function addToCart(productId) {
  let x;
  const y = document.querySelector(`.js-quantity-selector-${productId}`).value;
  x = Number(y);
  let cartItem;

  cart.forEach((item) => {
    if (productId === item.productId) {
      cartItem = item; //imported for me if it opposite it doesn't work
    }
  });
  if (cartItem) {
    cartItem.quantity += x;
  } else {
    cart.push({
      productId: productId,
      quantity: x,
      deliveryOptionId: "1",
    });
  }
  saveToStorage(cart);
}*/

export function removeFromCart(productId) {
  let newCart = [];

  cart.forEach((item) => {
    if (item.productId != productId) {
      newCart.push(item);
    }
  });
  cart = newCart;
  saveToStorage(cart);
}

export function updateQuantity(productId, newQuantity) {
  cart.forEach((item) => {
    if (item.productId === productId) {
      item.quantity = newQuantity;
    }
  });
  renderSummary();
  renderPaySummary();
  renderCheckoutHeader();
  saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let cartItem;

  cart.forEach((item) => {
    if (productId === item.productId) {
      cartItem = item; //imported for me if it opposite it doesn't work
    }
  });
  cartItem.deliveryOptionId = deliveryOptionId;
  saveToStorage();
}
