import {
  cart,
  removeFromCart,
  updateQuantity,
  updateDeliveryOption,
} from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import {
  deliveryOptions,
  getDeliveryOption,
  calculateDeliveryDate,
} from "../../data/deliveryOption.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { renderPaySummary } from "./paymentSummary.js";
import { renderCheckoutHeader } from "./checkoutHeader.js";

export function renderSummary() {
  //import { cartQuantity } from "./amazon.js";
  let dayString;
  let cartQuantity = 0;
  let cartItemHtml = "";
  cart.forEach((item) => {
    const productId = item.productId;
    cartQuantity += item.quantity;
    const matchingProduct = getProduct(productId);

    const deliveryOptionId = item.deliveryOptionId;
    const deliveryOption = getDeliveryOption(deliveryOptionId);
    dayString = calculateDeliveryDate(deliveryOption);

    cartItemHtml += `<div class="cart-item-container js-cart-item-container-${
      matchingProduct.id
    }">
              <div class="delivery-date">Delivery date: ${dayString}</div>
  
              <div class="cart-item-details-grid">
                <img
                  class="product-image"
                  src="${matchingProduct.image}"
                />
  
                <div class="cart-item-details">
                  <div class="product-name">
                    ${matchingProduct.name}
                  </div>
                  <div class="product-price">$${formatCurrency(
                    matchingProduct.priceCents
                  )}</div>
                  <div class="product-quantity-${matchingProduct.id}">
                    <span> Quantity: <span class="quantity-label-${
                      matchingProduct.id
                    }">${item.quantity}</span> </span>
                    <span class="update-quantity-link link-primary js-update-link" data-product-id=${
                      matchingProduct.id
                    }>
                      Update
                    </span><input class='quantity-input quantity-input-${
                      matchingProduct.id
                    }'>
                    <span class="save-quantity-link link-primary" data-product-id=${
                      matchingProduct.id
                    }>Save</span>
                    <span class="delete-quantity-link link-primary js-delete-link" data-quantity=${
                      item.quantity
                    } data-product-id=${matchingProduct.id}>
                      Delete
                    </span>
                  </div>
                </div>
  
                <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
                  ${delivery_option(matchingProduct, item)}
                  
                  
                  
                </div>
              </div>
            </div>`;
  });

  function delivery_option(matchingProduct, item) {
    let html = "";
    deliveryOptions.forEach((deliveryOption) => {
      dayString = calculateDeliveryDate(deliveryOption);
      const priceString =
        deliveryOption.priceCents === 0
          ? "Free"
          : `$${formatCurrency(deliveryOption.priceCents)}`;
      const ischecked = deliveryOption.id === item.deliveryOptionId;
      html += `<div class="delivery-option js-delivery-option" data-product-id=${
        matchingProduct.id
      } data-delivery-option-id=${deliveryOption.id}>
                    <input
                      type="radio"
                      ${ischecked ? "checked" : ""}
                      class="delivery-option-input"
                      name="delivery-option-${matchingProduct.id}"
                    />
                    <div>
                      <div class="delivery-option-date">${dayString}</div>
                      <div class="delivery-option-price">${priceString} -Shipping</div>
                    </div>
                  </div>`;
    });
    return html;
  }

  document.querySelector(".js-order-summary").innerHTML = cartItemHtml || "";
  document.querySelectorAll(".js-delete-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      const quantity = link.dataset.quantity;
      removeFromCart(productId);
      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.remove();
      returnLink.innerHTML = `${cartQuantity - quantity} + items`;
      renderPaySummary();
      renderCheckoutHeader();
    });
  });

  document.querySelectorAll(".js-update-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      const container = document.querySelector(
        `.product-quantity-${productId}`
      );
      container.classList.add("is-editing-quantity");
    });
  });

  const returnLink = document.querySelector(".js-return-link");
  returnLink.innerHTML = `${cartQuantity} items`;

  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener("click", () => {
      const { productId, deliveryOptionId } = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderSummary();
      renderPaySummary();
    });
  });
}
