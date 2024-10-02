import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    product: null,
};

const detailsSlice = createSlice({
    name: 'details',
    initialState,
    reducers: {
        fetchDetails: (state, action) => {
            state.product = action.payload;
        }
    }
});

export const { fetchDetails } = detailsSlice.actions;
export default detailsSlice.reducer;


export function productDetails(id) {
    return async function fetchProductDetailsThunk(dispatch) {
        const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
        dispatch(fetchDetails(response.data));
    };
}