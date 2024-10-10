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

    const product = useSelector(state => state?.details?.product);
    const loading = useSelector(state => state?.details?.loading);
    const cartItems = useSelector(state => state?.cart?.cartItems);


    useEffect(() => {
        dispatch(productDetails(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (product) {
            setQuantity(cartItems[product?.id]?.quantity || 0); // Set quantity based on cart
        }
    }, [product, cartItems]);


    const addItem = () => {
        const existingItem = cartItems[product?.id];
        const newQuantity = existingItem ? existingItem?.quantity + 1 : 1;

        if (newQuantity <= 10) {
            dispatch(addItemsToCart({ ...product, quantity: newQuantity }));
            setQuantity(newQuantity);
        } else {
            alert("Limited Product / Item Quantity Max up to 10.");
        }
    };

    const removeItem = () => {
        const existingItem = cartItems[product?.id];
        if (existingItem) {
            if (existingItem.quantity > 1) {
                dispatch(removeItemsFromCart(product?.id));
                setQuantity(existingItem?.quantity - 1);
            } else {
                dispatch(removeItemsFromCart(product?.id));
                setQuantity(0); // Reset quantity when removing last item
            }
        }
    };


    // Loader
    if (loading) return (
        <Box sx={{ display: 'flex', justifyContent: 'center', margin: '50px 0' }}>
            <CircularProgress />
        </Box>
    );
    // If product is null after loading, show an error message
    if (!product) return (
        <Box sx={{ display: 'flex', justifyContent: 'center', margin: '50px 0' }}>
            <Typography variant="h6">Product not found. Please try again.</Typography>
        </Box>
    );


    // button styling
    const btn = {
        backgroundColor: '#ddd',
        color: 'black',
        border: 'none',
        borderRadius: '5px',
        padding: '2px',
    };


    return (
        <div style={{ padding: '40px 0' }}>
            <Box
                sx={{
                    width: '88%', margin: 'auto',
                    display: 'flex', justifyContent: 'center',
                    flexDirection: { xs: 'column', md: 'row' },
                    backgroundColor: '#ffffff', boxShadow: 2,
                    borderColor: 'rgba(0,0,0,0.1)', borderRadius: '7px',
                    overflow: 'hidden',
                }}>

                {/* product image */}
                <Box
                    sx={{
                        display: 'flex', justifyContent: 'center', alignItems: 'center',
                        width: { xs: '100%', md: '40%' },
                        height: 'auto',
                        padding: { sm: "15px", md: "30px" },
                        overflow: 'hidden',
                    }}
                >
                    <img
                        src={product?.image}
                        alt="Product Image"
                        style={{
                            maxWidth: '90%',
                            height: 'auto',
                            maxHeight: '450px',
                            objectFit: 'cover',
                        }}
                    />
                </Box>

                {/* product details */}
                <Box
                    sx={{
                        width: { sm: '100%', md: '60%' },
                        display: 'flex', flexDirection: 'column',
                        justifyContent: 'space-around',
                        borderTop: { xs: '1px solid #ddd', md: 'none' },
                        borderLeft: { md: '1px solid #ddd' },
                        p: { xs: 2, md: 4 },
                    }}
                >
                    {/* title + price */}
                    <Box>
                        <Typography variant="h4"
                            sx={{
                                fontSize: { xs: '1.5rem', md: '2.2rem' },
                            }}
                        >
                            {product?.title}
                        </Typography>
                        <Typography variant='h6' sx={{ color: 'GrayText', fontWeight: 'bold', mt: 2.5 }}>
                            Price: ${product?.price}
                        </Typography>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    {/* description */}
                    <Box>
                        <Typography variant="body1">
                            {product?.description}
                        </Typography>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    {/* Quantity */}
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography> Quantity: </Typography>
                        <Box sx={{ mx: 3, display: 'flex', alignItems: 'center' }} >
                            <Button variant='outlined' sx={btn} onClick={removeItem}> - </Button>
                            <Typography sx={{ mx: 2, fontWeight: 'bold' }}> {quantity} </Typography>
                            <Button variant='outlined' sx={btn} onClick={addItem}> + </Button>
                        </Box>
                    </Box>

                </Box>
            </Box>
        </div>
    );
};

export default ProductDetails;