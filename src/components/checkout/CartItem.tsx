import React from "react";
import {
  CartItemInterface,
  ProductDetailsInterface,
} from "../../allTypes.type";
import { useAppDispatch } from "../../redux/redux-hook";
import { updateProductCart } from "../../redux/slices/productSlice";

const CartItem: React.FC<CartItemInterface> = ({ ...product }) => {
  const { product_id, quantity, images, sold, name, description, inventory } =
    product;
  const activeImg = images[0].image_url;
  const dispatch = useAppDispatch();
  const { sale_price, list_price } = inventory[0];
  return (
    <div className="cart-item flex justify-evenly border-2 rounded-md p-3 gap-2">
      <div className="flex flex-col w-[100px] shrink-1  md:w-[200px] md:flex-row ">
        <img
          src={activeImg}
          alt="product-image"
          height={400}
          width={400}
          className="max-w-[100%] h-[auto]"
        />
      </div>
      <div className="flex flex-col shrink-5 grow">
        <h2>{name}</h2>
        <div>{description}</div>
        <div className="flex ">
          <div className="flex gap-1 me-auto">
            <button
              className="btn-number"
              onClick={(e) => {
                console.log(product, "prod");
                dispatch(
                  updateProductCart({
                    productDetails: { ...product },
                    quantity: 1,
                  })
                );
              }}
            >
              +
            </button>
            <button>{quantity}</button>
            <button
              className="btn-number"
              disabled={quantity === 1}
              onClick={(e) => {
                dispatch(
                  updateProductCart({
                    productDetails: { ...product },
                    quantity: -1,
                  })
                );
              }}
            >
              -
            </button>
            <button
              className="btn-number"
              onClick={(e) => {
                dispatch(
                  updateProductCart({
                    productDetails: { ...product },
                    quantity: 0,
                  })
                );
              }}
            >
              Remove
            </button>
          </div>
          <div>
            <span>${sale_price * quantity}</span>
            {sale_price !== list_price && (
              <span className="line-through ">${list_price}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
