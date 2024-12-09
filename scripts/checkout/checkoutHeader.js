import { renderPaySummary } from "./paymentSummary.js";
import { updateQuantity, cart } from "../../data/cart.js";

export function renderCheckoutHeader() {
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
        renderPaySummary();
      });
      // keydown event listener
      quantityInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          let quantity = Number(quantityInput.value);

          quantityExchange(productId, quantity);
          renderPaySummary();
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
      const returnLink = document.querySelector(".js-return-link");

      returnLink.innerHTML = `${updatedCartQuantity} items`;
    } else {
      alert("you can't update quantity");
    }
  }
}
