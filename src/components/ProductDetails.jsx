import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// material ui
import { Box, Button, Typography, CircularProgress, Divider } from '@mui/material';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { productDetails } from '../features/detailsSlice';
import { addItemsToCart, removeItemsFromCart } from '../features/cartSlice';


const ProductDetails = () => {

    const [quantity, setQuantity] = useState(0);
    const { id } = useParams();
    const dispatch = useDispatch();

    const product = useSelector(state => state.details.product);
    const loading = useSelector(state => state.details.loading);
    const cartItems = useSelector(state => state.cart.cartItems);


    useEffect(() => {
        dispatch(productDetails(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (product) {
            setQuantity(cartItems[product.id]?.quantity || 0); // Set quantity based on cart
        }
    }, [product, cartItems]);


    const addItem = () => {
        const existingItem = cartItems[product.id];
        const newQuantity = existingItem ? existingItem.quantity + 1 : 1;

        if (newQuantity <= 10) {
            dispatch(addItemsToCart({ ...product, quantity: newQuantity }));
            setQuantity(newQuantity);
        } else {
            alert("Limited Product / Item Quantity Max up to 10.");
        }
    };

    const removeItem = () => {
        const existingItem = cartItems[product.id];
        if (existingItem) {
            if (existingItem.quantity > 1) {
                dispatch(removeItemsFromCart(product.id));
                setQuantity(existingItem.quantity - 1);
            } else {
                dispatch(removeItemsFromCart(product.id));
                setQuantity(0); // Reset quantity when removing last item
            }
        }
    };


    // Loader
    if (loading) return (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
            <CircularProgress />
        </Box>
    );
    // If product is null after loading, show an error message
    if (!product) return (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
            <Typography variant="h6">Product not found. Please try again.</Typography>
        </Box>
    );


    return (
        <Box
            sx={{
                width: '97vw',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                margin: '20px auto',
                border: '1px solid #ddd',
                backgroundColor: '#fff',
            }}>
            {/* product image */}
            <Box sx={{
                display: 'inline-flex', justifyContent: 'center',
                width: '40%', height: '100%', margin: 'auto', py: 2,
            }}>
                <img src={product.image} alt={product.title} width="320px" />
            </Box>
            {/* product details */}
            <Box sx={{ p: 4, width: '60%', border: '1px solid #ddd' }}>

                {/* title */}
                <Typography variant="h4" sx={{ my: 3 }}>
                    {product.title}
                </Typography>
                {/* price */}
                <Typography variant='h6' sx={{ color: 'grey', fontWeight: 'bold' }}>
                    Price: ${product.price}
                </Typography>

                <Divider sx={{ my: 2 }} />

                {/* description */}
                <Typography variant="body1" sx={{ my: 3.5 }}>
                    {product.description}
                </Typography>

                <Divider sx={{ my: 5 }} />

                {/* Quantity */}
                <Typography component='h4' sx={{ display: 'flex', alignItems: 'center' }}>
                    <b>Quantity:</b>
                    <Box sx={{ mx: 2 }} >
                        <Button variant='outlined' sx={btn} onClick={removeItem}> - </Button>
                        <Button variant='text' sx={{ color: 'black' }}> {quantity} </Button>
                        <Button variant='outlined' sx={btn} onClick={addItem}> + </Button>
                    </Box>
                </Typography>
            </Box>
        </Box>
    );
};

export default ProductDetails;


// button styling
const btn = {
    backgroundColor: '#ddd',
    color: 'black',
    border: 'none',
    borderRadius: '5px',
    padding: '2px',
};