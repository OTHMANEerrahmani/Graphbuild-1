import moment from "moment";

export const formatPrice = (price) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return formatter.format(price);
};

export function isStillSubscribe(planEndDate) {
  const endDate = moment(planEndDate);
  const currentDate = moment();

  return endDate.isAfter(currentDate);
}
