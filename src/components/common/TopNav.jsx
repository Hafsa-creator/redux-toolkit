import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
// MUI
import { styled, useTheme } from '@mui/material/styles';
import {
    Box, Drawer, Toolbar, Divider,
    List, ListItem, ListItemButton, ListItemIcon, ListItemText,
    Badge, IconButton, Typography
}
    from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
// icons
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import CallIcon from '@mui/icons-material/Call';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';


const drawerWidth = 240;


// AppBar styling
const AppBar = styled(MuiAppBar, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: open ? `calc(100% - ${drawerWidth}px)` : '100%',
        marginLeft: open ? `${drawerWidth}px` : 0,
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            marginLeft: 0,
        },
    })
);

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));


const TopNav = ({ open, handleDrawerOpen, handleDrawerClose }) => {

    const totalQuantity = useSelector(state => state?.cart?.totalQuantity);
    const theme = useTheme();


    return (
        <Box sx={{ display: 'flex' }}>

            <AppBar position="fixed" open={open} sx={{ backgroundColor: 'black' }}>
                <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center', mx: 2 }}>

                    {/* menu & title on the left */}
                    <Box display="flex" alignItems="center">
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{ mr: 2, ...(open && { display: 'none' }) }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div">
                            <NavLink to='/' style={{ textDecoration: 'none' }}>
                                <span style={{ color: 'white' }}>E-commerce Store</span>
                            </NavLink>
                        </Typography>
                    </Box>


                    {/* Cart icon on the right */}
                    <Box>
                        <Badge badgeContent={totalQuantity} color="error">
                            <NavLink to='/cart-items'>
                                <ShoppingCartIcon sx={{ color: 'white' }} />
                            </NavLink>
                        </Badge>
                    </Box>
                </Toolbar>
            </AppBar>

            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>

                <Divider />

                <List>
                    {['Home', 'About', 'Contact us'].map(text => (
                        <NavLink
                            to={text === 'Home' ? '/' : text === 'About' ? '/about' : '/contact-us'}
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
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
            </Drawer>
        </Box>
    )
}

export default TopNav