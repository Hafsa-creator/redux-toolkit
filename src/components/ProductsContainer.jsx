import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
// material ui
import { Box, Card, CardContent, Typography } from '@mui/material';
// redux toolkit
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../features/productSlice';
import { Height } from '@mui/icons-material';


const ProductsContainer = () => {

    const dispatch = useDispatch();
    const { products } = useSelector(state => state.products)

    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch]);


    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            margin: '30px 0',
            gap: 3,
        }}>
            {products.map((item) => (
                <Card
                    variant="outlined"
                    sx={{
                        width: { xl: '20%', lg: '30%', md: '45%', sm: '75%', xs: '100%' },
                        borderColor: 'black',
                    }}
                    key={item.id}
                >
                    <NavLink to={`/product-details/${item.id}`} style={{ textDecoration: 'none' }}>
                        <div style={{
                            color: 'black',
                            display: 'flex', flexDirection: 'column',
                            padding: '20px'
                        }}>
                            {/* product image */}
                            <div style={{
                                display: 'flex', justifyContent: 'center', alignItems: 'center',
                                height: '250px', overflow: 'hidden',
                                padding: "20px 0",
                            }}>
                                <img
                                    src={item.image}
                                    alt="Product Image"
                                    style={{
                                        maxWidth: '100%',
                                        maxHeight: '100%',
                                        objectFit: 'cover',
                                    }}
                                />
                            </div>
                            {/* product details */}
                            <div style={{
                                minHeight: '100px',
                                display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                                overflow: 'hidden',
                            }}>
                                <Typography component="h2" gutterBottom>
                                    {item.title}
                                </Typography>
                                <Typography component="div" sx={{ fontWeight: 700 }} >
                                    ${item.price}
                                </Typography>
                            </div>
                        </div>
                    </NavLink>
                </Card>
            ))}
        </Box>
    );
};

export default ProductsContainer;
