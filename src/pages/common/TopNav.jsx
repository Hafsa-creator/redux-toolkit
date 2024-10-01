import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
// material ui
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import './styles/top-nav.css';


const TopNav = () => {

    const totalQuantity = useSelector((state) => state.totalQuantity);

    return (
        <header>
            <NavLink to='/'>
                <h3 style={{ color: 'white' }}>E-commerce Store</h3>
            </NavLink>
            <Badge badgeContent={totalQuantity} color="error">
                <NavLink to='/cart-items'>
                    <ShoppingCartIcon sx={{ color: 'white' }} />
                </NavLink>
            </Badge>
        </header>
    );
}

export default TopNav