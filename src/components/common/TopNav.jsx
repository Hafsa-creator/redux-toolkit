import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
// material ui
import { AppBar, Toolbar, Typography, Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


const TopNav = () => {

    const totalQuantity = useSelector(state => state?.cart?.totalQuantity);

    return (
        <AppBar position="static">
            <Toolbar sx={{ mx: 5 }}>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'white' }}>
                    <NavLink to='/' style={{ textDecoration: 'none' }}>
                        <span style={{ color: 'white' }}>E-commerce Store</span>
                    </NavLink>
                </Typography>

                <Badge badgeContent={totalQuantity} color="error">
                    <NavLink to='/cart-items'>
                        <ShoppingCartIcon sx={{ color: 'white' }} />
                    </NavLink>
                </Badge>

            </Toolbar>
        </AppBar>
    );
}

export default TopNav