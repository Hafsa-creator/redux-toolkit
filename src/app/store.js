import { configureStore } from '@reduxjs/toolkit';
// persist store
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// slices
import productSlice from '../features/productSlice';
import detailsSlice from '../features/detailsSlice';
import cartSlice from '../features/cartSlice';


const cartPersistConfig = {
    key: 'cart',
    storage,
};

const persistedCartReducer = persistReducer(cartPersistConfig, cartSlice);

const store = configureStore({
    reducer: {
        products: productSlice,
        details: detailsSlice,
        cart: persistedCartReducer,
    }
});

const persistor = persistStore(store);

export { store, persistor };