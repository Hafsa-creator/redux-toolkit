import { configureStore } from '@reduxjs/toolkit';
// slices
import productSlice from '../features/productSlice';
import detailsSlice from '../features/detailsSlice';
import cartSlice from '../features/cartSlice';


const store = configureStore({
    reducer: {
        products: productSlice,
        details: detailsSlice,
        cart: cartSlice,
    }
});

export default store;