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
                    sx={{ width: '30%', display: "flex", flexDirection: "column", flexWrap: "wrap", gap: "2-" }}
                    key={item.id}
                >
                    <NavLink to={`/product-details/${item.id}`} style={{ textDecoration: 'none' }}>
                        <CardContent sx={{ color: 'black' }}>
                            <Typography 
                               // sx={{ display: 'flex', justifyContent: 'center', width: '100%', my: 3 }}
                            >
                                <div sx={{
                                    border: "1px solid #000000",
                                    padding: "20px"
                                }}>
                                        Testing
                                </div>
                                <img
                                    src={item.image}
                                    alt="Product Image"
                                    // width='150px'
                                    // height='170px'
                                    width= "100%"
                                />
                            </Typography>
                            <Typography component="div" gutterBottom sx={{ my: 2 }}>
                                {item.title}
                            </Typography>
                            <Typography component="div" sx={{ color: 'grey', fontWeight: 700 }} >
                                ${item.price}
                            </Typography>
                        </CardContent>
                    </NavLink>
                </Card>
            ))}
        </Box>
    );
};

export default ProductsContainer;
