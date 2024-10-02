import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';


const initialState = {
    products: [],
    loading: false,
    error: null,
};

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.products = action.payload;
                state.loading = false;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
})

export const { fetchProducts } = productSlice.actions;
export default productSlice.reducer;


// make api call here
export const getProducts = createAsyncThunk('products/get', async () => {
    const response = await axios.get('https://fakestoreapi.com/products');
    return response.data;
})