import React from 'react';
import { NavLink } from 'react-router-dom';
// material ui
import "./stylesheets/cart.modules.css";
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper } from '@mui/material';
// redux toolkit
import { useDispatch, useSelector } from 'react-redux';
import { addItemsToCart, removeItemsFromCart } from '../features/cartSlice';


const CartPage = () => {

    const cartItems = useSelector(state => state?.cart?.cartItems);
    const totalItems = useSelector((state) => state?.cart?.totalQuantity);
    const dispatch = useDispatch();


    const addItem = (product) => {
        // dispatch(addItemsToCart(product));
        const existingItem = cartItems[product?.id];
        const newQuantity = existingItem ? existingItem?.quantity + 1 : 1;

        if (newQuantity < 11) {
            dispatch(addItemsToCart({ ...product, quantity: newQuantity }));
        } else {
            alert("Limited Product / Item Quantity Max upto 10.");
        }
    };

    const removeItem = (product) => {
        dispatch(removeItemsFromCart(product?.id));
    };


    // calculate subtotal
    const subTotal = Object.values(cartItems).reduce((acc, item) => {
        return acc + (item?.price * item?.quantity);
    }, 0);


    return (
        <Box sx={{ p: 2, m: 4 }}>
            
            {/* Cart Header */}
            <Typography variant="h5" gutterBottom>
                Your Cart ({totalItems} items)
            </Typography>

            {/* Cart Table */}
            <TableContainer component={Paper}>
                <Table>

                    {/* table header */}
                    <TableHead sx={{ backgroundColor: '#f4f4f4' }}>
                        <TableRow>
                            <TableCell>Item</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Total</TableCell>
                        </TableRow>
                    </TableHead>

                    {/* table body */}
                    <TableBody>
                        {Object.keys(cartItems).length > 0 ? (
                            Object.values(cartItems).map(item => (

                                <TableRow key={item?.id}>
                                    <TableCell>
                                        <div className='cart-item'>
                                            <img src={item?.image} alt="Product Image" />
                                            <NavLink to={`/product-details/${item?.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                                                <span>{item?.title}</span>
                                            </NavLink>
                                        </div>
                                    </TableCell>
                                    <TableCell> {item?.price} </TableCell>
                                    <TableCell className="cart-quantity">
                                        <button className="quantityBtn" onClick={() => removeItem(item)}>-</button>
                                        <span>{item?.quantity}</span>
                                        <button className="quantityBtn" onClick={() => addItem(item)}>+</button>
                                    </TableCell>
                                    <TableCell>${(item?.quantity * item?.price).toFixed(2)}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4}>No items in the cart.</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* sub-total */}
            <Box className='total' sx={{ mt: 2 }}>
                Grand Total: ${subTotal.toFixed(2)}
            </Box>
        </Box>
    );
};

export default CartPage;