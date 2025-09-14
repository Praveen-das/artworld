export function getCartPricingDetails(items) {
  const { subtotal, discount } = items.reduce(
    (sum, item) => {
      const {
        quantity,
        product: { price, discount },
      } = item;

      const itemPrice = price * quantity;
      const itemDiscount = Math.round(itemPrice * (discount / 100));

      sum.subtotal += itemPrice;
      sum.discount += itemDiscount;
      
      return sum;
    },
    { subtotal: 0, discount: 0 }
  );

  const total = subtotal - discount;

  return { subtotal, total, discount };
}
