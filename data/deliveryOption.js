import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
export const deliveryOptions = [
  {
    id: "1",
    deliveryDay: 7,
    priceCents: 0,
  },
  {
    id: "2",
    deliveryDay: 3,
    priceCents: 499,
  },
  {
    id: "3",
    deliveryDay: 1,
    priceCents: 999,
  },
];

export function getDeliveryOption(deliveryOptionId) {
  let deliveryOption;
  deliveryOptions.forEach((option) => {
    if (deliveryOptionId === option.id) {
      deliveryOption = option;
    }
  });
  return deliveryOption;
}

export function calculateDeliveryDate(deliveryOption) {
  const today = dayjs();
  const deliveryDate = today.add(deliveryOption.deliveryDay, "days");
  const dayString = deliveryDate.format("dddd, MMMM D");
  return dayString;
}
