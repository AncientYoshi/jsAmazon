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
} from "../../data/deliveryOption.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

export function renderSummary() {
  //import { cartQuantity } from "./amazon.js";
  let cartQuantity = 0;
  let cartItemHtml = "";
  cart.forEach((item) => {
    const productId = item.productId;
    cartQuantity += item.quantity;
    const matchingProduct = getProduct(productId);

    const deliveryOptionId = item.deliveryOptionId;
    const deliveryOption = getDeliveryOption(deliveryOptionId);
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDay, "days");
    const dayString = deliveryDate.format("dddd, MMMM D");

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
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDay, "days");
      const dayString = deliveryDate.format("dddd, MMMM D");
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
      returnLink.innerHTML = cartQuantity - quantity;
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

  saveQuantityUpdate();
  function saveQuantityUpdate() {
    document.querySelectorAll(".save-quantity-link").forEach((link) => {
      const productId = link.dataset.productId;
      const quantityInput = document.querySelector(
        `.quantity-input-${productId}`
      );
      //unpkg.com/dayjs@1.11.10/esm/index.js
      //click event listener
      https: link.addEventListener("click", () => {
        const container = document.querySelector(
          `.product-quantity-${productId}`
        );
        container.classList.remove("is-editing-quantity");
        let quantity = Number(quantityInput.value);
        quantityExchange(productId, quantity);
      });
      // keydown event listener
      quantityInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          let quantity = Number(quantityInput.value);

          quantityExchange(productId, quantity);
        }
      });
    });
  }
  function quantityExchange(productId, quantity) {
    if (quantity >= 0 && quantity < 1000) {
      document.querySelector(`.quantity-label-${productId}`).innerHTML =
        quantity;

      updateQuantity(productId, quantity);

      let updatedCartQuantity = 0;
      cart.forEach((item) => {
        updatedCartQuantity += item.quantity;
      });
      cartQuantity = updatedCartQuantity;
      returnLink.innerHTML = cartQuantity;
    } else {
      alert("you can't update quantity");
    }
  }

  /*document.querySelectorAll(".save-quantity-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      const container = document.querySelector(`.product-quantity-${productId}`);
      container.classList.remove("is-editing-quantity");
      const quantityInput = document.querySelector(
        `.quantity-input-${productId}`
      );
      let quantity = Number(quantityInput.value);
      if (quantity >= 0 && quantity < 1000) {
        document.querySelector(`.quantity-label-${productId}`).innerHTML =
          quantity;
  
        updateQuantity(productId, quantity);
  
        let updatedCartQuantity = 0;
        cart.forEach((item) => {
          updatedCartQuantity += item.quantity;
        });
        cartQuantity = updatedCartQuantity;
        returnLink.innerHTML = cartQuantity;
      } else {
        alert("you can't update quantity");
      }
    });
  });*/
  const returnLink = document.querySelector(".js-return-link");
  returnLink.innerHTML = cartQuantity;
  console.log(localStorage.getItem("cart"));

  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener("click", () => {
      const { productId, deliveryOptionId } = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderSummary();
    });
  });
}
