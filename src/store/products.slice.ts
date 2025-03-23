import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product, Review } from "@/models/types";

interface ProductState {
  products: Product[];
}

const initialState: ProductState = {
  products: [],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    addReview: (
      state,
      action: PayloadAction<{ productId: string; review: Review }>
    ) => {
      const { productId, review } = action.payload;
      const product = state.products.find((p) => p.id === productId);
      if (product) {
        product.reviews = [...product.reviews, review]; // הוספת הביקורת למוצר
      }
    },
  },
});

export const { setProducts, addReview } = productSlice.actions;
export default productSlice.reducer;
