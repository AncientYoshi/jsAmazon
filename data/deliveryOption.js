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
  let deliveryDateCal = deliveryOption.deliveryDay;
  for (let i = 1; i <= deliveryOption.deliveryDay; i++) {
    let startOrder = today.add(i, "days");
    let confirmDay = startOrder.format("dddd");
    if (confirmDay != "Sunday" && confirmDay != "Saturday") {
      continue;
    } else if (confirmDay === "Sunday") {
      deliveryDateCal += 1;
    } else if (confirmDay === "Saturday") {
      deliveryDateCal += 2;
    }
  }
  const deliveryDate = today.add(deliveryDateCal, "days");
  const dayString = deliveryDate.format("dddd, MMMM D");
  return dayString;
}
