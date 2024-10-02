import { configureStore } from '@reduxjs/toolkit';
// slices
import cartSlice from '../features/cartSlice';
import productSlice from '../features/productSlice';
import detailsSlice from '../features/detailsSlice';

const store = configureStore({
    reducer: {
        cart: cartSlice,
        products: productSlice,
        details: detailsSlice,
    }
});

export default store;