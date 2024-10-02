import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
// material ui
import { Box, Card, CardContent, Typography } from '@mui/material';
// redux toolkit
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../features/productSlice';


const ProductsContainer = () => {

    const dispatch = useDispatch();
    const { products } = useSelector(state => state.products)

    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch]);


    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                margin: '30px 0',
                gap: 2,
            }}
        >
            {products.map((item) => (
                <Card   
                    variant="outlined"
                    sx={{ width: '21vw' }}
                    key={item.id}
                >
                    <NavLink to={`/product-details/${item.id}`} style={{ textDecoration: 'none' }}>
                        <CardContent sx={{ color: 'black' }}>
                            <Typography
                                sx={{ display: 'flex', justifyContent: 'center', width: '100%', mb: 2 }}
                            >
                                <img
                                    src={item.image}
                                    alt="Product Image"
                                    width='120px'
                                    height='140px'
                                />
                            </Typography>
                            <Typography component="div">
                                {item.title} <br />
                                <b>${item.price}</b>
                            </Typography>
                        </CardContent>
                    </NavLink>
                </Card>
            ))}
        </Box>
    );
};

export default ProductsContainer;
