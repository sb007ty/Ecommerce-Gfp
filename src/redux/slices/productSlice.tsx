import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  CartItemInterface,
  ProductDetailsInterface,
} from "../../allTypes.type";
interface ProductState {
  productDetails: {
    id: string;
  };
  cart: CartItemInterface[];
}
const initialState: ProductState = {
  productDetails: {
    id: "",
  },
  cart: [],
};
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    updateProductDetailsId(
      state = initialState,
      action: PayloadAction<string>
    ) {
      state.productDetails.id = action.payload;
    },
    updateProductCart(state = initialState, action) {
      const { productDetails, quantity: newQuantity } = action.payload;
      const cartItems = state.cart;
      if (newQuantity === 0) {
        const indexOfItemToRemove = cartItems.findIndex(
          (item) => item.product_id === productDetails.product_id
        );
        if (indexOfItemToRemove !== -1) {
          cartItems.splice(indexOfItemToRemove, 1);
        }
        return;
      }
      const cartItemToEdit = cartItems.find(
        (item) => item["product_id"] === productDetails["product_id"]
      );
      if (!cartItemToEdit) {
        state.cart.push({ ...productDetails, quantity: newQuantity });
      } else {
        cartItemToEdit.quantity += newQuantity;
      }
    },
  },
});

export const { updateProductDetailsId, updateProductCart } =
  productSlice.actions;
export default productSlice.reducer;
