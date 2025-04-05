import React from "react";
import { useAppSelector } from "../../redux/redux-hook";
import CartItem from "./CartItem";

const CartItemsList: React.FC = () => {
  const cartItems = useAppSelector((state) => state.product.cart);
  return (
    <div className="flex flex-col gap-5">
      {cartItems.map((item) => (
        <CartItem {...item} key={item.product_id} />
      ))}
    </div>
  );
};

export default CartItemsList;
