// import React from 'react'
// import { Outlet } from 'react-router-dom'
// import TopNav from '../components/common/TopNav'
// import PersistentDrawerLeft from '../components/common/PersistentDrawerLeft'


// const HomePage = () => {

//     return (
//         <>
//             {/* <TopNav /> */}
//             <PersistentDrawerLeft />
//             <main style={{ paddingTop: '64px', backgroundColor: '#f5f5f5' }}>
//                 <Outlet />
//             </main>
//         </>
//     )
// }

// export default HomePage


import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import PersistentDrawerLeft from '../components/common/PersistentDrawerLeft';


// Main content styling
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: open ? 240 : 0,
        [theme.breakpoints.down('sm')]: {
            marginLeft: 0,
        },
    })
);


const HomePage = () => {

    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <>
            <PersistentDrawerLeft
                open={open}
                handleDrawerOpen={handleDrawerOpen}
                handleDrawerClose={handleDrawerClose}
            />
            <Main open={open} style={{ paddingTop: '64px', backgroundColor: '#f5f5f5' }}>
                <Outlet />
            </Main>
        </>
    );
}

export default HomePage;