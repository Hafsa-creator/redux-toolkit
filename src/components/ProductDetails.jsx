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
                width: '97%',
                display: 'flex', justifyContent: 'center',
                border: '1px solid #ddd',
                margin: '30px auto',
            }}>

            {/* product image */}
            <Box sx={{
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                width: '40%', height: '450px',
                padding: "30px 0", overflow: 'hidden',
            }}>
                <img src={product.image} alt={product.title}
                    style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        objectFit: 'cover',
                    }}
                />
            </Box>

            {/* product details */}
            <Box sx={{
                width: '60%',
                display: 'flex', flexDirection: 'column',
                justifyContent: 'space-around',
                border: '1px solid #ddd', p: 4
            }}>

                {/* title + price */}
                <Box>
                    <Typography variant="h4">
                        {product.title}
                    </Typography>
                    <Typography variant='h6' sx={{ color: 'GrayText', fontWeight: 'bold', mt: 2.5 }}>
                        Price: ${product.price}
                    </Typography>
                </Box>

                <Divider />

                {/* description */}
                <Box>
                    <Typography variant="body1">
                        {product.description}
                    </Typography>
                </Box>
                
                <Divider />

                {/* Quantity */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography> Quantity: </Typography>
                    <Box sx={{ mx: 3 }} >
                        <Button variant='outlined' sx={btn} onClick={removeItem}> - </Button>
                        <Button variant='text' sx={{ color: 'black' }}> {quantity} </Button>
                        <Button variant='outlined' sx={btn} onClick={addItem}> + </Button>
                    </Box>
                </Box>
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