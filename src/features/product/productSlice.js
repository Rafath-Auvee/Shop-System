import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchProducts, postProduct } from "./productAPI.js";
import { deleteProduct } from "./productAPI.js";

const initialState = {
  products: [],
  isLoading: false,
  postSuccess: false,
  deleteSuccess: false,
  isError: false,
  errorMessage: "",
};

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    const products = fetchProducts();
    return products;
  }
);
export const addProducts = createAsyncThunk(
  "products/addProducts",
  async (data) => {
    const products = postProduct(data);
    return products;
  }
);

export const removeProducts = createAsyncThunk(
  "products/removeProducts",
  async (data, thunkAPI) => {
    const products = await deleteProduct(data);
    thunkAPI.dispatch(removeFromList(data));
    return products;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    togglePostSuccess: (state) => {
      state.postSuccess = false;
    },
    toggleDeleteSuccess: (state) => {
      state.deleteSuccess = false;
    },
    removeFromList: (state, action) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
        state.products = [];
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.error.message;
      })
      .addCase(addProducts.pending, (state) => {
        state.isLoading = true;
        state.postSuccess = false;
        state.isError = false;
      })
      .addCase(addProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.postSuccess = true;
      })
      .addCase(addProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.error.message;
        state.postSuccess = false;
        state.products = [];
      })
      .addCase(removeProducts.pending, (state) => {
        state.isLoading = true;
        state.deleteSuccess = false;
        state.isError = false;
      })
      .addCase(removeProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.deleteSuccess = true;
      })
      .addCase(removeProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.error.message;
        state.deleteSuccess = false;
        state.products = [];
      });
  },
});
export const { removeFromList, togglePostSuccess, toggleDeleteSuccess } =
  productSlice.actions;
export default productSlice.reducer;
