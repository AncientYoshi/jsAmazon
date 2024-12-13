import { renderSummary } from "../../scripts/checkout/orderSummary.js";
import { cart, loadFromStorage } from "../../data/cart.js";

describe("test suite : OrderSummary", () => {
  const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
  const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";
  const deliveryOptionId1 = "3";
  const deliveryOptionId2 = "2";

  beforeEach(() => {
    spyOn(localStorage, "setItem");
    document.querySelector(
      ".js-container"
    ).innerHTML = `<div class="js-order-summary"></div><div class="js-return-link"></div>
    <div class="js-payment-summary"></div>
    `;
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: productId1,
          quantity: 2,
          deliveryOptionId: deliveryOptionId1,
        },
        {
          productId: productId2,
          quantity: 1,
          deliveryOptionId: deliveryOptionId2,
        },
      ]);
    });
    loadFromStorage();
    renderSummary();
  });
  afterEach(() => {
    //document.querySelector(".js-container").innerHTML = ``;
  });
  it("display the cart", () => {
    expect(document.querySelectorAll(".js-cart-item-container").length).toEqual(
      2
    );
    expect(
      document.querySelector(`.js-product-quantity-${productId1}`).innerText
    ).toContain("Quantity: 2");
    expect(
      document.querySelector(`.js-product-quantity-${productId2}`).innerText
    ).toContain("Quantity: 1");
    expect(
      document.querySelector(`.js-product-name-${productId1}`).innerText
    ).toEqual("Black and Gray Athletic Cotton Socks - 6 Pairs");
    expect(
      document.querySelector(`.js-product-price-${productId1}`).innerText
    ).toEqual("$10.90");
  });
  it("removes from the cart", () => {
    document.querySelector(`.js-delete-link-${productId1}`).click();
    expect(document.querySelectorAll(".js-cart-item-container").length).toEqual(
      1
    );
    expect(
      document.querySelector(`.js-cart-item-container-${productId1}`)
    ).toEqual(null);
    expect(
      document.querySelector(`.js-cart-item-container-${productId2}`)
    ).not.toEqual(null);
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productId2);
  });
  it("updating delivery option", () => {
    document
      .querySelector(`.js-delivery-option-${productId1}-${deliveryOptionId1}`)
      .click();
    expect(
      document.querySelector(
        `.js-delivery-option-input-${productId1}-${deliveryOptionId1}`
      ).checked
    ).toEqual(true);
    expect(cart.length).toEqual(2);
    expect(cart[0].productId).toEqual(productId1);
    expect(cart[0].deliveryOptionId).toEqual(deliveryOptionId1);
  });
});
