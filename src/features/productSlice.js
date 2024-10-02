import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';


const initialState = {
    products: [],
};

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        fetchProducts: (state, action) => {
            state.products = action.payload;
        }
    }
})

export const { fetchProducts } = productSlice.actions;
export default productSlice.reducer;


// make api call here
export function getProducts() {
    return async function getProductsThunk(dispatch) {
        const reposnse = await axios.get('https://fakestoreapi.com/products');
        dispatch(fetchProducts(reposnse.data))
    }
}