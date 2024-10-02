import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// material ui
import { Box, Button, Typography, CircularProgress } from '@mui/material';
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
                width: '90%',
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                margin: '50px auto', py: 3,
                border: '1px solid #ddd',
                borderRadius: '5px'
            }}>
            <Box sx={{ px: 7 }}>
                <img src={product.image} alt={product.title} width="200px" />
            </Box>
            <Box>
                <Typography gutterBottom variant="h4"> {product.title} </Typography>
                <Typography gutterBottom variant="body1"> {product.description} </Typography>
                <Typography variant='h6' sx={{ my: 3, color: '#1976d2', fontWeight: 'bold' }}>
                    Price: ${product.price}
                </Typography>
                <Typography
                    variant='subtitle2'
                    sx={{ display: 'flex', alignItems: 'center' }}
                >
                    Quantity:
                    <Box sx={{ mx: 10 }} >
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