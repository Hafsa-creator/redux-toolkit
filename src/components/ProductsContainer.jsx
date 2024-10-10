import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
// material ui
import { Box, Card, Typography } from '@mui/material';
// redux toolkit
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../features/productSlice';


const ProductsContainer = () => {

    const dispatch = useDispatch();
    const { products } = useSelector(state => state?.products)

    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch]);


    return (
        <div>

            {/* Hero Section */}
            <Box
                sx={{
                    backgroundImage: `url('https://images.pexels.com/photos/6956903/pexels-photo-6956903.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',

                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',

                    height: '100vh',
                    textAlign: 'center'
                }}
            >
                <Typography variant="h3" sx={{ backgroundColor: 'rgba(0,0,0,0.5)', color: 'white', p: 2 }}>
                    Welcome to Our E-commerce Store
                </Typography>
            </Box>

            {/* Cards Container */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    gap: 3,
                    py: 7
                }}
            >
                {/* map product cards here */}
                {products.map((item) => (
                    <Card
                        variant="outlined"
                        key={item?.id}
                        sx={{
                            width: { xl: '20%', lg: '27%', md: '40%', sm: '60%', xs: '90%' },
                            backgroundColor: '#ffffff',
                            borderColor: 'rgba(0,0,0,0.1)',
                            boxShadow: 2,
                        }}
                    >
                        <NavLink to={`/product-details/${item?.id}`} style={{ textDecoration: 'none' }}>
                            <div style={{
                                color: 'black',
                                display: 'flex', flexDirection: 'column',
                                padding: '18px'
                            }}>

                                {/* product image */}
                                <div style={{
                                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                                    height: '220px', overflow: 'hidden',
                                    padding: "20px 0",
                                }}>
                                    <img
                                        src={item?.image}
                                        alt="Product Image"
                                        style={{
                                            maxWidth: '100%',
                                            maxHeight: '100%',
                                            objectFit: 'cover',
                                        }}
                                    />
                                </div>

                                {/* product details */}
                                <div
                                    style={{
                                        minHeight: '100px',
                                        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                                        overflow: 'hidden',
                                    }}>

                                    <Typography component="h2" gutterBottom>
                                        {item?.title}
                                    </Typography>
                                    <Typography component="div" sx={{ fontWeight: 600 }} >
                                        Price: ${item?.price}
                                    </Typography>
                                </div>
                            </div>
                        </NavLink>
                    </Card>
                ))}
            </Box >
        </div>
    );
};

export default ProductsContainer;