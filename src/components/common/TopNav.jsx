import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
// material ui
import { AppBar, Toolbar, Typography, IconButton, Badge, Drawer, Box, List, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
// icons
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import CallIcon from '@mui/icons-material/Call';
import CloseIcon from '@mui/icons-material/Close';


const TopNav = () => {

    const totalQuantity = useSelector(state => state?.cart?.totalQuantity);
    const [open, setOpen] = useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const DrawerList = (
        <Box sx={{ width: 250, display: 'flex', flexDirection: 'column' }} onClick={toggleDrawer(false)}>

            {/* close icon */}
            <IconButton onClick={toggleDrawer(false)}
                sx={{ color: 'black', alignSelf: 'flex-end', m: 1 }}>
                <CloseIcon />
            </IconButton>

            <Divider />

            {/* menu items */}
            <List>
                {['Home', 'About', 'Contact us'].map(text => (
                    <NavLink to={text === 'Home' ? '/' : text === 'About' ? '/about' : '/contact-us'} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    {text === 'Home' && <HomeIcon />}
                                    {text === 'About' && <InfoIcon />}
                                    {text === 'Contact us' && <CallIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    </NavLink>
                ))}
            </List>

            <Divider />

            <List>
                <NavLink to='/cart-items' style={{ textDecoration: 'none', color: 'inherit' }}>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <ShoppingCartIcon />
                            </ListItemIcon>
                            <ListItemText primary="Cart" />
                        </ListItemButton>
                    </ListItem>
                </NavLink>
            </List>
        </Box>
    );


    return (
        <AppBar position="fixed" sx={{ backgroundColor: 'black' }}>
            <Toolbar sx={{ mx: 2 }}>

                {/* menu icon */}
                <MenuIcon onClick={toggleDrawer(true)}
                    sx={{ mr: 3, color: 'white', cursor: 'pointer' }}
                />
                <Drawer open={open} onClose={toggleDrawer(false)}>
                    {DrawerList}
                </Drawer>

                {/* website title */}
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'white' }}>
                    <NavLink to='/' style={{ textDecoration: 'none' }}>
                        <span style={{ color: 'white' }}>E-commerce Store</span>
                    </NavLink>
                </Typography>

                {/* cart icon */}
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