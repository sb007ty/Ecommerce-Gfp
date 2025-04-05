import React from "react";
import { useAppSelector } from "../../redux/redux-hook";
import CartItemsList from "./CartItemsList";

const CheckoutPage: React.FC = () => {
  const cartItems = useAppSelector((state) => state.product.cart);
  return (
    <div className="min-h-[50vh] p-5 flex flex-col gap-5">
      <h1>Shopping Cart</h1>
      <div className="checkout-page flex flex-col md:flex-row">
        <CartItemsList />
      </div>
    </div>
  );
};

export default CheckoutPage;
