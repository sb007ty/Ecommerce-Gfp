import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface ProductState {
  productDetails: {
    id: string;
  };
  cart: any[];
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
