import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    product: null,
    loading: false,
    error: null,
};

// API call
export const productDetails = createAsyncThunk('productDetails/get/', async (id) => {
    const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
    return response.data;
});

const detailsSlice = createSlice({
    name: 'details',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(productDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(productDetails.fulfilled, (state, action) => {
                state.product = action.payload;
                state.loading = false;
            })
            .addCase(productDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export const { fetchDetails } = detailsSlice.actions;
export default detailsSlice.reducer;