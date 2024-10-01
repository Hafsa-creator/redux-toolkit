import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: {},
    totalQuantity: 0,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,

    reducers: {
        // add items to cart
        addItemsToCart: (state, action) => {
            const product = action.payload;

            if (state.cartItems[product.id]) {
                state.cartItems[product.id].quantity += 1;  // increase quantity
            }
            else {
                state.cartItems[product.id] = { ...product, quantity: 1 };
            }
            state.totalQuantity += 1;  // total cart quantity
        },
        
        // remove items from cart
        removeItemsFromCart: (state, action) => {
            const productId = action.payload;

            if (state.cartItems[productId] && state.cartItems[productId].quantity > 0) {
                state.cartItems[productId].quantity -= 1;  // decrease quantity
                state.totalQuantity -= 1;  // Update total quantity

                // If quantity is 0, remove the item from the cart
                if (state.cartItems[productId].quantity === 0) {
                    delete state.cartItems[productId];
                }
            }
        },
    }
});

export const { addItemsToCart, removeItemsFromCart } = cartSlice.actions;
export default cartSlice.reducer;