import React from 'react'
import { Outlet } from 'react-router-dom'
import TopNav from '../components/common/TopNav'


const HomePage = () => {

    return (
        <>
            <TopNav />
            <main style={{ paddingTop: '65px' }}>
                <Outlet />
            </main>
        </>
    )
}

export default HomePage