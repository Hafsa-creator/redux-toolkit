import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
// material ui
import { AppBar, Toolbar, Typography, Badge, Drawer, Box, List, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
// icons
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';


const TopNav = () => {

    const totalQuantity = useSelector(state => state?.cart?.totalQuantity);
    const [open, setOpen] = useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const DrawerList = (
        <Box sx={{ width: 250 }} onClick={toggleDrawer(false)}>
            <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );


    return (
        <AppBar position="fixed">
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