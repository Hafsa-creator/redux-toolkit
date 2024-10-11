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
        <div style={{ padding: '40px 0', height: '100vh' }}>
            <Box
                sx={{
                    width: { xs: '88%', sm: '600px', md: '800px', lg: '1000px', xl: '1200px' },
                    margin: 'auto', padding: '12px',

                    display: 'flex', justifyContent: 'center',
                    flexDirection: { xs: 'column', md: 'row' },

                    backgroundColor: '#ffffff', boxShadow: 2,
                    borderColor: 'rgba(0,0,0,0.1)', borderRadius: '7px',

                    overflow: 'hidden',
                    boxSizing: 'border-box',
                }}>

                {/* product image */}
                <Box sx={{
                    width: { xs: '100%', md: '40%' },
                    height: { xs: '250px', md: '400px' },

                    my: { xs: 2, md: 'none' },
                    m: { md: 3 },
                    boxSizing: 'border-box',

                    backgroundImage: `url(${product?.image})`,
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    backgroundRepeat: "no-repeat",
                }}
                ></Box>

                {/* product details */}
                <Box
                    sx={{
                        width: { sm: '100%', md: '60%' },
                        display: 'flex', flexDirection: 'column', justifyContent: 'space-around',
                        p: { xs: 2, md: 4 },
                        boxSizing: 'border-box',

                        borderTop: { xs: '1px solid #ddd', md: 'none' },
                        borderLeft: { md: '1px solid #ddd' },
                    }}
                >
                    {/* title + price */}
                    <Box>
                        <Typography variant="h4"
                            sx={{
                                fontSize: { xs: '1.2rem', md: '2rem' },
                            }}
                        >
                            {product?.title}
                        </Typography>
                        <Typography variant='h6' sx={{ color: 'GrayText', fontWeight: 'bold', mt: 1.5 }}>
                            Price: ${product?.price}
                        </Typography>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    {/* description */}
                    <Box>
                        <Typography variant="body1" sx={{ fontSize: { xs: '14px ', md: '16px' } }}>
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